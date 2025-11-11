import React, { useState, useEffect, useMemo } from 'react';
import { Term } from './types';
import { TERMS_DATA } from './constants';
import Header from './components/Header';
import TermList from './components/TermList';
import TermDetail from './components/TermDetail';

const App: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return TERMS_DATA.filter(term =>
      term.term.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  useEffect(() => {
    // On desktop, select the first term by default to avoid an empty screen.
    if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
      if (filteredTerms.length > 0) {
        setSelectedTerm(filteredTerms[0]);
      }
    }
  }, []);

  useEffect(() => {
    // When search filters out the selected term, deselect it.
    if (selectedTerm && !filteredTerms.some(t => t.term === selectedTerm.term)) {
        setSelectedTerm(null);
    }
  }, [filteredTerms, selectedTerm]);


  const handleSelectTerm = (term: Term) => {
    setSelectedTerm(term);
  };

  const handleGoBack = () => {
    setSelectedTerm(null);
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <main className="flex-grow flex md:flex-row overflow-hidden">
        <div
          className={`
            ${selectedTerm ? 'hidden' : 'block'} 
            md:block md:w-1/3 lg:w-1/4 xl:w-1/5 
            w-full h-full flex flex-col
          `}
        >
          <TermList
            terms={filteredTerms}
            selectedTerm={selectedTerm}
            onSelectTerm={handleSelectTerm}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div
          className={`
            ${selectedTerm ? 'block' : 'hidden'}
            md:block md:w-2/3 lg:w-3/4 xl:w-4/5 
            w-full h-full overflow-y-auto
          `}
        >
          {selectedTerm ? (
            <TermDetail term={selectedTerm} onGoBack={handleGoBack} />
          ) : (
            <div className="hidden md:flex items-center justify-center h-full text-brand-subtle">
              <p className="text-lg">{searchQuery ? 'Không tìm thấy kết quả.' : 'Vui lòng chọn một thuật ngữ để xem định nghĩa.'}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;