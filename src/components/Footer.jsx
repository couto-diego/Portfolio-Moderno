import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faCode,
  faEnvelope,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Dados dos Links Sociais
const socialLinks = [
  {
    href: "https://github.com/couto-diego",
    icon: faGithub,
    label: "GitHub",
    tooltipText: "Meu perfil no GitHub",
  },
  {
    href: "https://www.linkedin.com/in/diegocouto87/",
    icon: faLinkedin,
    label: "LinkedIn",
    tooltipText: "Meu perfil no LinkedIn",
  },
];

// Dados dos Links Internos
const internalLinks = [
  {
    href: "#hero-section",
    icon: faHome,
    label: "Início",
    tooltipText: "Voltar para o início",
  },
  {
    href: "#sobre",
    icon: faUser,
    label: "Sobre",
    tooltipText: "Saiba mais sobre mim",
  },
  {
    href: "#projetos",
    icon: faCode,
    label: "Projetos",
    tooltipText: "Veja meus projetos",
  },
  {
    href: "#contato",
    icon: faEnvelope,
    label: "Contato",
    tooltipText: "Entre em contato",
  },
];

// SocialLink Component
const SocialLink = ({ href, icon, label, tooltipText, isInternal = false }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip id={`${label}-tooltip`}>{tooltipText}</Tooltip>}>
    <a
      href={href}
      {...(isInternal
        ? { onClick: (e) => { 
            e.preventDefault(); 
            document.getElementById(href.slice(1)).scrollIntoView({ behavior: 'smooth' }); 
          }}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className="text-primary text-decoration-none d-flex align-items-center gap-2 hover-shadow"
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} title={tooltipText} /> {label}
    </a>
  </OverlayTrigger>
);

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white py-3"> {/* Padding vertical reduzido */}
      <div className="container px-4 text-center">
        {/* Navegação Interna */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-2"> {/* Espaçamento reduzido */}
          {internalLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.href}
              icon={link.icon}
              label={link.label}
              tooltipText={link.tooltipText}
              isInternal
            />
          ))}
        </div>
        {/* Direitos Autorais */}
        <p className="mb-2 small">© {currentYear} Diego Couto. Todos os direitos reservados.</p> {/* Fonte menor */}
        {/* Redes Sociais e Ícone de Download do Currículo */}
        <div className="d-flex flex-wrap justify-content-center gap-2"> {/* Espaçamento reduzido */}
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.href}
              icon={link.icon}
              label={link.label}
              tooltipText={link.tooltipText}
            />
          ))}
          {/* Botão de Download de Currículo */}
          <a
            href="/assets/DiegoCouto_CV.pdf"
            download="Diego_Couto_CV.pdf"
            className="text-primary text-decoration-none d-flex align-items-center gap-2 hover-shadow small"
            aria-label="Baixar currículo"
            onError={(e) => {
              console.error("Erro ao carregar o currículo.");
              e.target.href = "/assets/placeholder.pdf"; // Fallback para um arquivo padrão
            }}
          >
            <FontAwesomeIcon icon={faDownload} title="Baixar currículo" /> Currículo
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;