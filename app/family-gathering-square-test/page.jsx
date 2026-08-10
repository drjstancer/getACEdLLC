import FamilyGatheringSquareTest from '../../components/FamilyGatheringSquareTest'

export const metadata = {
  title: 'Square Test Payment - The Family Gathering',
  description: 'Hidden Square payment test page for The Family Gathering registration flow.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FamilyGatheringSquareTestPage() {
  return (
    <main className="min-h-screen bg-[#F2E3C8] px-4 py-10 sm:px-8 lg:px-10">
      <FamilyGatheringSquareTest />
    </main>
  )
}
