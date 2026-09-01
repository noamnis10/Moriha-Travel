import { createContext, useContext, useState } from 'react';

const PackageSearchContext = createContext(null);

export function PackageSearchProvider({ children }) {
  const [query, setQuery] = useState(null);

  return (
    <PackageSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </PackageSearchContext.Provider>
  );
}

export function usePackageSearch() {
  const ctx = useContext(PackageSearchContext);
  if (!ctx) throw new Error('usePackageSearch must be used within PackageSearchProvider');
  return ctx;
}
