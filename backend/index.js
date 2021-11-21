const app = require('express')();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  return res.json({
    "message": "Get HTTP method"
  })
})

app.listen(PORT, () => 
  { console.log(`backend listening on port ${PORT}`)}
)