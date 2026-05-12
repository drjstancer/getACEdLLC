import InstitutionalCTA from './InstitutionalCTA'

export default function CTASection() {
  return (
    <section className="py-36 bg-[#070707] text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-10">
          Let’s Build Together
        </p>

        <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-[-0.02em] mb-12 text-white max-w-5xl mx-auto">
          Educational excellence rooted in leadership, culture, and community.
        </h2>

        <p className="text-xl text-[#D8D3CA] leading-[1.9] mb-14 max-w-3xl mx-auto">
          Partner with get ACEd, LLC for institutional strategy,
          professional development, educational pathway design, Adult Mental
          Health First Aid training, and transformational speaking engagements.
        </p>

        <InstitutionalCTA>
          Begin a Partnership Conversation
        </InstitutionalCTA>
      </div>
    </section>
  )
}
