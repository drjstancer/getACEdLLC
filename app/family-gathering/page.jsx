import SiteLayout from '../../components/SiteLayout'
import FamilyGatheringRegistrationForm from '../../components/FamilyGatheringRegistrationForm'

export const metadata = {
  title: 'The Family Gathering 2026 Registration',
  description:
    'Register for The Family Gathering on Thanksgiving Day, Thursday, November 26, 2026, at the National Guard Armory in Aliceville, Alabama.',
}

export default function FamilyGatheringPage() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-[#070707] text-[#F5F2EB] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#C8A96B]">
            Hill / Broom Family
          </p>

          <section className="mb-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="mb-8 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-white md:text-7xl">
                The Family Gathering Registration
              </h1>

              <p className="max-w-3xl text-xl leading-[1.9] text-[#D8D3CA]">
                Join us for Thanksgiving Day as we reconnect, give thanks, and
                continue the family tradition together in Aliceville.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#C8A96B]">
                Event Details
              </p>

              <div className="space-y-4 text-[#D8D3CA]">
                <p>
                  <strong className="text-white">Date:</strong> Thursday,
                  November 26, 2026
                </p>
                <p>
                  <strong className="text-white">Location:</strong> National
                  Guard Armory, Aliceville, Alabama
                </p>
                <p>
                  <strong className="text-white">Registration:</strong> $50 ages
                  12 and up; $25 under 12
                </p>
                <p>
                  <strong className="text-white">Includes:</strong>{' '}
                  registration, food, and t-shirt
                </p>
              </div>
            </div>
          </section>

          <FamilyGatheringRegistrationForm />
        </div>
      </main>
    </SiteLayout>
  )
}
