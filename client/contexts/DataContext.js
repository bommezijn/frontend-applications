import { createContext, useState, useEffect } from 'react'
import fetchData from '../utilities/fetchData'
import { roundNumber,numberToGender,createPath } from '../utilities/helpers';

const testFunc = async () => {
  const response = await fetchData('https://api.themoviedb.org/3','/person/popular' );
  return response
}

const DataContext = createContext([])
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';


export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    testFunc()
      .then(apiData => apiData.results)
      .then(apiResults => {
        console.log(`apiResults:`,apiResults)
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
      .then(santizedData => {console.log(`datacont useEff:`,santizedData); setData(santizedData)})
  }, [])

  return (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  )
}


export default DataContext