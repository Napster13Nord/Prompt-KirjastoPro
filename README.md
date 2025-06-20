# 🚀 Prompt-Kirjasto Pro

**A modern, professional AI prompt directory and management platform**

Prompt-Kirjasto Pro é uma plataforma avançada para descobrir, gerenciar e utilizar prompts de IA de forma eficiente. Inspirado no popular prompts.chat, oferece uma experiência superior com funcionalidades modernas e interface elegante.

## ✨ Features

- 🔍 **Busca Inteligente** - Busca semântica avançada com Fuse.js
- 🏷️ **Categorização Automática** - Organização inteligente por categorias
- ⭐ **Sistema de Favoritos** - Salve e organize seus prompts preferidos
- 🎨 **Edição Inline** - Personalize prompts diretamente na interface
- 🌙 **Dark/Light Mode** - Tema escuro e claro com persistência
- 📱 **Design Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🎯 **Filtros Avançados** - Filtre por categoria, plataforma, tipo de usuário
- 🚀 **Performance Otimizada** - Carregamento rápido e animações suaves
- 🔧 **Tech Stack Moderno** - Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand com persistência
- **Search**: Fuse.js para busca fuzzy
- **Animations**: Framer Motion
- **UI Components**: Lucide React Icons
- **Notifications**: React Hot Toast
- **Database**: Supabase (futuro)
- **Deploy**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm ou yarn

### Installation

1. Clone o repositório:
```bash
git clone https://github.com/your-username/prompt-kirjasto-pro.git
cd prompt-kirjasto-pro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Execute o projeto:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Project Structure

```
prompt-kirjasto-pro/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Estilos globais
│   │   └── page.tsx        # Página principal
│   ├── components/         # Componentes React
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   ├── FilterSidebar.tsx # Barra lateral de filtros
│   │   └── PromptCard.tsx  # Card individual dos prompts
│   ├── store/              # Gerenciamento de estado
│   │   └── useAppStore.ts  # Store principal com Zustand
│   ├── lib/                # Utilitários
│   │   ├── supabase.ts     # Cliente Supabase
│   │   └── csvParser.ts    # Parser para dados CSV
│   ├── types/              # Definições TypeScript
│   │   └── index.ts        # Tipos principais
│   └── data/               # Dados dos prompts (desenvolvimento)
├── public/
│   └── data/               # Arquivos CSV públicos
└── ...
```

## 🎯 Features Overview

### 🔍 Busca e Filtros
- Busca em tempo real com algoritmo fuzzy
- Filtros por categoria, plataforma de IA, foco em desenvolvimento
- Ordenação por relevância, nome, data

### 📝 Gerenciamento de Prompts
- Visualização de prompts tradicionais e "vibe prompts"
- Edição inline com preview em tempo real
- Cópia rápida para clipboard
- Sistema de tags e categorização

### ⭐ Favoritos
- Adicione prompts aos favoritos com um clique
- Persiste localmente no navegador
- Contadores visuais e indicadores

### 🎨 Interface
- Design moderno e profissional
- Animações suaves com Framer Motion
- Tema escuro/claro com persistência
- Layout responsivo para todos os dispositivos

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Outros Providers

O projeto é compatível com qualquer provedor que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Acknowledgments

- Inspirado pelo excelente trabalho do [prompts.chat](https://prompts.chat)
- Dados de prompts baseados no repositório [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)
- Comunidade de desenvolvedores que contribuem com prompts de qualidade

## 📞 Support

Se você encontrar algum problema ou tiver sugestões:

- 🐛 [Reporte bugs](https://github.com/your-username/prompt-kirjasto-pro/issues)
- 💡 [Sugira features](https://github.com/your-username/prompt-kirjasto-pro/issues)
- 📧 Entre em contato: your-email@example.com

---

**Feito com ❤️ para a comunidade de IA**
