
const { SlashCommandBuilder,
    EmbedBuilder } = require('discord.js');
    
    module.exports = {
        CMD: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping del bot'),
    
    async execute(netcatalfa, interaction) {
        if(!interaction.channel.permissionsFor(netcatalfa.user).has("EmbedLinks")) return interaction.reply({  content: "**<a:netcatalfaemojiincorrecto:1080458827054465075> | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `EmbedLinks`", ephemeral: true }).catch(()=> { null; });
        if(!interaction.channel.permissionsFor(netcatalfa.user).has("SendMessagesInThreads")) {
            if(interaction.channel.type === 11) return interaction.reply({ content:"**<a:netcatalfaemojiincorrecto:1080458827054465075> | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
            if(interaction.channel.type === 12) return interaction.reply({ content:"**<a:netcatalfaemojiincorrecto:1080458827054465075> | ERROR:** No tengo los permisos suficientes. \nPermisos que me faltan: `SendMessagesInThreads`", ephemeral: true}).catch(()=> { null; });
        }
        const time = Date.now()
    
        interaction.reply({ embeds: 
            [new EmbedBuilder()
            .setTitle("Midiendo latencia...")
            .setDescription("Discord API: Calculando...\nTiempo de respuesta del bot: Calculando...")
            .setColor('Yellow')]}).then(() => {
            
            let tiempoTotal = time - Date.now()
            var resultado = Math.abs(tiempoTotal);
            
            interaction.editReply({ embeds: 
                [new EmbedBuilder()
                    .setTitle("Pong! 🏓")
                    .setDescription("`Discord API:` " +netcatalfa.ws.ping+ " ms\n`Tiempo de respuesta del bot:` " +resultado+ " ms")
                    .setColor('Green')]}).catch(()=> null);
        })
    },
    }
