import SiteLayout from '../../components/SiteLayout'

export const metadata = {
  title: 'Adult Mental Health First Aid Training',
  description:
    'Explore Adult Mental Health First Aid training with get ACEd, LLC and access upcoming course registration.',
}

const registrationUrl = 'https://ace-mhfa-registration.drj-stancer.chatgpt.site/'

export default function TrainingPage() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB]">
        <section className="relative overflow-hidden border-b border-white/10 px-6 py-24 md:py-32 lg:px-12">
          <div className="absolute right-[-12rem] top-[-16rem] h-[38rem] w-[38rem] rounded-full bg-[#C8A96B]/[0.07] blur-[100px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <p className="mb-9 text-xs uppercase tracking-[0.32em] text-[#C8A96B]">
              Professional Learning &amp; Community Care
            </p>
            <h1 className="max-w-5xl font-serif text-5xl leading-[1.02] tracking-[-0.02em] text-white md:text-7xl lg:text-8xl">
              Adult Mental Health First Aid
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-[1.9] text-[#D8D3CA] md:text-2xl">
              Practical training for recognizing, understanding, and responding
              to signs and symptoms of mental health and substance use challenges in adults.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href={registrationUrl}
                className="inline-flex min-h-14 items-center justify-center bg-[#C8A96B] px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#E9D2A0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9D2A0]"
              >
                View Dates &amp; Register
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center border border-white/25 px-8 py-4 text-sm uppercase tracking-[0.14em] text-[#F5F2EB] transition-colors hover:border-[#C8A96B] hover:text-[#E9D2A0]"
              >
                Request Group Training
              </a>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#AFA89D]">
              Course availability and registration are provided through our dedicated registration portal.
            </p>
          </div>
        </section>

        <section className="bg-[#F5F2EB] px-6 py-24 text-[#151515] lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="mb-7 text-xs uppercase tracking-[0.3em] text-[#8C6F3C]">A learnable approach to care</p>
              <h2 className="font-serif text-4xl leading-tight md:text-6xl">
                Be prepared to respond with confidence and compassion.
              </h2>
            </div>
            <div className="space-y-8 text-lg leading-[1.9] text-[#3A3834]">
              <p>
                Adult Mental Health First Aid teaches participants how to identify,
                understand, and respond when adults may be experiencing mental
                health or substance use challenges.
              </p>
              <p>
                The course is relevant for educators, student services teams,
                community organizations, workplace leaders, and individuals who
                want to strengthen their capacity to support others.
              </p>
              <p>
                Sessions are facilitated through Achieving Community through Education (ACE) Consulting,
                a DBA of get ACEd, LLC.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0B0B0B] px-6 py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="border-t border-[#C8A96B]/50 pt-8">
              <p className="mb-6 text-xs uppercase tracking-[0.24em] text-[#C8A96B]">
                Individuals &amp; Open Sessions
              </p>
              <h2 className="mb-6 font-serif text-4xl text-white">Find a course that fits.</h2>
              <p className="mb-9 text-lg leading-relaxed text-[#D8D3CA]">
                Explore currently listed sessions and complete registration through the training portal.
              </p>
              <a
                href={registrationUrl}
                className="inline-flex items-center border-b border-[#C8A96B] pb-2 text-sm uppercase tracking-[0.16em] text-[#E9D2A0] hover:text-white"
              >
                Check Sessions &amp; Register
              </a>
            </div>
            <div className="border-t border-[#C8A96B]/50 pt-8">
              <p className="mb-6 text-xs uppercase tracking-[0.24em] text-[#C8A96B]">
                Organizations &amp; Teams
              </p>
              <h2 className="mb-6 font-serif text-4xl text-white">Bring training to your team.</h2>
              <p className="mb-9 text-lg leading-relaxed text-[#D8D3CA]">
                Discuss a session for your department, campus, organization, or community group.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center border-b border-[#C8A96B] pb-2 text-sm uppercase tracking-[0.16em] text-[#E9D2A0] hover:text-white"
              >
                Inquire About Group Training
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
