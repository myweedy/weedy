exports.handler = async function(event){

    try{

        const data = JSON.parse(event.body);

        const botToken =
        process.env.TELEGRAM_BOT_TOKEN;

        const chatId =
        process.env.TELEGRAM_CHAT_ID;

        const telegramURL = `
https://api.telegram.org/bot${botToken}/sendMessage
`;

        const response = await fetch(telegramURL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                chat_id:chatId,

                text:data.message

            })

        });

        const result = await response.json();

        return{

            statusCode:200,

            body:JSON.stringify(result)

        };

    } catch(error){

        return{

            statusCode:500,

            body:JSON.stringify({
                error:error.message
            })

        };

    }

}