// functions/listTables.js
const pool = require('../database/db');

async function listTables() {
    try {
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);

        const tables = result.rows.map(row => row.table_name);

        if (tables.length === 0) {
            return "Nenhuma tabela encontrada no esquema público.";
        }

        return `Tabelas no banco de dados:\n- ${tables.join('\n- ')}`;
    } catch (error) {
        console.error("Erro ao listar tabelas:", error);
        return "Ocorreu um erro ao listar as tabelas.";
    }
}

module.exports = { listTables };