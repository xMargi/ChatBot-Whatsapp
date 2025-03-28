// registerPrice.js
const pool = require('../database/db');

async function registerPriceValue(userId, categoryName, price) {
    if (!categoryName || categoryName.trim() === '') {
        return "Por favor, envie um nome válido para a categoria.";
    }
    if (isNaN(price)) {
        return "Por favor, envie um valor numérico válido.";
    }

    const trimmedCategoryName = categoryName.trim();
    const priceValue = parseFloat(price).toFixed(2);

    try {

        const categoryResult = await pool.query(
            'SELECT id FROM categories WHERE LOWER(name) = LOWER($1)',
            [trimmedCategoryName]
        );

        if (categoryResult.rows.length === 0) {
            return `A categoria "${trimmedCategoryName}" não existe. Crie-a primeiro com "categoria ${trimmedCategoryName}".`;
        }

        const categoryId = categoryResult.rows[0].id;

        await pool.query(
            'INSERT INTO prices (user_id, price, category_id) VALUES ($1, $2, $3)',
            [userId, priceValue, categoryId]
        );

        return `O preço de R$ ${priceValue} foi salvo na categoria "${trimmedCategoryName}" com sucesso!`;
    } catch (error) {
        console.error("Erro ao salvar no banco:", error);
        return "Ocorreu um erro ao salvar o preço.";
    }
}

module.exports = { registerPriceValue };