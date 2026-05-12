import SiteLayout from '../../components/SiteLayout'
import InstitutionalCTA from '../../components/InstitutionalCTA'

export default function ContactPage() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-24 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-[#C8A96B] text-xs mb-8">
            Institutional Partnership Inquiry
          </p>

          <h1 className="text-5xl md:text-7xl leading-[0.95] mb-10 font-serif max-w-5xl tracking-[-0.02em]">
            Let’s build transformational educational environments together.
          </h1>

          <p className="text-xl text-[#D8D3CA] leading-[1.9] max-w-3xl mb-20">
            get ACEd, LLC partners with universities, pathway initiatives,
            educational organizations, leadership programs, conferences,
            nonprofits, and community-centered institutions seeking meaningful
            transformational impact.
          </p>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="border border-white/10 bg-white/[0.03] p-12">
              <p className="uppercase tracking-[0.18em] text-sm text-[#C8A96B] mb-8">
                Partnership Areas
              </p>

              <div className="space-y-6 text-lg text-[#D8D3CA] leading-[1.9]">
                <p>• Institutional Strategy</p>
                <p>• Leadership Development</p>
                <p>• Educational Pathway Design</p>
                <p>• Speaking & Facilitation</p>
                <p>• Adult Mental Health First Aid Training</p>
                <p>• Student Success & Mentorship</p>
              </div>
            </div>

            <form className="border border-white/10 bg-white/[0.03] p-12 space-y-8">
              <div>
                <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
                  Organization
                </label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
                />
              </div>

              <div>
                <label className="block uppercase tracking-[0.18em] text-xs text-[#C8A96B] mb-4">
                  Partnership Goals
                </label>
                <textarea
                  rows="6"
                  className="w-full bg-black/30 border border-white/10 px-5 py-5 text-white outline-none focus:border-[#C8A96B] transition-all duration-300"
                />
              </div>

              <InstitutionalCTA href="#">
                Submit Inquiry
              </InstitutionalCTA>
            </form>
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
