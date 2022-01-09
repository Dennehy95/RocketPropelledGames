const { createButtonComponent, createEmbedMessage } = require('../Utils/discordEmbedUtils.js')

function getComponentsCharacterSelectPage(currentCharacter, saveFileName) {
    let components = [
        {'type': 1, 'components': [
            createButtonComponent('Home', 'goHome', 'dark'),
            createButtonComponent('Prev', 'prevCharacter,' + currentCharacter.name + ',' + saveFileName, 'default'),
            createButtonComponent('Select Character', 'selectCharacter,' + currentCharacter.name + ',' + saveFileName, 'open'),
            createButtonComponent('Next', 'nextCharacter,' + currentCharacter.name + ',' + saveFileName, 'default')
        ]}
    ]

    return components
}

function getInventoryAsString(inventory) {
    let inventoryString = ''
    for(const [key, value] of Object.entries(inventory)) {
        inventoryString = inventoryString + '> **' + key + '**'
        if (Array.isArray(value)) {
            value.forEach(item => {
                if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
                    inventoryString = inventoryString + '\n > \u200b \u200b *' + item.Name + '*'
                } else {
                    inventoryString = inventoryString + '\n > \u200b \u200b *' + item + '*'
                }
            }
            )
        }
        else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            for(const [innerKey, innerValue] of Object.entries(value)) {
                inventoryString = inventoryString + '\n > \u200b \u200b' + innerKey
                if (typeof innerValue === 'object' && !Array.isArray(innerValue) && innerValue !== null) {
                    for(const [innerInnerKey, innerInnerValue] of Object.entries(innerValue)) {
                        console.log(innerInnerKey)
                        if (innerInnerKey === 'Description')
                            inventoryString = inventoryString + ': *' + innerInnerValue + '*'
                    }
                }
                else inventoryString = inventoryString + ': *' + innerValue + '*'
            }
        }
        inventoryString = inventoryString + '\n\u200b\n'
    }
    return inventoryString
}

function getStatsAsString(stats) {
    let inventoryString = ''
    for(const [key, value] of Object.entries(stats)) {
        inventoryString = inventoryString + '> ** ' + key + '**'
        inventoryString = inventoryString + ': *' + value + '*'
        inventoryString = inventoryString + '\n'
    }
    return inventoryString
}

async function getCharacterSelectPage(currentCharacter, gamesActiveUserName, saveFileName) {
    const components = getComponentsCharacterSelectPage(currentCharacter, saveFileName)
    const embedColor = currentCharacter.embedColor || 'BLUE'
    const embedFooter = 'Current player - ' + gamesActiveUserName + ' - ' + saveFileName
    const embedImage = currentCharacter.image
    const embedThumbnail = currentCharacter.thumbnail
    // "fields": [
    //     {
    //       "name": `Abigael Du scarletta`,
    //       "value": `An exiled warrior from a holy order, you were forced to flee when your branch was decimated after a betrayal from two of your closest companions. With your lover slain at their hands you have vowed to track them down and exact justice.`
    //     },
    //     {
    //       "name": `Inventory`,
    //       "value": `Weapons: Scimitar\nCurrency: 10 Gold, A Raisinsdasdadasdasdasdasdsadas\nArmour`,
    //       "inline": true
    //     },
    //     {
    //       "name": `Stats`,
    //       "value": `Health - 5\nWisdom - 7\nStrength - 2`,
    //       "inline": true
    //     }
    const fields = [
        {name: currentCharacter.name, value: currentCharacter.characterIntroLong, inline: false},
        {name: 'Starting Inventory', value: getInventoryAsString(currentCharacter.inventory), inline: true},
        {name: 'Starting Stats', value: getStatsAsString(currentCharacter.stats), inline: true}
    ]
    const messageTitle = 'Tales of Garbonzia - Character Select'
    let messageDescription = ''

    const embeddedMessage = createEmbedMessage({embedColor, embedFooter, embedImage, embedThumbnail, fields, messageDescription, messageTitle})
    return { components, embeddedMessage }
}

module.exports = {
    getCharacterSelectPage,
}