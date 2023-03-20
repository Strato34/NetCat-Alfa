const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription("Recarga los archivos del bot.")
        .addStringOption(option =>
            option.setName('modulo')
                .setDescription('Recarga un modulo')
                .addChoices(
                    { name: 'Comandos', value: 'comandos' },
                    { name: 'Comandos Diagonales', value: 'slash' },
                    { name: 'Eventos', value: 'events' },
                    { name: 'Handlers', value: 'handlers' },
                    { name: 'Todos los modulos (reboot completo)', value: 'all'},
                )),
    async execute(Client, interaction, prefix, GUILD_DATA) {
        const { ownerid } = require('../../core/socket.json');
        if(interaction.user.id !== `${ownerid}`) return interaction.reply({ content:"**:x: | ERROR:** Usted no es el dueño del bot. Sólo el dueño del bot puede usar este comando.", ephemeral: true}).catch(()=> { null; });
        let args = [interaction.options.getString("modulo")];
        let opcion = "Comandos, Eventos y Handlers";
        try {
            switch (args[0]?.toLowerCase()) {
                case "comands":
                case "comandos": {
                    opcion = "Comandos"
                    await Client.loadCommands();
                }
                    break;

                case "slash":
                case "slashcommands": {
                    opcion = "Comandos Slash"
                    await Client.loadSlashCommands();

                }
                    break;

                case "eventos":
                case "events": {
                    opcion = "Eventos"
                    await Client.loadEvents();
                }
                    break;

                case "handlers": {
                    opcion = "Handlers"
                    await Client.loadHandlers();
                }
                    break;

                default: {
                    await Client.loadEvents();
                    await Client.loadHandlers();
                    await Client.loadSlashCommands();
                    await Client.loadCommands();
                }
                    break;
            }

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields([
                            { name: `✅ ${opcion} Recargados`, value: `> *Okay!*` }
                        ])
                        .setColor(process.env.COLOR)
                ]
            });
        } catch (e) {
            interaction.reply(`**Ha ocurrido un error a al recargar el bot!**\n*Mira la consola para más detalles.*`);
            console.log(e);
            return;
        }
    }
}

