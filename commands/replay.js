const { SlashCommandBuilder } = require('@discordjs/builders');
const downloadReplay = require('../common/downloadReplay');
const zipReplays = require('../common/zipReplays');
const config = require('../config.json');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replay')
        .setDescription(`Submit a replay.`)
        .addAttachmentOption(option => 
            option.setName('replay')
            .setDescription('Your replay for this race.')
            .setRequired(true)
        ),
    async execute(interaction, client, race) {
        if (!race.finished || race.seedName === "") {
            await interaction.reply({ content: `Race has to be finished!`, ephemeral: true });
            return;
        }

        if (!race.includes(interaction.user.id)) {
            await interaction.reply({ content: `Can't set the seed if you are not in the race!`, ephemeral: true });
            return;
        }

        let replay = interaction.options.getAttachment('replay');

        if (replay.size > 35000) {
            await interaction.reply({ content: `File size was too large!`, ephemeral: true });
            return;
        }

        if (!replay.name.endsWith(".sotnr")) {
            await interaction.reply({ content: `Invalid file type!`, ephemeral: true });
            return;
        }

        if (race.seedName === "custom") {
            let name = replay.name.replace(".sotnr","");
            let preset = "";
            let seedName = "";

            let matchPreset = name.match(/(ADVENTURE|BAT-MASTER|CASUAL|EMPTY-HAND|EXPEDITION|GEM-FARMER|GLITCH|GUARDED-OG|LYCANTHROPE|NIMBLE|OG|SAFE|SCAVENGER|SPEEDRUN|THIRD-CASTLE|WARLOCK|CUSTOM)/);
            
            if (matchPreset) {
                preset = matchPreset[1];
            }
        
            name = name.replace(preset, '');
            
            let match = name.match(/([a-zA-Z0-9()]{5,50})([-]){1}([a-zA-Z0-9 -]{0,30})$/i);
            if (match && match.length == 4) {
                seedName = match[1];
            }

            race.setSeedName(seedName);
        }

        if (fs.existsSync(config.replaysFolder + "/" + race.seedName + "/" + replay.name)) {
            await interaction.reply({ content: `Invalid. File already submitted!`, ephemeral: true });
            return;
        }

        await downloadReplay(replay.url, replay.name, race);

        if (race.allReplaysSubmitted()) {
            zipReplays(interaction.channel, race);
        }

        await interaction.reply({ content: 'Replay submitted!', ephemeral: true });
    },
};