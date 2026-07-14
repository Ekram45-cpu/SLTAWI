import { useState } from 'react';
import { portfolioData } from '../data/agencyData';
import { PortfolioProject } from '../types';
import { X, Calendar, User, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';

interface PortfolioViewProps {
  setActiveTab: (tab: string) => void;
}

export default function PortfolioView({ setActiveTab }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', 'Branding & Design', 'Website Development', 'Digital Marketing', 'SEO Services', 'Content Creation'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData
    : portfolioData.filter((p) => p.category === selectedCategory);

  return (
    <div id="portfolio-view" className="space-y-20 pt-32 pb-20">
      {/* HEADER */}
      <section id="portfolio-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Case Studies</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
          Proven Success Stories
        </h1>
        <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base">
          Browse through our verified portfolio of projects. Click on any card to examine the detailed challenges, structural solutions, and final metrics achieved.
        </p>
      </section>

      {/* FILTER TABS */}
      <section id="portfolio-filters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id="portfolio-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No projects found in this category. We are constantly expanding our showcase!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex justify-between items-center text-xs font-bold text-orange-600 group-hover:text-orange-700">
                  <span>View Case Study</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CASE STUDY MODAL */}
      {selectedProject && (
        <div id="case-study-modal" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in relative flex flex-col">
            
            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-orange-500 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {selectedProject.category}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold font-sans leading-tight">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
              
              {/* Client and Date Metadata Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-xs text-slate-500">Client Partner</div>
                    <div className="font-bold text-slate-900">{selectedProject.client}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-xs text-slate-500">Completed Date</div>
                    <div className="font-bold text-slate-900">{selectedProject.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-xs text-slate-500">Key Outcome</div>
                    <div className="font-bold text-slate-900">High Growth</div>
                  </div>
                </div>
              </div>

              {/* Challenge / Solution / Impact Sections */}
              <div className="space-y-6">
                <div className="space-y-2 bg-slate-50 p-5 rounded-xl border-l-4 border-orange-500">
                  <h4 className="font-bold text-slate-950 text-base sm:text-lg flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-orange-500" /> The Business Challenge
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="space-y-2 bg-slate-50 p-5 rounded-xl border-l-4 border-slate-900">
                  <h4 className="font-bold text-slate-950 text-base sm:text-lg flex items-center gap-2">
                    <CheckCircle className="w-4.5 h-4.5 text-slate-900" /> Our Strategic Solution
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                <div className="space-y-2 bg-orange-50 p-5 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-950 text-base sm:text-lg flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-orange-600" /> Measured Business Impact
                  </h4>
                  <p className="text-orange-950 font-medium text-xs sm:text-sm leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
              </div>

              {/* Closing / Call to action */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Do you want to achieve similar exponential results for your enterprise?
                </p>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveTab('contact');
                  }}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-1.5"
                >
                  Contact Senior Advisors
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
