import {Telegraf, Markup} from "telegraf";
import {message} from "telegraf/filters";
import nodemailer from 'nodemailer';

const token = '7009879789:AAHhIi1lERScJBUkuZO3eBpRFIitaP2d7h0';
const webAppUrl = 'https://angular-tg-app-928de.web.app/'

const bot = new Telegraf(token);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kasoi129@gmail.com',
        pass: 'otzi yogx ejtb piwv'
    }
});

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
    const feedbackMessage = data?.feedback || 'empty message';

    const mailOptions = {
        from: 'kasoi129@gmail.com',
        to: 'k.s.s94@mail.ru',
        subject: 'Feedback',
        text: feedbackMessage
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    ctx.reply(`Ваше сообщение: ${feedbackMessage}`);
});

bot.launch();