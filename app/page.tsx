'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LogIn, Mail, Lock, Bot, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      if (!data.user) {
        throw new Error('Usuário não encontrado');
      }

      router.push('/home');
    } catch (err: any) {
      let mensagem = 'Erro ao fazer login';
      
      if (err.message?.includes('Invalid login credentials')) {
        mensagem = 'Email ou senha incorretos';
      } else if (err.message?.includes('Email not confirmed')) {
        mensagem = 'Email não confirmado';
      } else if (err.message?.includes('rate limit')) {
        mensagem = 'Muitas tentativas. Aguarde alguns minutos';
      }
      
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Ícone e Título Superior */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-400 text-lg">
            Seu parceiro na gincana de saúde
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#111827] rounded-3xl p-8 shadow-2xl border border-gray-800">
          {/* Logo do App */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">GymCAD 360</h2>
              <p className="text-gray-400 text-sm">ECOA BB</p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Campo E-mail */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="voce@empresa.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white text-sm font-medium">
                  Senha
                </label>
                <button
                  type="button"
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                >
                  Esqueci a senha
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-semibold py-3.5 rounded-xl transition-all transform active:scale-98 shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        {/* Link de Cadastro */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Ainda não tenho cadastro?{' '}
            <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
