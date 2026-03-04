import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import TextReveal from '../MagicUI/TextReveal';
import AnimatedBorder from '../MagicUI/AnimatedBorder';
import ShinyButton from '../MagicUI/ShinyButton';

function Simulation({ onSimulate }) {
  const [simulationValue, setSimulationValue] = useState(500000);

  return (
    <section id="simulacao" className="py-32 bg-slate-900 relative">
      <AnimatedGrid opacity="low" />
      <div className="max-w-5xl mx-auto px-6">
        <TextReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simule seu financiamento ou crédito agora
            </h2>
            <p className="text-xl text-slate-400">
              Descubra quanto você pode liberar do seu imóvel
            </p>
          </div>
        </TextReveal>

        <TextReveal delay={200}>
          <AnimatedBorder>
            <div className="p-8">
              <div className="mb-8">
                <label
                  htmlFor="property-value-slider"
                  className="block text-slate-300 mb-4 text-lg font-semibold"
                >
                  Valor do seu imóvel
                  <input
                    id="property-value-slider"
                    type="range"
                    min="50000"
                    max="10000000"
                    step="50000"
                    value={simulationValue}
                    onChange={(e) => setSimulationValue(Number(e.target.value))}
                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-4"
                  />
                </label>
                <div className="relative">
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>R$ 50.000</span>
                    <span>R$ 10.000.000</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-slate-400 text-sm mb-2">Valor do imóvel</div>
                  <div className="text-3xl font-bold text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(simulationValue)}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6">
                  <div className="text-blue-100 text-sm mb-2">Valor liberado (80%)</div>
                  <div className="text-3xl font-bold text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      maximumFractionDigits: 0,
                    }).format(simulationValue * 0.8)}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-slate-400 text-sm mb-2">Prazo máximo</div>
                  <div className="text-3xl font-bold text-white">420 meses</div>
                </div>
              </div>

              <ShinyButton onClick={onSimulate} variant="primary" className="w-full">
                Simular crédito completo
                <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
              </ShinyButton>
            </div>
          </AnimatedBorder>
        </TextReveal>

        {/* Mini highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <TextReveal delay={300}>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-blue-400 mb-2">Sem entrada</div>
              <div className="text-sm text-slate-400">Não é necessário dar entrada</div>
            </div>
          </TextReveal>
          <TextReveal delay={400}>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-emerald-400 mb-2">Sem IOF</div>
              <div className="text-sm text-slate-400">Isento de IOF para pessoa física</div>
            </div>
          </TextReveal>
          <TextReveal delay={500}>
            <div className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-purple-400 mb-2">Sem anuidade</div>
              <div className="text-sm text-slate-400">Nenhuma taxa de manutenção</div>
            </div>
          </TextReveal>
        </div>

        {/* CTA complementar */}
        <TextReveal delay={600}>
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onSimulate}
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Ver todas as condições e taxas
            </button>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}

Simulation.propTypes = {
  onSimulate: PropTypes.func,
};

Simulation.defaultProps = {
  onSimulate: () => {},
};

export default Simulation;
