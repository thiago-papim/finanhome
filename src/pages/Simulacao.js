import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderSimulacao from '../components/HeaderSimulacao';
import StepperContainer from '../components/Stepper/StepperContainer';
import AnimatedGradient from '../components/MagicUI/AnimatedGradient';
import AnimatedGrid from '../components/MagicUI/AnimatedGrid';
import AnimatedLines from '../components/MagicUI/AnimatedLines';

export default function Simulacao() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmitSuccess = (submissionData) => {
    history.push('/simulador/parcelas', { submissionData });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden w-full max-w-full">
      <HeaderSimulacao />
      <div className="pt-20 pb-20">
        <AnimatedGradient className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatedGrid opacity="low" />
          <AnimatedLines direction="horizontal" />
          <div className="flex w-full justify-center items-start min-h-screen pt-8 pb-20 relative z-10">
            <StepperContainer onFormSubmitSuccess={handleFormSubmitSuccess} />
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
