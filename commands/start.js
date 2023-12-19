const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');
const zipReplays = require('../common/zipReplays');
const crypto = require('crypto');
const Race = require('../models/race');
const AudioPlayer = require('../models/audioPlayer');
const fs = require('fs');

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
                        name: 'guarded-og',
                        value: 'guarded-og',
                    },
                    {
                        name: 'safe',
                        value: 'safe',
                    },
                    {
                        name: 'casual',
                        value: 'casual',
                    },
                    {
                        name: 'nimble',
                        value: 'nimble',
                    },
                    {
                        name: 'lycanthrope',
                        value: 'lycanthrope',
                    },
                    {
                        name: 'expedition',
                        value: 'expedition',
                    },
                    {
                        name: 'warlock',
                        value: 'warlock',
                    },
                    {
                        name: 'adventure',
                        value: 'adventure',
                    },
                    {
                        name: 'og',
                        value: 'og',
                    },
                    {
                        name: 'speedrun',
                        value: 'speedrun',
                    },
                    {
                        name: 'bat-master',
                        value: 'bat-master',
                    },
                    {
                        name: 'boss-rush',
                        value: 'boss-rush',
                    },
                    {
                        name: 'bounty-hunter',
                        value: 'bountyhunter',
                    },
                    {
                        name: 'summoner',
                        value: 'summoner',
                    },
                    {
                        name: 'scavenger',
                        value: 'scavenger',
                    },
                    {
                        name: 'aperture',
                        value: 'aperture',
                    },
                    {
                        name: 'Custom',
                        value: 'Custom',
                    },
                ))
        .addBooleanOption(option =>
            option.setName('tournament')
                .setDescription('Tournament races have more restrictions for non-referees.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('unranked')
                .setDescription('Unranked races don\'t get tracked on the leaderboards.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('vanilla-music')
                .setDescription('Determines whether resulting seed will have randomized OST.')
                .setRequired(false)),
    async execute(interaction, client, races) {
        races[interaction.id] = new Race(client,new AudioPlayer(client), interaction.id);

        if (!races[interaction.id].allReplaysSubmitted() && races[interaction.id].replays.lenght > 1) {
            zipReplays(interaction.channel, races[interaction.id], interaction.id);
        }
        let raceChannel = client.guilds.cache.first(1)[0].channels;

        races[interaction.id].initiate(interaction.options.getString('category'), interaction.options.getBoolean('unranked'), interaction.options.getBoolean('tournament'), interaction, raceChannel);
        await interaction.deferReply({ ephemeral: true });
    },
};