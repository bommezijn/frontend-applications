import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar/Navbar'
import { Footer } from '../components/footer/Footer'
import { DataProvider } from '../contexts/DataContext'
import List from '../components/list/List'

const arr = [{slug: '/one', title: 'one'},{slug: '/two', title: 'two'}]

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Applications</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar 
        title={'Some'}
        pages={arr}
        handle={'bommezijn'}
      />
      <main className={styles.main}>
        <section className={styles.grid} id={arr[0].slug}>
          <article className={styles.card}>
            <Image
              src={'https://c.tenor.com/LfUYCqG9UVkAAAAC/shocked-pengu.gif'}
              width={250}
              height={250}
              alt={'Shocked Pengu from League of Legends'}
            />
          <p className={styles.description}>Hier heb je een pengu die geschokeert is.</p>
          </article>
        </section>
        <DataProvider>
          <section>
            <List />
          </section>
        </DataProvider>
      </main>
      <Footer />
    </div>
  )
}


