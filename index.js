const express = require('express')
const app = express()

const PORT = 3000;

app.use(express.json())

app.get("/setScript/:scriptName", (req, res) => {
    const scriptName = req.params.scriptName
    console.log(`${scriptName} has been opened now display in RP`)

    res.status(200).json({
        response: true
    });
})

app.get("/clearScript", (req, res) => {
    res.status(200).json({
        response: true
    });
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))