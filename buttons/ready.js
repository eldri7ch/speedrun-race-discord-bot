module.exports = {
    name: 'ready',
    async execute(interaction, client, races) {
        console.log("READY ID: " + interaction?.customId);
        console.log(races);
        races[interaction?.customId.split(":")[1]].readyPlayer(interaction.user);
        interaction.deferUpdate().catch(console.error)
    }
};