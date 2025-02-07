import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa'; // Ícones modernos

// Componente para os links de navegação
const NavLinks = ({ scrollToSection }) => (
  <>
    <a
      href="#hero-section"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('hero-section');
      }}
      className="text-decoration-none text-white hover-effect"
      aria-label="Ir para a seção Início"
    >
      Home
    </a>
    <a
      href="#sobre"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('sobre');
      }}
      className="text-decoration-none text-white hover-effect"
      aria-label="Ir para a seção Sobre"
    >
      Sobre
    </a>
    <a
    href="#projetos"
    onClick={(e) => {
        e.preventDefault();
        document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
    }}
    className="text-decoration-none text-white hover-effect"
    aria-label="Ir para a seção Projetos"
>
    Projetos
</a>
    <a
      href="#contato"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('contato');
      }}
      className="text-decoration-none text-white hover-effect"
      aria-label="Ir para a seção Contato"
    >
      Contato
    </a>
  </>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Elemento com ID "${id}" não encontrado.`);
    }
  };

  return (
    <header className="fixed-top bg-dark text-white">
      <nav className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <div className="fw-bold fs-5 d-flex align-items-center gap-2">
          <img
            src="/assets/Logo.png"
            alt="Logo DC Dev"
            className="logo-img"
            style={{ height: '45', width: 'auto' }}
          />
        </div>

        {/* Navigation Links (Visible only on large screens) */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <NavLinks scrollToSection={scrollToSection} />
        </div>

        {/* Icons (Hamburger Menu and Dark Mode Toggle) */}
        <div className="d-flex gap-3 align-items-center">
          {/* Botão de Menu Móvel */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="d-lg-none btn btn-link p-0 text-white hover-scale"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            <FaBars size={24} />
          </button>

          {/* Botão de Alternância de Tema */}
          <OverlayTrigger placement="right" overlay={<Tooltip id="theme-tooltip">Alternar Modo Escuro</Tooltip>}>
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Alternar modo escuro"
              className="ms-3 btn btn-link p-0 text-white hover-scale"
            >
              {isDarkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
          </OverlayTrigger>
        </div>
      </nav>

      {/* Mobile Menu (Visible when isMenuOpen is true) */}
      <ul
        className={`bg-dark text-white list-unstyled d-flex flex-column align-items-center py-3 ${
          isMenuOpen ? 'd-block animate-fade-in' : 'd-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <li className="mb-2">
          <a
            href="#hero-section"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection('hero-section');
            }}
            className="text-decoration-none text-white hover-effect"
            aria-label="Ir para a seção Início"
          >
            Home
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#sobre"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection('sobre');
            }}
            className="text-decoration-none text-white hover-effect"
            aria-label="Ir para a seção Sobre"
          >
            Sobre
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#projetos"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection('projetos');
            }}
            className="text-decoration-none text-white hover-effect"
            aria-label="Ir para a seção Projetos"
          >
            Projetos
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#contato"
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection('contato');
            }}
            className="text-decoration-none text-white hover-effect"
            aria-label="Ir para a seção Contato"
          >
            Contato
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;