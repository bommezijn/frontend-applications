const app = require('express')();
require('dotenv').config();
const port = process.env.PORT || 3001;
const fetch = require('cross-fetch')



app.get('/api/popularListing', async (req, res) => {
  const pageNumber = parseInt(req.query.page)

  if (!pageNumber) {
    return res.json({"error":"invalid query"})
  } else {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&page=${req.query.page}`)
      const data = await response.json()
      return res.json(await data)
    } catch (error) {
      console.error(`/api/populrListing:`,error)
    }
  }
})

app.listen(port, () => {
  console.log(`Backend listening at localhost:${port}`)
})