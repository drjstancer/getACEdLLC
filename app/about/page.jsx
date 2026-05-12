export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#111111] px-6 py-24 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[0.35em] text-[#9C7A3C] text-xs mb-8">
          About Dr. Joel Stancer
        </p>

        <h1 className="text-5xl md:text-7xl leading-[0.95] mb-12 font-serif max-w-5xl">
          Transformational educational leadership rooted in culture, community, and care-centered excellence.
        </h1>

        <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
          <div>
            <p className="text-xl leading-relaxed text-[#333333] mb-8">
              Dr. Joel Stancer is an educator, strategist, speaker, mentor, and transformational leader whose work centers educational environments where people can thrive academically, emotionally, professionally, and personally.
            </p>

            <p className="text-xl leading-relaxed text-[#333333] mb-8">
              Through get ACEd, LLC, he partners with universities, pathway programs, educational organizations, leadership initiatives, and community institutions to strengthen culture, leadership, mentorship ecosystems, and pathways to opportunity.
            </p>

            <p className="text-xl leading-relaxed text-[#333333]">
              His philosophy is grounded in the belief that transformational educational environments are built when institutions intentionally cultivate belonging, care, access, leadership, and excellence.
            </p>
          </div>

          <div className="bg-white p-12 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <p className="uppercase tracking-[0.18em] text-xs text-[#9C7A3C] mb-6">
              Leadership Philosophy
            </p>

            <p className="text-3xl leading-relaxed font-serif mb-8">
              Educational transformation happens when institutions invest in people, remove barriers, cultivate belonging, and lead with intentional care.
            </p>

            <p className="text-[#555555] leading-relaxed">
              Dr. Joel Stancer’s work exists at the intersection of leadership, mentorship, educational systems, culture, and community-centered excellence.
            </p>
          </div>
        </div>

        <div className="border-t border-black/10 pt-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-10">
            Areas of Focus
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed text-[#333333]">
            <div>
              <p className="mb-5">• Transformational Educational Leadership</p>
              <p className="mb-5">• Mentorship & Student Success</p>
              <p className="mb-5">• Educational Pathway Development</p>
              <p className="mb-5">• Community-Centered Excellence</p>
            </div>

            <div>
              <p className="mb-5">• Leadership Development</p>
              <p className="mb-5">• Mental Health & Educational Environments</p>
              <p className="mb-5">• Institutional Culture & Belonging</p>
              <p className="mb-5">• Strategic Educational Partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
