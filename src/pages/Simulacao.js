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
    <div className="bg-[#1c3953] min-h-screen text-white overflow-x-hidden w-full max-w-full">
      <HeaderSimulacao />
      <div className="pt-20 pb-20">
        <AnimatedGradient className="relative flex items-center justify-center overflow-hidden">
          <AnimatedGrid opacity="low" />
          <AnimatedLines direction="horizontal" />
          <div className="bg-[#1c3953] flex w-full justify-center items-start pt-8 pb-20 relative z-10">
            <StepperContainer onFormSubmitSuccess={handleFormSubmitSuccess} />
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
