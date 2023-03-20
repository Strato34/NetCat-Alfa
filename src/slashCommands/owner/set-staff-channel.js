const { SlashCommandBuilder, ChannelType } = require('discord.js');
const db = require('megadb');
const staffchanneldb = new db.crearDB('staffchanneldb');

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
            return interaction.reply("Comando en desarrollo.");
        }
}