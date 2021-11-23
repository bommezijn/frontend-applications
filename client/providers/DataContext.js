import {useState, useEffect, createContext } from 'react'

const DataContext = createContext(null)

function getUrl(endpoint) {
  const URL = `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  return URL
}


export const DataProvider = ({children}) => {
  const [json, useJson] = useState(null)

  useEffect(() => {
    fetch(getUrl('/person/popular')).then(
      (actorData) => useJson(actorData.results)
    )
  }, []);

  return (
    <DataContext.Provider value={json}>{children}</DataContext.Provider>
  );
};


export default DataContext;