export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-12 items-start">
        <div>
          <p className="text-[#C8A96B] uppercase tracking-[0.35em] text-xs mb-4">
            get ACEd, LLC
          </p>

          <h3 className="text-3xl font-serif mb-6 text-white">
            Achieving Community through Education Consulting
          </h3>

          <p className="text-[#CFCFCF] leading-relaxed">
            Transformational educational leadership rooted in mentorship,
            institutional culture, pathway development, and community-centered
            excellence.
          </p>
        </div>

        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-6">
            Navigation
          </p>

          <div className="space-y-4 text-[#D8D3CA]">
            <a href="/about" className="block hover:text-white transition-colors duration-300">
              About
            </a>

            <a href="/expertise" className="block hover:text-white transition-colors duration-300">
              Expertise
            </a>

            <a href="/speaking" className="block hover:text-white transition-colors duration-300">
              Speaking
            </a>

            <a href="/insights" className="block hover:text-white transition-colors duration-300">
              Insights
            </a>
          </div>
        </div>

        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-6">
            Connect
          </p>

          <div className="space-y-4 text-[#D8D3CA] leading-relaxed">
            <p>Columbia, Missouri</p>
            <p>hello@getacedllc.com</p>
            <p>Institutional Consulting & Thought Leadership</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
