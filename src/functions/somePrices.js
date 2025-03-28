const pool = require('../database/db');

async function somePrices() {
    try {
        const result = await pool.query('SELECT SUM(price) AS total FROM prices');
        const total = result.rows[0].total;

        if (total === null) {
            return "Ainda não há preços registrados.";
        }

        return `O total de preços registrados é R$ ${parseFloat(total).toFixed(2)}.`;
    } catch (error) {
        console.error("Erro ao calcular a soma dos preços:", error);
        return "Ocorreu um erro ao calcular a soma dos preços.";
    }
}

module.exports = { somePrices };
