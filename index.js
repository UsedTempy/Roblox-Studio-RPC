const express = require('express')
const app = express()

const PORT = 3000;

app.use(express.json())

app.get("/UpdateRPC/:scriptName", (req, res) => {
    const scriptName = req.params.scriptName
    
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))