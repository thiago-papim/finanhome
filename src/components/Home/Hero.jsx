import React from 'react';
import PropTypes from 'prop-types';
import { HomeIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import AnimatedGradient from '../MagicUI/AnimatedGradient';
import ShinyButton from '../MagicUI/ShinyButton';
import HoverCard from '../MagicUI/HoverCard';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import AnimatedLines from '../MagicUI/AnimatedLines';
import Spotlight from '../MagicUI/Spotlight';
import TextReveal from '../MagicUI/TextReveal';

function Hero({ onSimulate }) {
  return (
    <section id="inicio" className="relative">
      <AnimatedGradient className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Camadas de profundidade - Grid e linhas com opacidade variável */}
        <AnimatedGrid opacity="high" />
        <AnimatedGrid opacity="low" className="opacity-5" style={{ animationDelay: '10s' }} />
        <AnimatedLines direction="horizontal" />
        <AnimatedLines direction="vertical" className="opacity-3" />

        {/* Spotlight mais focado no título */}
        <Spotlight intensity="high" className="absolute inset-0" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.15), transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          {/* Título com destaque para os dois produtos */}
          <div className="mb-8">
            <TextReveal delay={0}>
              {/* Glow suave atrás do título */}
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 blur-3xl opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
                    transform: 'scale(1.2)',
                  }}
                />
                <div className="relative">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl">
                      Financiamento
                    </span>
                    <span className="block bg-gradient-to-r from-purple-200 via-indigo-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                      Imobiliário
                    </span>
                    <span className="text-3xl md:text-4xl text-slate-400 font-normal my-4">&</span>
                    <span className="block bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                      Empréstimo com
                    </span>
                    <span className="block bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl mt-2">
                      Garantia de Imóvel
                    </span>
                  </h1>
                </div>
              </div>
            </TextReveal>
          </div>

          <TextReveal delay={200}>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Soluções imobiliárias completas: financie seu imóvel ou use seu patrimônio como
              garantia. Taxas menores, prazos longos e liberação rápida com total segurança
              jurídica.
            </p>
          </TextReveal>

          {/* CTAs melhorados com mais destaque */}
          <TextReveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <ShinyButton
                onClick={onSimulate}
                variant="primary"
                className="text-lg px-10 py-5 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-110 transition-all duration-300"
              >
                Simular agora
              </ShinyButton>
              <ShinyButton
                onClick={onSimulate}
                variant="secondary"
                className="text-lg px-10 py-5 shadow-2xl shadow-slate-500/50 hover:shadow-slate-500/70 transform hover:scale-110 transition-all duration-300"
              >
                Ver quanto posso liberar
              </ShinyButton>
              <button
                type="button"
                onClick={onSimulate}
                className="px-8 py-5 text-lg font-semibold text-slate-300 border-2 border-slate-600 rounded-xl hover:border-blue-400 hover:text-white hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Falar com especialista
              </button>
            </div>
          </TextReveal>

          {/* Cards inferiores melhorados com mais profundidade e animações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            <TextReveal delay={500}>
              <HoverCard
                glowColor="blue"
                className="text-center relative overflow-hidden group bg-gradient-to-br from-slate-800/60 to-slate-900/60"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(59, 130, 246, 0.2), transparent 70%)',
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <HomeIcon className="h-14 w-14 text-blue-400 mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Financie até 80% do valor do imóvel
                  </h3>
                </div>
              </HoverCard>
            </TextReveal>

            <TextReveal delay={600}>
              <HoverCard
                glowColor="emerald"
                className="text-center relative overflow-hidden group bg-gradient-to-br from-slate-800/60 to-slate-900/60"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(16, 185, 129, 0.2), transparent 70%)',
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <CurrencyDollarIcon className="h-14 w-14 text-emerald-400 mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Refinancie até 60% do imóvel
                  </h3>
                </div>
              </HoverCard>
            </TextReveal>

            <TextReveal delay={700}>
              <HoverCard
                glowColor="purple"
                className="text-center relative overflow-hidden group bg-gradient-to-br from-slate-800/60 to-slate-900/60"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)',
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheckIcon className="h-14 w-14 text-purple-400 mx-auto drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">100% seguro</h3>
                  <p className="text-slate-300 font-medium">garantia jurídica total</p>
                </div>
              </HoverCard>
            </TextReveal>
          </div>
        </div>
      </AnimatedGradient>

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}

Hero.propTypes = {
  onSimulate: PropTypes.func,
};

Hero.defaultProps = {
  onSimulate: () => {},
};

export default Hero;
