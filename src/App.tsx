import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/projects';
import SkillsBento from './components/SkillsBento';
import VideoShowcase from './components/VideoShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


// Import your project main files
import INotebook from './components/project1aistudy/src/App'; 
import TextToUI from './components/project2text2ui/src/App'; 
import FinSense from './components/project3finsize/src/App'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio Page */}
        <Route path="/" element={
          <div className="relative min-h-screen bg-void text-text-primary overflow-x-hidden">
            {/* Noise Overlay */}
            <div className="noise-overlay" />
            <Navbar />
            <Hero />
            <Projects />
            <SkillsBento />
            <VideoShowcase />
            <Contact />
            <Footer />
          </div>
        } />

        {/* Individual Project Pages */}
        <Route path="/projects/inotebook" element={<INotebook />} />
        <Route path="/projects/text-to-ui" element={<TextToUI />} />
        <Route path="/projects/finsense" element={<FinSense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
