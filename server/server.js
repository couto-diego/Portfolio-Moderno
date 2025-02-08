const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
const Message = require('./models/Message');

// Carregar variáveis de ambiente
require('dotenv').config();

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Carregar do .env
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Carregar do .env
const client = twilio(accountSid, authToken);

if (
    !process.env.MONGO_URI ||
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_WHATSAPP_NUMBER ||
    !process.env.YOUR_WHATSAPP_NUMBER ||
    !process.env.TWILIO_TEMPLATE_SID ||
    !process.env.CORS_ORIGIN
) {
    console.error('Faltando variáveis de ambiente essenciais.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    });

app.post('/api/contact', [
    body('name').notEmpty().withMessage('O campo "nome" é obrigatório.').isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),
    body('email').isEmail().withMessage('Por favor, insira um e-mail válido.'),
    body('message').notEmpty().withMessage('O campo "mensagem" é obrigatório.').isLength({ min: 10 }).withMessage('A mensagem deve ter pelo menos 10 caracteres.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
        const newMessage = await Message.create({ name, email, message });
        console.log('Mensagem salva:', newMessage);

        // Enviar mensagem via WhatsApp com o template Twilio
        try {
            await client.messages.create({
                from: process.env.TWILIO_WHATSAPP_NUMBER,  // Usando variáveis do .env
                contentSid: process.env.TWILIO_TEMPLATE_SID, // SID do seu template
                contentVariables: JSON.stringify({ '1': name, '2': email, '3': message }), // Variáveis do template
                to: process.env.YOUR_WHATSAPP_NUMBER, // Número para o qual você quer enviar a mensagem
            });
            console.log('Notificação via WhatsApp enviada.');
        } catch (error) {
            console.error('Erro ao enviar mensagem via WhatsApp:', error);
        }

        res.status(200).json({
            message: 'Mensagem recebida com sucesso! Notificação enviada.',
            messageId: newMessage._id,
        });
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        res.status(500).json({ error: 'Erro interno ao salvar mensagem.' });
    }
});
app.listen(process.env.PORT || 5000, () => console.log('Servidor rodando.'));
