require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
const Message = require('./models/Message');

// Inicializa o aplicativo Express
const app = express();

// Middleware
app.use(cors({
    origin: `${process.env.REACT_APP_API_URL}/api/contact`,

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

            // Envia notificação via WhatsApp
            const sendNotification = async () => {
                try {
                    await client.messages.create({
                        body: `Nova mensagem de ${name} (${email}): ${message}`,
                        from: process.env.TWILIO_WHATSAPP_NUMBER,
                        to: process.env.YOUR_WHATSAPP_NUMBER,
                    });
                } catch (error) {
                    console.error('Erro ao enviar notificação via WhatsApp:', error);
                }
            };
            setTimeout(sendNotification, 0); // Executa assincronamente

            res.status(200).json({ message: 'Mensagem recebida com sucesso!', messageId: newMessage._id });
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            res.status(500).json({ error: 'Erro interno ao salvar mensagem.' });
        }
    }
);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));