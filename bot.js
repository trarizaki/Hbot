const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "h!";

// ========================================== [ CONSTRUCTERS ] =========================================

client.on("ready", async() => {
    client.user.setGame("Loading...");
console.log(`Back Online In ${client.guilds.size} Servers!`);
console.log(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nInvite Me To Your Server!`);
    setTimeout(() => {
        client.user.setActivity(`${prefix}help | V 1.1`, {type: "WATCHING"});
    }, 3000);
});

// ========================================== [ BROADCAST COMMANDS ] ====================================


/*
السلام عليكم ورحمة الله وبركاته .
هذا ملف بوت برودكاست بوت بالظبط ولكن فيه بعض التصليحات لمشاكل موجودة في البوت
-
جميع الحقوق محفوظة لسيرفر كودز .
CODES SERVER - MOORZ
*/

client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
        if(!message.channel.guild) return;
            var args = message.content.split(" ").slice(1).join(" ");
            if(command == "bc") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.forEach(member => {
                                            let bc = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bc);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            if(command == "bco") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.filter(r => r.presence.status !== "offline").size} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.filter(r => r.presence.status !== "offline").forEach(member => {
                                            let bco = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bco);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
});

// ========================================== [ OTHER COMMANDS ] ====================================


client.on("message", async message => {
    if(message.content == prefix + "server") {
        if(!message.channel.guild) return;
            if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("ليس لديك الصلآحية الكآفية . :broken_heart:");
            }

                let server = new Discord.RichEmbed()
                    .setAuthor(message.guild.name)
                    .setColor("RANDOM")
                    .setTitle("Server Info :hearts: :sparkles:")
                    .setDescription(`Members :bust_in_silhouette: : ${message.guild.memberCount}\nOwner :crown: : ${message.guild.owner.user.username}\nServer ID :id: : ${message.guild.id}\nRoles :lock: : ${message.guild.roles.size}\nRegion :earth_africa: : ${message.guild.region.toUpperCase()}`);

                    message.channel.sendEmbed(server);

    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "banned")) {
        if(!message.guild) return;
        message.guild.fetchBans()
        .then(bans => {
            let b = bans.size;
            let bb = bans.map(a => `${a}`).join(" - ");
            message.channel.send(`**\`${b}\` | ${bb}**`);
        });
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "invite")) {
        let invite = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(message.author.avatarURL)
            .setTitle("**Click Here To Invite The Bot To Your Server :sparkling_heart:**")
            .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
            message.channel.sendEmbed(invite);
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "help")) {
        let help = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(`**__برودكاست بوت | Version 1.1__ 

            برودكاست عادي : ${prefix}bc
            دعوة البوت لسيرفرك : ${prefix}invite
            معلومات عن السيرفر : ${prefix}server
            برودكاست للأونلاين فقط : ${prefix}bco
            يعرض لك عدد المتبندين من سيرفرك : ${prefix}banned
            رابط سيرفر الدعم الفني : https://discord.gg/YEXcDXt 
            **`);
            message.channel.sendEmbed(help); // رابط السيرفر يعود الى سيرفر CODES .
    }
});

// DONE BY MOORZ .
// CODES - COPYRIGHT





client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith("h!say")) {
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You dont have** `ADMINISTRATOR` **permission**');
var args = message.content.trim().split(/ +/g).slice(1);
let cname = args[0];
let chan = message.guild.channels.find(element => element.name === cname);
if (chan) {
    let text = args.slice(1).join(" ");
    message.delete();
    chan.send(text);
} else {
    let text = args.join(" ");
    message.delete();
    message.channel.send(text);
   }
}
});



client.on("message", message => {
  if (message.content.includes("<@599535902708203550>")) {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
   
  }
});


client.on('message', message => {
         if (message.content === prefix + "dt") {
         if (!message.channel.guild) return message.reply('** This command only for servers **');  
         var currentTime = new Date(),
            hours = currentTime.getHours() + 1 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }  
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";
           
            }  
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
 
            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
 
 
                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png")
                .setTitle( "『التاريخ  والوقت』")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                .addField('الجزائر',
                "『"+ hours + ":" + minutes +":"+ seconds + "』")
                 .addField('مكه المكرمه',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』")
                .addField('مصر',
                "『"+ hours3 + ":" + minutes +":"+ seconds  + "』")
               
                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")
 
                 message.channel.sendEmbed(Date15);
        }
    });



