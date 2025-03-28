// index.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { registerPriceValue } = require('./functions/registerPriceValue');
const { deletePricesByCategory } = require('./functions/deletPriceValues');
const { registerCategory } = require('./functions/registerCategories');
const { getCommands } = require('./functions/getCommands');
const { listTables } = require('./functions/listTables');
const { somePrices } = require('./functions/somePrices');

// Armazenar o estado da conversa
const conversationState = {};

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
    const userId = message.from; // Definido aqui para ser usado em todo o escopo

    // Verifica se o usuário está no meio de um fluxo de reset
    if (conversationState[userId] && conversationState[userId].step === 'awaiting_category_for_reset') {
        const categoryName = message.body.trim();
        const response = await deletePricesByCategory(categoryName);
        client.sendMessage(userId, response);
        delete conversationState[userId];
        return;
    }

    // Comando para registrar preço com categoria
    if (msg.startsWith('!preço ')) { // Padronizei sem acento
        const args = msg.replace('!preço ', '').match(/"[^"]+"|[^\s"]+/g);
        if (!args || args.length < 2) {
            message.reply('Use o formato: !preco "nome da categoria" "valor"');
            return;
        }

        const categoryName = args[0].replace(/"/g, '').trim();
        const price = args[1].replace(/"/g, '').trim();

        const response = await registerPriceValue(userId, categoryName, price);
        message.reply(response);
    }

    // Comando para criar categoria
    if (msg.startsWith('!categoria ')) {
        const categoryName = msg.replace('!categoria ', '').trim();
        const response = await registerCategory(categoryName);
        message.reply(response);
    }

    // Comando para ver total
    if (msg === '!total') {
        const totalResponse = await somePrices(); // Corrigido para somePrices
        client.sendMessage(userId, totalResponse);
    }

    // Comando para resetar (pergunta a categoria)
    if (msg === '!reset') {
        conversationState[userId] = { step: 'awaiting_category_for_reset' };
        client.sendMessage(userId, "Qual categoria você quer deletar os preços?");
        return;
    }

    // Comando para listar tabelas
    if (msg === '!tabelas') {
        const tablesResponse = await listTables();
        client.sendMessage(userId, tablesResponse);
    }

    // Comando para listar comandos
    if (msg === '!comandos') {
        const commandsResponse = await getCommands();
        client.sendMessage(userId, commandsResponse);
    }
});

client.initialize();