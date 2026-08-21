import SiteLayout from '../../components/SiteLayout'
import ClaimYourCrownExperience from '../../components/ClaimYourCrownExperience'
import { CLARITY_CROWN, HERO_CROWN, AFFIRMATION_CROWN } from './crownAssets'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claiming Your Crown | get ACEd, LLC',
    description: 'The crown isn’t given. It’s claimed.',
  },
}

export default function ClaimYourCrownPage() {
  return (
    <SiteLayout>
      <style>{`
        /* Generated crown artwork created specifically for Claiming Your Crown. */
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

        .screen > section:first-child::before {
          background-image: url("${HERO_CROWN}");
          background-size: cover;
          background-position: 70% 50%;
          filter: brightness(.70) saturate(.94) contrast(1.06);
          transform: scale(1.01);
        }
        .screen > section:first-child::after {
          background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,.985) 25%, rgba(5,5,5,.80) 49%, rgba(5,5,5,.27) 74%, rgba(5,5,5,.43) 100%);
        }

        /* 01 — Clarity: only a restrained glimpse. */
        #clarity::before {
          background-image: url("${CLARITY_CROWN}");
          background-size: cover;
          background-position: 72% center;
          opacity: .24;
          filter: brightness(.48) saturate(.70) contrast(1.08);
        }
        #clarity::after {
          background: linear-gradient(90deg, rgba(9,9,9,.995) 0%, rgba(9,9,9,.97) 58%, rgba(9,9,9,.72) 100%);
        }

        /* 02 — Community: the silhouette begins to enter the frame. */
        #community::before {
          background-image: url("${HERO_CROWN}");
          background-size: 1120px auto;
          background-position: calc(100% + 330px) 48%;
          opacity: .18;
          filter: brightness(.46) saturate(.72) contrast(1.08);
        }
        #community::after {
          background: linear-gradient(90deg, rgba(5,5,5,.99) 0%, rgba(5,5,5,.95) 55%, rgba(5,5,5,.66) 100%);
        }

        /* 03 — Strategy: more structure becomes visible. */
        #strategy::before {
          background-image: url("${HERO_CROWN}");
          background-size: 1040px auto;
          background-position: calc(100% + 225px) 48%;
          opacity: .30;
          filter: brightness(.56) saturate(.80) contrast(1.07);
        }
        #strategy::after {
          background: linear-gradient(90deg, rgba(9,9,9,.99) 0%, rgba(9,9,9,.91) 51%, rgba(9,9,9,.54) 100%);
        }

        /* 04 — Legacy: the crown is unmistakable. */
        #legacy::before {
          background-image: url("${HERO_CROWN}");
          background-size: 950px auto;
          background-position: calc(100% + 115px) 48%;
          opacity: .44;
          filter: brightness(.68) saturate(.88) contrast(1.06);
        }
        #legacy::after {
          background: linear-gradient(90deg, rgba(5,5,5,.985) 0%, rgba(5,5,5,.88) 44%, rgba(5,5,5,.40) 100%);
        }

        /* 05 — Consistency: full crown reveal. */
        #consistency::before {
          background-image: url("${HERO_CROWN}");
          background-size: cover;
          background-position: 67% 49%;
          opacity: .96;
          filter: brightness(.84) saturate(.98) contrast(1.06);
          transform: scale(1.01);
        }
        #consistency::after {
          background: linear-gradient(90deg, #050505 0%, rgba(5,5,5,.97) 35%, rgba(5,5,5,.60) 60%, rgba(5,5,5,.16) 100%);
        }

        /* Affirmation: brightest crown moment. */
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
          background-image: url("${AFFIRMATION_CROWN}");
          background-size: cover;
          background-position: center 48%;
          background-repeat: no-repeat;
          filter: brightness(.90) saturate(1.02) contrast(1.06);
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"])::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 67% 42%, rgba(200,169,107,.08), rgba(0,0,0,.76) 53%, #000 87%);
          pointer-events: none;
        }
        section:has(> img[alt="Illuminated gold ceremonial crown"]) > div {
          position: relative;
          z-index: 2;
        }

        @media (max-width: 900px) {
          .screen > section:first-child::before {
            background-size: auto 72%;
            background-position: 66% 4%;
          }
          .screen > section:first-child::after {
            background: linear-gradient(180deg, rgba(5,5,5,.12) 0%, rgba(5,5,5,.64) 39%, #050505 72%);
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
            background-size: auto 78%;
            background-position: 65% 5%;
          }
          #consistency::after {
            background: linear-gradient(180deg, rgba(5,5,5,.28) 0%, rgba(5,5,5,.68) 44%, #050505 78%);
          }
        }
      `}</style>
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
