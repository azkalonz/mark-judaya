import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import projects from "../data/projects";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

const featuredProjects = projects.filter((project) => project.featured);

const Home: React.FC = () => {
  return (
    <>
      <Seo
        title="Mark Judaya – Full Stack Developer & CRM Automation Specialist"
        description="Full stack developer specializing in CRM systems, automations, and modern web applications. View projects and get in touch."
        ogTitle="Mark Judaya – Full Stack Developer"
        ogDescription="I build modern web apps, CRM automations, and integrations that scale."
      />
      <section className="relative py-16">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-grid" />
        </div>
        <div className="relative min-h-[70vh] flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <p className="block sm:hidden text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Mark Judaya
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl font-semibold text-slate-900 dark:text-slate-100">
              Turning complex workflows into simple, automated systems.
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl font-medium bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                CRM & Automation Specialist
              </span>
              <span className="sparkle text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2 14.5 8.5 21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
                </svg>
              </span>
            </div>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              I help teams ship polished web apps and automate CRM workflows that scale — integrations, pipelines, and
              reliable systems.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-shadow shadow-sm"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mt-12">
            <h3 className="text-lg font-medium">Featured work</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
