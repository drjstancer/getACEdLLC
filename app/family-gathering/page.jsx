import FamilyGatheringRegistrationForm from '../../components/FamilyGatheringRegistrationFormSquare'
import FamilyGatheringSquareTest from '../../components/FamilyGatheringSquareTest'

const familyGatheringBackgroundImage =
  'data:image/webp;base64,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'

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

      <section className="relative isolate overflow-hidden px-4 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${familyGatheringBackgroundImage})` }}
        />
        <div className="absolute inset-0 -z-20 bg-[rgba(39,20,12,0.62)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(242,227,200,0.18)_0%,_rgba(43,23,14,0.50)_42%,_rgba(43,23,14,0.78)_100%)]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center text-[#FFF8EC] drop-shadow-[0_3px_14px_rgba(44,24,14,0.65)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#F4C984]">
              Family Registration
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Reserve your place at The Family Gathering.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#FFF0D4]">
              Complete the form below for your household. Pricing includes
              registration, food, and a t-shirt for each registrant.
            </p>
          </div>

          <div className="border border-[#D7B988]/80 bg-[#2B170E]/55 p-3 shadow-[0_30px_90px_rgba(20,10,6,0.42)] backdrop-blur-[2px] sm:p-5">
            <div
              data-family-gathering-form
              className="border border-[#E6CC9F]/70 bg-[rgba(20,12,8,0.76)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6 lg:p-8"
            >
              <FamilyGatheringRegistrationForm />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl border border-[#B8A26A] bg-[#6D7342]/95 px-6 py-7 text-center text-[#FFF7E8] shadow-lg backdrop-blur-sm">
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
