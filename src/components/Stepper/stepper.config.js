/**
 * Configuração centralizada de todos os steps do simulador
 * Cada step deve ter: id, label, description, type, required, e configurações específicas
 */

export const initialSteps = [
  {
    id: 'tipo-credito',
    label: 'Qual tipo de crédito você precisa?',
    description: 'Escolha a opção que melhor se encaixa no seu objetivo.',
    type: 'options',
    required: true,
    options: [
      {
        value: 'financiamento',
        label: 'Financiamento',
        image: '/assets/steps/common/financiamento.png',
        icon: 'home',
      },
      {
        value: 'home-equity',
        label: 'Empréstimo com Garantia de Imóvel',
        image: '/assets/steps/common/home-equity.png',
        icon: 'currency',
      },
    ],
  },
];

export const stepsFinanciamento = [
  {
    id: 'tipo-imovel',
    label: 'Financiamento para qual tipo de imóvel?',
    description: 'Selecione o tipo de imóvel que deseja financiar.',
    type: 'options',
    required: true,
    options: [
      {
        value: 'casa',
        label: 'Casa',
        image: '/assets/steps/financiamento/casa.png',
        icon: 'home',
      },
      {
        value: 'apartamento',
        label: 'Apartamento',
        image: '/assets/steps/financiamento/apartamento.png',
        icon: 'building',
      },
      {
        value: 'terreno',
        label: 'Terreno',
        image: '/assets/steps/financiamento/terreno.png',
        icon: 'map',
      },
      {
        value: 'comercial',
        label: 'Comercial',
        image: '/assets/steps/financiamento/comercial.png',
        icon: 'store',
      },
    ],
  },
  {
    id: 'prazo-necessidade',
    label: 'Para quando precisa?',
    description: 'Quando você precisa utilizar o crédito?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'imediato',
        label: 'Utilizar imediatamente',
        image: '/assets/steps/common/imediato.png',
        icon: 'clock',
      },
      {
        value: '1-mes',
        label: 'Para daqui a 1 mês',
        image: '/assets/steps/common/1-mes.png',
        icon: 'calendar',
      },
      {
        value: '3-meses',
        label: 'Para daqui a 3 meses',
        image: '/assets/steps/common/3-meses.png',
        icon: 'calendar',
      },
      {
        value: 'acima-3-meses',
        label: 'Acima de 3 meses',
        image: '/assets/steps/common/acima-3-meses.png',
        icon: 'calendar',
      },
    ],
  },
  {
    id: 'valor-imovel',
    label: 'Qual Valor do imóvel?',
    description: 'Informe o valor total do imóvel que deseja financiar.',
    type: 'slider',
    required: true,
    min: 50000,
    max: 10000000,
    step: 10000,
    format: 'currency',
    validation: {
      min: 50000,
      message: 'O valor mínimo é R$ 50.000,00',
    },
  },
  {
    id: 'valor-credito',
    label: 'Qual Valor do crédito desejado?',
    description: 'Informe o valor de crédito que deseja solicitar (máximo 80% do valor do imóvel).',
    type: 'slider',
    required: true,
    min: 50000,
    max: 10000000,
    step: 10000,
    format: 'currency',
    validation: {
      dependsOn: 'valor-imovel',
      maxPercent: 80,
      message: 'O valor do crédito não pode ultrapassar 80% do valor do imóvel',
    },
  },
  {
    id: 'possui-entrada',
    label: 'Já possui entrada?',
    description: 'Você já tem o valor de entrada disponível?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'sim',
        label: 'Sim',
        image: '/assets/steps/common/sim.png',
        icon: 'check',
      },
      {
        value: 'nao',
        label: 'Não',
        image: '/assets/steps/common/nao.png',
        icon: 'x',
      },
    ],
  },
  {
    id: 'prazo-financiamento',
    label: 'Qual melhor prazo para você?',
    description: 'Selecione o prazo de pagamento desejado.',
    type: 'options',
    required: true,
    options: [
      {
        value: '120',
        label: '120 meses',
        image: '/assets/steps/common/120-meses.png',
        icon: 'clock',
      },
      {
        value: '180',
        label: '180 meses',
        image: '/assets/steps/common/180-meses.png',
        icon: 'clock',
      },
      {
        value: '240',
        label: '240 meses',
        image: '/assets/steps/common/240-meses.png',
        icon: 'clock',
      },
      {
        value: '360',
        label: '360 meses',
        image: '/assets/steps/common/360-meses.png',
        icon: 'clock',
      },
      {
        value: '420',
        label: '420 meses',
        image: '/assets/steps/common/420-meses.png',
        icon: 'clock',
      },
    ],
  },
  {
    id: 'tipo-pessoa',
    label: 'Pessoa Física ou Jurídica?',
    description: 'Selecione o tipo de pessoa para o financiamento.',
    type: 'options',
    required: true,
    options: [
      {
        value: 'fisica',
        label: 'Pessoa Física',
        image: '/assets/steps/common/pessoa-fisica.png',
        icon: 'user',
      },
      {
        value: 'juridica',
        label: 'Pessoa Jurídica',
        image: '/assets/steps/common/pessoa-juridica.png',
        icon: 'building',
      },
    ],
  },
  {
    id: 'imovel-vista',
    label: 'Já tem algum imóvel em vista?',
    description: 'Você já identificou o imóvel que deseja financiar?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'sim',
        label: 'Sim',
        image: '/assets/steps/common/sim.png',
        icon: 'check',
      },
      {
        value: 'nao',
        label: 'Não',
        image: '/assets/steps/common/nao.png',
        icon: 'x',
      },
    ],
  },
];

