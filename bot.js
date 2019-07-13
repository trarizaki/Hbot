const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "$";

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



Client.on('ready', () => { // When Bot is ready
  console.log(`Bot is launched.`);
})

Client.on('message', async msg => { // When Bot is recived message
  if(msg.author.bot) return; // If Message author is bot dont reply to it .

  SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`).then(res => {

    var s;

    let xp = funcs.generateInt(1, 5); // Generate XP

    if(!res) s = `INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", '{}', '{"wallSrc": "/walls/p2.png"}')`

    if(res) {

      xp = res.xp + xp;

      console.log(xp);

      let level = funcs.getLevelFromExp(xp);
      console.log(level);
      let lvl = res.level;

      if(res.level != level) {
        lvl++;
        msg.channel.send('Level UP!, ' + msg.author + ' just reached level ' + level)
      }

      s = `UPDATE profileSystem SET xp = ${xp}, level = ${lvl} WHERE id = '${msg.author.id}'`

    }

    SQLite.run(s);

  }).catch(err => console.error(err))

    const prefixMention = new RegExp(`^<@!?${Client.user.id}>( |)$`);
    if (msg.content.match(prefixMention)) {
      return msg.reply(`My prefix is \`${prefix}\``);
    }

    if(!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = Client.commands.get(command) || Client.commands.get(Client.aliases.get(command))

    if(msg.content.startsWith(prefix + 'test')) {

      let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)

      if(args[0] == 'delete') {
        SQLite.run(`DELETE * FROM profileSystem`)
        msg.channel.send('Deleted !')
      } else if(args[0] == 'reps') {

        msg.channel.send(`Reps: ${res.rep}`)

      } else {

      msg.channel.send(`XP:${res.xp}, Level:${res.level}`)
      }
    }

    if(cmd == 'فلوسي') {

      let user = msg.mentions.users.first() || msg.author;

      let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${user.id}'`)
      if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

      let credits;

      if(!res) credits = 0;
      else credits = res.credits;

      if(!msg.mentions.users.first()) {

      msg.channel.send(`**Your 💳 balance is: **\`$${credits}\``)

    } else {

      if(msg.mentions.users.first().bot) return msg.channel.send('The Bots doesn\'t have credits.')


      msg.channel.send(`**${user.tag} 💳 balance is: **\`$${credits}\``)

      }

  } else if(cmd == 'هدية') {

    let daily = 86400000;
    let amount = funcs.generateI
nt(100, 300)

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let curDaily = res.lastDaily;
    let credits = res.credits;

    if(curDaily != null && daily - (Date.now() - curDaily) > 0) {

      let timeObj = ms(daily - (Date.now() - curDaily));

      msg.channel.send(`You already collected your daily, try again after ${timeObj.hours} Hours, ${timeObj.minutes} Minutes and ${timeObj.seconds} Seconds.`)

    } else {

      msg.channel.send(`You have successfully collected your daily reward: \`${amount}\``);

      SQLite.run(`UPDATE profileSystem SET credits = ${credits + amount}, lastDaily = ${Date.now()} WHERE id = '${msg.author.id}'`);

    }

  } else if(cmd == 'لايك') {

    let rep = 86400000;

    let men = msg.mentions.users.first();

    if(!men) return msg.channel.send('Please mention the user you want to give him rep.');

    if(men.id === msg.author.id) return msg.channel.send('You can\'t give yourself.');

    if(men.bot) return msg.channel.send('You can\'t give bots rep, but you can give me a rep.')

    let resOfMen = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    let resOfAuthor = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!resOfMen) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)
    if(!resOfAuthor) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let curRep = resOfAuthor.lastRep;

    if(curRep != null && rep - (Date.now() - curRep) > 0) {

      let timeObj = ms(rep - (Date.now() - curRep));

      msg.channel.send(`You already gived your reputation point to someone, try again after ${timeObj.hours} Hours, ${timeObj.minutes} Minutes and ${timeObj.seconds} Seconds.`)

    } else {

      msg.channel.send(`You have successfully gived ${men} a reputation point!`)

      SQLite.run(`UPDATE profileSystem SET lastRep = ${Date.now()} WHERE id = '${msg.author.id}'`)
      SQLite.run(`UPDATE profileSystem SET rep = ${resOfMen.rep + 1} WHERE id = '${men.id}'`)

    }

  } else if(cmd == 'تحويل') {

    let men = msg.mentions.users.first();

    if(!men) return msg.channel.send('Please mention the user you want to transfer credits to him.');

    if(men.id === msg.author.id) return msg.channel.send('You can\'t transfer to yourself.');

    if(men.bot && men.id !== Client.user.id) return msg.channel.send('You can\'t transfer credits to bots.')

    let resOfMen = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    let resOfAuthor = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!resOfMen) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)
    if(!resOfAuthor) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let creditsOfMen = resOfMen.credits;
    let creditsOfAuthor = resOfAuthor.credits;

    if(!args[1] || isNaN(args[1])) return msg.channel.send('Please input number of credits to transfer it.');

    if(parseInt(args[1]) > creditsOfAuthor) return msg.channel.send('You don\'t have enough credits to do this.');

    let newAuthorCredits = (creditsOfAuthor - parseInt(args[1]));
    let newMenCredits = (creditsOfMen + parseInt(args[1]));

    SQLite.run(`UPDATE profileSystem SET credits = ${newAuthorCredits} WHERE id = '${msg.author.id}'`);
    SQLite.run(`UPDATE profileSystem SET credits = ${newMenCredits} WHERE id = '${men.id}'`);

    msg.channel.send(`${msg.author} has tranfered \`$${args[1]}\` to ${men}.`)


  } else if(cmd == 'فلوس') {

    if(!ids.includes(msg.author.id)) return;

    let men = msg.mentions.users.first() || msg.author;

    if(men.bot) return msg.channel.send('Bots dosen\'t have credits.');

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${men.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${men.id}', 200, 0, 0, 0, 0, 0, "Type ${prefix}setinfo to set info", "")`)

    let resu;

    if(men.id === msg.author.id && !msg.mentions.users.first()) resu = args[0];
    else resu = args[1];

    if(!resu || isNaN(resu)) return msg.channel.send('Please input number to add it.');

    SQLite.run(`UPDATE profileSystem SET credits = ${res.credits + parseInt(resu)} WHERE id = '${men.id}'`)

    msg.channel.send('Added!')

  } else if(cmd == 'معلوماتي') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    if(!args[0]) return msg.channel.send('Please input info to set it.');

    SQLite.run(`UPDATE profileSystem SET info = "${args.join(' ')}" WHERE id = '${msg.author.id}'`)

    msg.channel.send('Your info set to: **' + args.join(' ') + '**')

  } else if(cmd == 'شراء') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let hisWalls = res.inventory;

    let wallsShop = config.wallpapers;

    let credits = res.credits;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    let json = JSON.parse(hisWalls);

    if(!json.walls) json = {
      walls: {}
    };

    if(!wallsShop[args[0]]) return msg.channel.send('There is no wallpaper with this number.')

    if(json.walls[args[0]] == wallsShop[args[0]]) return msg.channel.send('You already bought this wallpaper.');

    if(credits < wallsShop[args[0]].price) return msg.channel.send('You don\'t have enough credits to buy this wallpaper');

    json.walls[args[0]] = wallsShop[args[0]];

    let updatedJson = JSON.stringify(json);

    SQLite.run(`UPDATE profileSystem SET inventory = json('${updatedJson}'), credits = ${credits - wallsShop[args[0]].price} WHERE id = '${msg.author.id}'`)

    msg.channel.send(`You have successfully purchased wallpaper No.${args[0]} With Price: \`$${wallsShop[args[0]].price}\``)

  } else if(cmd == 'خلفية') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`)
    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)

    let hisWalls = res.inventory;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    let json = JSON.parse(hisWalls)

    if(!json.walls[args[0]]) return msg.channel.send('You don\'t have this wallpaper in your inventory.');

    let proData = res.profileData;

    let data = JSON.parse(proData);

    data.wallSrc = json.walls[args[0]].src;

    SQLite.run(`UPDATE profileSystem SET profileData = json('${JSON.stringify(data)}') WHERE id = '${msg.author.id}'`);

    msg.channel.send(`Your profile image has been set.`);

  } else if(cmd == 'تجربة') {

    let wallpapers = config.wallpapers;

    if(!args[0] || isNaN(args[0])) return msg.channel.send('Please Select Wallpaper Number.');

    if(!wallpapers[args[0]]) return msg.channel.send('There is no wallpaper with this number.')

    let Image = Canvas.Image,
    canvas = Canvas.createCanvas(300, 300),
    ctx = canvas.getContext('2d');
fs.readFile(__dirname + `/${wallpapers[args[0]].src}`, function (err, Background) {
  fs.readFile(__dirname + `/walls/p1.png`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 297, 305);
});
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 300, 305);
});

  setTimeout(() => {
  msg.channel.send({file:canvas.toBuffer()})
}, 2000)
  } else if(cmd == 'خلفياتي') {

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = '${msg.author.id}'`);

    let data = JSON.parse(res.inventory);

    if(!data.walls) return msg.channel.send('You don\'t have any wallpapers in your inventory');

    let wallsArray = [];

      for (const [key, value] of Object.entries(data.walls)) {
        console.log(`${key} ${JSON.stringify(value)}`);

          wallsArray.push({number: key, s: value.src, p: value.price});

      }

    let embed = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL)
    .setDescription(`Your Wallpapers:`)
    .setFooter(`Tip: To preview wallpaper try \`${prefix}تجربة\``)

    for (var wall in wallsArray) {
      embed.addField(`Wallpaper No.${wallsArray[wall].number}`, `Price: ${wallsArray[wall].p}`, true)
    }

    msg.channel.send(embed)

  } else if(cmd == 'بروفايل') {

    let getvalueof = msg.mentions.users.first() || msg.author;

    let res = await SQLite.get(`SELECT * FROM profileSystem WHERE id = ${getvalueof.id}`)

    if(!res) SQLite.run(`INSERT INTO profileSystem VALUES ('${msg.author.id}', 200, 0, ${xp}, 0, 0, 0, "Type ${prefix}setinfo to set info", "{}", "{wallSrc: '/walls/p2.png'}"`)


    let Image = Canvas.Image,
    canvas = Canvas.createCanvas(300, 300),
    ctx = canvas.getContext('2d');
fs.readFile(__dirname + `/${JSON.parse(res.profileData).wallSrc}`, function (err, Background) {
  fs.readFile(__dirname + `/walls/p1.png`, function (err, Background) {
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 297, 305);
});
  if (err) return console.log(err);
  let BG = Canvas.Image;
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 300, 305);
});


