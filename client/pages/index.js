import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import style from '../styles/Test.module.css'
import BarChart from '../components/BarChart/BarChart'

//https://frontend-applications-kvx2iph88-dewarian.vercel.app/api/popular
const getData = async(url, pageNumber) => {
  const res = await fetch(`${url}?page=${pageNumber}`)
  const data = await res.json()
  return data
}

export default function Home() {
  const [data, setData] = useState([])
  const [pageNum, setPageNum] = useState(1)

  const Button = ({name}) => {
    return (
      <button className={style.action} onClick={() => {setPageNum(pageNum + 1)}}>{name}</button>
    )
  } 

    useEffect(() => {
     const retrievedData = getData(`https://frontend-applications-kvx2iph88-dewarian.vercel.app/api/popular`, pageNum)    
      retrievedData.then((rd) => {
        setData(rd.results)    
      })
    },[pageNum])

/* 
TODO: Fetch data on interaction
TODO: Populate barChart with new Data
TODO: Update the barChart on a clickEvent with fetch function getData(useState(data))
*/
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Applications</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={style.gridContainer}>
          <h1>Hello frontpage</h1>
          <BarChart
            dataset={data}
            string={'name'}
            numerical={'popularity'}
            chartWidth={800}
            chartHeight={600}
        />
        <div className={style.card}>
          <h2>Information</h2>
          <p>The graph shows the current popularity of actors based on the dataset of TheMoviedatabase. With some knowledge of the currently playing movies you will instantly see that the higher rated actors are from movies that recently released some form of media. </p>
          <p>Get the next set by clicking on the button.</p>
          <Button name={'Go to the next page'} />
        </div>
          <a href="https://www.themoviedb.org/">@themoviedb</a>
        </section>
        {console.log(pageNum, data)}

      </main>
    </div>
  )
}