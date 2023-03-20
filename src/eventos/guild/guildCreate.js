const db = require('megadb');
const staffroledb = new db.crearDB('staffroledb');
const staffchanneldb = new db.crearDB('staffchanneldb');

module.exports = async(netcatalfa, guild) => {
    guild.leave();
    let servidoroficial = netcatalfa.guilds.cache.find(servidor => servidor.id == "1055509023581032489");
    if(!servidoroficial) return;
    const staffrole = await staffroledb.obtener("staffrole");
    if(!staffrole) return;
    let rol = servidoroficial.roles.cache.find(elrol => elrol.id == `${staffrole}`);
    if(!rol) return;
    const staffchannel = await staffchanneldb.obtener("staffchannel");
    if(!staffchannel) return;
    let canal = servidoroficial.channels.cache.find(elcanal => elcanal.id == `${staffchannel}`);
    if(!canal) return;

    let owner = await guild.fetchOwner();

    let mensajedealerta = "**:rotating_light: | ALERTA:** Actividad sospechosa detectada en mis bases de datos.\nMe han invitado a un servidor no autorizado!\n**ID del servidor no autorizado:** " + `${guild.id}` + "\n**Nombre del servidor no autorizado: **" + `${guild.name}` + `\n**ID del dueño del servidor:** ${owner.id}` + `\n**Dueño del servidor no autorizado:** ${owner}` + "\nPing: " + `<@&${rol}>.`;

    canal.send(`${mensajedealerta}`);

}