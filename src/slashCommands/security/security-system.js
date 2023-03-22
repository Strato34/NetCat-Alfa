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
            .setDescription('Desactiva el sistema de seguridad en el servidor de NetCat')))
    .addSubcommand(subcommand3 =>
        subcommand3.setName('status')
        .setDescription('Comprueba el estado del sistema de seguridad del servidor de NetCat.')),

            async execute(netcatalfa, interaction) {
                const staffrole = await staffroledb.obtener("staffrole");
                if(!staffrole) return;
                let rol = interaction.guild.roles.cache.find(elrol => elrol.id == `${staffrole}`);
                if(!rol) return;
                if(!interaction.member.roles.cache.has(rol.id)) return interaction.reply({ content: "**:x: | PERMISO DENEGADO:** Sólo el staff de este servidor puede usar este comando.", ephemeral: true}).catch(()=> { null; });

                async function subcommand1() {
                    const securitysystemstatus = await securitysystemstatusdb.obtener("status");
                    if(!securitysystemstatus) {
                        securitysystemstatusdb.set("status", "OFF");
                    }
                    if(securitysystemstatus == "ON") return interaction.reply({content:"**:x: | ERROR:** El sistema de seguridad ya está activado en este servidor.", ephemeral: true}).catch(()=> { null; });
                    securitysystemstatusdb.set("status", "ON");
                    return interaction.reply(":white_check_mark: | Se ha activado correctamente el sistema de seguridad en el servidor oficial de NetCat.").catch(()=> { null; });
                }
                async function subcommand2() {
                    const securitysystemstatus = await securitysystemstatusdb.obtener("status");
                    if(!securitysystemstatus) {
                        securitysystemstatusdb.set("status", "OFF");
                    }
                    if(securitysystemstatus == "OFF") return interaction.reply({content:"**:x: | ERROR:** El sistema de seguridad ya está desactivado en este servidor.", ephemeral: true}).catch(()=> { null; });
                    securitysystemstatusdb.set("status", "OFF");
                    return interaction.reply(":white_check_mark: | Se ha desactivado correctamente el sistema de seguridad en el servidor oficial de NetCat.").catch(()=> { nill; });
                }
                async function subcommand3() {
                    const securitysystemstatus = await securitysystemstatusdb.obtener("status");
                    var status = null;
                    if(!securitysystemstatus) {
                        securitysystemstatusdb.set("status", "OFF");
                    }
                    if(securitysystemstatus == "ON") {
                        var status = "**:green_circle: ONLINE :green_circle:**";
                    }
                    if(securitysystemstatus == "OFF") {
                        var status = ":red_circle: OFFLINE :red_circle:";
                    }
                    if(!status) return;
                    return interaction.reply(`Estado del sistema de seguridad del servidor de NetCat: ${status}`).catch(()=> { null; });
                }

                switch(interaction.options.getSubcommand()) {
                    case 'enable': {
                        subcommand1();
                    }
                    break;
                    case 'disable':{
                        subcommand2();
                    }
                    break;
                    default:{
                        subcommand3();
                    }
                    break;
                }
            }   
}
