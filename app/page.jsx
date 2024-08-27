import Link from 'next/link';
import Image from 'next/image';
import ComparisonSection from './landing/ComparisonSection';
import FeaturesSection from './landing/FeaturesSection';
import VideoDemoSection from './landing/VideoDemoSection';
import PricingSection from './landing/PricingSection';
import FAQSection from './landing/FAQSection';
import Footer from './landing/Footer';

export default function LandingPage() {
  return (
    <div className="landing-page bg-base-100">
      {/* Header */}
      <header className="header bg-transparent py-5 px-10">
        <nav className="container max-w-full flex items-center justify-between mx-auto">
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} className="w-10 md:w-12" />
            <span className="font-extrabold text-2xl">TrackFast</span>
          </Link>
          <div className="flex justify-end">
            <Link href="/login" className="btn btn-md bg-[rgb(166,173,187)] text-gray-800 hover:bg-[rgb(146,153,167)] flex items-center justify-center h-full">
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section md:min-h-[87vh] bg-base-100 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-16 lg:py-24">
          <div className="relative flex flex-col gap-12 lg:gap-16 items-center justify-center text-center">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
              Focus on your job search, not the tracking
            </h1>
            <p className="text-lg text-base-content-secondary leading-relaxed max-w-md mx-auto">
              Let TrackFast track your job applications from Indeed so you can save time landing your dream job.
            </p>
            <Link 
              href="/signup" 
              className="btn btn-primary btn-block !btn-wide flex items-center justify-center text-2xl font-bold shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              style={{ padding: '0.75rem 1.5rem', height: 'auto' }}
            >
              <span className="block w-full text-center">Get Started</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Features Section */}
      {/* <FeaturesSection /> */}

      {/* Video Demo Section */}
      {/* <VideoDemoSection /> */}

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
