const express = require('express')
const axios = require('axios')
const RPC = require('discord-rpc');
const { disconnect } = require('process');
const { time } = require('console');
const rpc = new RPC.Client({
    transport: 'ipc'
})

const app = express()
const PORT = 3000;
const date = new Date()
var startNumber;

rpc.login({
    clientId: "1250347589715365959"
})

rpc.on('ready', () => {
    startNumber = date.getTime()
})

app.use(express.json())
app.get("/setScript/:scriptName/:gameId", async (req, res) => {
    const scriptName = req.params.scriptName
    const gameId = req.params.gameId

    try {
        const nameResult = await axios.get(`https://games.roblox.com/v1/games?universeIds=${gameId}`)

        rpc.setActivity({
            details: `Editing: ${scriptName}`,
            largeImageKey: 'https://cdn.discordapp.com/app-assets/383226320970055681/565944800105332777.png?size=160',
            smallImageKey: 'https://media.tenor.com/TYDHUP2kPT4AAAAi/rsc-roblox-studio-community.gif',
            largeImageText: nameResult.data.data[0].name,
            startTimestamp: startNumber,
        })

        res.status(200).json({
            response: true
        });
    } catch {
        res.status(200).json({
            response: false
        });
    }
})

app.get("/clearScript/:gameId", async (req, res) => {
    const gameId = req.params.gameId
    
    try {
        const iconResult = await axios.get(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${gameId}&returnPolicy=PlaceHolder&size=50x50&format=Png&isCircular=false`)
        const nameResult = await axios.get(`https://games.roblox.com/v1/games?universeIds=${gameId}`)

        rpc.setActivity({
            details: "Idle",
            largeImageKey: iconResult.data.data[0].imageUrl,
            largeImageText: nameResult.data.data[0].name,
            smallImageKey: 'https://media.tenor.com/TYDHUP2kPT4AAAAi/rsc-roblox-studio-community.gif',
            startTimestamp: startNumber,
        })

        res.status(200).json({
            response: true
        });
    } catch {
        res.status(200).json({
            response: false
        });
    }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))