import React from 'react';
import PropTypes from 'prop-types';
import AnimatedGrid from '../MagicUI/AnimatedGrid';
import AnimatedLines from '../MagicUI/AnimatedLines';
import Spotlight from '../MagicUI/Spotlight';
import TextReveal from '../MagicUI/TextReveal';
import ShinyButton from '../MagicUI/ShinyButton';

function FinalCTA({ onSimulate }) {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      <AnimatedGrid opacity="medium" />
      <AnimatedLines direction="horizontal" />
      <Spotlight intensity="high" className="absolute inset-0" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <TextReveal>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Use seu imóvel para conquistar crédito com segurança
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Transforme seu patrimônio em oportunidade. Simule agora e descubra quanto você pode
            liberar com financiamento ou empréstimo com garantia.
          </p>
          <ShinyButton onClick={onSimulate} variant="primary" className="text-2xl px-12 py-6">
            Começar simulação gratuita
          </ShinyButton>
        </TextReveal>
      </div>
    </section>
  );
}

FinalCTA.propTypes = {
  onSimulate: PropTypes.func,
};

FinalCTA.defaultProps = {
  onSimulate: () => {},
};

export default FinalCTA;
