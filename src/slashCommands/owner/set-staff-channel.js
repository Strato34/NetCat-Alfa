const { SlashCommandBuilder, ChannelType } = require('discord.js');
const db = require('megadb');
const staffchanneldb = new db.crearDB('staffchanneldb');
const { ownerid } = require('../../core/socket.json');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('set-staff-channel')
    .setDescription('Establece un canal para el staff en el servidor de NetCat')
    .addChannelOption(option1 =>
        option1.setName('canal')
        .setDescription('Selecciona un canal')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),

        async execute(netcatalfa, interaction) {
            let canal = interaction.options.getChannel('canal');
            if(interaction.user.id !== ownerid) {
                interaction.reply({ content:`**:x: | PERMISO DENEGADO:** Solo <@${ownerid}> puede usar este comando!`, ephemeral: true}).catch(()=> { null; });
            }
            if(!canal) return interaction.reply({ content: "**:x: | ERROR:** El canal introducido no existe en este servidor.", ephemeral: true}).catch(()=> { null; });
            const staffchannel = await staffchanneldb.obtener("staffchannel");
            if(!staffchannel) {
                staffchanneldb.establecer("staffchannel", "ninguno");
            }
            staffchanneldb.establecer("staffchannel", `${canal.id}`);
            interaction.reply(`:white_check_mark: | Se ha establecido correctamente el canal ${canal} como canal del staff del servidor de NetCat.`).catch(()=> { null; });
        }
}