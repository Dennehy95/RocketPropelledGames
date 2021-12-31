/* GENERIC VARIABLES */

/* */

/* PROD VARIABLES */

/* */

/* BETA VARIABLES*/

/* */

const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
// const PuzzlePages = require('../Puzzles/puzzlePages');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tales_of_garbonzia')
        .setDescription('Explore the wondrous land of Garbonzia.'),
    async execute(interaction) {
    // const messageDetails = await PuzzlePages.getOverviewPuzzlePage(interaction.guild.id)
        const messageDetails = {embedColor: 'GREEN', messageDescription: 'Message DESC', messageTitle: 'Title'}
        const { components, embedColor, messageDescription, messageTitle } = { ...messageDetails }
        const embeds = [
            new MessageEmbed()
                .setColor(embedColor || 'GREEN')
                .setTitle(messageTitle || 'MESSAGE TITLE')
                .setDescription(messageDescription || 'MESSAGE DESC')
        ]
        await interaction.reply({
            content: 'Welcome to Garbonzia',
            ephemeral: true,
            embeds
        })
    },
}