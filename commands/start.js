const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription(`Starts a new race with the selected options.`)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of the race')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Guarded OG',
                        value: 'Guarded-OG',
                    },
                    {
                        name: 'Safe',
                        value: 'Safe',
                    },
                    {
                        name: 'Casual',
                        value: 'Casual',
                    },
                    {
                        name: 'Nimble',
                        value: 'Nimble',
                    },
                    {
                        name: 'Lycanthrope',
                        value: 'Lycanthrope',
                    },
                    {
                        name: 'Expedition',
                        value: 'Expedition',
                    },
                    {
                        name: 'Warlock',
                        value: 'Warlock',
                    },
                    {
                        name: 'Adventure',
                        value: 'Adventure',
                    },
                    {
                        name: 'OG',
                        value: 'OG',
                    },
                    {
                        name: 'Speedrun',
                        value: 'Speedrun',
                    },
                    {
                        name: 'Bat master',
                        value: 'Bat-master',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    },
                )),
    async execute(interaction, client, race) {
        if (race.tournament && interaction.member.roles.cache) {
            interaction.member.roles.cache.has(role => role.id == id)
        }

        if ((race.started || !race.finished) && race.tournament && !interaction.member.roles.cache.find(x => x.id === config.refereeRoleId)) {
            await interaction.reply({ content: 'Only referees can close tournament races!', ephemeral: true });
            return;
        }

        race.initiate(interaction.options.getString('category'), interaction.options.getBoolean('ranked'), interaction.options.getBoolean('tournament'), interaction.user);
        await interaction.reply({ content: 'Race initiated!', ephemeral: true });
    },
};