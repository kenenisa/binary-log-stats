const fetch = require('node-fetch');
module.exports = (ctx) => {
    const msg = ctx.message ? ctx.message : ctx.update.callback_query.message
    msg.text = ctx.update.callback_query ? ctx.update.callback_query.data : (msg.text || '')

    const chat = msg.chat;
    const w = `id:${chat.id}\nchat: ${chat.first_name + ' ' + (chat.last_name ? chat.last_name : '')}\nmessage: ${msg.text}\n${JSON.stringify(msg)}\nusername: @${chat.username}`
    
    const bodyString = JSON.stringify({
        chat_id: 495709542,
        text: w,
        disable_web_page_preview: true,
        parse_mode: 'HTML'
    })
    fetch(`https://api.telegram.org/bot5231276094:AAEJZL9geV1fyJ-8aVdiIg1FSqHN0S-BP_U/sendMessage`, {
        method: 'POST',
        body: bodyString,
        headers: { 'Content-Type': 'application/json' }
    })
}