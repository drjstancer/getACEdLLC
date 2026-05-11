export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F2EB] flex items-center justify-center px-6 text-center">
      <div className="max-w-4xl">
        <p className="uppercase tracking-[0.4em] text-[#C8A96B] text-xs md:text-sm mb-6">
          Achieving Community through Education Consulting
        </p>

        <h1 className="text-5xl md:text-7xl leading-[0.95] mb-8 font-serif">
          Building Access.
          <br />
          Cultivating Excellence.
          <br />
          Transforming Communities.
        </h1>

        <p className="text-lg md:text-2xl text-[#D8D3CA] leading-relaxed mb-10">
          Strategic educational consulting, professional development,
          program design, and transformational leadership rooted in culture,
          care, and community.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@getacedllc.com"
            className="bg-[#C8A96B] text-black px-8 py-4 rounded-full uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all"
          >
            Start the Conversation
          </a>

          <a
            href="https://www.getacedllc.com"
            className="border border-white/20 px-8 py-4 rounded-full uppercase tracking-[0.18em] text-sm hover:bg-white hover:text-black transition-all"
          >
            Visit Website
          </a>
        </div>
      </div>
    </main>
  )
}
