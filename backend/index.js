const app = require('express')();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  return res.json({
    "message": "Get HTTP method"
  })
})

app.listen(port, () => {
  console.log(`Backend listening at localhost:${port}`)
})