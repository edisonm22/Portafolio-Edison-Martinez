import { useState } from 'react'
import CVHero from './CVHero.jsx'
import CVAbout from './CVAbout.jsx'
import CVExperience from './CVExperience.jsx'
import CVSkills from './CVSkills.jsx'
import CVProjects from './CVProjects.jsx'
import CVEducation from './CVEducation.jsx'
import CVContact from './CVContact.jsx'

export default function CVLayout({ cvData }) {
  const [activeTab, setActiveTab] = useState('resume')
  const { personal, summary, experience, skills, projects, education } = cvData

  return (
    <section id="cv" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-[#f1f5f9] mb-4">
          Currículum
        </h2>
        <div className="w-20 h-1 bg-[#0ea5e9] rounded-full mx-auto mb-8" />

        {/* Tabs */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'resume'
                ? 'bg-[#0ea5e9] text-black shadow-[0_4px_14px_rgba(14,165,233,0.3)]'
                : 'bg-[#1e293b] border border-[#2d3a4f] text-[#94a3b8] hover:border-[#0ea5e9] hover:text-[#0ea5e9]'
            }`}
          >
            Curriculum Vitae
          </button>
          <a
            href="#"
            className="px-6 py-3 rounded-xl font-semibold bg-[#1e293b] border border-[#2d3a4f] text-[#94a3b8] hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-all"
          >
            Descargar PDF
          </a>
        </div>
      </div>

      <div className="cv-inner bg-[#0a0f1a] border border-[#2d3a4f] rounded-3xl overflow-hidden">
        {/* Sidebar */}
        <aside className="cv-sidebar">
          <CVHero data={personal} />
          <CVSkills data={skills} />
          <CVContact data={personal} />
        </aside>

        {/* Main */}
        <main className="cv-main">
          <CVAbout summary={summary} />
          <CVExperience data={experience} />
          <CVProjects data={projects} />
          <CVEducation data={education} />
        </main>
      </div>
    </section>
  )
}
