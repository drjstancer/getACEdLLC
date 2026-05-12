export default function InsightsPage() {
  const insights = [
    {
      title: 'Care-Centered Educational Leadership',
      category: 'Leadership',
    },
    {
      title: 'Transformational Pathways & Student Success',
      category: 'Educational Strategy',
    },
    {
      title: 'Community, Culture, & Institutional Belonging',
      category: 'Institutional Culture',
    },
    {
      title: 'Mentorship as Educational Infrastructure',
      category: 'Mentorship',
    },
  ]

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#111111] px-6 py-24 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-8">
          Insights & Thought Leadership
        </p>

        <h1 className="text-5xl md:text-7xl leading-[0.95] mb-12 font-serif max-w-6xl">
          Reflections on transformational educational leadership, culture, mentorship, and institutional excellence.
        </h1>

        <p className="text-xl leading-relaxed text-[#333333] max-w-4xl mb-24">
          A developing collection of educational insights, leadership reflections, frameworks, and transformational strategies centered on cultivating environments where people and communities thrive.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.title}
              className="bg-white p-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <p className="uppercase tracking-[0.18em] text-xs text-[#9C7A3C] mb-6">
                {insight.category}
              </p>

              <h2 className="text-3xl font-serif leading-tight mb-6">
                {insight.title}
              </h2>

              <p className="text-[#444444] leading-relaxed mb-8">
                Educational reflections and strategic insights focused on transformational institutional impact.
              </p>

              <span className="uppercase tracking-[0.18em] text-xs text-[#9C7A3C]">
                Coming Soon
              </span>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