export const stepsHomeEquity = [
  {
    id: 'finalidade',
    label: 'Qual a finalidade?',
    description: 'Para que você precisa do crédito?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'quitar-dividas',
        label: 'Quitar dívidas',
        image: '/assets/steps/home-equity/quitar-dividas.png',
        icon: 'check',
      },
      {
        value: 'investir',
        label: 'Investir',
        image: '/assets/steps/home-equity/investir.png',
        icon: 'trending',
      },
      {
        value: 'capital-giro',
        label: 'Capital de giro',
        image: '/assets/steps/home-equity/capital-giro.png',
        icon: 'currency',
      },
      {
        value: 'outros',
        label: 'Outros',
        image: '/assets/steps/home-equity/outros.png',
        icon: 'dots',
      },
    ],
  },
  {
    id: 'tipo-garantia',
    label: 'Qual tipo de garantia?',
    description: 'Selecione o tipo de imóvel que será usado como garantia.',
    type: 'options',
    required: true,
    options: [
      {
        value: 'casa',
        label: 'Casa',
        image: '/assets/steps/home-equity/casa.png',
        icon: 'home',
      },
      {
        value: 'apartamento',
        label: 'Apartamento',
        image: '/assets/steps/home-equity/apartamento.png',
        icon: 'building',
      },
      {
        value: 'terreno',
        label: 'Terreno',
        image: '/assets/steps/home-equity/terreno.png',
        icon: 'map',
      },
      {
        value: 'comercial',
        label: 'Comercial',
        image: '/assets/steps/home-equity/comercial.png',
        icon: 'store',
      },
    ],
  },
  {
    id: 'prazo-necessidade',
    label: 'Para quando precisa?',
    description: 'Quando você precisa utilizar o crédito?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'imediato',
        label: 'Utilizar imediatamente',
        image: '/assets/steps/common/imediato.png',
        icon: 'clock',
      },
      {
        value: '1-mes',
        label: 'Para daqui a 1 mês',
        image: '/assets/steps/common/1-mes.png',
        icon: 'calendar',
      },
      {
        value: '3-meses',
        label: 'Para daqui a 3 meses',
        image: '/assets/steps/common/3-meses.png',
        icon: 'calendar',
      },
      {
        value: 'acima-3-meses',
        label: 'Acima de 3 meses',
        image: '/assets/steps/common/acima-3-meses.png',
        icon: 'calendar',
      },
    ],
  },
  {
    id: 'valor-garantia',
    label: 'Qual Valor do imóvel em garantia?',
    description: 'Informe o valor de avaliação do imóvel que será usado como garantia.',
    type: 'slider',
    required: true,
    min: 50000,
    max: 10000000,
    step: 10000,
    format: 'currency',
    validation: {
      min: 50000,
      message: 'O valor mínimo é R$ 50.000,00',
    },
  },
  {
    id: 'valor-credito',
    label: 'Qual Valor de crédito desejado?',
    description:
      'Informe o valor de crédito que deseja solicitar (máximo 60% do valor da garantia).',
    type: 'slider',
    required: true,
    min: 50000,
    max: 10000000,
    step: 10000,
    format: 'currency',
    validation: {
      dependsOn: 'valor-garantia',
      maxPercent: 60,
      message: 'O valor do crédito não pode ultrapassar 60% do valor da garantia',
    },
  },
  {
    id: 'prazo-emprestimo',
    label: 'Qual melhor prazo para você?',
    description: 'Selecione o prazo de pagamento desejado.',
    type: 'options',
    required: true,
    options: [
      {
        value: '60',
        label: '60 meses',
        image: '/assets/steps/common/60-meses.png',
        icon: 'clock',
      },
      {
        value: '120',
        label: '120 meses',
        image: '/assets/steps/common/120-meses.png',
        icon: 'clock',
      },
      {
        value: '180',
        label: '180 meses',
        image: '/assets/steps/common/180-meses.png',
        icon: 'clock',
      },
      {
        value: '240',
        label: '240 meses',
        image: '/assets/steps/common/240-meses.png',
        icon: 'clock',
      },
    ],
  },
  {
    id: 'tipo-pessoa',
    label: 'Pessoa Física ou Jurídica?',
    description: 'Selecione o tipo de pessoa para o empréstimo.',
    type: 'options',
    required: true,
    options: [
      {
        value: 'fisica',
        label: 'Pessoa Física',
        image: '/assets/steps/common/pessoa-fisica.png',
        icon: 'user',
      },
      {
        value: 'juridica',
        label: 'Pessoa Jurídica',
        image: '/assets/steps/common/pessoa-juridica.png',
        icon: 'building',
      },
    ],
  },
  {
    id: 'esta-quitado',
    label: 'Está quitado?',
    description: 'O imóvel usado como garantia está totalmente quitado?',
    type: 'options',
    required: true,
    options: [
      {
        value: 'sim',
        label: 'Sim',
        image: '/assets/steps/common/sim.png',
        icon: 'check',
      },
      {
        value: 'nao',
        label: 'Não',
        image: '/assets/steps/common/nao.png',
        icon: 'x',
      },
    ],
  },
];

/**
 * Função auxiliar para obter os steps baseado no tipo de crédito
 */
export const getStepsByCreditType = (creditType) => {
  if (creditType === 'financiamento') {
    return [...initialSteps, ...stepsFinanciamento];
  }
  if (creditType === 'home-equity') {
    return [...initialSteps, ...stepsHomeEquity];
  }
  return initialSteps;
};

