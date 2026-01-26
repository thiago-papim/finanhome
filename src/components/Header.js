import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import logo from '../imagens/finanhome-logo.svg';
import ShinyButton from './MagicUI/ShinyButton';
import AnimatedGrid from './MagicUI/AnimatedGrid';

// Menu baseado nas seções reais da Home
const menuItems = [
  { label: 'Início', id: 'inicio' },
  { label: 'Como Funciona', id: 'como-funciona' },
  { label: 'Benefícios', id: 'beneficios' },
  { label: 'Confiança', id: 'confianca' },
  { label: 'Simulação', id: 'simulacao' },
  { label: 'Contato', id: 'contato' },
];

export default function Header() {
  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSimulate = () => {
    history.push('/simulador');
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = isScrolled ? 64 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-900/50 py-3'
            : 'bg-slate-900/80 backdrop-blur-md py-4'
        }`}
      >
        <AnimatedGrid opacity="low" className="opacity-5" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'h-12 w-12' : 'h-14 w-14'
                }`}
                src={logo}
                alt="FinanHome"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-slate-300 font-medium hover:text-white transition-colors duration-200 group px-2 py-1"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA and Trust Indicators */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Trust Indicators */}

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={handleSimulate}
                className="px-4 py-2 text-sm font-semibold text-slate-300 border border-slate-600 rounded-lg hover:border-slate-400 hover:text-white transition-all duration-300"
              >
                Falar com especialista
              </button>

              {/* Primary CTA */}
              <ShinyButton
                onClick={handleSimulate}
                variant="primary"
                className="text-sm px-6 py-2.5"
              >
                Simular crédito
              </ShinyButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Fechar menu"
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-full bg-slate-900/98 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <AnimatedGrid opacity="low" className="opacity-5" />
          <div className="p-6 pt-20">
            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-4 py-3 text-slate-300 font-medium hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Trust Indicators Mobile */}
            <div className="mb-8 pb-8 border-b border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
                <span>100% seguro e regulado</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <LockClosedIcon className="h-5 w-5 text-blue-400" />
                <span>Crédito com garantia de imóvel</span>
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="space-y-3">
              <ShinyButton
                onClick={handleSimulate}
                variant="primary"
                className="w-full text-center justify-center"
              >
                Simular crédito
              </ShinyButton>
              <button
                type="button"
                onClick={handleSimulate}
                className="w-full px-4 py-3 text-sm font-semibold text-slate-300 border border-slate-600 rounded-lg hover:border-slate-400 hover:text-white transition-all duration-300"
              >
                Falar com especialista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer para compensar header fixo */}
      <div className={`h-20 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`} />
    </>
  );
}
