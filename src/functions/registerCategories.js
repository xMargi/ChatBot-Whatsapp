// registerCategory.js
const pool = require('../database/db');

async function registerCategory(categoryName) {
    // Validação básica do nome da categoria
    if (!categoryName || categoryName.trim() === '') {
        return "Por favor, envie um nome válido para a categoria.";
    }

    const trimmedName = categoryName.trim();

    try {
        const checkQuery = await pool.query(
            'SELECT * FROM categories WHERE LOWER(name) = LOWER($1)',
            [trimmedName]
        );

        if (checkQuery.rows.length > 0) {
            return `A categoria "${trimmedName}" já existe!`;
        }

        // Insere a nova categoria
        await pool.query(
            'INSERT INTO categories (name) VALUES ($1)',
            [trimmedName]
        );

        return `Categoria "${trimmedName}" criada com sucesso!`;
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        return "Ocorreu um erro ao criar a categoria.";
    }
}

module.exports = { registerCategory };