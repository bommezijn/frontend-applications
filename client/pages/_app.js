import '../styles/globals.css';
import Navbar from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
const arr = [
  { slug: '/context', title: 'context' },
  { slug: '/currentPlaying', title: 'currently playing' },
];

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar title={'Some'} pages={arr} handle={'bommezijn'} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
