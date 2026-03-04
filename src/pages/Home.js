import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Benefits from '../components/Home/Benefits';
import Confidence from '../components/Home/Confidence';
import Simulation from '../components/Home/Simulation';
import FinalCTA from '../components/Home/FinalCTA';
import Footer from '../components/Home/Footer';
import MetricsBar from '../components/MagicUI/MetricsBar';
import SectionDivider from '../components/MagicUI/SectionDivider';

export default function Home() {
  const history = useHistory();

  const handleSimulate = () => {
    history.push('/simulador');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden w-full max-w-full">
      <Header />
      <Hero onSimulate={handleSimulate} />

      {/* Métricas Bar */}
      <MetricsBar
        metrics={[
          { value: 'R$ 500M+', label: 'Valores financiados' },
          { value: '5.000+', label: 'Clientes atendidos' },
          { value: '48h', label: 'Tempo médio de análise' },
          { value: '24h', label: 'Liberação após aprovação' },
        ]}
      />

      <Services onSimulate={handleSimulate} />
      <SectionDivider />
      <Benefits />
      <SectionDivider />
      <Confidence />
      <SectionDivider />
      <Simulation onSimulate={handleSimulate} />
      <SectionDivider />
      <FinalCTA onSimulate={handleSimulate} />
      <Footer onSimulate={handleSimulate} />
    </div>
  );
}
