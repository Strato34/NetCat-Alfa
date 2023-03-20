const { SlashCommandBuilder } = require('discord.js');
const db = require('megadb');
const securitysystemstatusdb = new db.crearDB('securitysystemstatusdb');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('security-system')
    .setDescription('Sistema de seguridad del servidor de NetCat')
    .addSubcommandGroup(subcommandgroup1 =>
        subcommandgroup1.setName('config')
        .setDescription('Configura el sistema de seguridad del servidor de NetCat')
        .addSubcommand(subcommand1 =>
            subcommand1.setName('enable')
            .setDescription('Activa el sistema de seguridad en el servidor de NetCat.'))
        .addSubcommand(subcommand2 =>
            subcommand2.setName('disable')
            .setDescription('Desactiva el sistema de seguridad en el servidor de NetCat'))),

            async execute(netcatalfa, interaction) {
                return interaction.reply("Sistema de seguridad en desarrollo");
            }
}
