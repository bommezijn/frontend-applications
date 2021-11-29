import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../navbar/Navbar.module.css'

/**
 * @description Navbar component, requires title and array of objects
 * @param {String} props.title 
 * @param {Array} props.pages Object with structure {slug, title}
 * @returns Component NavBar
 */
const Navbar = ({title, pages, handle}) => {
  return (
    <nav className={styles.navigation}>
      <a className={styles.logo} href={'/'}>{title}</a>
        <NavItems
          pages={pages}
          handle={handle}
        />
      <GithubLink 
        handle={handle}
      />
    </nav>
  )
}

const NavItems = ({pages}) => {
  const router = useRouter()
  const isActive = `${styles.navigation_list_item__active} ${styles.navigation_list_item}`
  return <ul className={styles.navigation_list}>
    {
      pages.map((p,i) => {
        console.log(router.pathname, p.slug)
        return <li key={i} className={`${router.pathname === p.slug ? isActive : styles.navigation_list_item}`}>
          <Link href={p.slug}>
            <a>
              {p.title}</a>
          </Link>
        </li>
      })
    }
  </ul>
}

const GithubLink = ({handle}) => {
  return <a className={styles.linkGithub} href={"https://www.github.com/" + handle}> <Image src="/github-icon.svg" alt="Github Logo" width={26} height={25} /></a>
}

export default Navbar;