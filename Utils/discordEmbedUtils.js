const { MessageEmbed } = require('discord.js')

function createButtonComponent(label, customId, style = 'default', isDisabled = false) {
    return {
        'style': style === 'default' ? 1 : style === 'dark' ? 2 : style === 'open' ? 3 : style === 'delete' ? 4 : 1,
        'label': label,
        'custom_id': customId,
        'disabled': isDisabled,
        'type': 2
    }
}

function createEmbedMessage(embedDetails) {
    const { embedColor, embedFooter, embedImage, embedThumbnail, fields, messageDescription, messageTitle} = { ...embedDetails }

    return [
        new MessageEmbed()
            .setColor(embedColor)
            .setFooter({text: embedFooter})
            .setImage(embedImage)
            .setThumbnail(embedThumbnail)
            .setTitle(messageTitle)
            .setDescription(messageDescription)
            .setFields(fields)
    ]
}

function getDiceRollImage(diceRoll) {
    let diceRollImage = ''
    switch(diceRoll) {
    case 1:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938444833796812901/unknown.png'
        break
    case 2:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938444929812791397/unknown.png'
        break
    case 3:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938444950020960376/unknown.png'
        break
    case 4:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938444968404586526/unknown.png'
        break
    case 5:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938444985873887292/unknown.png'
        break
    case 6:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445005893292032/unknown.png'
        break
    case 7:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445025598119936/unknown.png'
        break
    case 8:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445044195684382/unknown.png'
        break
    case 9:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445062747086848/unknown.png'
        break
    case 10:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445084121260042/unknown.png'
        break
    case 11:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445116983611413/unknown.png'
        break
    case 12:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445148633858079/unknown.png'
        break
    case 13:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445167743078460/unknown.png'
        break
    case 14:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445195446472734/unknown.png'
        break
    case 15:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445215822389268/unknown.png'
        break
    case 16:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445233836924938/unknown.png'
        break
    case 17:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445256431652925/unknown.png'
        break
    case 18:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445273506668544/unknown.png'
        break
    case 19:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445290170617896/unknown.png'
        break
    case 20:
        diceRollImage = 'https://cdn.discordapp.com/attachments/938444812586201189/938445306490667048/unknown.png'
        break
    default: ''
    }
    return diceRollImage
}

function getMoralityColor(moralityValue) {
    let colour = 'BLUE'
    switch(moralityValue) {
    case 1:
        colour = 'BLACK'
        break
    case 2:
    case 3:
        colour = 'DARK_RED'
        break
    case 4:
    case 5:
        colour = 'DARK_ORANGE'
        break
    case 6:
    case 7:
        colour = 'DARK_BLUE'
        break
    case 8:
    case 9:
        colour = 'BLUE'
        break
    case 10:
        colour = 'WHITE'
        break
    default: 'BLUE'
    }
    return colour
}

module.exports = {
    createButtonComponent,
    createEmbedMessage,
    getDiceRollImage,
    getMoralityColor,
}
