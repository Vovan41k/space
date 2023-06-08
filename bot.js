require('dotenv').config()
const dPlanet = require('./d-planet.json')
const token = process.env.TOKEN
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(token, { polling: true });
const planets = ['Меркурий','Венера','Земля','Марс','Юпитер','Сатурн','Уран','Нептун'] //Подумать как превратить в кнопки.
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Выберите объект изучения', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text:'Солнце',
                        callback_data:'sun'
                    },
                    {
                        text:'Планеты',
                        callback_data:'planets'
                    }
                ]
            ]
        }
    })
})
bot.on('callback_query', (query)=>{
    const [prefix] = query.data.split()
    const chatId = query.message.chat.id
    if(prefix==='sun'){
        bot.sendMessage(chatId, 'Солнце (астр. ☉) — одна из звёзд нашей Галактики (Млечный Путь) и единственная звезда Солнечной системы. Вокруг Солнца обращаются другие объекты этой системы: планеты и их спутники, карликовые планеты и их спутники, астероиды, метеороиды, кометы и космическая пыль.')
    } else if(prefix==='planets'){
       bot.sendMessage(chatId, 'Планеты', {reply_markup: {
        keyboard: [
            ['Меркурий','Венера','Земля'],
            ['Марс','Юпитер','Сатурн'],
            ['Уран','Нептун']
        ]
    }
    })
    }

})
bot.on('message', msg =>{
    const chatId = msg.chat.id
    if(dPlanet[msg.text]){
        bot.sendMessage(chatId, dPlanet[msg.text])
    }
})
    
    
    



