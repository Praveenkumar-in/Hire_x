import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  // 🔎 search filters
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: ""
  });

  const [jobs,setJob]= useState(false)
  // search triggered or not
  const [isSearched, setIsSearched] = useState(false);

  // sidebar filters
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  
  // function to fetch job
  const fetchJobs = async () => {
    setJob(jobsData)
  }
   useEffect(()=>{
     fetchJobs()
   },[])
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,jobs,setJob
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
