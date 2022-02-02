const CHARACTER_CONSTANTS = require('./GameData/characterInfo')
const CharacterSelectPage = require('./characterSelectPage')
const ActionPage = require('./actionPage')
const OverviewPage = require('./overviewPage')
const storage = require('node-persist')

function getActionPage(saveData, gamesActiveUserName, saveFileName) {
    console.log('GET ACTIONS OAGE')
    console.log(saveData,)
    console.log(gamesActiveUserName)
    console.log(saveFileName)
    return ActionPage.getActionPage(saveData, gamesActiveUserName, saveFileName)
}

function getCharacterSelectPage(currentCharacter, gamesActiveUserName, saveFileName) {
    return CharacterSelectPage.getCharacterSelectPage(currentCharacter, gamesActiveUserName, saveFileName)
}

function getOverviewPage(server, user) {
    return OverviewPage.getOverviewPage(server, user)
}

function getInitialSaveObject(characterName) {
    const characterInfo = CHARACTER_CONSTANTS.characters.find((object) => {
        return object.name === characterName
    })
    const saveTime = new Date().toTimeString()
    return {
        character: characterInfo.name,
        events: {},
        inventory: characterInfo.inventory,
        location: characterInfo.location,
        saveTime,
        stats: characterInfo.stats,
        story: characterInfo.story,
        storyPoint: characterInfo.storyPoint,
    }
}


