const { SlashCommandBuilder } = require('@discordjs/builders');
const zipReplays = require('../common/zipReplays');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replays')
        .setDescription(`Generate a zip of all the submitted replays for this race.`)
        .addStringOption(option =>
            option.setName('raceid')
                .setDescription('The RaceID to submit the race to.')
                .setRequired(true)
        ),
    async execute(interaction, client, race) {

        await interaction.deferReply({ ephemeral: true });
        try{
            zipReplays(interaction.channel, race, interaction.options.getString('raceid'));
        } catch {
            interaction.editReply({
                content: `TinMan Couldn't locate replay files for race with id: ${interaction.options.getString('raceid')}`,
            });
            return
        }
        interaction.editReply({
            content: `Zip generated for race with id: ${interaction.options.getString('raceid')}`,
        });
    },
};