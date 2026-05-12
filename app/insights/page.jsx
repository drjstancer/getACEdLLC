import SiteLayout from '../../components/SiteLayout'
import EditorialCard from '../../components/EditorialCard'

const featuredArticles = [
  {
    category: 'Leadership',
    title: 'Care-Centered Educational Leadership',
    description:
      'Transformational educational environments emerge when institutions intentionally cultivate belonging, mentorship, leadership, care, and community-rooted excellence.',
    href: '/insights/care-centered-educational-leadership',
  },
  {
    category: 'Mentorship',
    title: 'Mentorship as Institutional Infrastructure',
    description:
      'Mentorship should not operate as an isolated initiative. Sustainable mentorship ecosystems must be embedded within institutional culture and leadership structures.',
    href: '#',
  },
  {
    category: 'Educational Strategy',
    title: 'Building Transformational Pathway Ecosystems',
    description:
      'Educational pathways become transformational when institutions intentionally align mentorship, leadership, access, culture, and opportunity.',
    href: '#',
  },
]

export default function InsightsPage() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-28 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mb-28">
            <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-10">
              Insights & Thought Leadership
            </p>

            <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-[-0.02em] mb-12 max-w-6xl">
              Editorial reflections on transformational educational leadership,
              mentorship, institutional culture, and community-centered
              excellence.
            </h1>

            <p className="text-xl text-[#D8D3CA] leading-[1.9] max-w-4xl">
              The insights ecosystem exists to explore the philosophies,
              frameworks, leadership practices, and transformational approaches
              shaping educational environments where people can thrive.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {featuredArticles.map((article) => (
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
      </main>
    </SiteLayout>
  )
}
