const { SlashCommandBuilder } = require('discord.js');
const db = require('megadb');
const staffroledb = new db.crearDB('staffroledb');
const { ownerid } = require('../../core/socket.json');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setName('set-staff-role')
    .setDescription('Establece el rol del staff del servidor de NetCat')
    .addRoleOption(option1 =>
        option1.setName('rol')
        .setDescription('Elige el rol del staff')
        .setRequired(true)),

        async execute(netcatcalfa, interaction) {
            let rol = interaction.options.getRole('rol');
            const staffrole = await staffroledb.obtener('staffrole');
            if(!staffrole) {
                staffroledb.establecer("staffrole", "ninguno");
            }
            if(interaction.user.id !== ownerid) {
                interaction.reply({ content:`**:x: | PERMISO DENEGADO:** Solo <@${ownerid}> puede usar este comando!`, ephemeral: true}).catch(()=> { null; });
            }
            if(!rol) return interaction.reply({ content: "**:x: | ERROR:** El rol introducido no existe en este servidor.", ephemeral: true}).catch(()=> { null; });
            staffroledb.establecer("staffrole", `${rol.id}`);
            interaction.reply(`:white_check_mark: | Se ha establecido correctamente el rol ${rol} como rol de staff del servidor de NetCat.`).catch(()=> { null; });
        }
}