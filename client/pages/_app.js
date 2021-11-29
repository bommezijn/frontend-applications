import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar'
const arr = [{slug: '/context', title: 'context'},{slug: '/two', title: 'two'}]

function MyApp({ Component, pageProps }) {
  return <>
      <Navbar 
      title={'Some'}
      pages={arr}
      handle={'bommezijn'}
    />
    <Component {...pageProps} />
  </>
}

export default MyApp