async function beginListeningForGameInstructions(client) {
    client.on('interactionCreate', async interaction => {
        if (interaction.isCommand()) return
        if (interaction.user.bot) return
        if (!interaction.componentType === 'BUTTON') return
        if (interaction.message.author.id !== client.user.id) return
        if (!interaction.message.guild) return

        const gamesAction = interaction.customId
        const gamesActiveUserId = interaction.message.interaction.user.id
        const gamesActiveUserName = interaction.message.interaction.user.username

        if (gamesActiveUserId !== interaction.user.id) return await interaction.reply({
            content: 'Only the active player can play this game. Type /tales_of_garbonzia to start your own game',
            ephemeral: true,
        })

        if (gamesAction.startsWith('goHome')) { //TODO need to track which save
            const {components, embeddedMessage} = await getOverviewPage(interaction.guild, interaction.user)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        /* Game overview page buttons */
        // New game takes you to character select screen
        if (gamesAction.startsWith('Save')) { //TODO need to track which save
            const currentCharacter = CHARACTER_CONSTANTS.characters[0]
            const saveFileName = 'Save' + gamesAction.split(',')[1]
            const {components, embeddedMessage} = await getCharacterSelectPage(currentCharacter, gamesActiveUserName, saveFileName)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        // Open save
        if (gamesAction.startsWith('openSave')) {
            const saveToBeOpened = gamesAction.split(',')[1]
            let userData = await storage.getItem(gamesActiveUserId)
            const saveData = userData.talesOfGarbonzia['Save' + saveToBeOpened]
            const {components, embeddedMessage} = await getActionPage(saveData, gamesActiveUserName, saveToBeOpened)

            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        // Delete Save
        if (gamesAction.startsWith('deleteSave')) {
            const saveToBeDeleted = 'Save' + gamesAction.split(',')[1]
            let userData = await storage.getItem(gamesActiveUserId)
            delete userData.talesOfGarbonzia[saveToBeDeleted]

            await storage.setItem(gamesActiveUserId, userData)
            
            const {components, embeddedMessage} = await getOverviewPage(interaction.guild, interaction.user)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }

        /* Character select page buttons */
        if (gamesAction.startsWith('nextCharacter')) {
            const currentCharacter = gamesAction.split(',')[1]
            const saveFileName = gamesAction.split(',')[2]
            const currentCharacterIndex = CHARACTER_CONSTANTS.characters.findIndex((object) => {
                return object.name === currentCharacter
            })
            let nextCharacterIndex = currentCharacterIndex + 1
            if (nextCharacterIndex === CHARACTER_CONSTANTS.characters.length) nextCharacterIndex = 0
            const nextCharacter = CHARACTER_CONSTANTS.characters[nextCharacterIndex]
            const {components, embeddedMessage} = await getCharacterSelectPage(nextCharacter, gamesActiveUserName, saveFileName)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        if (gamesAction.startsWith('prevCharacter')) {
            const currentCharacter = gamesAction.split(',')[1]
            const saveFileName = gamesAction.split(',')[2]
            const currentCharacterIndex = CHARACTER_CONSTANTS.characters.findIndex((object) => {
                return object.name === currentCharacter
            })
            let nextCharacterIndex = currentCharacterIndex - 1
            if (nextCharacterIndex === -1) nextCharacterIndex = CHARACTER_CONSTANTS.characters.length -1
            const nextCharacter = CHARACTER_CONSTANTS.characters[nextCharacterIndex]
            const {components, embeddedMessage} = await getCharacterSelectPage(nextCharacter, gamesActiveUserName, saveFileName)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        if (gamesAction.startsWith('selectCharacter')) {
            // Populate next available save with this characters initial stats
            const characterChosen = gamesAction.split(',')[1]
            const saveFileName = gamesAction.split(',')[2]
            let userData = await storage.getItem(gamesActiveUserId)
            if (!userData.talesOfGarbonzia || !Object.keys(userData.talesOfGarbonzia).length) {
                const userTalesOfGarbonziaData = getInitialSaveObject(characterChosen)
                userData.talesOfGarbonzia = {}
                userData.talesOfGarbonzia[saveFileName] = userTalesOfGarbonziaData
                await storage.updateItem(gamesActiveUserId, userData)
            } else {
                const userTalesOfGarbonziaData = getInitialSaveObject(characterChosen)
                if (!userData.talesOfGarbonzia[saveFileName] || !Object.keys(userData.talesOfGarbonzia[saveFileName]).length) {
                    userData.talesOfGarbonzia[saveFileName] = userTalesOfGarbonziaData
                    await storage.updateItem(gamesActiveUserId, userData)
                } else {
                    return interaction.reply({
                        content: 'The save file you are trying to create already exists. Please return to home and either continue the save, or delete the save and try again.'
                    })
                }

            }
            // If no empty saves are available, reply saying so, advising to go home and restart old save or delete saves
            
            const {components, embeddedMessage} = await getActionPage(userData.talesOfGarbonzia[saveFileName], gamesActiveUserName, saveFileName)
            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }

        /* Action Page buttons */
        // Story action point chosen
        if (gamesAction.startsWith('actionPoint')) {
            const actionPoint = gamesAction.split(',')[0]
            const saveFileName = gamesAction.split(',')[1]
            // await actionPointXStoryPointY function, this updates store then call get story function
            const userData = await storage.getItem(gamesActiveUserId)
            console.log(userData)
            console.log('saveFileName')
            console.log(saveFileName)
            let saveData = userData.talesOfGarbonzia[saveFileName]
            if (saveData) saveData = clearTempSaveData(saveData)
            saveData = await clearTempSaveData(saveData)
            console.log('saveData')
            console.log(saveData)
            // console.log(saveData)
            await ActionPage.performActionPoint(actionPoint, gamesActiveUserId, userData, saveData, saveFileName)

            const {components, embeddedMessage} = await getActionPage(saveData, gamesActiveUserName, saveFileName)

            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        // Next story point chosen
        if (gamesAction.startsWith('storyPoint')) {
            console.log(gamesAction)
            console.log('GAMES STORY POINT')
            const storyPoint = gamesAction.split(',')[0]
            // SET NEW STORY POINT IN SAVE STORE??
            const saveFileName = gamesAction.split(',')[1]
            // await actionPointXStoryPointY function, this updates store then call get story function
            let userData = await storage.getItem(gamesActiveUserId)
            let saveData = userData.talesOfGarbonzia[saveFileName]
            if (saveData) saveData = clearTempSaveData(saveData)
            saveData.storyPoint = storyPoint
            await storage.setItem(gamesActiveUserId, userData)

            const {components, embeddedMessage} = await getActionPage(saveData, gamesActiveUserName, saveFileName)

            return await interaction.update({
                components,
                embeds: embeddedMessage
            })
        }
        return
    })

    function clearTempSaveData(saveData) {
        delete saveData.events.DiceRoll
        delete saveData.events.DiceRollTotal
        delete saveData.events.DiceRollBonusText
        return saveData
    }
}

module.exports = {
    beginListeningForGameInstructions,
    getCharacterSelectPage,
    getOverviewPage,
}