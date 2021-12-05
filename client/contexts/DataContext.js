import { createContext, useState, useEffect } from 'react';
import fetchData from '../utilities/fetchData';
import { roundNumber, numberToGender, createPath } from '../utilities/helpers';

const retrieveData = async (pageNum = 1) => {
  const url = `https://frontend-applications-kvx2iph88-dewarian.vercel.app/api/popular?page=${pageNum}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  const [pageCount, setPageCount] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(retrieveData(1));
    retrieveData(pageCount)
      .then(apiData => apiData.results)
      .then(apiResults => {
        return apiResults.map(data => {
          const ACTOR = {
            name: data.name,
            rating: roundNumber(data.popularity),
            gender: numberToGender(data.gender),
            // knownfor: numberToGender(data.gender),
            photo: createPath(IMAGE_URL, data.profile_path),
          };
          return ACTOR;
        });
      })
      .then(santizedData => {
        console.log(`datacont useEff:`, santizedData);
        setData(santizedData);
      });
  }, [data.length]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContext;
