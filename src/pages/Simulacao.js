import React from 'react';
import HeaderSimulacao from '../components/HeaderSimulacao';
import StepperContainer from '../components/Stepper/StepperContainer';

export default function Simulacao() {
  return (
    <div className="min-h-screen bg-black relative">
      <HeaderSimulacao />
      <div className="flex w-full justify-center items-start min-h-screen pt-8 pb-20">
        <StepperContainer />
      </div>
    </div>
  );
}
