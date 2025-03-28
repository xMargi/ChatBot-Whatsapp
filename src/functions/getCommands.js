// functions/getCommands.js
async function getCommands() {
    const commands = [
        '!preco "nome da categoria" "valor" "Adiciona um preço a uma categoria específica e soma ao total existente"',
        '!total "Mostra uma lista com o total acumulado por categoria"',
        '!reset "Inicia o processo para deletar os preços de uma categoria específica"',
        '!comandos "Lista todos os comandos disponíveis"',
        '!categoria "nome" "Cria uma nova categoria"',
        '!tabelas "Lista as tabelas do banco de dados"'
    ];

    let response = "Comandos disponíveis:\n";
    commands.forEach(command => {
        response += `${command}\n`;
    });

    return response;
}

module.exports = { getCommands };