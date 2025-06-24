# 🔐 Configuração de Autenticação - Prompt-Kirjasto Pro

## 📋 Pré-requisitos

1. **Conta no Supabase** (gratuita): https://supabase.com
2. **Projeto criado no Supabase**

## 🚀 Configuração Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse https://supabase.com e faça login
2. Clique em "New Project"
3. Escolha um nome (ex: "prompt-kirjasto-pro")
4. Defina uma senha para o banco
5. Escolha uma região próxima
6. Clique em "Create new project"

### 2. Obter Credenciais

No dashboard do seu projeto Supabase:

1. Vá em **Settings** → **API**
2. Copie os seguintes valores:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui

# Course Access Code (defina o código que seus alunos vão usar)
NEXT_PUBLIC_COURSE_ACCESS_CODE=CURSO2024
```

### 4. Configurar Autenticação no Supabase

1. No dashboard, vá em **Authentication** → **Settings**
2. Em **Site URL**, adicione: `http://localhost:3000` (desenvolvimento)
3. Para produção, adicione sua URL do Vercel
4. Em **Auth Providers**, mantenha apenas **Email** habilitado

### 5. Configurar Políticas de Segurança (RLS)

No **SQL Editor** do Supabase, execute:

```sql
-- Habilitar RLS na tabela de usuários
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON auth.users
    FOR SELECT USING (auth.uid() = id);
```

## 🎯 Códigos de Acesso

### Opção 1: Código Único
- Defina um código único para todos os alunos
- Exemplo: `CURSO2024`, `CHATGPT2024`, etc.

### Opção 2: Códigos Individuais
- Gere códigos únicos para cada aluno
- Modifique a função `signUp` em `src/lib/auth.ts`

## 🔧 Personalização

### Alterar Mensagens
Edite o arquivo `src/components/AuthModal.tsx`:
- Títulos e descrições
- Mensagens de erro
- Textos dos botões

### Alterar Validações
Edite o arquivo `src/lib/auth.ts`:
- Lógica de validação do código
- Regras de senha
- Metadados do usuário

### Customizar Welcome Page
Edite o arquivo `src/components/WelcomePage.tsx`:
- Textos promocionais
- Features destacadas
- Design e cores

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório GitHub ao Vercel
2. Adicione as variáveis de ambiente no dashboard do Vercel
3. Deploy automático será feito

### Outras Plataformas

Certifique-se de configurar as variáveis de ambiente:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_COURSE_ACCESS_CODE`

## 🔒 Segurança

### Boas Práticas

1. **Códigos de Acesso**:
   - Use códigos complexos
   - Mude periodicamente
   - Não compartilhe publicamente

2. **Supabase**:
   - Habilite RLS (Row Level Security)
   - Configure políticas adequadas
   - Use HTTPS sempre

3. **Variáveis de Ambiente**:
   - Nunca commite o arquivo `.env.local`
   - Use diferentes códigos para dev/prod

## 📧 Configuração de Email (Opcional)

Para emails personalizados de confirmação:

1. No Supabase, vá em **Authentication** → **Settings**
2. Configure **SMTP Settings** com seu provedor
3. Personalize os templates de email

## 🎨 Personalização Avançada

### Adicionar Mais Campos no Cadastro

```typescript
// Em src/lib/auth.ts, na função signUp:
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      course_access: true,
      access_code: accessCode,
      full_name: fullName, // Adicione campos extras
      course_batch: 'Turma 2024',
    }
  }
});
```

### Integrar com Webhook

Para notificações quando alguém se cadastra:

1. Configure webhook no Supabase
2. Integre com seu sistema de CRM
3. Envie emails de boas-vindas automáticos

## 🆘 Suporte

Se tiver problemas:

1. Verifique as variáveis de ambiente
2. Confirme se o projeto Supabase está ativo
3. Teste com código de acesso correto
4. Verifique o console do navegador para erros

## 📝 Notas Importantes

- O código padrão é `CURSO2024` (pode ser alterado)
- Usuários precisam confirmar email se SMTP estiver configurado
- A autenticação persiste entre sessões
- Dark mode funciona na tela de login também

---

✅ **Pronto!** Sua ferramenta agora está protegida e pronta para ser oferecida como bonus exclusivo do seu curso! 