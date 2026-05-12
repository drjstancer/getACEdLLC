import SiteLayout from '../components/SiteLayout'
import InstitutionalCTA from '../components/InstitutionalCTA'
import EditorialCard from '../components/EditorialCard'

const impactMetrics = [
  {
    number: '100+',
    label: 'Students & Emerging Leaders Mentored',
  },
  {
    number: 'Multiple',
    label: 'Educational & Pathway Initiatives Developed',
  },
  {
    number: 'National',
    label: 'Conference & Leadership Engagement Reach',
  },
  {
    number: '10+',
    label: 'Years of Educational Leadership Experience',
  },
]

const editorialHighlights = [
  {
    category: 'Leadership',
    title: 'Care-Centered Educational Leadership',
    description:
      'Transformational educational environments emerge when institutions intentionally cultivate belonging, mentorship, leadership, care, and community-rooted excellence.',
    href: '/insights/care-centered-educational-leadership',
  },
  {
    category: 'Educational Strategy',
    title: 'Building Transformational Pathway Ecosystems',
    description:
      'Educational pathways become transformational when institutions intentionally align mentorship, leadership, access, culture, and opportunity.',
    href: '/insights',
  },
]

export default function HomePage() {
  return (
    <SiteLayout>
      <main className="bg-[#070707] text-[#F5F2EB] overflow-x-hidden">
        <section className="relative min-h-screen overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img
              src="/hero-drj.png"
              alt="Dr. Joel Stancer"
              className="w-full h-full object-cover object-center opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24">
            <div className="max-w-4xl">
              <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs md:text-sm mb-10">
                Transformational Educational Leadership
              </p>

              <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-[-0.03em] font-serif mb-12 text-white max-w-6xl">
                Building educational environments where people and communities thrive.
              </h1>

              <p className="text-xl md:text-2xl text-[#DDD6CA] leading-[1.9] max-w-3xl mb-14">
                get ACEd, LLC partners with institutions, pathway initiatives,
                educational leaders, and community organizations to strengthen
                leadership, cultivate transformational educational ecosystems,
                and create sustainable pathways to excellence.
              </p>

              <div className="flex flex-wrap gap-6">
                <InstitutionalCTA href="/contact">
                  Begin a Partnership Conversation
                </InstitutionalCTA>

                <a
                  href="/insights"
                  className="border border-white/20 px-10 py-5 uppercase tracking-[0.18em] text-sm hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center justify-center"
                >
                  Explore Insights
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 border-t border-white/10 border-b border-white/10 bg-[#0B0B0B]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 xl:grid-cols-4 gap-12">
            {impactMetrics.map((item) => (
              <div key={item.label} className="border-t border-[#C8A96B]/20 pt-8">
                <p className="text-5xl md:text-6xl font-serif text-[#E9D2A0] mb-6">
                  {item.number}
                </p>

                <p className="text-[#D8D3CA] text-lg leading-[1.9] max-w-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-36 bg-[#F5F2EB] text-[#111111]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-10">
                Institutional Philosophy
              </p>

              <h2 className="text-5xl md:text-7xl font-serif leading-[0.98] tracking-[-0.02em] mb-12 max-w-4xl">
                Educational transformation rooted in culture, leadership, mentorship, and care.
              </h2>
            </div>

            <div>
              <p className="text-2xl leading-[1.9] text-[#333333] mb-10">
                Through get ACEd, LLC, Dr. Joel Stancer partners with institutions to cultivate environments where students, educators, leaders, and communities experience meaningful transformation.
              </p>

              <p className="text-xl leading-[1.9] text-[#555555] mb-14">
                The work centers transformational educational ecosystems grounded in belonging, leadership development, mentorship, pathway cultivation, institutional strategy, and community-rooted excellence.
              </p>

              <InstitutionalCTA href="/about">
                Learn More About the Mission
              </InstitutionalCTA>
            </div>
          </div>
        </section>

        <section className="py-36 bg-[#070707]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mb-24">
              <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-10">
                Insights & Thought Leadership
              </p>

              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-[-0.02em] mb-12 max-w-6xl text-white">
                Editorial reflections on leadership, mentorship, institutional culture, and educational transformation.
              </h2>

              <p className="text-xl text-[#D8D3CA] leading-[1.9] max-w-4xl">
                The insights ecosystem explores transformational educational leadership, community-rooted excellence, pathway development, mentorship infrastructures, and institutional strategy.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {editorialHighlights.map((article) => (
                <EditorialCard
                  key={article.title}
                  category={article.category}
                  title={article.title}
                  description={article.description}
                  href={article.href}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
