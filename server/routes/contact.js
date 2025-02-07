const express = require('express');
const { body, validationResult } = require('express-validator'); // Middleware para validação
const Message = require('../models/Message');
const router = express.Router();

// Rota POST para salvar mensagens
router.post(
    '/',
    [
        // Validação dos campos usando express-validator
        body('name').notEmpty().withMessage('O campo "nome" é obrigatório.').isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),
        body('email').isEmail().withMessage('Por favor, insira um e-mail válido.'),
        body('message').notEmpty().withMessage('O campo "mensagem" é obrigatório.').isLength({ min: 10 }).withMessage('A mensagem deve ter pelo menos 10 caracteres.'),
    ],
    async (req, res) => {
        // Verifica se há erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, message } = req.body;

        try {
            // Cria a mensagem no banco de dados
            await Message.create({ name, email, message });
            res.status(200).json({ message: 'Mensagem recebida com sucesso!' });
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error); // Log do erro
            res.status(500).json({ error: 'Erro interno ao salvar mensagem.' });
        }
    }
);

module.exports = router;