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
        .setDescription('Explore the wondrous land of Garbonzia.')
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Only you can see game')
            .setRequired(false),
        ),
    async execute(interaction) {
        let isEphemeral = false
        console.log(interaction.options.name)
        console.log(interaction.options.hide)
        console.log(interaction.options.hoistedOptions)
        console.log(interaction.options._hoistedOptions)
        if (interaction.options?._hoistedOptions.length) {
            isEphemeral = interaction.options?._hoistedOptions.find(option => option.name === 'hide').value
        }
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
            ephemeral: isEphemeral,
            embeds
        })
    },
}