
export default async function handler(req, res) {
  if (!parseInt(req.query.page)) {
    res.status(200).json({
       message: 'Invalid page number',
       success: false
      })
  } else {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${req.query.page}`)
      const data = await response.json()
      return res.status(200).json(await data)
    } catch (error) {
      res.status(200).json({ error: 'error'})
    }
  }
}
