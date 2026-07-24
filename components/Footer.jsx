import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-16 items-start">
        <div>
          <Image
            src="/brand/logos/getaced-stacked-white.png"
            alt="get ACEd, LLC"
            width={240}
            height={180}
            className="w-[180px] md:w-[220px] h-auto mb-10"
          />

          <p className="text-[#CFCFCF] leading-[1.9] max-w-md text-[1.02rem]">
            Transformational educational leadership rooted in mentorship,
            institutional culture, pathway development, and community-centered excellence.
          </p>
        </div>

        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-8">
            Navigation
          </p>

          <div className="space-y-5 text-[#D8D3CA] text-[1.02rem] leading-relaxed">
            <a href="/about" className="block hover:text-white transition-colors duration-300">About</a>
            <a href="/expertise" className="block hover:text-white transition-colors duration-300">Expertise</a>
            <a href="/speaking" className="block hover:text-white transition-colors duration-300">Speaking</a>
            <a href="/insights" className="block hover:text-white transition-colors duration-300">Insights</a>
          </div>
        </div>

        <div>
          <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-8">
            Connect
          </p>

          <div className="space-y-5 text-[#D8D3CA] leading-[1.9] text-[1.02rem]">
            <p>Columbia, Missouri</p>
            <div>
              <p className="text-[#C8A96B]">Booking &amp; Partnership Inquiries</p>
              <a
                href="mailto:booking@getacedllc.com"
                className="hover:text-white transition-colors duration-300"
              >
                booking@getacedllc.com
              </a>
            </div>
            <p>Institutional Consulting &amp; Thought Leadership</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
