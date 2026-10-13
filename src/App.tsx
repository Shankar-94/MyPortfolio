import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';

function App() {
  const { theme, toggle } = useTheme();

  // Mark JS loaded for CSS animations
  useEffect(() => {
    document.documentElement.classList.add('js-loaded');
  }, []);

  return (
    <>
      <ScrollProgress />
      <Header theme={theme} onThemeToggle={toggle} />
      <main>
        <div className="shell">
          <Hero />
          <StatsStrip />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
