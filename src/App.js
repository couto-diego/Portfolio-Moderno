import React from 'react';
// Bibliotecas Externas
import 'bootstrap/dist/css/bootstrap.min.css';

// Contexto
import { ThemeProvider } from './context/ThemeContext';

// Componentes
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
    return (
        <React.StrictMode>
            <ThemeProvider>
                <>
                    <Header />
                    <HeroSection />
                    <AboutSection />
                    <ProjectsSection />
                    <ContactSection />
                    <Footer />
                </>
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default App;