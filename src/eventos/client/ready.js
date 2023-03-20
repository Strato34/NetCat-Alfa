const { ActivityType } = require('discord.js');
module.exports = async Client => {
    console.log(`Conectado como ${Client.user.tag}`.green);
    if(Client?.application?.commands) {
        Client.application.commands.set(Client.slashArray);
        console.log(`(/) ${Client.slashCommands.size} Comandos Publicados!`.green);
    }
    var estado = "dnd";
    Client.user.setActivity({name: `Bot en desarrollo`, type: ActivityType.Playing});
    Client.user.setStatus(`${estado}`);
    console.log(`Bot: ${Client.user.username}\nEstado: ${estado}`);
    
}