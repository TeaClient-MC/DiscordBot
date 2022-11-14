import fs from 'fs'
import { Client, Message } from 'discord.js'

/* Checks if config file exists
   If not, create example config, and exit
*/
if (!fs.existsSync('config.json')) {
    // Writes example json to file
    const example = {
        token: '-- INSERT BOT TOKEN HERE --',
    }

    fs.writeFileSync('config.json', JSON.stringify(example, null, 2))

    // Exit process
    process.exit(-1)
}

const botConfig = JSON.parse(fs.readFileSync('config.json').toString())

// Get token string from json
const token = botConfig['token']

let client

function start() {
    // Construct new Client Class
    client = new Client({
        intents: ['GuildMessages', 'Guilds', 'MessageContent'],
    })

    // On bot ready Listener
    client.on('ready', (client) => {
        console.log(
            `Logged in as ${client.user.username}#${client.user.discriminator}`
        )
    })

    client.login(token)
}

start()
