module.exports = {
    name: 'finish',
    async execute(interaction, client, races) {
        races[interaction?.customId.split(":")[1]].finishPlayer(interaction.user);
        if (races[interaction?.customId.split(":")[1]].isRanked) {
            await interaction.reply({ content: 'Please submit a replay using /replay', ephemeral: true });
        } else {
            interaction.deferUpdate().catch(console.error);
        }
    }
};