client.on('message', message => {
    var api = `${Math.round(client.ping)}`
    if (message.content.startsWith("h!status")) {
      message.channel.send({
 embed: new Discord.RichEmbed() 
    .setColor('RED')
    .addField('**RAM 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**PING📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
         .addField('**WebSocket:**',api + " ms 📶 ")
        .addField('**Runtime⌚**', `${Math.round(client.ping)}` + 'ms')
        .addField('**CPU💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
     })
    }
  });
  function timeCon(time) {
    let days = Math.floor(time % 31536000 / 86400)
    let hours = Math.floor(time % 31536000 % 86400 / 3600)
    let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
    let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
    days = days > 9 ? days : '0' + days
    hours = hours > 9 ? hours : '0' + hours
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds
    return `${days > 0 ? `${days}:` : ''}${(hours || days) > 0 ? `${hours}:` : ''}${minutes}:${seconds}`
};








const Discord = require('discord.js'); //Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes//Toxic Codes
const client = new Discord.Client();
const db = require("quick.db");
 
const serverStats = {
    guildID: '596394734172504095',
    ticketCategoryID: '603285350739083276'
 
}
 
 
//It's not a command, just send a DM for bot and...
 
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') {
        let active = await db.fetch(`support_${message.author.id}`);
        let guild = client.guilds.get(serverStats.guildID);
        let channel, found = true;
        try {
            if (active) client.channels.get(active.channelID)
                .guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found) {
            active = {};
            channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`/complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)
 
            channel.overwritePermissions("465147579517370368", { //Role id (when someone join my server get this role with id <<, i dont know how to change it for @everyone. This will prevent users to see the channel, only admins will see!
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });//Toxic Codes
 
 
 
            let author = message.author;
            const newChannel = new Discord.RichEmbed()//Toxic Codes
                .setColor('RANDOM')
                .setAuthor(author.tag, author.avatarURL)
                .setFooter('Support Ticket Created!')
                .addField('User', author)
                .addField('ID', author.id)
            await channel.send(newChannel);
            const newTicket = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hello, ${author.username}`, author.avatarURL)
                .setFooter('Support Ticket Created!')
            await author.send(newTicket);
            active.channelID = channel.id;
            active.targetID = author.id;
        }
        channel = client.channels.get(active.channelID);//Toxic Codes
        const dm = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
            .setFooter(`Your message has been sent - A staff member will be in contact soon.`)//Toxic Codes
        await message.author.send(dm);
        if (message.content.startsWith(prefix + 'complete')) return;
        const embed5 = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(message.content)
            .setFooter(`Message Received - ${message.author.tag}`)
        await channel.send(embed5);
        db.set(`support_${message.author.id}`, active);
        db.set(`supportChannel_${channel.id}`, message.author.id); //Toxic Codes
        return;
    }
    let support = await db.fetch(`supportChannel_${message.channel.id}`); //Toxic Codes
    if (support) {
        support = await db.fetch(`support_${support}`);
        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();
        if (message.content.toLowerCase() === '/complete') { //Toxic Codes
            const complete = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
                .setFooter('Ticket Closed -- Toxic Codes')
                .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
            supportUser.send(complete);
            message.channel.delete();
            db.delete(`support_${support.targetID}`);
            let inEmbed = new Discord.RichEmbed()
                .setTitle('Ticket Closed!')
                .addField('Support User', `${supportUser.tag}`)
                .addField('Closer', message.author.tag)
                .setColor('RANDOM')
            const staffChannel = client.channels.get('489156917092941826'); //Create a log channel and put id here
            staffChannel.send(inEmbed); //Toxic Codes
        }
        const embed4 = new Discord.RichEmbed() //Toxic Codes
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(`Message Received - Toxic Codes`)
            .setDescription(message.content)
        client.users.get(support.targetID)
            .send(embed4);
        message.delete({
            timeout: 10000
        }); //Toxic Codes
        embed4.setFooter(`Message Sent -- ${supportUser.tag}`) //Toxic Codes
            .setDescription(message.content); //Toxic Codes
        return message.channel.send(embed4); //Toxic Codes
    }
}); //Toxic Codes




client.login(process.env.BOT_TOKEN);
