import Head from 'next/head';
import Image from 'next/Image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

const getData = async (url, pageNumber) => {
  const res = await fetch(`${url}?page=${pageNumber}`);
  const data = await res.json();
  return data;
};

export default function currentPlaying() {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  // useEffect(() => {
  //   const retrievedData = getData(`https://frontend-applications-3zv55o3th-dewarian.vercel.app/api/nowPlaying`, pageNum)
  //   retrievedData.then(rd = {
  //     setData(rd)
  //   })
  // },[pageNum])

  useEffect(() => {
    const rd = getData(
      `https://frontend-applications-3zv55o3th-dewarian.vercel.app/api/nowPlaying`,
      pageNum
    );
    rd.then(rd => {
      setData(rd);
    });
  }, [pageNum]);

  console.log(data);
  return (
    <div className={styles.containerAlt}>
      <Head>
        <title>Currently Playing</title>
        <meta
          name='description'
          content='Get the currently playing movies from tmdb'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Currently Playing</h1>
        <section>
          {data.map((card, index) => {
            return (
              <CardComponent key={index} data={card} width={250} height={400} />
            );
          })}
        </section>
      </main>
    </div>
  );
}

const CardComponent = ({ data, width, height }) => {
  return (
    <div className={styles.card}>
      <Image src={data.poster} alt={data.title} width={width} height={height} />
      <h2>{data.title}</h2>
      <p>{data.vote} / 10</p>
    </div>
  );
};
