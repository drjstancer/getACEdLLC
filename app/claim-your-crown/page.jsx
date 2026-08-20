import SiteLayout from '../../components/SiteLayout'
import ClaimYourCrownExperience from '../../components/ClaimYourCrownExperience'

export const metadata = {
  title: 'Claiming Your Crown | get ACEd, LLC',
  description:
    'An interactive reflection experience inspired by Dr. Joel Stancer’s Claiming Your Crown: Thriving as a Black Man in Higher Education.',
  alternates: {
    canonical: 'https://www.getacedllc.com/claim-your-crown',
  },
  openGraph: {
    title: 'Claiming Your Crown | get ACEd, LLC',
    description:
      'Identity. Community. Strategy. Legacy. Consistency. An interactive reflection experience for Black men in higher education.',
    url: 'https://www.getacedllc.com/claim-your-crown',
    siteName: 'get ACEd, LLC',
    type: 'website',
  },
}

export default function ClaimYourCrownPage() {
  return (
    <SiteLayout>
      <style>{`
        .cyc-screen > section:first-child > div:first-child {
          display: none !important;
        }

        .cyc-screen > section:first-child::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,.97) 0%, rgba(0,0,0,.87) 42%, rgba(0,0,0,.36) 68%, rgba(0,0,0,.58) 100%),
            url('/claim-your-crown/hero-crown.svg') center right / contain no-repeat;
          z-index: 0;
          pointer-events: none;
        }

        .cyc-screen > section:first-child > div:last-child {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .cyc-screen > section:first-child::before {
            background:
              linear-gradient(180deg, rgba(0,0,0,.48) 0%, rgba(0,0,0,.86) 55%, rgba(0,0,0,.98) 100%),
              url('/claim-your-crown/hero-crown.svg') center 14% / 92% auto no-repeat;
          }
        }
      `}</style>
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
