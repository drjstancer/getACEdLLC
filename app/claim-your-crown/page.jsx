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
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
