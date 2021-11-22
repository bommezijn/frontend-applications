import { useState } from 'react';
import Toggle from 'react-toggle';

/* 
* @see link een toggle https://blog.logrocket.com/dark-mode-in-react-an-in-depth-guide/
*/
export const DarkmodeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <Toggle
      className='dark-mode-toggle'
      checked={isDark}
      onChange={({target}) => setIsDark(target.checked)}
      icons={{ checked: "🌚", unchecked: "🌞" }}
      aria-label="Dark mode Toggle"
    />
  )
}