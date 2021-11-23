// 'https://api.themoviedb.org/3'
// '/person/popular'
const fetchData = async (url, endpoint) => {
  // url = `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`

  const createUrl = (url, endpoint) => {
    return `${url}${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  }

 const response = await fetch(createUrl(url, endpoint));
 return await response.json();

}

export default fetchData