let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
Jimp.read(url, (err, ava) => {
    if (err) return console.log(err);
    ava.getBuffer(Jimp.MIME_PNG, async (err, buf) => {
        if (err) return console.log(err);


        //Avatar
       let Avatar = Canvas.Image;
        let ava = new Avatar;
        ava.src = buf;
     ctx.drawImage(ava, 8, 43, 80, 85); // احداثيات صورتك

        //ur name
        ctx.font = 'bold 16px profile'; // حجم الخط و نوعه
        ctx.fontSize = '40px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF"; // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${getvalueof.username}`, 100, 125) // احداثيات اسمك

         //bord
         let leaderboard = await SQLite.all(`SELECT * FROM profileSystem ORDER BY xp DESC, credits DESC`);
        ctx.font = "regular 12px profile" // نوع الخط وحجمه
        ctx.fontSize = '50px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة
        for(var i = 0;i<leaderboard.length;i++) {
          if(leaderboard[i].id == getvalueof.id) {
            ctx.fillText(`#${i+1}`, 173, 200)
          }
        }


        //credit
        ctx.font = "bold 10px profile" // نوع الخط وحجمه
        ctx.fontSize = '10px'; // عرض الخط
        ctx.fillStyle = '#FFFFFF' // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`$ ${res.credits}`, 156, 163) // احداثيات المصاري

        //poits
        ctx.font = "bold 13px profile" // ن
        ctx.fontSize = '10px'; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.xp}`, 173, 182) // احداثيات النقاط

        //Level
        ctx.font = "bold 27px profile" // نوع الخط و حجمه
        ctx.fontSize = '50px'; // عرض الخط
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.level}`, 30, 200) // احداثيات اللفل

        //info
        ctx.font = "blod 13px profile" // ن
        ctx.fontSize = '10px'; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#FFFFFF" // لون الخط
        ctx.textAlign = "left"; // محاذا ة النص
        ctx.fillText(`${res.info}`, 118, 40) // احداثيات النقاط

        // REP
        ctx.font = "bold 27px profile";
        ctx.fontSize = "100px";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "left";
        ctx.fillText(`+${res.rep}`, 18,270)

msg.channel.send("**:white_check_mark: `Show Profile` ➤**" + `${msg.author}`, {
file: canvas.toBuffer()
})
})
})


  }

});




client.login(process.env.BOT_TOKEN);
