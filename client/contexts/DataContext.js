import { createContext, useState, useEffect } from 'react'
import fetchData from '../utilities/fetchData'

const testFunc = async () => {
  const response = await fetchData('https://api.themoviedb.org/3','/person/popular' );
  return response
}

const DataContext = createContext([])

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    testFunc().then(x => setData(x.results))
  }, [])

  return (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  )
}


export default DataContext