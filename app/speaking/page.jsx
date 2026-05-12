import SiteLayout from '../../components/SiteLayout'

export default function SpeakingPage() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-24 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
            Speaking & Thought Leadership
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.95] mb-10 font-serif max-w-5xl">
            Conversations that transform educational environments.
          </h1>

          <p className="text-xl text-[#D8D3CA] leading-relaxed max-w-3xl mb-20">
            Dr. Joel Stancer speaks on transformational educational leadership,
            mentorship, pathway development, care-centered excellence, student
            success, mental health, and community-rooted institutional culture.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {[
              'Transformational Educational Leadership',
              'Care-Centered Excellence',
              'Leadership, Culture, & Community',
              'Building Pathways to Opportunity',
              'Mental Health & Educational Environments',
              'Mentorship & Student Success',
            ].map((topic) => (
              <div
                key={topic}
                className="border border-white/10 bg-white/[0.03] p-10 hover:border-[#C8A96B]/40 transition-all duration-500"
              >
                <h2 className="text-3xl font-serif mb-4">{topic}</h2>
                <p className="text-[#CFCFCF] leading-relaxed">
                  Thoughtful, practical, and transformational conversations designed to move people and institutions forward.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
