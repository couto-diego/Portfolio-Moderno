import React, { useState, useEffect } from 'react'; // Certifique-se de que esta linha está presente
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Validação de e-mail
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Manipulador de envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        if (!formData.message.trim()) {
            setError('Por favor, insira uma mensagem válida.');
            return;
        }
        setLoading(true);
        try {
            console.log('Enviando dados para o backend:', formData); // Adicione esta linha
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            console.log('Resposta do backend:', response.data); // Adicione esta linha
            if (response.status === 200) {
                setSuccess(true);
                setError(null);
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (err) {
            console.error('Erro ao enviar mensagem:', err); // Adicione esta linha
            if (err.response && err.response.status === 400) {
                setError('Erro: Dados inválidos. Verifique o formulário.');
            } else {
                setError('Erro ao enviar mensagem. Tente novamente.');
            }
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    // Limpar mensagens após 5 segundos
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setError(null);
            }, 5000); // Limpa após 5 segundos
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <section id="contato" className="py-5 bg-dark text-white">
            <div className="container">
                <h2 className="display-4 fw-bold text-center mb-4">Contato</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 bg-secondary bg-opacity-10 rounded shadow-sm">
                    {/* Campo de Nome */}
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setError(null);
                        }}
                        className={`form-control bg-dark text-white ${error && !formData.name ? 'is-invalid' : ''}`}
                        required
                        aria-label="Nome"
                        aria-describedby="name-help"
                    />
                    <small id="name-help" className="text-danger">
                        {error && !formData.name && "Por favor, insira seu nome."}
                    </small>
                    {/* Campo de E-mail */}
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setError(null);
                        }}
                        onBlur={() => {
                            if (formData.email && !validateEmail(formData.email)) {
                                setError('Por favor, insira um e-mail válido.');
                            }
                        }}
                        className={`form-control bg-dark text-white ${error && formData.email && !validateEmail(formData.email) ? 'is-invalid' : ''}`}
                        required
                        aria-label="E-mail"
                        aria-describedby="email-help"
                    />
                    <small id="email-help" className="text-danger">
                        {error && formData.email && !validateEmail(formData.email) && "Por favor, insira um e-mail válido."}
                    </small>
                    {/* Campo de Mensagem */}
                    <textarea
                        placeholder="Digite sua mensagem (máximo 500 caracteres)"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-control bg-dark text-white"
                        rows="5"
                        maxLength={500}
                        required
                        aria-label="Mensagem"
                        aria-describedby="message-help"
                    ></textarea>
                    <small
                        className={`text-muted ${formData.message.length > 450 ? 'text-warning fw-bold' : ''}`}
                        id="message-help"
                    >
                        {`${formData.message.length}/500 caracteres`}
                    </small>
                    {/* Botão de Envio */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center hover-shadow"
                        disabled={loading}
                        aria-label="Enviar mensagem"
                    >
                        {loading ? (
                            <FontAwesomeIcon icon={faSpinner} className="spinner-icon me-2" spin aria-hidden="true" />
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPaperPlane} className="me-2" title="Enviar Mensagem" />
                                Enviar Mensagem
                            </>
                        )}
                    </button>
                </form>
                {/* Mensagem de Sucesso */}
                {success && (
                    <div
                        className="alert alert-success text-center mt-4 animate__animated animate__fadeIn"
                        role="alert"
                        aria-live="polite"
                    >
                        Mensagem enviada com sucesso!
                    </div>
                )}
                {/* Mensagem de Erro */}
                {error && (
                    <div
                        className="alert alert-danger text-center mt-4 animate__animated animate__shakeX"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </div>
                )}
                {/* Botões de Contato Direto */}
                <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
                    {/* E-mail */}
                    <a
                        href="mailto:dpcouto.dev@gmail.com"
                        className="btn btn-primary d-flex align-items-center gap-2 hover-shadow"
                        aria-label="Enviar e-mail para Diego Couto"
                    >
                        <FontAwesomeIcon icon={faEnvelope} title="E-mail" /> E-mail
                    </a>
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/+5521974700582"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success d-flex align-items-center gap-2 hover-shadow"
                        aria-label="Enviar mensagem no WhatsApp para Diego Couto"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} title="WhatsApp" /> WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;