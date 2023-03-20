const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('megadb');
const staffroledb = new db.crearDB('staffroledb');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('set-staff-role')
    .setDescription('Establece el rol del staff del servidor de NetCat')
    .addRoleOption(option1 =>
        option1.setName('rol')
        .setDescription('Elige el rol del staff')
        .setRequired(true)),

        async execute(netcatcalfa, interaction) {
            return interaction.reply("Comando en desarrollo.");
        }
}