import FamilyGatheringRegistrationForm from '../../components/FamilyGatheringRegistrationFormSquare'
import FamilyGatheringSquareTest from '../../components/FamilyGatheringSquareTest'

export const metadata = {
  title: 'The Family Gathering 2026 Registration',
  description:
    'Register for The Family Gathering on Thanksgiving Day, Thursday, November 26, 2026, at the National Guard Armory in Aliceville, Alabama.',
}

const eventDetails = [
  ['Location', 'National Guard Armory', 'Aliceville, Alabama'],
  ['Date', 'Thursday, November 26, 2026', 'Thanksgiving Day'],
  [
    'Registration',
    '$50/$25 cash or money order',
    '$52/$26.50 CashApp or Pay Online',
  ],
]

export default function FamilyGatheringPage({ searchParams }) {
  const isPaymentTest = searchParams?.paymentTest === '1'

  if (isPaymentTest) {
    return (
      <main className="min-h-screen bg-[#F2E3C8] px-4 py-10 sm:px-8 lg:px-10">
        <FamilyGatheringSquareTest />
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F2E3C8] text-[#4B2818]">
      <section className="relative isolate px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,_#F7ECD8_0%,_#F1E0C2_55%,_#EBD5B1_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-[linear-gradient(180deg,_rgba(196,109,31,0.12),_transparent)]" />
        <div className="absolute left-0 top-0 -z-10 h-56 w-56 rounded-full bg-[#C56C2B]/10 blur-3xl" />
        <div className="absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-[#8C7B48]/10 blur-3xl" />
        <div className="absolute bottom-0 left-20 -z-10 h-72 w-72 rounded-full bg-[#B56425]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl border border-[#D7B988] bg-[#F7ECD8] shadow-[0_24px_60px_rgba(92,52,25,0.12)]">
          <div className="m-3 border border-[#E6CC9F] bg-[linear-gradient(180deg,_rgba(255,250,240,0.5),_rgba(255,250,240,0.15))] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
            <header className="text-center">
              <div className="mx-auto mb-5 flex max-w-max items-center gap-3 text-[#B56425]">
                <span className="h-px w-12 bg-[#C9894B]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em]">
                  Hill / Broom Family
                </p>
                <span className="h-px w-12 bg-[#C9894B]" />
              </div>

              <p className="font-serif text-4xl italic text-[#4F2A18] sm:text-5xl">
                The
              </p>
              <h1 className="mt-1 font-serif text-6xl font-black uppercase leading-none tracking-[0.02em] text-[#4F2A18] sm:text-7xl lg:text-8xl">
                Family
              </h1>
              <p className="mt-2 font-serif text-5xl italic leading-none text-[#C0601F] sm:text-6xl lg:text-7xl">
                Gathering
              </p>

              <div className="mx-auto mt-7 flex max-w-3xl items-center gap-4 text-[#B56425]">
                <span className="hidden h-px flex-1 bg-[#C9894B] sm:block" />
                <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#6A4129] sm:text-base">
                  A Time to Connect. A Tradition to Continue.
                </p>
                <span className="hidden h-px flex-1 bg-[#C9894B] sm:block" />
              </div>

              <p className="mx-auto mt-7 max-w-4xl text-lg leading-8 text-[#6A4129] sm:text-xl">
                One family. Many branches. Stronger together. Register your
                household for a Thanksgiving celebration centered on connection,
                fellowship, and family tradition.
              </p>
            </header>

            <section className="mt-12 grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
              <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {eventDetails.map(([label, primary, secondary]) => (
                  <div
                    key={label}
                    className="border border-[#D7B988] bg-[#FFF8EC] p-6 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B56425]">
                      {label}
                    </p>
                    <p className="mt-3 font-serif text-3xl leading-tight text-[#4B2818]">
                      {primary}
                    </p>
                    <p className="mt-2 text-base leading-7 text-[#7D5E46]">
                      {secondary}
                    </p>
                  </div>
                ))}
              </div>

              <aside className="border border-[#D7B988] bg-[#FFF8EC] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B56425]">
                  Event Notes
                </p>

                <div className="mt-6 space-y-5 text-[#6A4129]">
                  <div className="border-b border-[#E6CC9F] pb-5">
                    <p className="font-serif text-2xl text-[#4B2818]">
                      One primary registrant can register multiple family members
                      at one time.
                    </p>
                  </div>
                  <div className="border-b border-[#E6CC9F] pb-5">
                    <p className="font-serif text-2xl text-[#4B2818]">
                      Cash and money order pricing is $50 for ages 12+ and $25
                      for children under 12.
                    </p>
                  </div>
                  <div className="border-b border-[#E6CC9F] pb-5">
                    <p className="font-serif text-2xl text-[#4B2818]">
                      CashApp and Pay Online pricing is $52 for ages 12+ and
                      $26.50 for children under 12 to help cover digital payment
                      and transfer fees.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8A7A4A]">
                      Registration Deadline
                    </p>
                    <p className="mt-2 font-serif text-4xl text-[#6F7B40]">
                      October 15, 2026
                    </p>
                  </div>
                </div>
              </aside>
            </section>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#B56425]">
              Family Registration
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[#4B2818] sm:text-5xl">
              Reserve your place at The Family Gathering.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6A4129]">
              Complete the form below for your household. Pricing includes
              registration, food, and a t-shirt for each registrant.
            </p>
          </div>

          <div className="border border-[#D7B988] bg-[#F7ECD8] p-3 shadow-[0_24px_60px_rgba(92,52,25,0.10)]">
            <div
              data-family-gathering-form
              className="border border-[#E6CC9F] bg-[linear-gradient(180deg,_rgba(255,248,236,0.92),_rgba(252,243,228,0.98))] p-4 sm:p-6 lg:p-8"
            >
              <FamilyGatheringRegistrationForm />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl border border-[#B8A26A] bg-[#6D7342] px-6 py-7 text-center text-[#FFF7E8] shadow-lg">
            <p className="font-serif text-3xl sm:text-4xl">
              One Family. Many Branches.
            </p>
            <p className="mt-2 font-serif text-4xl italic sm:text-5xl">
              Stronger Together.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
