require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
const Message = require('./models/Message');

const app = express();

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

const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

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

        try {
                await client.messages.create({
                from: process.env.TWILIO_WHATSAPP_NUMBER,
                to: process.env.YOUR_WHATSAPP_NUMBER,
                messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID, // se estiver usando o Messaging Service SID
                templateSid: process.env.TWILIO_TEMPLATE_SID,
                templateData: {
                '1': name, 
                '2': email, 
                '3': message
                }
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
