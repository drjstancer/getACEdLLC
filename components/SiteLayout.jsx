import Navigation from './Navigation'
import Footer from './Footer'

export default function SiteLayout({ children }) {
  return (
    <div className="bg-[#070707] min-h-screen text-[#F5F2EB] overflow-x-hidden">
      <Navigation />

      <div className="pt-24">
        {children}
      </div>

      <Footer />
    </div>
  )
}
