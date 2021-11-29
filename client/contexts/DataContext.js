import { createContext, useState, useEffect } from 'react'
import fetchData from '../utilities/fetchData'
import { roundNumber,numberToGender,createPath } from '../utilities/helpers';

const retrieveData = async () => {
  const url = `https://frontend-applications-kvx2iph88-dewarian.vercel.app/api/popular?page=1`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const DataContext = createContext([])

export const DataProvider = ({ children }) => {
  const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
  const [data, setData] = useState([])
  
  useEffect(() => {
    retrieveData()
      .then(apiData => apiData.results)
      .then(apiResults => {
        // console.log(`apiResults:`,apiResults)
        return apiResults.map(data => {
          const ACTOR = {
            name: data.name,
            rating: roundNumber(data.popularity),
            gender: numberToGender(data.gender),
            photo: createPath(IMAGE_URL, data.profile_path)
          }
          return ACTOR
        })
      })
      .then(santizedData => {
        console.log(`datacont useEff:`,santizedData);
        setData(santizedData)
      })
  }, [data.length])

  return (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  )
}


export default DataContext