import React from 'react';
import { Term } from '../types';

interface TermListProps {
  terms: Term[];
  selectedTerm: Term | null;
  onSelectTerm: (term: Term) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TermList: React.FC<TermListProps> = ({ terms, selectedTerm, onSelectTerm, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <input
          type="search"
          placeholder="Tìm kiếm thuật ngữ..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
          aria-label="Tìm kiếm thuật ngữ"
        />
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {terms.map((term) => (
            <li key={term.term}>
              <button
                onClick={() => onSelectTerm(term)}
                className={`
                  w-full text-left p-4 text-lg 
                  transition-colors duration-200 ease-in-out
                  border-b border-gray-200
                  ${selectedTerm?.term === term.term 
                    ? 'bg-blue-100 text-brand-primary font-semibold' 
                    : 'text-brand-text hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                  }
                `}
              >
                {term.term}
              </button>
            </li>
          ))}
        </ul>
         {terms.length === 0 && (
          <p className="p-4 text-center text-brand-subtle">Không tìm thấy kết quả phù hợp.</p>
        )}
      </nav>
    </div>
  );
};

export default TermList;