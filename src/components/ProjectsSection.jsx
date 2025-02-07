import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // Ícones modernos
import { projectsData } from './projectsData'; // Importa os dados dos projetos

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
                            className={`btn ${filter === tag ? 'btn-primary' : 'btn-outline-primary'}`}
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
                                    className="card-img-top project-image"
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