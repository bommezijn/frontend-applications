import React, {FC} from "react"; //import Functional Component and React
import styles from '../Title/Title.module.css'

// Create type for the props.
type TitleProps = {
  header: string;
}

//Title is of type FunctionalComponent with props TitleProps
const Title:FC<TitleProps> = ({ header }) => {
  return (
    <>
      <h1 className={styles.title}>{header}</h1>
    </>
  )
}

export default Title