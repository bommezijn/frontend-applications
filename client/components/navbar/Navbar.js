import Image from 'next/image'
import styles from '../navbar/Navbar.module.css';

/**
 * @description Navbar component, requires title and array of objects
 * @param {String} props.title 
 * @param {Array} props.pages Object with structure {slug, title}
 * @returns Component NavBar
 */
const Navbar = ({title, pages, handle}) => {
  return (
    <nav className={styles.navigation}>
      <p className={styles.logo}>{title}</p>
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
  return <ul className={styles.navigation_list}>
    {
      pages.map((p,i) => {
        return <li key={i} className={styles.navigation_list_item}>
          <a href={p.slug}>
            {p.title}
          </a>
        </li>
      })
    }
  </ul>
}

const GithubLink = ({handle}) => {
  return <a className={styles.linkGithub} href={"https://www.github.com/" + handle}> <Image src="/github-icon.svg" alt="Github Logo" width={26} height={25} /></a>
}

export default Navbar;