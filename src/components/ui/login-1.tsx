'use client'

import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store/useStore';
import { Loader2 } from 'lucide-react';


interface InputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

const AppInput = (props: InputProps) => {
  const { label, placeholder, icon, ...rest } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="w-full min-w-[200px] relative">
      { label && 
        <label className='block mb-2 text-sm text-[var(--color-text-primary)]'>
          {label}
        </label>
      }
      <div className="relative w-full">
        <input
          type="text"
          className="peer relative z-10 border-2 border-[var(--color-border)] h-13 w-full rounded-md bg-[var(--color-surface)] px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[var(--color-bg)] placeholder:font-medium text-[var(--color-text-primary)]"
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
              style={{
                background: `radial-gradient(40px circle at ${mousePosition.x}px 0px, var(--color-text-primary) 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{
                background: `radial-gradient(40px circle at ${mousePosition.x}px 2px, var(--color-text-primary) 0%, transparent 70%)`,
              }}
            />
          </>
        )}
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

const LoginOne = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { apiFetch } = await import('@/lib/api');
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      // Ensure the token maps correctly
      console.log('Login success:', response);
      if (response && response.token) {
         localStorage.setItem('rk_token', response.token);
      }
      
      // Plumb user object natively or mock if dev backend differs
      if (response && response.user) {
         login(response.user);
      } else {
         login({ 
             id: Math.random().toString(36).substr(2, 9), 
             name: email.split('@')[0], 
             email, 
             role: 'renter' 
         });
      }
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid login credentials, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const socialIcons = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>,
      href: '#',
      gradient: 'bg-[var(--color-bg)]',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"/></svg>,
      href: '#',
      bg: 'bg-[var(--color-bg)]',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"/></svg>,
      href: '#',
      bg: 'bg-[var(--color-bg)]',
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className='w-full max-w-[1000px] flex flex-col lg:flex-row bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] h-auto lg:h-[600px]'>
        <div
          className='w-full lg:w-1/2 px-8 lg:px-16 py-12 relative overflow-hidden flex flex-col justify-center'
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
          <div
            className={`absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-3xl transition-opacity duration-500 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          />
          <div className="z-10 w-full">
            <form className='text-center grid gap-6' onSubmit={handleLogin}>
              <div className='grid gap-2'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-[var(--color-heading)]'>Sign in</h1>
                <div className="social-container mt-4">
                  <ul className="flex justify-center gap-4">
                    {socialIcons.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.href}
                          className="w-12 h-12 bg-[var(--color-bg-2)] rounded-full flex justify-center items-center relative z-[1] border-2 border-[var(--color-border)] overflow-hidden group transition-all duration-300"
                        >
                          <div
                            className={`absolute inset-0 w-full h-full ${
                              social.gradient || social.bg
                            } scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100`}
                          />
                          <span className="text-[1.5rem] text-[#101214] transition-all duration-500 ease-in-out z-[2] group-hover:text-[var(--color-text-primary)]">
                            {social.icon}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className='text-sm text-[var(--color-text-secondary)] mt-2'>or use your account</span>
              </div>
              <div className='grid gap-4'>
                <AppInput placeholder="Email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
                <AppInput placeholder="Password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
              </div>
              <a href="#" className='text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors'>Forgot your password?</a>
              <div className='flex justify-center mt-2'>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full inline-flex justify-center items-center overflow-hidden rounded-md bg-[var(--color-border)] px-8 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--color-text-primary)]/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                  </span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='hidden lg:block w-1/2 relative overflow-hidden'>
            <Image
              src='https://images.pexels.com/photos/7102037/pexels-photo-7102037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              width={1000}
              height={1000}
              priority
              alt="Login background"
              className="w-full h-full object-cover opacity-50 transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--color-surface)]" />
       </div>
      </div>
    </div>
  )
}

export default LoginOne
