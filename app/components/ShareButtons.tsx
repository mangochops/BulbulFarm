'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, []);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Article link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-4.5-6.5h-1.5a3 3 0 00-3 3v1.5H9V9h2v5.5h2.5V9h2l.5-2z" clipRule="evenodd" />
        </svg>
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.6915026,13.4744657 L13.6915026,10.5779769 C13.6915026,9.53788954 13.1957671,8.8343271 12.1272231,8.8343271 C11.3169069,8.8343271 10.8205738,9.31788954 10.6042959,9.77564103 C10.5287081,9.93081761 10.5115395,10.1464001 10.5115395,10.3619827 L10.5115395,13.4744657 L7.78075655,13.4744657 C7.78075655,13.4744657 7.81444208,7.50821596 7.78075655,6.7979714 L10.5115395,6.7979714 L10.5115395,7.68477157 C10.847242,7.16240549 11.8158259,6.34602193 13.4098271,6.34602193 C15.4625131,6.34602193 16.9999899,7.57301935 16.9999899,10.2427201 L16.9999899,13.4744657 L13.6915026,13.4744657 Z M4.44359548,5.73642457 C3.59326997,5.73642457 2.92472348,5.06788954 2.92472348,4.2175640449 C2.92472348,3.36723858 3.59326997,2.69869309 4.44359548,2.69869309 C5.29392098,2.69869309 5.96246748,3.36723858 5.96246748,4.2175640449 C5.96246748,5.06788954 5.29392098,5.73642457 4.44359548,5.73642457 Z M5.70248139,13.4744657 L3.18470958,13.4744657 L3.18470958,6.7979714 L5.70248139,6.7979714 L5.70248139,13.4744657 Z M18.2779111,0.568306011 C18.0946707,0.395612608 17.8116165,0.278995434 17.528562,0.2286572769 C17.2455075,0.1783191198 16.8803521,0.1531500629 16.4329955,0.1531500629 L1.56700448,0.1531500629 C1.11964783,0.1531500629 0.754492406,0.1783191198 0.471437961,0.2286572769 C0.188383516,0.278995434 -0.0946707088,0.395612608 -0.2779110668,0.568306011 C-0.461151425,0.740999414 -0.577768599,0.923693002 -0.628106756,1.11638582 C-0.678444912,1.30907863 -0.703614016,1.6742312399 -0.703614016,2.1215878465 L-0.703614016,17.8784121535 C-0.703614016,18.3257760601 -0.678444912,18.6909286599 -0.628106756,18.8836214701 C-0.577768599,19.0763142803 -0.461151425,19.2590078678 -0.2779110668,19.4316899236 C-0.0946707088,19.6043719793 0.188383516,19.7209904034 0.471437961,19.771328561 C0.754492406,19.8216666181 1.11964783,19.8468356749 1.56700448,19.8468356749 L16.4329955,19.8468356749 C16.8803521,19.8468356749 17.2455075,19.8216666181 17.528562,19.771328561 C17.8116165,19.7209904034 18.0946707,19.6043719793 18.2779111,19.4316899236 C18.4611515,19.2590078678 18.5777686,19.0763142803 18.6280708,18.8836214701 C18.6783729,18.6909286599 18.7036399,18.3257760601 18.7036399,17.8784121535 L18.7036399,2.1215878465 C18.7036399,1.6742312399 18.6783729,1.30907863 18.6280708,1.11638582 C18.5777686,0.923693002 18.4611515,0.740999414 18.2779111,0.568306011 Z" />
        </svg>
      </a>
      <button
        onClick={handleCopyLink}
        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="Copy link"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
