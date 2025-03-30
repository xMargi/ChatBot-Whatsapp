// functions/getCommands.js
async function getCommands() {
    const commands = [
        {
            command: '!preco "nome da categoria" "valor"',
            description: 'Adiciona um preço a uma categoria específica e soma ao total existente',
            example: '!preco "Alimentação" "50.00"'
        },
        {
            command: '!total',
            description: 'Mostra uma lista com o total acumulado por categoria',
            example: '!total'
        },
        {
            command: '!reset',
            description: 'Inicia o processo para deletar os preços de uma categoria específica',
            example: '!reset (depois responde com o nome da categoria, ex.: "Alimentação")'
        },
        {
            command: '!comandos',
            description: 'Lista todos os comandos disponíveis',
            example: '!comandos'
        },
        {
            command: '!categoria "nome"',
            description: 'Cria uma nova categoria',
            example: '!categoria "Transporte"'
        },
        {
            command: '!tabelas',
            description: 'Lista as tabelas do banco de dados',
            example: '!tabelas'
        }
    ];

    // Monta a tabela formatada usando template strings
    let response = `Comandos disponíveis:\n\n`;
    response += `Comando                     | Descrição                                            | Exemplo de Uso\n`;
    response += `---------------------------------------------------------------------------------\n`;

    for (const { command, description, example } of commands) {
        const commandPadding = ' '.repeat(Math.max(0, 27 - command.length)); // Alinha a coluna "Comando"
        const descriptionPadding = ' '.repeat(Math.max(0, 52 - description.length)); // Alinha a coluna "Descrição"
        response += `${command}${commandPadding} | ${description}${descriptionPadding} | ${example}\n`;
    }

    return response;
}

module.exports = { getCommands };