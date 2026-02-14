import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  // 🔎 search filters
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: ""
  });

  // search triggered or not
  const [isSearched, setIsSearched] = useState(false);

  // sidebar filters
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
