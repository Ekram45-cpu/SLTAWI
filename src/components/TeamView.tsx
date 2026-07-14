import { useState } from 'react';
import { teamData } from '../data/agencyData';
import { TeamMember } from '../types';
import { Quote, Sparkles, Linkedin, Award, Users } from 'lucide-react';

export default function TeamView() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeBio, setActiveBio] = useState<TeamMember | null>(teamData[0]);

  const departments = ['All', 'Leadership', 'Marketing', 'Development', 'Design', 'Content'];

  const filteredTeam = selectedDept === 'All'
    ? teamData
    : teamData.filter((member) => member.department === selectedDept);

  return (
    <div id="team-view" className="space-y-20 pt-32 pb-20">
      {/* HEADER */}
      <section id="team-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <h2 className="text-xs font-bold tracking-widest text-orange-500 uppercase">Meet the Experts</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
          Our High-Performance Team
        </h1>
        <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base">
          A cohesive blend of technical software engineers, data-driven performance marketers, visual designers, and creative copywriters dedicated to your compound growth.
        </p>
      </section>

      {/* FILTER TABS */}
      <section id="team-filters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => {
                setSelectedDept(dept);
                // Reset active bio to first element in filtered team if available
                const filtered = dept === 'All' ? teamData : teamData.filter((m) => m.department === dept);
                if (filtered.length > 0) setActiveBio(filtered[0]);
              }}
              className={`px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedDept === dept
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-100 hover:border-slate-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT: MEMBERS DIRECTORY & BIO BOARD */}
      <section id="team-board" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Members List (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-sans font-bold text-lg text-slate-950 border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            Team Directory ({filteredTeam.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTeam.map((member) => {
              const isActive = activeBio?.id === member.id;
              return (
                <div
                  key={member.id}
                  id={`team-member-${member.id}`}
                  onClick={() => setActiveBio(member)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-102'
                      : 'bg-white text-slate-800 border-slate-100 hover:border-slate-200 hover:scale-101'
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-inner"
                  />
                  <div className="space-y-1.5 min-w-0">
                    <h4 className="font-bold text-sm tracking-tight truncate">{member.name}</h4>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-orange-400' : 'text-orange-600'}`}>
                      {member.role}
                    </p>
                    <p className={`text-[11px] uppercase ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                      {member.department}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Member Bio Board (Col span 5) */}
        <div className="lg:col-span-5">
          {activeBio ? (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm sticky top-24">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img
                  src={activeBio.image}
                  alt={activeBio.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-950">
                    {activeBio.name}
                  </h3>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-2 bg-slate-900 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full transition-all"
                  >
                    <Linkedin className="w-4.5 h-4.5" />
                  </a>
                </div>

                <div className="flex gap-2">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {activeBio.role}
                  </span>
                  <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {activeBio.department}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4.5 text-slate-600 text-sm leading-relaxed relative">
                  <Quote className="absolute -top-3.5 -left-1 w-8 h-8 text-orange-500/10 -z-10" />
                  <p className="italic font-medium">"{activeBio.bio}"</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4.5 flex gap-3 text-xs font-bold text-slate-500 uppercase tracking-wide">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>Senior Advisor</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Addis Ababa, ET</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-500 h-full flex flex-col justify-center items-center">
              <p>Select a creative expert to view their detailed professional bio.</p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
