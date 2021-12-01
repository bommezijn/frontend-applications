import Link from 'next/link'
import Image from 'next/image'

export default function Custom404() {
  return (
    <div>
      <h1>Oh Oh...</h1>
      <Image
        src={'https://c.tenor.com/LfUYCqG9UVkAAAAC/shocked-pengu.gif'}
        width={250}
        height={250}
        alt={'Shocked Pengu from League of Legends'}
      />
      <p>We couldn&#39;t find the page you are looking for....</p>
      <Link href={'/'}>
        <a><button>go back</button></a>
      </Link>
    </div>
  )
}
