import React from 'react';
import { Term } from '../types';

interface TermDetailProps {
  term: Term;
  onGoBack: () => void;
}

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const TermDetail: React.FC<TermDetailProps> = ({ term, onGoBack }) => {
  return (
    <div className="p-6 md:p-8 bg-transparent h-full">
        <button 
            onClick={onGoBack} 
            className="md:hidden flex items-center mb-4 px-4 py-2 bg-white text-brand-primary rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
            <BackArrowIcon />
            Trở về danh sách
        </button>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-primary mb-4 border-b pb-2">{term.term}</h2>
        <div className="text-brand-text text-lg leading-relaxed whitespace-pre-wrap">
          {term.definition}
        </div>
      </div>
    </div>
  );
};

export default TermDetail;