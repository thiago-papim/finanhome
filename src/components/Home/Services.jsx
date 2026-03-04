import React from 'react';
import PropTypes from 'prop-types';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ClockIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import AnimatedLines from '../MagicUI/AnimatedLines';
import TextReveal from '../MagicUI/TextReveal';
import BentoGrid from '../MagicUI/BentoGrid';
import HoverCard from '../MagicUI/HoverCard';

function Services({ onSimulate }) {
  return (
    <section id="como-funciona" className="py-20 bg-slate-900 relative overflow-hidden">
      <AnimatedGrid opacity="low" />
      <AnimatedLines direction="vertical" />
      <div className="max-w-7xl mx-auto px-6">
        <TextReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Como funciona o crédito para imóveis
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Processo simples, rápido e totalmente digital para financiamento e empréstimo com
              garantia
            </p>
          </div>
        </TextReveal>

        <BentoGrid>
          {[
            {
              icon: <ChartBarIcon className="h-16 w-16 text-emerald-400" />,
              step: '02',
              title: 'Simulação personalizada',
              description:
                'Cálculo preciso do valor que você pode liberar com base no seu imóvel e perfil.',
            },
            {
              icon: <DocumentCheckIcon className="h-16 w-16 text-purple-400" />,
              step: '03',
              title: 'Análise de crédito',
              description:
                'Avaliação rápida e descomplicada da sua documentação e capacidade de pagamento.',
            },
            {
              icon: <HomeIcon className="h-16 w-16 text-blue-400" />,
              step: '01',
              title: 'Avaliação do imóvel',
              description:
                'Análise técnica e de mercado do seu imóvel para determinar o valor de garantia.',
            },
            {
              icon: <DocumentTextIcon className="h-16 w-16 text-amber-400" />,
              step: '04',
              title: 'Registro em cartório',
              description:
                'Diferencial: cuidamos de todo o registro em cartório para você, com segurança e agilidade.',
            },
            {
              icon: <BanknotesIcon className="h-16 w-16 text-cyan-400" />,
              step: '05',
              title: 'Liberação do valor',
              description: 'Após aprovação, o valor é liberado em até 24 horas na sua conta.',
            },
          ].map((item, index) => (
            <TextReveal key={item.step} delay={index * 100}>
              <HoverCard glowColor={index % 2 === 0 ? 'blue' : 'emerald'}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 md:min-h-40">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </HoverCard>
            </TextReveal>
          ))}
        </BentoGrid>

        {/* Blocos de apoio - Cards explicativos */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <TextReveal delay={400}>
            <HoverCard glowColor="blue" className="bg-slate-800/30">
              <div className="flex items-start gap-4">
                <DocumentTextIcon className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Documentação simplificada</h4>
                  <p className="text-sm text-slate-400">
                    Apenas os documentos essenciais. Processo 100% digital e seguro.
                  </p>
                </div>
              </div>
            </HoverCard>
          </TextReveal>
          <TextReveal delay={500}>
            <HoverCard glowColor="emerald" className="bg-slate-800/30">
              <div className="flex items-start gap-4">
                <ClockIcon className="h-8 w-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Acompanhamento em tempo real</h4>
                  <p className="text-sm text-slate-400">
                    Acompanhe cada etapa do seu processo diretamente na plataforma.
                  </p>
                </div>
              </div>
            </HoverCard>
          </TextReveal>
        </div>

        {/* CTA complementar */}
        <TextReveal delay={600}>
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onSimulate}
              className="text-blue-400 hover:text-blue-300 transition-colors font-semibold flex items-center gap-2 mx-auto"
            >
              Entenda melhor o processo
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}

Services.propTypes = {
  onSimulate: PropTypes.func,
};

Services.defaultProps = {
  onSimulate: () => {},
};

export default Services;
