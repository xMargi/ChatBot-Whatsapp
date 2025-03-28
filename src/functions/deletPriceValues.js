const pool = require('../database/db');

async function resetPrices() {
    try {
        await pool.query('DELETE FROM prices');
        return "Todos os preços foram resetados com sucesso!";
    } catch (error) {
        console.error("Erro ao resetar os preços:", error);
        return "Ocorreu um erro ao resetar os preços.";
    }
}

module.exports = { resetPrices };
