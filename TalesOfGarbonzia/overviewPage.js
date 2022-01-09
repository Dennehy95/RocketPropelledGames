const { createButtonComponent, createEmbedMessage } = require('../Utils/discordEmbedUtils.js')
const storage = require('node-persist')

function getGameHistoryButton() {
    return {'type': 1, 'components': [createButtonComponent('History', 'history', 'open')]}
}

function getComponentsOverviewPage(gameInfo) {
    let components = []
    let saveButtons = {'type': 1, 'components': []}
    let deleteSaveButtons = {'type': 1, 'components': []}
    const save1Exists = !!gameInfo.Save1?.saveTime
    const save2Exists = !!gameInfo.Save2?.saveTime
    const save3Exists = !!gameInfo.Save3?.saveTime

    //Save1
    if (save1Exists) {
        saveButtons.components.push(createButtonComponent('\u200b Open Save 1 \u200b', 'openSave,1,talesOfGarbonzia', 'open'))
        deleteSaveButtons.components.push(createButtonComponent('Delete Save 1', 'deleteSave,1,talesOfGarbonzia', 'delete'))
    } else {
        saveButtons.components.push(createButtonComponent('\u200b \u200b New Game \u200b \u200b ', 'Save,1,talesOfGarbonzia', 'default'))
        if (save2Exists || save3Exists) deleteSaveButtons.components.push(createButtonComponent('Delete Save 1', 'deleteSave,1,talesOfGarbonzia', 'delete', true))
    }
    //Save2
    if (save2Exists) {
        saveButtons.components.push(createButtonComponent('\u200b Open Save 2 \u200b ', 'openSave,2,talesOfGarbonzia', 'open'))
        deleteSaveButtons.components.push(createButtonComponent('Delete Save 2', 'deleteSave,2,talesOfGarbonzia', 'delete'))
    } else if (save1Exists) {
        saveButtons.components.push(createButtonComponent('\u200b \u200b New Game \u200b \u200b ', 'Save,2,talesOfGarbonzia', 'default'))
        if (save3Exists) deleteSaveButtons.components.push(createButtonComponent('Delete Save 2', 'deleteSave,2,talesOfGarbonzia', 'delete', true))
    }
    //Save3
    if (save3Exists) {
        saveButtons.components.push(createButtonComponent('\u200b Open Save 3 \u200b', 'openSave,3,talesOfGarbonzia', 'open'))
        deleteSaveButtons.components.push(createButtonComponent('Delete Save 3', 'deleteSave,3,talesOfGarbonzia', 'delete'))
    } else if (save2Exists) {
        saveButtons.components.push(createButtonComponent('\u200b \u200b New Game \u200b \u200b ', 'Save,3,talesOfGarbonzia', 'default'))
    }

    components.push(saveButtons)
    if (deleteSaveButtons.components.length) components.push(deleteSaveButtons)
    if (Object.keys(gameInfo.history || {}).length) components.push(getGameHistoryButton())

    return components
}

async function getOverviewPage(server, user) {
    let userData = await storage.getItem(user.id)
    if (!userData || !Object.keys(userData).length) {
        await storage.setItem(user.id, { serverList:[{serverId: server.id, serverName: server.name}], username: user.username })
        userData = await storage.getItem(user.id)
    }
    const userTalesOfGarbonziaData = userData.talesOfGarbonzia || {}
    const Save1 = userTalesOfGarbonziaData.Save1 || {}
    const Save1Info = Save1.saveTime? Save1.character + ', ' + Save1.location.name + ', ' + Save1.saveTime : '*Empty*'
    const Save2 = userTalesOfGarbonziaData.Save2 || {}
    const Save2Info = Save2.saveTime? Save2.character + ', ' + Save2.location.name + ', ' + Save2.saveTime : '*Empty*'
    const Save3 = userTalesOfGarbonziaData.Save3 || {}
    const Save3Info = Save3.saveTime? Save3.character + ', ' + Save3.location.name + ', ' + Save3.saveTime : '*Empty*'
    const components = getComponentsOverviewPage(userTalesOfGarbonziaData)
    const embedColor = 'GREEN'
    const embedFooter = '\u200b'
    const embedImage = ''
    const fields = [{name: 'Saved Games', value: '\u200B'}, {name: 'Save1: ', value: Save1Info}, {name: 'Save2: ', value: Save2Info}, {name: 'Save3: ', value: Save3Info}]
    const messageTitle = 'Tales of Garbonzia'
    let messageDescription = 'Player: ' + user.username + '\n\n > Enter the land of Garbonzia and take on the role of one of 3 heroes, each with their own motives and backstory. Explore new locations, interact with witty characters and make tough, story defining decisions as you live vicariously through your chosen champion. Will you survive to your journeys end? And if you do, will you be satisfied with the life you have lived?'

    const embeddedMessage = createEmbedMessage({embedColor, embedFooter, embedImage, fields, messageDescription, messageTitle})
    return { components, embeddedMessage }
}

module.exports = {
    getOverviewPage,
}