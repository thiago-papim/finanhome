import React from 'react';
import fundoCapa from '../imagens/fundo-capa.svg';
import HeaderSimulacao from '../components/HeaderSimulacao';
import PontoUm from '../components/simulacao/PontoUm';

export default function Simulacao() {
  return (
    <div className="h-screen">
      <img
        src={fundoCapa}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <HeaderSimulacao />
      <PontoUm />
    </div>
  );
}
