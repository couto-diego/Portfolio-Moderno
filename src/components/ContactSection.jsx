import React, { useState, useEffect } from 'react';
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

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Por favor, insira uma mensagem válida com pelo menos 10 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_URL}/contact`, formData);

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2>Entre em Contato</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Campo de Nome */}
          <input
            type="text"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
