// functions/somePrices.js
const pool = require('../database/db');

async function somePrices() {
    try {
        const result = await pool.query(`
            SELECT c.name AS category_name, SUM(p.price) AS total
            FROM prices p
            LEFT JOIN categories c ON p.category_id = c.id
            GROUP BY c.name
            ORDER BY c.name;
        `);

        const rows = result.rows;

        if (rows.length === 0 || rows[0].total === null) {
            return "Ainda não há preços registrados.";
        }

        let response = "Categoria | Preço\n";
        rows.forEach(row => {
            const formattedTotal = parseFloat(row.total).toFixed(2);
            response += `${row.category_name} | R$ ${formattedTotal}\n`;
        });

        return response;
    } catch (error) {
        console.error("Erro ao calcular a soma dos preços:", error);
        return "Ocorreu um erro ao calcular a soma dos preços.";
    }
}

module.exports = { somePrices };