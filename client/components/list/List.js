import { useContext } from 'react';
import DataContext from '../../contexts/DataContext';

const List = () => {
  return (
    <ul>
      <ListItem />
    </ul>
  )
}

/**
 * @description microComponent for the list. Retrieves the data from the useContext hook
 * and maps over the array. Important bit is that you cannot just solely return
 * a code block without a react fragment or HTML element.
 * @returns ReactElement array of `<li>` with data from API
 */
const ListItem = () => {
  const dataElements = useContext(DataContext)
  console.log(dataElements)
  return (
      <>
        {dataElements.map((e,i) => {return <li key={i}>{e?.name}</li>})}
      </>
  )
}

export default List