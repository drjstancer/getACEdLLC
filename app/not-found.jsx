export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070707] text-[#F5F2EB] flex items-center justify-center px-6 text-center">
      <div className="max-w-3xl">
        <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
          Page Not Found
        </p>

        <h1 className="text-6xl md:text-8xl font-serif leading-[0.92] mb-10">
          The page you’re looking for does not exist.
        </h1>

        <p className="text-xl text-[#D8D3CA] leading-relaxed mb-12">
          Continue exploring the transformational educational leadership platform of get ACEd, LLC.
        </p>

        <a
          href="/"
          className="inline-block bg-[#C8A96B] text-black px-8 py-5 uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all duration-300"
        >
          Return Home
        </a>
      </div>
    </main>
  )
}
