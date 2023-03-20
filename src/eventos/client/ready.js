const { ActivityType } = require('discord.js');
module.exports = async Client => {
    console.log(`Conectado como ${Client.user.tag}`.green);
    if(Client?.application?.commands) {
        Client.application.commands.set(Client.slashArray);
        console.log(`(/) ${Client.slashCommands.size} Comandos Publicados!`.green);
    }
    var estado = "idle";
    Client.user.setActivity({name: `a SamuelVM`, type: ActivityType.Listening});
    Client.user.setStatus(`${estado}`);
    console.log(`Bot: ${Client.user.username}\nEstado: ${estado}`);
    
}