import React from 'react';
import { FaReact, FaPython, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaGithub, FaDatabase } from 'react-icons/fa';
import { SiMysql, SiJavascript, SiBootstrap, SiDjango } from 'react-icons/si';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Dados das Habilidades (pode ser movido para um arquivo separado)
const skillsData = [
    { icon: FaReact, label: "React", tooltipText: "Biblioteca JavaScript para interfaces de usuário" },
    { icon: FaPython, label: "Python", tooltipText: "Linguagem de programação para desenvolvimento web e automação" },
    { icon: SiMysql, label: "MySQL", tooltipText: "Sistema de gerenciamento de banco de dados relacional" },
    { icon: FaGitAlt, label: "Git", tooltipText: "Sistema de controle de versão para desenvolvimento colaborativo" },
    { icon: FaGithub, label: "GitHub", tooltipText: "Plataforma de hospedagem de código-fonte e controle de versão" },
    { icon: FaHtml5, label: "HTML5", tooltipText: "Linguagem de marcação para estruturação de páginas web" },
    { icon: FaCss3Alt, label: "CSS3", tooltipText: "Linguagem de estilo para design de páginas web" },
    { icon: FaDatabase, label: "Banco de Dados", tooltipText: "Gerenciamento de dados estruturados e não estruturados" },
    { icon: SiJavascript, label: "JavaScript", tooltipText: "Linguagem de programação para desenvolvimento web interativo" },
    { icon: SiBootstrap, label: "Bootstrap", tooltipText: "Framework CSS para design responsivo e componentes reutilizáveis" },
    { icon: SiDjango, label: "Django", tooltipText: "Framework Python para desenvolvimento web rápido e seguro" },
    { icon: FaFigma, label: "Figma", tooltipText: "Ferramenta de design para criação de interfaces e protótipos" },
];

// Componente de Ícone com Tooltip
const SkillIcon = ({ icon: Icon, label, tooltipText }) => (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`${label}-tooltip`}>{tooltipText}</Tooltip>}>
        <div className="d-flex flex-column align-items-center gap-2 skill-icon-container">
            <Icon 
                className="fs-1 skill-icon hover-scale" 
                aria-hidden="true" 
                role="img"
                aria-label={label}
            />
            <span>{label}</span>
        </div>
    </OverlayTrigger>
);

const AboutSection = () => {
    return (
        <section id="sobre" className="py-5 bg-light text-dark animate__animated animate__fadeIn">
            <div className="container px-4">
                {/* Título */}
                <h2 className="display-4 fw-bold text-center mb-5">Sobre Mim</h2>
                <div className="row gx-5">
                    {/* Texto Sobre Mim */}
                    <div className="col-md-6 order-md-2">
                        <p className="lead mb-4">
                            Olá! Meu nome é Diego Couto, sou um Desenvolvedor Full Stack com experiência em criação de soluções tecnológicas inovadoras e eficientes.
                        </p>
                        <p className="lead mb-4">
                            Minha paixão por tecnologia começou cedo, e desde então tenho me dedicado a aprender e aplicar novas ferramentas e metodologias para resolver problemas complexos.
                        </p>
                        <p className="lead mb-4">
                            Alguns dos meus projetos recentes incluem:
                        </p>
                        <ul className="list-unstyled">
                            <li>✅ Desenvolvimento de uma aplicação web full stack para gestão de tarefas.</li>
                            <li>✅ Integração de APIs RESTful com autenticação JWT.</li>
                            <li>✅ Criação de interfaces responsivas e acessíveis com React e Bootstrap.</li>
                        </ul>
                        
                    </div>
                    {/* Foto */}
                    <div className="col-md-6 order-md-1 d-flex justify-content-center align-items-center mb-4 mb-md-0">
                        <img
                            src="/assets/Diego1.png"
                            alt="Diego Couto, Desenvolvedor Full Stack, codificando em seu ambiente de trabalho"
                            className="img-fluid rounded-circle shadow border border-3 border-primary hover-scale mb-4" // Adiciona margem inferior
                            style={{ width: '250px', height: '250px', objectFit: 'cover', objectPosition: '50% 20%' }}
                            onError={(e) => {
                                e.target.src = '/assets/placeholder.png'; // Imagem padrão caso ocorra erro
                            }}
                        />
                    </div>
                </div>
                {/* Habilidades */}
                <div className="mt-5">
                    <h3 className="h2 fw-bold mb-4 text-center">Habilidades</h3>
                    <ul className="d-flex flex-wrap gap-4 justify-content-center text-center list-unstyled">
                        {skillsData.map((skill, index) => (
                            <li key={index}>
                                <SkillIcon
                                    icon={skill.icon}
                                    label={skill.label}
                                    tooltipText={skill.tooltipText}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;