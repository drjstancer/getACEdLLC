import FamilyGatheringRegistrationForm from '../../components/FamilyGatheringRegistrationForm'

export const metadata = {
  title: 'The Family Gathering 2026 Registration',
  description:
    'Register for The Family Gathering on Thanksgiving Day, Thursday, November 26, 2026, at the National Guard Armory in Aliceville, Alabama.',
}

const eventDetails = [
  ['Date', 'Thursday, November 26, 2026'],
  ['Location', 'National Guard Armory, Aliceville, Alabama'],
  ['Registration', '$50 ages 12 and up / $25 under 12'],
  ['Includes', 'Registration, food, and t-shirt'],
]

export default function FamilyGatheringPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#1A0F08] text-[#FFF7E8]">
      <section className="relative isolate px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(232,177,88,0.28),_transparent_32%),radial-gradient(circle_at_80%_10%,_rgba(123,50,21,0.36),_transparent_28%),linear-gradient(135deg,_#1A0F08_0%,_#3C1F10_48%,_#120905_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,_rgba(255,220,151,0.20),_transparent)]" />
        <div className="absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full border border-[#E8B158]/20" />
        <div className="absolute -left-20 bottom-32 -z-10 h-64 w-64 rounded-full border border-[#D46A2A]/20" />

        <div className="mx-auto max-w-7xl border border-[#E8B158]/25 bg-[#210F08]/75 p-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <div className="border border-[#E8B158]/35 px-5 py-8 sm:px-8 lg:px-12 lg:py-14">
            <header className="mb-12 flex flex-col gap-6 border-b border-[#E8B158]/25 pb-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#F0C879]">
                  Hill / Broom Family Presents
                </p>
                <p className="font-serif text-2xl italic text-[#FFE2A4]">
                  Thanksgiving Day in Aliceville
                </p>
              </div>

              <div className="max-w-sm border border-[#E8B158]/30 bg-black/20 p-5 text-sm leading-7 text-[#F8E6C8]">
                <p className="text-xs uppercase tracking-[0.28em] text-[#F0C879]">
                  Registration Deadline
                </p>
                <p className="mt-2 font-serif text-2xl text-white">
                  October 15, 2026
                </p>
              </div>
            </header>

            <section className="grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div>
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E8B158]/35 bg-[#E8B158]/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#FFE2A4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F0C879]" />
                  Family • Food • Fellowship
                </div>

                <h1 className="max-w-4xl font-serif text-6xl leading-[0.88] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
                  The Family Gathering
                </h1>

                <p className="mt-7 max-w-3xl text-xl leading-[1.9] text-[#F8E6C8] sm:text-2xl">
                  Come home, bring the family, and register for a Thanksgiving
                  gathering built around connection, gratitude, good food, and
                  the people who make us who we are.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="border border-[#E8B158]/30 bg-[#F6D28A]/10 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#F0C879]">
                      12 & Up
                    </p>
                    <p className="mt-2 font-serif text-5xl text-white">$50</p>
                  </div>
                  <div className="border border-[#E8B158]/30 bg-[#F6D28A]/10 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#F0C879]">
                      Under 12
                    </p>
                    <p className="mt-2 font-serif text-5xl text-white">$25</p>
                  </div>
                </div>
              </div>

              <aside className="relative border border-[#E8B158]/40 bg-[#120905]/80 p-6 shadow-xl shadow-black/30 sm:p-8">
                <div className="absolute -right-4 -top-4 h-20 w-20 border-r border-t border-[#E8B158]/50" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-[#E8B158]/50" />

                <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#F0C879]">
                  Formal Invitation Details
                </p>

                <div className="space-y-5">
                  {eventDetails.map(([label, value]) => (
                    <div
                      key={label}
                      className="border-b border-[#E8B158]/20 pb-5 last:border-b-0 last:pb-0"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-[#C88B45]">
                        {label}
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-tight text-[#FFF7E8]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-16 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_#1A0F08_0%,_#281207_45%,_#120905_100%)]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#F0C879]">
              Reserve Your Place
            </p>
            <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
              Register your household for The Family Gathering.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#F8E6C8]">
              One primary registrant can add everyone in the group. Payment may
              be made by Cash, Money Order, CashApp, or PayPal invoice from get
              ACEd, LLC.
            </p>
          </div>

          <div className="border border-[#E8B158]/30 bg-[#0D0805]/80 p-3 shadow-2xl shadow-black/40">
            <div className="border border-[#E8B158]/20 bg-[radial-gradient(circle_at_top,_rgba(232,177,88,0.10),_transparent_36%),#130A06] p-4 sm:p-6 lg:p-8">
              <FamilyGatheringRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
