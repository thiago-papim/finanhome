import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import AnimatedLines from '../MagicUI/AnimatedLines';
import TextReveal from '../MagicUI/TextReveal';
import Spotlight from '../MagicUI/Spotlight';

function Confidence() {
  return (
    <section
      id="confianca"
      className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      <AnimatedGrid opacity="medium" />
      <AnimatedLines direction="horizontal" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <TextReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Financiamento e crédito com garantia de imóvel
              </h2>
              <p className="text-2xl text-slate-300 mb-8">Seu patrimônio valorizado</p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Na FinanHome, acreditamos que seu imóvel é mais que um bem: é patrimônio que pode
                trabalhar para você. Oferecemos soluções imobiliárias completas - financiamento e
                empréstimo com garantia real - onde a segurança jurídica e a transparência são
                fundamentais.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Mais de R$ 500 milhões liberados</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Mais de 5.000 clientes atendidos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Taxa de aprovação superior a 85%</span>
                </div>
              </div>
            </div>
          </TextReveal>

          <TextReveal delay={200}>
            <div className="relative">
              <Spotlight intensity="medium" className="absolute inset-0 rounded-3xl" />
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">R$ 500M+</div>
                    <div className="text-slate-400">Liberados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">5.000+</div>
                    <div className="text-slate-400">Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">85%+</div>
                    <div className="text-slate-400">Aprovação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">24h</div>
                    <div className="text-slate-400">Liberação</div>
                  </div>
                </div>
              </div>
            </div>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}

export default Confidence;
