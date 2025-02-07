import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa'; // Ícones modernos

// Subcomponente para os links de navegação
const NavLinks = ({ scrollToSection, isMobile = false, closeMenu }) => (
  <>
    <a
      href="#hero-section"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection('hero-section');
        if (isMobile) closeMenu();
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
        if (isMobile) closeMenu();
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
        scrollToSection('projetos');
        if (isMobile) closeMenu();
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
        if (isMobile) closeMenu();
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

  // Aplica o tema salvo ao carregar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  // Alterna entre modo claro e escuro
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  // Rola suavemente até a seção especificada
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
          />
        </div>

        {/* Links de Navegação (Visíveis apenas em telas grandes) */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <NavLinks scrollToSection={scrollToSection} />
        </div>

        {/* Ícones (Menu Hambúrguer e Alternância de Tema) */}
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

      {/* Menu Móvel (Visível quando isMenuOpen é true) */}
      <ul
        className={`bg-dark text-white list-unstyled d-flex flex-column align-items-center py-3 ${
          isMenuOpen ? 'd-block animate-fade-in' : 'd-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <NavLinks scrollToSection={scrollToSection} isMobile closeMenu={() => setIsMenuOpen(false)} />
      </ul>
    </header>
  );
};

export default Header;