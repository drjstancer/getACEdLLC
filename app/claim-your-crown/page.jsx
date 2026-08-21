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
        /*
         * Claiming Your Crown visual progression.
         * Each section uses its own generated crown artwork from /public.
         */
        .screen > section:first-child,
        #clarity,
        #community,
        #strategy,
        #legacy,
        #consistency {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .screen > section:first-child > img[alt="Ornate ceremonial gold crown on a black background"],
        #consistency > img[alt="Gold ceremonial crown"] {
          display: none !important;
        }

        .screen > section:first-child::before,
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

        .screen > section:first-child::after,
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

        .screen > section:first-child > div,
        #clarity > div,
        #community > div,
        #strategy > div,
        #legacy > div,
        #consistency > div {
          position: relative;
          z-index: 2;
        }

        /* Hero — full generated crown establishes the visual language. */
        .screen > section:first-child::before {
          background-image: url('/claim-your-crown/hero-crown.webp');
          background-position: 70% 50%;
          filter: brightness(.82) saturate(.96) contrast(1.04);
          transform: scale(1.005);
        }
        .screen > section:first-child::after {
          background:
            linear-gradient(90deg, #050505 0%, rgba(5,5,5,.985) 26%, rgba(5,5,5,.78) 49%, rgba(5,5,5,.22) 74%, rgba(5,5,5,.34) 100%),
            linear-gradient(0deg, rgba(5,5,5,.26), transparent 44%);
        }

        /* 01 — Clarity: mostly shadow; the crown is only beginning to emerge. */
        #clarity::before {
          background-image: url('/claim-your-crown/crown-clarity.webp');
          opacity: .38;
          filter: brightness(.72) saturate(.84);
        }
        #clarity::after {
          background: linear-gradient(90deg, rgba(9,9,9,.995) 0%, rgba(9,9,9,.95) 56%, rgba(9,9,9,.56) 100%);
        }

        /* 02 — Community: more of the crown enters the light. */
        #community::before {
          background-image: url('/claim-your-crown/crown-community.webp');
          opacity: .50;
          filter: brightness(.79) saturate(.89);
        }
        #community::after {
          background: linear-gradient(90deg, rgba(5,5,5,.99) 0%, rgba(5,5,5,.91) 51%, rgba(5,5,5,.43) 100%);
        }

        /* 03 — Strategy: structure and metalwork are clearly visible. */
        #strategy::before {
          background-image: url('/claim-your-crown/crown-strategy.webp');
          opacity: .64;
          filter: brightness(.86) saturate(.94);
        }
        #strategy::after {
          background: linear-gradient(90deg, rgba(9,9,9,.985) 0%, rgba(9,9,9,.87) 46%, rgba(9,9,9,.32) 100%);
        }

        /* 04 — Legacy: the crown is nearly fully revealed. */
        #legacy::before {
          background-image: url('/claim-your-crown/crown-legacy.webp');
          opacity: .80;
          filter: brightness(.94) saturate(.98);
        }
        #legacy::after {
          background: linear-gradient(90deg, rgba(5,5,5,.98) 0%, rgba(5,5,5,.80) 40%, rgba(5,5,5,.20) 100%);
        }

        /* 05 — Consistency: complete crown reveal. */
        #consistency::before {
          background-image: url('/claim-your-crown/crown-consistency.webp');
          opacity: 1;
          filter: brightness(1.02) saturate(1.02) contrast(1.03);
        }
        #consistency::after {
          background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,.95) 34%, rgba(5,5,5,.48) 58%, rgba(5,5,5,.08) 100%);
        }

        /* Affirmation — the consistency crown becomes the brightest final image. */
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
          filter: brightness(1.08) saturate(1.04) contrast(1.03);
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"])::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 70% 42%, rgba(200,169,107,.04), rgba(0,0,0,.62) 48%, #000 88%);
          pointer-events: none;
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"]) > div {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .screen > section:first-child::before {
            background-size: auto 70%;
            background-position: 67% 5%;
          }
          .screen > section:first-child::after {
            background: linear-gradient(180deg, rgba(5,5,5,.10) 0%, rgba(5,5,5,.58) 39%, #050505 71%);
          }

          #clarity::before,
          #community::before,
          #strategy::before,
          #legacy::before {
            background-size: auto 64%;
            background-position: 68% 5%;
          }
          #clarity::after,
          #community::after,
          #strategy::after,
          #legacy::after {
            background: linear-gradient(180deg, rgba(5,5,5,.34) 0%, rgba(5,5,5,.84) 42%, rgba(5,5,5,.98) 72%);
          }

          #consistency::before,
          section:has(> img[alt="Illuminated gold ceremonial crown"])::before {
            background-size: auto 78%;
            background-position: 66% 5%;
          }
          #consistency::after {
            background: linear-gradient(180deg, rgba(5,5,5,.16) 0%, rgba(5,5,5,.60) 43%, #050505 77%);
          }
        }
      `}</style>
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
