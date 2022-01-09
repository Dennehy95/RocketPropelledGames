/* GENERIC VARIABLES */

/* */

/* PROD VARIABLES */

/* */

/* BETA VARIABLES*/

/* */

const { SlashCommandBuilder } = require('@discordjs/builders')
const TalesOfGarbonzia = require('../TalesOfGarbonzia/talesOfGarbonzia')

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
        if (interaction.options?._hoistedOptions.length) {
            isEphemeral = interaction.options?._hoistedOptions.find(option => option.name === 'hide').value
        }
        const {components, embeddedMessage} = await TalesOfGarbonzia.getOverviewPage(interaction.guild, interaction.user)
        await interaction.reply({
            components,
            ephemeral: isEphemeral,
            embeds: embeddedMessage
        })
    },
}