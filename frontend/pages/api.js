export default (req, res) => {
    // TODO: make request to localhost:8080
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
  }
