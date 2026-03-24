import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // For demo purposes, we will accept any login since the user hasn't provided Supabase keys yet
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setTimeout(() => {
        onLogin({ email: email || 'admin@hmv.lk', role: 'admin' });
      }, 1000);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onLogin(data.user);
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-primary/20 to-secondary/20 blur-[150px] transform -translate-y-1/2 pointer-events-none"></div>
      
      <Card className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border-zinc-800 text-white shadow-2xl relative z-10">
        <CardHeader className="space-y-4 items-center text-center pb-8 border-b border-zinc-800/50 mb-6">
          <div className="w-20 h-20 rounded-full bg-white p-2">
            <img 
              src="https://ik.imagekit.io/5fpzilm1y/logo.png" 
              alt="HMV Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold font-playfair tracking-wide">Admin Portal</CardTitle>
            <CardDescription className="text-zinc-400">Homagama Maha Vidyalaya CMS</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2 relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <Input 
                type="email" 
                placeholder="Admin Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 text-white pl-10 h-12 focus-visible:ring-primary"
              />
            </div>
            
            <div className="space-y-2 relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 text-white pl-10 h-12 focus-visible:ring-primary"
              />
            </div>

            {!import.meta.env.VITE_SUPABASE_URL && (
               <p className="text-xs text-yellow-500/80 text-center animate-pulse">
                [Demo Mode] Any login works (No Supabase keys set)
               </p>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white shadow-lg font-semibold"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
