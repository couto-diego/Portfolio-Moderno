const mongoose = require('mongoose');

// Esquema de Mensagem
const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'O campo "nome" é obrigatório.'],
            trim: true,
            minlength: [3, 'O nome deve ter pelo menos 3 caracteres.'],
        },
        email: {
            type: String,
            required: [true, 'O campo "e-mail" é obrigatório.'],
            trim: true,
            lowercase: true,
            validate: {
                validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                message: 'Por favor, insira um e-mail válido.',
            },
        },
        message: {
            type: String,
            required: [true, 'O campo "mensagem" é obrigatório.'],
            trim: true,
            minlength: [10, 'A mensagem deve ter pelo menos 10 caracteres.'],
        },
    },
    {
        timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    }
);

// Cria o modelo
module.exports = mongoose.model('Message', MessageSchema);