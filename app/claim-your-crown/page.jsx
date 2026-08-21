import SiteLayout from '../../components/SiteLayout'
import ClaimYourCrownExperience from '../../components/ClaimYourCrownExperience'

export const metadata = {
  title: 'Claiming Your Crown',
  description:
    'Claiming Your Crown: Thriving as a Black Man in Higher Education — an interactive reflection experience centered on identity, community, institutional navigation, legacy, and consistency.',
  alternates: {
    canonical: 'https://www.getacedllc.com/claim-your-crown',
  },
  openGraph: {
    title: 'Claiming Your Crown | get ACEd, LLC',
    description:
      'The crown isn’t given. It’s claimed. Explore the interactive Claiming Your Crown reflection experience for Black men navigating higher education.',
    url: 'https://www.getacedllc.com/claim-your-crown',
    siteName: 'get ACEd, LLC',
    type: 'website',
    images: [
      {
        url: 'https://www.getacedllc.com/claim-your-crown/hero-crown.webp',
        width: 1672,
        height: 941,
        alt: 'Claiming Your Crown — get ACEd, LLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claiming Your Crown | get ACEd, LLC',
    description: 'The crown isn’t given. It’s claimed.',
    images: ['https://www.getacedllc.com/claim-your-crown/hero-crown.webp'],
  },
}

export default function ClaimYourCrownPage() {
  return (
    <SiteLayout>
      <style>{`
        .screen > section:first-child {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .screen > section:first-child > img[alt="Ornate ceremonial gold crown on a black background"] {
          display: none !important;
        }

        .screen > section:first-child::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: url('/claim-your-crown/hero-crown.webp') center / cover no-repeat;
          filter: brightness(.88) contrast(1.04) saturate(.96);
          transform: scale(1.005);
        }

        .screen > section:first-child::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, #050505 0%, rgba(5,5,5,.985) 27%, rgba(5,5,5,.79) 49%, rgba(5,5,5,.18) 74%, rgba(5,5,5,.30) 100%),
            linear-gradient(0deg, rgba(5,5,5,.30), transparent 42%);
          pointer-events: none;
        }

        .screen > section:first-child > div {
          position: relative;
          z-index: 2;
        }

        #clarity,
        #community,
        #strategy,
        #legacy,
        #consistency {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        #clarity > div,
        #community > div,
        #strategy > div,
        #legacy > div,
        #consistency > div {
          position: relative;
          z-index: 2;
        }

        #clarity::before,
        #community::before,
        #strategy::before,
        #legacy::before,
        #consistency::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          pointer-events: none;
        }

        #clarity::after,
        #community::after,
        #strategy::after,
        #legacy::after,
        #consistency::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* 01 — Clarity: the crown is still mostly in shadow. */
        #clarity::before {
          background-image: url('/claim-your-crown/crown-clarity.webp');
          opacity: .34;
          filter: brightness(.72) saturate(.84);
        }
        #clarity::after {
          background: linear-gradient(90deg, rgba(9,9,9,.99) 0%, rgba(9,9,9,.94) 55%, rgba(9,9,9,.54) 100%);
        }

        /* 02 — Community: more of the crown enters the light. */
        #community::before {
          background-image: url('/claim-your-crown/crown-community.webp');
          opacity: .45;
          filter: brightness(.78) saturate(.88);
        }
        #community::after {
          background: linear-gradient(90deg, rgba(5,5,5,.985) 0%, rgba(5,5,5,.91) 51%, rgba(5,5,5,.43) 100%);
        }

        /* 03 — Strategy: structure and metalwork are clearly visible. */
        #strategy::before {
          background-image: url('/claim-your-crown/crown-strategy.webp');
          opacity: .58;
          filter: brightness(.84) saturate(.92);
        }
        #strategy::after {
          background: linear-gradient(90deg, rgba(9,9,9,.985) 0%, rgba(9,9,9,.88) 46%, rgba(9,9,9,.35) 100%);
        }

        /* 04 — Legacy: the crown is nearly fully revealed. */
        #legacy::before {
          background-image: url('/claim-your-crown/crown-legacy.webp');
          opacity: .72;
          filter: brightness(.92) saturate(.97);
        }
        #legacy::after {
          background: linear-gradient(90deg, rgba(5,5,5,.98) 0%, rgba(5,5,5,.83) 41%, rgba(5,5,5,.25) 100%);
        }

        /* 05 — Consistency: full crown reveal. */
        #consistency > img[alt="Gold ceremonial crown"] {
          display: none !important;
        }
        #consistency::before {
          background-image: url('/claim-your-crown/crown-consistency.webp');
          opacity: 1;
          filter: brightness(1.02) saturate(1.02) contrast(1.03);
        }
        #consistency::after {
          background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,.96) 35%, rgba(5,5,5,.50) 58%, rgba(5,5,5,.10) 100%);
        }

        /* The affirmation uses the brightest generated crown treatment. */
        section:has(> img[alt="Illuminated gold ceremonial crown"]) {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"]) > img {
          display: none !important;
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"])::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: url('/claim-your-crown/crown-consistency.webp') center / cover no-repeat;
          filter: brightness(1.06) saturate(1.03) contrast(1.03);
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"])::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 70% 42%, rgba(200,169,107,.05), rgba(0,0,0,.64) 48%, #000 88%);
          pointer-events: none;
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"]) > div {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .screen > section:first-child::before {
            background-size: auto 68%;
            background-position: 68% 5%;
          }
          .screen > section:first-child::after {
            background: linear-gradient(180deg, rgba(5,5,5,.12) 0%, rgba(5,5,5,.58) 39%, #050505 70%);
          }

          #clarity::before,
          #community::before,
          #strategy::before,
          #legacy::before {
            background-size: auto 62%;
            background-position: 68% 5%;
          }
          #clarity::after,
          #community::after,
          #strategy::after,
          #legacy::after {
            background: linear-gradient(180deg, rgba(5,5,5,.36) 0%, rgba(5,5,5,.86) 42%, rgba(5,5,5,.98) 72%);
          }

          #consistency::before,
          section:has(> img[alt="Illuminated gold ceremonial crown"])::before {
            background-size: auto 76%;
            background-position: 66% 5%;
          }
          #consistency::after {
            background: linear-gradient(180deg, rgba(5,5,5,.18) 0%, rgba(5,5,5,.62) 43%, #050505 77%);
          }
        }
      `}</style>
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
