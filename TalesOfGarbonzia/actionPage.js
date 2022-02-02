const { createButtonComponent, createEmbedMessage, getDiceRollImage, getMoralityColor } = require('../Utils/discordEmbedUtils.js')
const AbigaelStories = require('./GameData/Stories/AbigaelDuScarletta')
// const SpiritStories = require('./GameData/Stories/AbigaelDuScarletta')
// const NigelStories = require('./GameData/Stories/AbigaelDuScarletta')

function getComponentsActionPage(actionsAvailable, saveFileName) {

    let components = []
    let actionButtons1 = {'type': 1, 'components': []}
    let actionButtons2 = {'type': 1, 'components': []}
    let utilButtons = {'type': 1, 'components': []}

    actionsAvailable.forEach((action, index) => {
        if (index >=0 && index <=4) {
            actionButtons1.components.push(createButtonComponent(action.actionText, (action.actionPoint + ',' + saveFileName), 'open'))
        } else {
            actionButtons2.components.push(createButtonComponent(action.actionText, (action.actionPoint + ',' + saveFileName), 'open'))
        }
    })
    // components.push(saveButtons)    let saveButtons = {'type': 1, 'components': []}
    // let deleteSaveButtons = {'type': 1, 'components': []}
    // if (deleteSaveButtons.components.length) components.push(deleteSaveButtons)
    // if (Object.keys(gameInfo.history || {}).length) components.push(getGameHistoryButton())

    // This may be complex. basically show buttons for the options available
    // We need to calculate what options are available based on story and character info (inventory/stats etc)

    utilButtons.components.push(createButtonComponent('Home', 'goHome', 'dark'))
    utilButtons.components.push(createButtonComponent('Inventory', 'inventory', 'default'))

    if (actionButtons1.components.length) components.push(actionButtons1)
    if (actionButtons2.components.length) components.push(actionButtons2)
    components.push(utilButtons)

    return components
}

function getStoryPoint(saveData, saveFileName) { // TODO THis is the crux of the game here. Big logic needed
    if (saveData.character === 'Abigael Du Scarletta') return AbigaelStories.getStory(saveData, saveFileName)
    return { messageDescription: 'bfbffb', actionsAvailable: {}}
}

async function performActionPoint(actionPoint, gamesActiveUserId, userData, saveData, saveFileName) {
    if (saveData.character === 'Abigael Du Scarletta') return await AbigaelStories.performActionPoint(actionPoint, gamesActiveUserId, userData, saveData, saveFileName)
}

async function getActionPage(saveData, gamesActiveUserName, saveFileName) {
    const { messageDescription, actionsAvailable } = getStoryPoint(saveData, saveFileName)
    console.log('saveFileName inside action page')
    console.log(saveFileName)
    console.log(messageDescription)
    console.log(actionsAvailable)
    const components = getComponentsActionPage(actionsAvailable, saveFileName)
    const embedColor = getMoralityColor(saveData) || 'ORANGE'
    const embedFooter = 'Current player - ' + gamesActiveUserName + ' - ' + 'Save ' + saveFileName
    let embedImage = saveData.location.image
    if (saveData.events.DiceRoll) {
        embedImage = getDiceRollImage(saveData.events.DiceRoll)
    }
    const embedThumbnail = ''
    // const fields = [{name: CHARACTER_CONSTANTS.ABIGAEL_DU_SCARLETTA, value: CHARACTER_CONSTANTS.ABIGAEL_CHARACTER_INTRO_LONG}, {name: CHARACTER_CONSTANTS.NIGEL_WHITHERSBURY, value: CHARACTER_CONSTANTS.NIGEL_WHITHERSBURY_INTRO_LONG}, {name: CHARACTER_CONSTANTS.THE_SPIRIT, value: CHARACTER_CONSTANTS.THE_SPIRIT_INTRO_LONG}]
    const messageTitle = 'Tales of Garbonzia'

    const embeddedMessage = createEmbedMessage({embedColor, embedFooter, embedImage, embedThumbnail, fields: [], messageDescription, messageTitle})
    return { components, embeddedMessage }
}

module.exports = {
    getActionPage,
    performActionPoint
}