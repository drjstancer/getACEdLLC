import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import Footer from './Footer'
import PageTransition from './PageTransition'

export default function SiteLayout({ children }) {
  return (
    <div className="bg-[#070707] min-h-screen text-[#F5F2EB] overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />

        <div className="absolute top-6 right-6 lg:hidden z-50">
          <MobileNavigation />
        </div>
      </div>

      <PageTransition>
        <div className="pt-24 min-h-screen">
          {children}
        </div>
      </PageTransition>

      <Footer />
    </div>
  )
}
