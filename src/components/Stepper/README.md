# Stepper de Simulação de Crédito

Sistema completo e modular de stepper para simulação de crédito imobiliário.

## 📁 Estrutura

```
src/
├── components/
│   └── Stepper/
│       ├── StepperContainer.jsx    # Container principal
│       ├── StepCard.jsx            # Card de opção
│       ├── StepOptions.jsx          # Grid de opções
│       ├── StepSlider.jsx           # Slider de valores
│       ├── StepNavigation.jsx       # Navegação
│       ├── StepperSummary.jsx      # Resumo final
│       └── stepper.config.js       # Configuração dos steps
├── hooks/
│   └── useStepper.js               # Hook de gerenciamento
└── assets/
    └── steps/                      # Imagens dos steps
        ├── common/
        ├── financiamento/
        └── home-equity/
```

## 🎯 Como Usar

### 1. Adicionar Imagens

As imagens devem ser colocadas em `public/assets/steps/` seguindo a estrutura:

- `common/` - Imagens compartilhadas
- `financiamento/` - Imagens específicas de financiamento
- `home-equity/` - Imagens específicas de home equity

### 2. Configurar Steps

Edite `stepper.config.js` para adicionar ou modificar steps:

```javascript
{
  id: 'meu-step',
  label: 'Pergunta do step',
  description: 'Descrição opcional',
  type: 'options', // ou 'slider'
  required: true,
  options: [
    {
      value: 'valor',
      label: 'Label',
      image: '/assets/steps/common/imagem.png',
      icon: 'home', // fallback se imagem não carregar
    },
  ],
}
```

### 3. Validações

Para sliders com dependências:

```javascript
{
  type: 'slider',
  validation: {
    dependsOn: 'valor-imovel',
    maxPercent: 80,
    message: 'Mensagem de erro',
  },
}
```

## 🔧 Componentes

### StepperContainer

Container principal que orquestra todo o fluxo.

**Props:**

- `initialCreditType` (string, opcional): Tipo de crédito inicial

### StepCard

Card individual de opção.

**Props:**

- `option`: Objeto com value, label, image, icon
- `isSelected`: Boolean
- `isDisabled`: Boolean
- `onClick`: Function

### StepOptions

Grid de opções.

**Props:**

- `step`: Configuração do step
- `selectedValue`: Valor selecionado
- `onSelect`: Function
- `error`: Mensagem de erro

### StepSlider

Slider para valores monetários.

**Props:**

- `step`: Configuração do step
- `value`: Valor atual
- `onChange`: Function
- `error`: Mensagem de erro
- `dependentValue`: Valor dependente (para validação)
- `maxPercent`: Percentual máximo

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas via Tailwind:

- Azul primário: `blue-500`, `blue-600`
- Verde sucesso: `green-500`, `green-600`
- Vermelho erro: `red-500`, `red-600`

### Animações

Animações definidas em `index.css`:

- `animate-fadeIn`
- `animate-slideIn`
- `animate-scaleIn`

## 📝 Notas

- Todas as imagens são opcionais (fallback para ícones)
- Validações são automáticas
- Estado é gerenciado centralmente pelo hook
- Zero dependências externas além de React e Material-UI

