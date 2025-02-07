require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
const Message = require('./models/Message');

// Inicializa o aplicativo Express
const app = express();

// Validação de variáveis de ambiente
if (
    !process.env.MONGO_URI ||
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_WHATSAPP_NUMBER ||
    !process.env.YOUR_WHATSAPP_NUMBER ||
    !process.env.CORS_ORIGIN
) {
    console.error('Faltando variáveis de ambiente essenciais. Certifique-se de definir todas as variáveis necessárias.');
    process.exit(1);
}

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite a origem
        } else {
            callback(new Error('Not allowed by CORS')); // Bloqueia a origem
        }
    },
    credentials: true,
}));

app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    });

// Configuração do Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Rota para envio de mensagens
app.post(
    '/api/contact',
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
            // Salva a mensagem no banco de dados
            const newMessage = await Message.create({ name, email, message });
            console.log('Mensagem recebida:', { name, email, message });
            console.log('Mensagem salva no banco de dados:', newMessage);

            // Envia notificação via WhatsApp
            try {
                await client.messages.create({
                    body: `Nova mensagem de ${name} (${email}): ${message}`,
                    from: process.env.TWILIO_WHATSAPP_NUMBER,
                    to: process.env.YOUR_WHATSAPP_NUMBER,
                });
                console.log('Notificação via WhatsApp enviada com sucesso.');
            } catch (error) {
                console.error('Erro ao enviar notificação via WhatsApp:', error);
            }

            res.status(200).json({
                message: 'Mensagem recebida com sucesso! Você receberá uma notificação.',
                messageId: newMessage._id,
            });
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            res.status(500).json({ error: 'Erro interno ao salvar mensagem.' });
        }
    }
);

// Captura de exceções não tratadas
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));