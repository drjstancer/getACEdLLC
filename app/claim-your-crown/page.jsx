import SiteLayout from '../../components/SiteLayout'
import ClaimYourCrownExperience from '../../components/ClaimYourCrownExperience'

const REAL_CROWN =
  'https://upload.wikimedia.org/wikipedia/commons/3/3b/CORONA_REALE_ROYAL_CROWN.jpg'

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
        url: 'https://www.getacedllc.com/claim-your-crown/hero-crown.jpg',
        width: 900,
        height: 506,
        alt: 'Claiming Your Crown — get ACEd, LLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claiming Your Crown | get ACEd, LLC',
    description: 'The crown isn’t given. It’s claimed.',
    images: ['https://www.getacedllc.com/claim-your-crown/hero-crown.jpg'],
  },
}

export default function ClaimYourCrownPage() {
  return (
    <SiteLayout>
      <style>{`
        /*
         * Crown progression
         * The source is a 6240 × 4160 photograph of a physical crown,
         * released under CC0. We reveal more of it as the participant
         * moves from identity to consistency.
         */

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
          background-image: url('${REAL_CROWN}');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 72% 47%;
          filter: brightness(.73) contrast(1.05) saturate(.9);
          transform: scale(1.015);
        }

        .screen > section:first-child::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, #050505 0%, rgba(5,5,5,.985) 25%, rgba(5,5,5,.82) 47%, rgba(5,5,5,.34) 70%, rgba(5,5,5,.48) 100%),
            linear-gradient(0deg, rgba(5,5,5,.28), transparent 45%);
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
          background-image: url('${REAL_CROWN}');
          background-repeat: no-repeat;
          pointer-events: none;
          transition: opacity .6s ease, filter .6s ease;
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

        /* 01 — a glint: only enough crown to suggest what is coming. */
        #clarity::before {
          opacity: .10;
          background-size: 1150px auto;
          background-position: calc(100% + 410px) 46%;
          filter: brightness(.34) saturate(.55) contrast(1.08);
        }
        #clarity::after {
          background: linear-gradient(90deg, rgba(9,9,9,.995) 0%, rgba(9,9,9,.96) 62%, rgba(9,9,9,.73) 100%);
        }

        /* 02 — the silhouette begins to read as a crown. */
        #community::before {
          opacity: .18;
          background-size: 1060px auto;
          background-position: calc(100% + 300px) 48%;
          filter: brightness(.43) saturate(.66) contrast(1.08);
        }
        #community::after {
          background: linear-gradient(90deg, rgba(5,5,5,.99) 0%, rgba(5,5,5,.94) 55%, rgba(5,5,5,.68) 100%);
        }

        /* 03 — more metal, structure, and detail become visible. */
        #strategy::before {
          opacity: .28;
          background-size: 980px auto;
          background-position: calc(100% + 205px) 47%;
          filter: brightness(.53) saturate(.74) contrast(1.08);
        }
        #strategy::after {
          background: linear-gradient(90deg, rgba(9,9,9,.99) 0%, rgba(9,9,9,.91) 51%, rgba(9,9,9,.57) 100%);
        }

        /* 04 — the crown is now unmistakable, but not yet fully revealed. */
        #legacy::before {
          opacity: .40;
          background-size: 900px auto;
          background-position: calc(100% + 110px) 48%;
          filter: brightness(.66) saturate(.84) contrast(1.06);
        }
        #legacy::after {
          background: linear-gradient(90deg, rgba(5,5,5,.985) 0%, rgba(5,5,5,.88) 44%, rgba(5,5,5,.43) 100%);
        }

        /* 05 — full crown. */
        #consistency > img[alt="Gold ceremonial crown"] {
          display: none !important;
        }
        #consistency::before {
          opacity: .92;
          background-size: cover;
          background-position: 67% 49%;
          filter: brightness(.82) saturate(.94) contrast(1.07);
          transform: scale(1.01);
        }
        #consistency::after {
          background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,.97) 36%, rgba(5,5,5,.62) 61%, rgba(5,5,5,.20) 100%);
        }

        /* The affirmation is the brightest crown moment. */
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
          background-image: url('${REAL_CROWN}');
          background-size: cover;
          background-position: center 48%;
          background-repeat: no-repeat;
          filter: brightness(.88) saturate(1.02) contrast(1.08);
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"])::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 68% 42%, rgba(200,169,107,.08), rgba(0,0,0,.78) 52%, #000 86%);
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
            filter: brightness(.58) contrast(1.05) saturate(.82);
          }
          .screen > section:first-child::after {
            background: linear-gradient(180deg, rgba(5,5,5,.16) 0%, rgba(5,5,5,.66) 40%, #050505 72%);
          }

          #clarity::before,
          #community::before,
          #strategy::before,
          #legacy::before {
            background-size: 760px auto;
            background-position: calc(100% + 335px) 12%;
          }

          #consistency::before,
          section:has(> img[alt="Illuminated gold ceremonial crown"])::before {
            background-size: auto 76%;
            background-position: 66% 6%;
          }

          #consistency::after {
            background: linear-gradient(180deg, rgba(5,5,5,.32) 0%, rgba(5,5,5,.70) 45%, #050505 78%);
          }
        }
      `}</style>
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
