import {Telegraf, Markup} from "telegraf";
import {message} from "telegraf/filters";

const token = '7009879789:AAHhIi1lERScJBUkuZO3eBpRFIitaP2d7h0';
const webAppUrl = 'https://angular-tg-app-928de.web.app/'

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp(
                'Отправить сообщение',
                 `${webAppUrl}/feedback`
            )
        ])
    )
});

bot.on(message('web_app_data'), async (ctx) => {
    const data = ctx.webAppData.data.json();
    ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? 'empty message');
})

bot.launch();