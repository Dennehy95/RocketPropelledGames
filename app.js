/*
Overall TODO list:

*/

/* PROD INVITE LINK */
// 
/* */

/* BETA INVITE LINK*/
// https://discord.com/api/oauth2/authorize?client_id=926250613803728917&permissions=2147601408&scope=bot%20applications.commands
/**
 * View Channels, Send Messages, Manage Messages, Embed Links, Attach Files, Read Message History, Bot and Application commands
*/

/* PROD VARIABLES */

//const PREFIX = 'rpgs-'

/* */

/* BETA INVITE LINK*/

// const PREFIX = 'rpgsb-'

/* */
require('dotenv').config()

const storage = require('node-persist')

const fs = require('fs')
const { Routes } = require('discord-api-types/v9')
const { Client, Intents, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'REACTION'],
})
const { beginListeningForGameInstructions } = require('./TalesOfGarbonzia/talesOfGarbonzia')

// Loading commands from the commands folder
const commands = []
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))
const BOT_TOKEN = process.env.BOT_TOKEN
const TEST_GUILD_ID = '142349704280276992' // Denneland
// const TEST_GUILD_ID = false

// Creating a collection for commands in client
client.commands = new Collection()

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`)
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!')
    // Registering the commands in the client
    const CLIENT_ID = client.user.id
    client.user.setActivity('type: "/tales-of-garbonzia" to start playing')
    const rest = new REST({
        version: '9'
    }).setToken(BOT_TOKEN);
    (async () => {
        try {
            if (!TEST_GUILD_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                )
                console.log('Successfully registered application commands globally')
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: commands
                    },
                )
                console.log('Successfully registered application commands for development guild')
            }
        } catch (error) {
            if (error) console.error(error)
        }
    })()
    initNodePersist()
    beginListeningForGameInstructions(client)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) return
    try {
        await command.execute(interaction)
    } catch (error) {
        if (error) console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})

client.on('messageCreate', async msg => {
    // const caseInsensitiveMessageContent = msg.content.toLowerCase()
    // Puzzle Reply
    if (msg.author.bot) return
    // if (msg.type === 'REPLY') {
    //     const channelId = msg.reference.channelId
    //     const messageId = msg.reference.messageId
    //     const embedMessage = await client.channels.cache.get(channelId).messages.fetch(messageId)
    //     if (embedMessage.author.id !== client.user.id) return
    //     if (!embedMessage.embeds[0]?.title?.startsWith('Puzzle: ')) return
    //     return solvePuzzleReply(msg, embedMessage, submittedAnswer = msg.content, db)
    // } else {
    //     if (!caseInsensitiveMessageContent.startsWith(PREFIX)) return

    //     const commandAsArgsWithStrings = getCommandsAsArgsWithStrings(msg.content)

    // /***************** General commands *****************/
    // // if (commandAsArgsWithStrings[0] === 'help') {
    // //   return displayHelp(msg)
    // // }
    // }
})

// const getCommandsAsArgsWithStrings = (messageContent) => {
//   const splitStringsRegex = /[^\s"]+|"([^"]*)"/gi;
//   let command = messageContent.slice(PREFIX.length)
//   // Apple stupid quotes fix
//   command = command.replace(/‘|’/g, '\'')
//   command = command.replace(/“|”/g, '\"')
//   const commandAsArgsWithStrings = []
//   let match
//   do {
//     //Each call to exec returns the next regex match as an array
//     match = splitStringsRegex.exec(command);
//     if (match != null)
//     {
//         //Index 1 in the array is the captured group if it exists
//         //Index 0 is the matched text, which we use if no captured group exists
//         commandAsArgsWithStrings.push(match[1] ? match[1] : match[0]);
//     }
//   } while (match != null);
//   console.log(commandAsArgsWithStrings)
//   console.log(commandAsArgsWithStrings[0])
//   return commandAsArgsWithStrings
// }

const initNodePersist = async () => {
    await storage.init()
}

// keepAlive()
client.login(BOT_TOKEN)
