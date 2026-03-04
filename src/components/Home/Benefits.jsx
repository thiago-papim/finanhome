import React from 'react';
import {
  CurrencyDollarIcon,
  BanknotesIcon,
  ClockIcon,
  SparklesIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ScaleIcon,
  DocumentTextIcon,
  KeyIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import Spotlight from '../MagicUI/Spotlight';
import TextReveal from '../MagicUI/TextReveal';
import AnimatedBorder from '../MagicUI/AnimatedBorder';

function Benefits() {
  return (
    <section id="beneficios" className="bg-slate-950 py-20 relative">
      <AnimatedGrid opacity="low" />
      <Spotlight intensity="low" className="absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <TextReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Benefícios do financiamento e crédito com garantia
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Vantagens exclusivas para quem usa o imóvel como garantia em soluções imobiliárias
            </p>
          </div>
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <CurrencyDollarIcon className="h-12 w-12 text-emerald-400" />,
              title: 'Taxas de juros reduzidas',
              description: 'Até 50% menor que crédito pessoal tradicional, graças à garantia real.',
              glow: 'emerald',
            },
            {
              icon: <BanknotesIcon className="h-12 w-12 text-blue-400" />,
              title: 'Valores altos liberados',
              description:
                'Libere até 80% do valor do seu imóvel, com valores a partir de R$ 50.000.',
              glow: 'blue',
            },
            {
              icon: <ClockIcon className="h-12 w-12 text-purple-400" />,
              title: 'Prazos longos',
              description: 'Até 420 meses para pagar, com parcelas que cabem no seu orçamento.',
              glow: 'purple',
            },
            {
              icon: <SparklesIcon className="h-12 w-12 text-cyan-400" />,
              title: 'Processo 100% digital',
              description:
                'Tudo online, sem burocracia. Simule, envie documentos e assine digitalmente.',
              glow: 'blue',
            },
            {
              icon: <LockClosedIcon className="h-12 w-12 text-emerald-400" />,
              title: 'Segurança jurídica',
              description:
                'Seu imóvel continua sendo seu. Apenas serve como garantia do empréstimo.',
              glow: 'emerald',
            },
            {
              icon: <ShieldCheckIcon className="h-12 w-12 text-blue-400" />,
              title: 'Aprovação rápida',
              description:
                'Análise em até 48 horas e liberação do valor em até 24h após aprovação.',
              glow: 'blue',
            },
          ].map((benefit, index) => (
            <TextReveal key={benefit.title} delay={index * 100}>
              <AnimatedBorder>
                <div className="flex flex-col items-start">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedBorder>
            </TextReveal>
          ))}
        </div>

        {/* Cards institucionais */}
        <div className="mt-20">
          <TextReveal>
            <h3 className="text-3xl font-bold text-center mb-12">
              Segurança e transparência em primeiro lugar
            </h3>
          </TextReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ScaleIcon className="h-10 w-10 text-emerald-400" />,
                title: 'Segurança jurídica',
                description: 'Processo regulado e totalmente seguro. Seu imóvel protegido.',
              },
              {
                icon: <DocumentTextIcon className="h-10 w-10 text-blue-400" />,
                title: 'Processo regulado',
                description: 'Todas as operações seguem rigorosamente as normas do Banco Central.',
              },
              {
                icon: <KeyIcon className="h-10 w-10 text-purple-400" />,
                title: 'Patrimônio como garantia',
                description: 'Seu imóvel continua sendo seu. Apenas serve como garantia.',
              },
              {
                icon: <EyeIcon className="h-10 w-10 text-cyan-400" />,
                title: 'Total transparência',
                description: 'Todas as taxas e condições são informadas antes da contratação.',
              },
            ].map((card, index) => (
              <TextReveal key={card.title} delay={index * 100}>
                <AnimatedBorder>
                  <div className="text-center p-6">
                    <div className="flex justify-center mb-4">{card.icon}</div>
                    <h4 className="font-bold mb-2">{card.title}</h4>
                    <p className="text-sm text-slate-400">{card.description}</p>
                  </div>
                </AnimatedBorder>
              </TextReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
