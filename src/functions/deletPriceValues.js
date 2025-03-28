// functions/deletPriceValues.js
const pool = require('../database/db');

async function deletePricesByCategory(categoryName) {
    if (!categoryName || categoryName.trim() === '') {
        return "Por favor, envie um nome válido para a categoria.";
    }

    const trimmedCategoryName = categoryName.trim();

    try {
        // Busca o ID da categoria pelo nome
        const categoryResult = await pool.query(
            'SELECT id FROM categories WHERE LOWER(name) = LOWER($1)',
            [trimmedCategoryName]
        );

        if (categoryResult.rows.length === 0) {
            return `A categoria "${trimmedCategoryName}" não existe.`;
        }

        const categoryId = categoryResult.rows[0].id;

        // Deleta os preços associados à categoria
        const deleteResult = await pool.query(
            'DELETE FROM prices WHERE category_id = $1 RETURNING *',
            [categoryId]
        );

        if (deleteResult.rowCount === 0) {
            return `Nenhum preço encontrado para a categoria "${trimmedCategoryName}".`;
        }

        return `Preços da categoria "${trimmedCategoryName}" foram deletados com sucesso! (${deleteResult.rowCount} registros removidos)`;
    } catch (error) {
        console.error("Erro ao deletar os preços da categoria:", error);
        return "Ocorreu um erro ao deletar os preços da categoria.";
    }
}

module.exports = { deletePricesByCategory };