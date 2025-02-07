import React from 'react';
import TypingEffect from 'react-typing-effect'; // Biblioteca para animação de digitação

const HeroSection = () => {
    return (
        <section
            id="hero-section"
            className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-white bg-hero-pattern bg-cover bg-center hero-section-spacing"
        >
            {/* Foto de Perfil */}
            <img
                src="/assets/Programador.jpg"
                alt="Diego Couto, Desenvolvedor Full Stack, codificando em seu ambiente de trabalho"
                className="rounded-circle img-fluid profile-image mb-4 border border-primary border-3 shadow hover-scale"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                    e.target.src = '/assets/placeholder.png'; // Imagem padrão caso ocorra erro
                }}
            />
            {/* Título e Descrição */}
            <h1 className="display-4 fw-bold mb-4 text-center">Bem-vindo ao Meu Mundo!</h1>
            {/* Animação de Digitação */}
            <TypingEffect
                text={[
                    "A curiosidade e a prática constante te levam além do imaginável.",
                    "Desenvolvedor Full Stack apaixonado por tecnologia.",
                    "Transformando ideias em soluções inovadoras."
                ]}
                speed={50} // Velocidade da digitação (em milissegundos)
                eraseSpeed={30} // Velocidade de apagamento (em milissegundos)
                typingDelay={500} // Delay entre frases (em milissegundos)
                className="lead mb-5 text-center" // Estilo personalizado
            />
            {/* Botão Ver Projetos */}
            <button
                className="btn btn-primary mt-4 px-5 py-3 hover-shadow"
                onClick={() => {
                    const projetosSection = document.getElementById('projetos');
                    if (projetosSection) {
                        projetosSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                aria-label="Ir para a seção Projetos"
            >
                Ver Projetos
            </button>
        </section>
    );
};

export default HeroSection;