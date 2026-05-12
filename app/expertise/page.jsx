import SiteLayout from '../../components/SiteLayout'

export default function ExpertisePage() {
  const expertiseAreas = [
    {
      title: 'Institutional Strategy',
      description:
        'Strategic guidance for educational institutions seeking transformational culture, stronger systems, and sustainable student success outcomes.',
    },
    {
      title: 'Leadership Development',
      description:
        'Professional development experiences focused on leadership cultivation, communication, mentorship, and community-centered excellence.',
    },
    {
      title: 'Program & Pathway Design',
      description:
        'Development of educational pathways, mentoring ecosystems, student success initiatives, and transformational learning environments.',
    },
    {
      title: 'Mental Health & Community Care',
      description:
        'Adult Mental Health First Aid training and educational wellness strategies that strengthen healthier institutional communities.',
    },
    {
      title: 'Student Success & Mentorship',
      description:
        'High-impact mentoring systems and educational support structures that cultivate belonging, persistence, leadership, and achievement.',
    },
    {
      title: 'Speaking & Facilitation',
      description:
        'Thought-provoking speaking engagements and facilitated conversations designed to inspire transformational educational leadership.',
    },
  ]

  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-24 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
            Institutional Expertise
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.95] mb-12 font-serif max-w-6xl">
            Strategic partnership for transformational educational impact.
          </h1>

          <p className="text-xl text-[#D8D3CA] leading-relaxed max-w-4xl mb-24">
            get ACEd, LLC partners with institutions, educational leaders,
            pathway initiatives, and organizations seeking thoughtful,
            sustainable, and transformational approaches to leadership,
            mentorship, educational culture, and student success.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-28">
            {expertiseAreas.map((area) => (
              <div
                key={area.title}
                className="border border-white/10 bg-white/[0.03] p-12 hover:border-[#C8A96B]/40 transition-all duration-500"
              >
                <h2 className="text-3xl font-serif mb-6 text-white">
                  {area.title}
                </h2>

                <p className="text-[#CFCFCF] leading-relaxed text-lg">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
