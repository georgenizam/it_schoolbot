const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const helper = require('./helper');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');
const fs = require('fs');
const reglamentDir = config.DOCS;





helper.logStart();

const bot = new TelegramBot(config.TOKEN, {
    polling: true
});




bot.onText(/\/start/, msg => {
    const text = `Здравствуйте ${msg.from.first_name}\nВыберите команду для начала работы:`;
    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    });
});

bot.on('message', msg => {
    console.log('Working!');
    //console.log(msg);

    const chatId = helper.getChatId(msg);

    switch (msg.text) {
        case kb.home.registration:
            //showFavouriteFilms(chatId, msg.from.id);
            //registrationUser(chatId, {'reg'});
            bot.sendMessage(chatId, 'Выберите тип участника', {
                reply_markup: {
                    keyboard: keyboard.reg
                },
            });
            break;

        case kb.home.review:
            bot.sendMessage(chatId, 'Можете оставить отзыв в письменном или аудио формате', {
                reply_markup: {
                    keyboard: keyboard.reviewKb
                },
                //callback_data: 'otz'
            });
            break;

        case kb.regStudTeach.stud:
            bot.sendMessage(chatId, 'Выберите пункт меню, затем введите данные участника:', {
                reply_markup: {
                    keyboard: keyboard.regStud
                }
            });
            break;


        case kb.home.task:
            // выывод всех регламентов
            fs.readdir(reglamentDir, (err, files) => {
               files.forEach(namefile => {

                   fs.readFile((reglamentDir + namefile), (err, file) => {
                       bot.sendDocument(chatId, file, {}, {filename: `${namefile}`});
                   });
               })
            });
            break;


        case kb.regStudTeach.teacher:
            bot.sendMessage(chatId, 'Выберите пункт меню, затем введите данные тренера:', {
                reply_markup: {
                    keyboard: keyboard.regTeach
                }
            });
            break;

        case kb.back:
            bot.sendMessage(chatId, 'Для начала работы выберите команду:', {
                reply_markup: {
                    keyboard: keyboard.home
                }
            });
            break;
    }
    if (msg.voice.mime_type === 'audio/ogg')
    {

        const fileOptions = {
            // Explicitly specify the file name.
            filename: 'customfilename',
            // Explicitly specify the MIME type.
            contentType: 'audio/mpeg',
        };

        const fileId = msg.voice.file_id;
        const fileInfo = bot.getFile(fileId).then( (path) => console.log('путь',path));
        //console.log(fileInfo);
        downloadFile(fileId, './review');
        // https://api.telegram.org/bot821921525:AAHGiglH-Q0m2eAwLtO98AiZ5pf2zzOUDj0/getFile?file_id=AwADAgADywMAAjipIEvg7aHL_cy4TwI

        //bot.file
        // const path = bot.downloadFile(fileId, `./review`, ).then( (path) => {
        //     console.log(path);
        // });
    }

});

bot.on('callback_query', query => {
    const userdId = query.from.id;
    //bot.sendMessage()
});

function registrationUser(chatId, query){

}






https://api.telegram.org/bot<bot_token>/getFile?file_id=the_file_id
https://api.telegram.org/bot821921525:AAHGiglH-Q0m2eAwLtO98AiZ5pf2zzOUDj0/getFile?file_id=AwADAgAD6gIAAth7UEvp8M5Oar1GVgI


<html>
    <head>
    </head>
        <body>
            {&quot;ok&quot;:true,&quot;result&quot;:
            {&quot;file_id&quot;:&quot;AwADAgADBAQAAth7WEtD2psiam5ncwI&quot;,&quot;file_size&quot;:6950,&quot;file_path&quot;:&quot;voice/file_45.oga&quot;}}
        </body>
</html>