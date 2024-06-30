import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href="/" className="flex gap-2 justify-center md:justify-start items-center">
              <Image src="/logo.svg" alt="TrackFast Logo" width={24} height={24} className="w-6 h-6" />
              <strong className="font-extrabold tracking-tight text-base md:text-lg">TrackFast</strong>
            </Link>
            <p className="mt-3 text-sm text-base-content/80">
              Simplify your job search with TrackFast's quick add and URL add features for efficient application tracking.
            </p>
            <p className="mt-3 text-sm text-base-content/60">
              &copy; {new Date().getFullYear()} TrackFast. All rights reserved.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center md:pl-24">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/" className="link link-hover">Home</Link>
                <Link href="/#features" className="link link-hover">Features</Link>
                <Link href="/#pricing" className="link link-hover">Pricing</Link>
                <Link href="/#faq" className="link link-hover">FAQ</Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/terms" className="link link-hover">Terms of Service</Link>
                <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                CONTACT
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="mailto:support@TrackFast.io" className="link link-hover">Support</Link>
                <Link href="/contact" className="link link-hover">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
