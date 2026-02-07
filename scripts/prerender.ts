import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { projects } from "../src/data/projects.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

// Dynamic imports for pages and dependencies
const importPages = async () => {
  const { default: MainLayout } = await import("../src/layouts/MainLayout.tsx");
  const { default: Home } = await import("../src/pages/Home.tsx");
  const { default: About } = await import("../src/pages/About.tsx");
  const { default: Projects } = await import("../src/pages/Projects.tsx");
  const { default: ProjectDetails } = await import("../src/pages/ProjectDetails.tsx");
  const { default: Contact } = await import("../src/pages/Contact.tsx");

  return { MainLayout, Home, About, Projects, ProjectDetails, Contact };
};

const importHelmet = async () => {
  const helmetModule = await import("react-helmet-async");
  return {
    HelmetProvider: helmetModule.HelmetProvider,
  };
};

type PageEntry = {
  routePath: string;
  routePattern: string;
  filename: string;
  componentKey: string;
  projectId?: string;
};

const staticPages: PageEntry[] = [
  { routePath: "/", routePattern: "/", filename: "index.html", componentKey: "Home" },
  { routePath: "/about", routePattern: "/about", filename: "about/index.html", componentKey: "About" },
  { routePath: "/projects", routePattern: "/projects", filename: "projects/index.html", componentKey: "Projects" },
  { routePath: "/contact", routePattern: "/contact", filename: "contact/index.html", componentKey: "Contact" },
];

const projectPages: PageEntry[] = projects.map((project) => ({
  routePath: `/projects/${project.id}`,
  routePattern: "/projects/:id",
  filename: `projects/${project.id}/index.html`,
  componentKey: "ProjectDetails",
  projectId: project.id,
}));

const pageEntries = [...staticPages, ...projectPages];

const cfEmailDecodeScript =
  '<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>';

const insertCfEmailDecodeScript = (scripts: string) => {
  if (!scripts || scripts.includes("cloudflare-static/email-decode.min.js")) {
    return scripts;
  }

  const themeScriptRegex = /<script\b[^>]*>[\s\S]*?localStorage\.getItem\(['"]theme['"]\)[\s\S]*?<\/script>/i;
  const match = scripts.match(themeScriptRegex);

  if (!match) {
    return `${scripts}\n    ${cfEmailDecodeScript}`;
  }

  return scripts.replace(match[0], `${match[0]}\n    ${cfEmailDecodeScript}`);
};

const loadProjectDetails = () => {
  const detailsDir = path.resolve(projectRoot, "public", "project-details");
  if (!fs.existsSync(detailsDir)) return {};
  const files = fs.readdirSync(detailsDir).filter((file) => file.endsWith(".md"));
  return files.reduce<Record<string, string>>((acc, file) => {
    const id = file.replace(".md", "");
    const content = fs.readFileSync(path.resolve(detailsDir, file), "utf-8");
    acc[id] = content;
    return acc;
  }, {});
};

// Main prerender function
const prerender = async () => {
  try {
    // Import all modules
    const pages = await importPages();
    const helmet = await importHelmet();

    // Read main template HTML
    const templatePath = path.resolve(distDir, "index.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    // Extract assets from template - match complete script tags
    const scriptMatch = template.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
    const scripts = scriptMatch.join("\n    ");

    // Extract CSS links from template
    const cssMatch = template.match(/<link[^>]*>/g) || [];
    const cssLinks = cssMatch.join("\n    ");

    // Generate static pages
    const projectDetails = loadProjectDetails();

    for (const entry of pageEntries) {
      try {
        const PageComponent = (pages as any)[entry.componentKey];
        const helmetContext: { helmet?: any } = {};

        // Render the full app structure with Routes and Helmet
        const content = renderToStaticMarkup(
          React.createElement(
            helmet.HelmetProvider,
            { context: helmetContext },
            React.createElement(
              StaticRouter,
              { location: entry.routePath },
              React.createElement(
                pages.MainLayout,
                null,
                React.createElement(
                  Routes,
                  null,
                  React.createElement(Route, {
                    key: entry.routePath,
                    path: entry.routePattern,
                    element: React.createElement(PageComponent),
                  }),
                ),
              ),
            ),
          ),
        );

        // Extract Helmet data
        const helmetData = helmetContext.helmet;

        // Calculate depth for relative path adjustment
        const depth = entry.filename.split("/").length - 1;
        const relativeBase = depth > 0 ? "../".repeat(depth) : "./";

        // Adjust CSS and script paths based on directory depth
        // Replace ./ with the appropriate relative path
        const adjustedCssLinks = cssLinks.replace(/href="\.\//g, `href="${relativeBase}`);
        const adjustedScripts = scripts.replace(/src="\.\//g, `src="${relativeBase}`);

        // Build the head content from Helmet
        const helmtTitle = helmetData?.title.toComponent() || [];
        const helmetMeta = helmetData?.meta.toComponent() || [];
        const helmetLink = helmetData?.link.toComponent() || [];

        // Convert Helmet components to string
        let headContent = "";
        if (Array.isArray(helmtTitle) && helmtTitle.length > 0) {
          headContent += helmtTitle
            .map((c: any) => {
              if (c.props && "children" in c.props) {
                return `<title>${c.props.children}</title>`;
              }
              return "";
            })
            .filter(Boolean)
            .join("\n    ");
        }

        if (Array.isArray(helmetMeta)) {
          headContent +=
            "\n    " +
            helmetMeta
              .map((c: any) => {
                const props = c.props || {};
                const attrs = Object.entries(props)
                  .filter(([k]) => !["key", "children"].includes(k))
                  .map(([k, v]) => `${k}="${v}"`)
                  .join(" ");
                return `<meta ${attrs} />`;
              })
              .filter(Boolean)
              .join("\n    ");
        }

        // Fallback to default meta if Helmet didn't provide sufficient data
        if (!headContent.includes("<title>")) {
          headContent = `<title>Mark Judaya</title>\n    `;
        }

        const detailsPayload = entry.projectId ? { [entry.projectId]: projectDetails[entry.projectId] } : null;
        const detailsScript =
          detailsPayload && detailsPayload[entry.projectId as string]
            ? `\n    <script>window.__PROJECT_DETAILS__ = ${JSON.stringify(detailsPayload)};<\/script>`
            : "";

        const finalScripts =
          entry.filename === "contact/index.html" ? insertCfEmailDecodeScript(adjustedScripts) : adjustedScripts;

        const html = `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="${relativeBase}vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${headContent}
    ${adjustedCssLinks}
  </head>
  <body>
    <div id="root">${content}</div>
        ${detailsScript}
        ${finalScripts}
  </body>
</html>`;

        // Create directory if needed
        const filePath = path.resolve(distDir, entry.filename);
        const fileDir = path.dirname(filePath);
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir, { recursive: true });
        }

        // Write HTML file
        fs.writeFileSync(filePath, html);
        console.log(`✓ Generated ${entry.filename}`);
      } catch (err) {
        console.error(`✗ Error generating ${entry.filename}:`, err);
      }
    }

    console.log("\n✓ Static site generation complete!");
  } catch (err) {
    console.error("✗ Prerender failed:", err);
    process.exit(1);
  }
};

// Run prerender
prerender();
