module.exports = {
    name: 'join',
    async execute(interaction, client, races) {
        races[interaction?.customId.split(":")[1]].joinPlayer(interaction.user);
        races[interaction?.customId.split(":")[1]].generateMultistream();
        races[interaction?.customId.split(":")[1]].updateSeed();
        interaction.deferUpdate().catch(console.error)
    }
};