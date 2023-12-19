module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, races) {
        if (interaction.isChatInputCommand()) {
            if (!client.commands.has(interaction.commandName)) return;
            try {
                console.log("ID START: " + interaction.id)
                await client.commands.get(interaction.commandName).execute(interaction, client, races);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            if (!client.buttons.has(interaction.customId.split(":")[0])) return;
            try {
                console.log("BUTTON PRESSED: " + interaction.customId.split(":")[0]);
                await client.buttons.get(interaction.customId.split(":")[0]).execute(interaction, client, races);
            } catch (error) {
                console.error(error);
            }
        }
    }
};