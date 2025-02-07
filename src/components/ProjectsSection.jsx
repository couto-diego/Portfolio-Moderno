import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // Ícones modernos

// Dados dos Projetos (pode ser movido para um arquivo separado)
const projectsData = [
    {
        id: 1,
        title: "GitHub Repo Finder",
        description: "O GitHub Repo Finder é uma aplicação web que permite buscar usuários do GitHub e visualizar seus repositórios.",
        image: "/assets/Repo_Git.png",
        github: "https://github.com/couto-diego/projeto-gitHub",
        demo: "https://projeto-github-three.vercel.app",
        tags: ['react', 'frontend'],
    },
    {
        id: 2,
        title: "Projeto Loteca",
        description: "Resultados das Loterias, uma aplicação web moderna e responsiva que exibe resultados aleatórios das principais loterias brasileiras.",
        image: "/assets/Loteca.png",
        github: "https://github.com/couto-diego/projeto-loteca",
        demo: "https://couto-diego.github.io/projeto-loteca/",
        tags: ['react', 'typescript', 'frontend'],
    },
    {
        id: 3,
        title: "Primeiro Portfolio",
        description: "Primeiro Portfolio criado por conta do desafio do bootcamp da Dio.",
        image: "/assets/Portfolio.png",
        github: "https://github.com/couto-diego/portfolio-diego-couto",
        demo: "https://couto-diego.github.io/portfolio-diego-couto/",
        tags: ['html', 'css', 'javascript'],
    },
    {
        id: 4,
        title: "Gerenciador de Assinaturas",
        description: "Uma aplicação Python para gerenciar suas assinaturas de forma organizada.",
        image: "/assets/Gerenciador.png",
        github: "https://github.com/couto-diego/gerenciado-assinatura",
        demo: "",
        tags: ['python', 'backend'],
    },
    {
        id: 5,
        title: "Agenda Virtual",
        description: "Uma aplicação simples e eficaz para gerenciar seus contatos.",
        image: "/assets/Agenda.png",
        github: "https://github.com/couto-diego/Agenda",
        demo: "https://couto-diego.github.io/Agenda/",
        tags: ['javascript', 'frontend'],
    },
    {
        id: 6,
        title: "ToDo List",
        description: "Uma lista de tarefas simples e funcional para organizar suas atividades diárias.",
        image: "/assets/ToDo List.png",
        github: "https://github.com/couto-diego/ToDo-List",
        demo: "https://couto-diego.github.io/ToDo-List/",
        tags: ['react', 'frontend'],
    },
];

// Componente para Links de Projetos com Tooltip
const ProjectLink = ({ href, label, tooltipText, icon }) => (
    <OverlayTrigger placement="top" overlay={<Tooltip id={`${label}-tooltip`}>{tooltipText}</Tooltip>}>
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-decoration-none hover-shadow d-flex align-items-center gap-2"
            aria-label={tooltipText} // Acessibilidade
        >
            {icon && <span>{icon}</span>}
            {label}
        </a>
    </OverlayTrigger>
);

const ProjectsSection = () => {
    const [filter, setFilter] = useState('all');

    // Filtragem de Projetos
    const filteredProjects = projectsData.filter((project) => {
        if (filter === 'all') return true;
        return project.tags.includes(filter);
    });

    // Geração Dinâmica de Filtros
    const allTags = [...new Set(projectsData.flatMap((project) => project.tags))];
    const filters = ['all', ...allTags];

    return (
        <section id="projetos" className="py-5 bg-light text-dark">
            <div className="container px-4">
                {/* Título */}
                <h2 className="display-4 fw-bold text-center mb-4">Projetos</h2>

                {/* Filtros */}
                <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
                    {filters.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`btn btn-outline-primary ${filter === tag ? 'active' : ''}`}
                            aria-label={`Filtrar projetos por ${tag}`}
                        >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)} {/* Capitaliza a primeira letra */}
                        </button>
                    ))}
                </div>

                {/* Lista de Projetos */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="col">
                            <div className="card h-100 shadow-sm hover-scale">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = '/assets/placeholder.png'; // Imagem padrão caso ocorra erro
                                    }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title fs-5 fw-bold">{project.title}</h3>
                                    <p className="card-text text-muted flex-grow-1">{project.description}</p>
                                    <div className="d-flex gap-3 mt-auto">
                                        <ProjectLink
                                            href={project.github}
                                            label="GitHub"
                                            tooltipText="Ver código no GitHub"
                                            icon={<FaGithub size={20} />}
                                        />
                                        {project.demo && (
                                            <ProjectLink
                                                href={project.demo}
                                                label="Demo"
                                                tooltipText="Ver demonstração online"
                                                icon={<FaExternalLinkAlt size={20} />}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;