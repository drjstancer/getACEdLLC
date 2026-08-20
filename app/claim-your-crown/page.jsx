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
      <ClaimYourCrownExperience />
    </SiteLayout>
  )
}
