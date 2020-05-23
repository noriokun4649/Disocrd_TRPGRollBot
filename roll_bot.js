const Discord = require('discord.js')

const client = new Discord.Client()
client.login('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') //Discord login token


client.on('ready', () => {
    console.log("Bot準備完了")
});

client.on('message', message => {
    if (!message.guild) return

    if (message.content.indexOf('!roll') == 0) {
        let mes = message.content.split(' ')
        if (mes.length < 2) {
            message.channel.send(message.member.displayName + "の「1D100」ロール：" + Math.floor(roll("1D100")))
        } else {
            let sum = 0
            let num = mes[1]
            let sp = num.split('+')
            for (let i = 0; i < sp.length; i++) {
                roll(sp[i]).forEach(element => {
                    sum += element
                })
            }
            message.channel.send(message.member.displayName + "の「" + num + "」ロール。結果：" + Math.floor(sum))
        }
    }

    function roll(para_str) {
        let para = para_str.split('D')
        if (para.length < 2) {
            return rolls(para[0], 1)
        } else {
            return rolls(para[0], para[1])
        }
    }
    function rolls(count, roll_num) {
        let output = Array(roll_num)
        for (let i = 0; i < count; i++) {
            var rand = Math.random() * (roll_num - 1) + 1
            output[i] = rand
        }
        return output
    }
});

