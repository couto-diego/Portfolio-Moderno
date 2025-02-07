import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto de tema
export const ThemeContext = createContext();

// Provedor de tema
export const ThemeProvider = ({ children }) => {
    // Estado inicial do tema: verifica o localStorage ou usa 'light' como padrão
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'light';
    });

    // Função para alternar o tema
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme); // Salva o tema no localStorage
            document.body.classList.toggle('dark-mode', newTheme === 'dark'); // Aplica/remova a classe 'dark-mode'
        }
    };

    // Efeito para aplicar o tema inicial ao carregar o componente
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.classList.toggle('dark-mode', theme === 'dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};