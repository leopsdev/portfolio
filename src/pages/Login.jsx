import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Senha incorreta');
      }
    } catch (err) {
      setError('Erro de conexão com servidor');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* <Navbar /> */}
      <div className="flex items-center justify-center pt-32 px-4 h-[80vh]">
        <div className="bg-retro-cream p-8 border-4 border-retro-gray shadow-[8px_8px_0_var(--color-retro-gray)] max-w-md w-full relative">
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-3 h-3 bg-retro-cream-dark border-2 border-retro-gray rounded-full"></div>
            <div className="w-3 h-3 bg-retro-accent border-2 border-retro-gray rounded-full"></div>
            <div className="w-3 h-3 bg-retro-teal border-2 border-retro-gray rounded-full"></div>
          </div>
          <h2 className="text-3xl font-black text-retro-teal mb-6 uppercase tracking-tighter">Login.exe</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-mono font-bold text-retro-teal text-sm">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="retro-input"
                placeholder="Insira a senha"
              />
            </div>

            {error && <div className="text-retro-teal font-mono font-bold text-sm">{">"} Erro: {error}</div>}

            <button type="submit" className="retro-btn-teal mt-2 w-full uppercase">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
