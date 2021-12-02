// 'https://api.themoviedb.org/3'
// '/person/popular'
/**
 * @description fetchData utility that retrieves data from an external API
 * @param {String} url link to API
 * @param {String} endpoint endpoints you wish to get data from
 * @returns JSON Object
 */
const fetchData = async (url, endpoint) => {
  // url = `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`

  const createUrl = (url, endpoint) => {
    return `${url}${endpoint}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  }

 const response = await fetch(createUrl(url, endpoint));
 return await response.json();

}

export default fetchData

// Not in use right now.