require('dotenv').config()
const dPlanet = require('./d-planet.json')
const token = process.env.TOKEN
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(token, { polling: true });
const planets = ['Меркурий', 'Венера', 'Земля', 'Марс', 'Юпитер', 'Сатурн', 'Уран', 'Нептун'] //Подумать как превратить в кнопки.
const splitToRows = (items, count) => {
    const rows = []
    for (let i = 0; i < items.length; i += count) {
        const row = items.slice(i, i + count);
        rows.push(row)
    }
    return rows;
}
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Выберите объект изучения', {
        reply_markup: {
            keyboard: [
                ['Планеты','Солнце']
            ]
        }
    })
})
// bot.on('callback_query', (query) => {
//     const [prefix] = query.data.split()
//     const chatId = query.message.chat.id
//     if (prefix === 'sun') {
//         bot.sendMessage(chatId, 'Солнце (астр. ☉) — одна из звёзд нашей Галактики (Млечный Путь) и единственная звезда Солнечной системы. Вокруг Солнца обращаются другие объекты этой системы: планеты и их спутники, карликовые планеты и их спутники, астероиды, метеороиды, кометы и космическая пыль.')
//     } else if (prefix === 'planets') {
//         bot.sendMessage(chatId, 'Планеты', {
//             reply_markup: {
//                 keyboard: [
//                     ['Меркурий', 'Венера', 'Земля'],
//                     ['Марс', 'Юпитер', 'Сатурн'],
//                     ['Уран', 'Нептун']
//                 ]
//             }
//         })
//     }

// })
bot.on('message', msg => {
    const chatId = msg.chat.id
    const text = msg.text.toLowerCase()
    if (dPlanet[text]) {
        bot.sendMessage(chatId, dPlanet[msg.text])
    } else if ('солнце'===text) {
        bot.sendMessage(chatId, 'Солнце (астр. ☉) — одна из звёзд нашей Галактики (Млечный Путь) и единственная звезда Солнечной системы. Вокруг Солнца обращаются другие объекты этой системы: планеты и их спутники, карликовые планеты и их спутники, астероиды, метеороиды, кометы и космическая пыль.')
    } else if ('планеты'===text) {
        bot.sendMessage(chatId, 'Планеты', {
            reply_markup: {
                keyboard: splitToRows(planets, 3)
                // [
                //     ['Меркурий', 'Венера', 'Земля'],
                //     ['Марс', 'Юпитер', 'Сатурн'],
                //     ['Уран', 'Нептун']
                // ]
            }
        })
    } else {
        bot.sendMessage(chatId, 'Увы, такой планеты нет')
    }

})






