'use client';

import React, { useState } from 'react';

const FAQSection = () => {
  const [openFaqs, setOpenFaqs] = useState({});

  const faqs = [
    {
      question: 'Why should I try TrackFast?',
      answer: 'TrackFast makes your job search easier and more efficient. With our Chrome extension, you can save job applications from LinkedIn and Indeed with just one click. Stay organized, reduce the time spent on applying, and focus on landing your next great opportunity faster.',
    },
    {
      question: 'What is the Quick Add feature?',
      answer: 'Quick Add lets you effortlessly enter an unlimited number of job applications with our optimized forms, designed to minimize clicks and save you time. This feature is ideal for job seekers who want to streamline their search and focus on landing their next opportunity faster',
    },
    {
      question: 'Can I use TrackFast on mobile devices?',
      answer: 'TrackFast is optimized for use on desktop browsers to provide the best user experience.',
    },
    {
      question: 'How often is TrackFast updated with new features?',
      answer: 'We continuously work to improve TrackFast and release updates as new features are developed.',
    },
    {
      question: 'Are there any hidden fees or additional costs with TrackFast?',
      answer: 'No, there are no hidden fees; the one-time purchase gives you full access to all features.',
    },
    {
      question: 'Is my personal information secure with TrackFast?',
      answer: 'Absolutely, we use advanced encryption to ensure all your data is secure.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="bg-base-300" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-left md:basis-1/2">
            <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
            <p className="text-3xl md:text-4xl font-extrabold text-base-content">Frequently Asked Questions</p>
          </div>
          <ul className="md:basis-1/2 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <li key={index} className="group">
                <button
                  className={`flex items-center justify-between w-full py-5 text-base font-semibold text-left ${
                    openFaqs[index] ? 'text-primary' : 'text-base-content'
                  } focus:outline-none focus:bg-transparent`}
                  onClick={() => toggleFAQ(index)}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-6 h-6 ml-4 transition-transform duration-300 ${
                      openFaqs[index] ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaqs[index] ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <div className="py-4">{faq.answer}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
