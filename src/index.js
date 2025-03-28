const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { registerPriceValue } = require('./functions/registerPriceValue');
const { somePrices } = require('./functions/somePrices');
const { resetPrices } = require('./functions/deletPriceValues');
const { registerCategory } = require('./functions/registerCateogory');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('Escaneie o QR Code com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot conectado!');
});

client.on('message', async message => {
    const msg = message.body.toLowerCase();

    if (msg.startsWith('!preço ')) {
        const args = msg.replace('!preço ', '').match(/"[^"]+"|[^\s"]+/g);
        if (!args || args.length < 2) {
            message.reply('Use o formato: !preco "nome da categoria" "valor"');
            return;
        }

        const categoryName = args[0].replace(/"/g, '').trim();
        const price = args[1].replace(/"/g, '').trim(); 
        const userId = message.from;

        const response = await registerPriceValue(userId, categoryName, price);
        message.reply(response);
    }

    // Comando para criar categoria
    if (msg.startsWith('categoria ')) {
        const categoryName = msg.replace('categoria ', '').trim();
        const response = await registerCategory(categoryName);
        message.reply(response);
    }

    // Comando para ver total
    if (msg === '!total') {
        const totalResponse = await somePrices();
        client.sendMessage(message.from, totalResponse);
    }

    // Comando para resetar
    if (msg === '!reset') {
        const resetResponse = await resetPrices();
        client.sendMessage(message.from, resetResponse);
    }
});



client.initialize();
