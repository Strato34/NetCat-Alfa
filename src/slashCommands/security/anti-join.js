const { SlashCommandBuilder, SelectMenuBuilder } = require('discord.js');
const db = require('megadb');
const staffroledb = new db.crearDB('staffroledb');
const securitysystemstatusdb = new db.crearDB('securitysystemstatusdb');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('anti-join')
    .setDescription('Comando anti-join del sistema de seguridad del servidor oficial de NetCat')
    .addSubcommandGroup(subcommandgroup1 =>
        subcommandgroup1.setName('users')
        .setDescription('Sistema anti-join users')
        .addSubcommand(subcommand1 =>
            subcommand1.setName('config')
            .setDescription('Configura el sistema anti-join users')
            .addStringOption(option1 =>
                option1.setName('status')
                .setDescription('Configura el status del sistema anti-join users')
                .addChoices({name: 'enable', value: '1'}, {name: 'disable', value: '2'})
                .setRequired(true)))
        .addSubcommand(subcommand2 =>
            subcommand2.setName('status')
            .setDescription('Comprueba el estado del sistema anti-join users')))
    .addSubcommandGroup(subcommandgroup2 =>
        subcommandgroup2.setName('bots')
        .setDescription('Sistema anto-join bots')
        .addSubcommand(subcommand3 =>
            subcommand3.setName('config')
            .setDescription('Configura el sistema anti-join bots')
            .addStringOption(option2 =>
                option2.setName('status')
                .setDescription('Configura el status del sistema anti-join bots')
                .addChoices({name: 'enable', value: '1'},{name: 'disable', value: '2'})
                .setRequired(true)))
        .addSubcommand(subcommand4 =>
            subcommand4.setName('status')
            .setDescription('Comprueba el estado del sistema anti-join bots'))),

                async execute(netcatalfa, interaction) {
                    return interaction.reply("Comando en desarrollo");
                }
}