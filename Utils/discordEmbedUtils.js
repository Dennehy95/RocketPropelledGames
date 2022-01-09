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
    getMoralityColor,
}
