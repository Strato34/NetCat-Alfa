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
                    const staffrole = await staffroledb.obtener("staffrole");
                    if(!staffrole) return;
                    let rol = interaction.guild.roles.cache.find(elrol => elrol.id == `${staffrole}`);
                    if(!rol) return;
                    if(!interaction.member.roles.cache.has(rol.id)) return interaction.reply({ content: "**:x: | PERMISO DENEGADO:** Sólo el staff de este servidor puede usar este comando.", ephemeral: true}).catch(()=> { null; });

                    const securitysystemstatus = await securitysystemstatusdb.obtener("status");
                    if(!securitysystemstatus) {
                        securitysystemstatusdb.set("status", "OFF");
                    }
                    if(securitysystemstatus == "OFF") return interaction.reply({ content:"**:x: | ERROR:** El sistema de seguridad está desactivado en este servidor.", ephemeral: true}).catch(()=> { null; });

                    async function subcommandgroup1() {
                        async function subcommand1() {
                            return interaction.reply("subcomando1");
                        }

                        async function subcommand2() {
                            return interaction.reply("subcomando2");
                        }

                        switch(interaction.options.getSubcommand()) {
                            case 'config': {
                                subcommand1();
                            }
                            break;
                            default:{
                                subcommand2();
                            }
                            break;
                        }
                    }
                    async function subcommandgroup2() {
                        async function subcommand3() {
                            return interaction.reply("subcomando3");
                        }

                        async function subcommand4() {
                            return interaction.reply("subcomando4");
                        }

                        switch(interaction.options.getSubcommand()) {
                            case 'config': {
                                subcommand3();
                            }
                            break;
                            default:{
                                subcommand4();
                            }
                            break;
                        }
                    }

                    switch(interaction.options.getSubcommandGroup()) {
                        case 'users':{
                            subcommandgroup1();
                        }
                        break;
                        default:{
                            subcommandgroup2();
                        }
                        break;
                    }
                }
}