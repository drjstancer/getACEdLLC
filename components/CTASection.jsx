export default function CTASection() {
  return (
    <section className="py-32 bg-[#070707] text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
          Let’s Build Together
        </p>

        <h2 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-10 text-white">
          Educational excellence rooted in leadership, culture, and community.
        </h2>

        <p className="text-xl text-[#D8D3CA] leading-relaxed mb-12">
          Partner with get ACEd, LLC for institutional strategy,
          professional development, educational pathway design, Adult Mental
          Health First Aid training, and transformational speaking engagements.
        </p>

        <a
          href="/contact"
          className="bg-[#C8A96B] text-black px-10 py-5 uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all duration-300 inline-block"
        >
          Begin a Partnership Conversation
        </a>
      </div>
    </section>
  )
}
