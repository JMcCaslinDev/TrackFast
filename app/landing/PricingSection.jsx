'use client';
import React from 'react';
import Link from 'next/link';

const PricingSection = () => {
  return (
    <section className="pricing-section bg-base-200 overflow-hidden min-h-screen" id="pricing">
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="max-w-xl font-bold text-3xl lg:text-5xl tracking-tight mb-4 mx-auto">
            Simple, transparent pricing
          </h2>
          <div className="text-base-content-secondary max-w-md mx-auto mb-12">
            Get full access to TrackFast with a single payment.
          </div>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch">
          <div className="card bordered lg:card-side bg-base-300 shadow-xl">
            <div className="card-body p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <p className="text-5xl tracking-tight font-extrabold">$29</p>
                <div className="flex flex-col justify-end">
                  <p className="text-xs text-base-content/60 uppercase font-semibold">One-time payment</p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1 mb-6">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] opacity-80 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>One-Click Job Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] opacity-80 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Quickly Add Unlimited Job Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] opacity-80 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Keep All Your Job Applications in One Place</span> 
                </li>
              </ul>
              <div className="space-y-2">
              <Link 
                href="/signup" 
                className="btn btn-primary btn-block !btn-wide flex items-center justify-center text-2xl font-bold shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                style={{ padding: '0.75rem 1.5rem', height: 'auto' }}
              >
                <span className="block w-full text-center">Get Started</span>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
