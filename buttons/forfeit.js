module.exports = {
    name: 'forfeit',
    async execute(interaction, client, races) {
        races[interaction?.customId.split(":")[1]].forfeitPlayer(interaction.user);
        interaction.deferUpdate().catch(console.error)
    }
};