const { SlashCommandBuilder } = require('discord.js');
const db = require('megadb');
const securitysystemstatusdb = new db.crearDB('securitysystemstatusdb');
const staffroledb = new db.crearDB('staffroledb');

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
                const staffrole = await staffroledb.obtener("staffrole");
                if(!staffrole) return;
                let rol = interaction.guild.roles.cache.find(elrol => elrol.id == `${staffrole}`);
                if(!rol) return;
                if(!interaction.member.roles.cache.has(rol)) return interaction.reply({ content: "**:x: | PERMISO DENEGADO:** Sólo el staff de este servidor puede usar este comando.", ephemeral: true}).catch(()=> { null; });

                async function subcommand1() {
                    return;
                }
                async function subcommand2() {
                    return;
                }

                switch(interaction.options.getSubcommand()) {
                    case 'enable': {
                        subcommand1();
                    }
                    break;
                    default:{
                        subcommand2()
                    }
                    break;
                }
            }   
}
