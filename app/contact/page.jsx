export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-24 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
          Institutional Partnership Inquiry
        </p>

        <h1 className="text-5xl md:text-7xl leading-[0.95] mb-10 font-serif max-w-5xl">
          Let’s build transformational educational environments together.
        </h1>

        <p className="text-xl text-[#D8D3CA] leading-relaxed max-w-3xl mb-20">
          get ACEd, LLC partners with universities, pathway initiatives,
          educational organizations, leadership programs, conferences,
          nonprofits, and community-centered institutions seeking meaningful
          transformational impact.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="border border-white/10 bg-white/[0.03] p-10">
            <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-6">
              Partnership Areas
            </p>

            <div className="space-y-5 text-lg text-[#D8D3CA] leading-relaxed">
              <p>• Institutional Strategy</p>
              <p>• Leadership Development</p>
              <p>• Educational Pathway Design</p>
              <p>• Speaking & Facilitation</p>
              <p>• Adult Mental Health First Aid Training</p>
              <p>• Student Success & Mentorship</p>
            </div>
          </div>

          <form className="border border-white/10 bg-white/[0.03] p-10 space-y-6">
            <div>
              <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-3">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-black/30 border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C8A96B]"
              />
            </div>

            <div>
              <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-3">
                Organization
              </label>
              <input
                type="text"
                className="w-full bg-black/30 border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C8A96B]"
              />
            </div>

            <div>
              <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-3">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black/30 border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C8A96B]"
              />
            </div>

            <div>
              <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-3">
                Partnership Goals
              </label>
              <textarea
                rows="6"
                className="w-full bg-black/30 border border-white/10 px-4 py-4 text-white outline-none focus:border-[#C8A96B]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#C8A96B] text-black px-8 py-5 uppercase tracking-[0.18em] text-sm hover:bg-[#d7b980] transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
