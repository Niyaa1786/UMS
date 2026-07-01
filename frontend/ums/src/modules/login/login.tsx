import React, { useState } from 'react';
import logoJpg from '../../assets/images/logo.jpg';
import { Shield, Lock, Mail, Eye, EyeOff, Globe, Sparkles, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'student' | 'teacher' | 'admin', userDetails: { name: string; id: string; avatar?: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [language, setLanguage] = useState('vi');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError(language === 'vi' ? 'Vui lòng điền đầy đủ thông tin đăng nhập.' : 'Please enter all login credentials.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      setIsLoading(false);
      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail === 'student@mssv.com' && password === '123') {
        onLogin('student', {
          name: 'Mách',
          id: 'SV2024001',
          avatar: 'https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/651707630_2331536743924418_4974950585853758390_n.jpg?stp=dst-jpg_tt6&cstp=mx821x821&ctp=s821x821&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JERRkstXH0sQ7kNvwHE993c&_nc_oc=AdojgxUFkW99bdwl8rTFySRV2LY6fqAVT-MaiUEM-m4NCFFXGU_znj0p1-cQinmzzWI&_nc_zt=23&_nc_ht=scontent.fsgn5-2.fna&_nc_gid=vwsPr4E50ToyJvwXCnzWBg&_nc_ss=7b2a8&oh=00_Af871K2ljHHeiVEQjCsyoWObSyIvbmovpXHOcmS0_JhWVA&oe=6A2EE05F'
        });
      } else if (normalizedEmail === 'teacher@school.com' && password === '123') {
        onLogin('teacher', {
          name: 'TS. Nguyễn Văn An',
          id: 'GV2023-001',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
        });
      } else if (normalizedEmail === 'admin@school.com' && password === '123') {
        onLogin('admin', {
          name: 'Admin Manager',
          id: 'AD2024-001',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
        });
      } else {
        setError(
          language === 'vi'
            ? 'Tên đăng nhập hoặc mật khẩu không chính xác.'
            : 'Incorrect username or password.'
        );
      }
    }, 800);
  };

  const handleFillCredentials = (role: 'student' | 'teacher' | 'admin') => {
    if (role === 'student') {
      setEmail('student@mssv.com');
      setPassword('123');
    } else if (role === 'teacher') {
      setEmail('teacher@school.com');
      setPassword('123');
    } else {
      setEmail('admin@school.com');
      setPassword('123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main card wrapper */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100/80 overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in">
        
        {/* Left Side: Brand presentation (Red side) */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[300px] md:min-h-0">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
          
          {/* Background image overlay with blend mode */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200')` }}
          />

          {/* Logo & Header */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoJpg} alt="EduManager Logo" className="w-12 h-12 rounded-2xl object-cover shadow-lg border border-white/20" />
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none">EduManager</h1>
                <p className="text-[10px] text-red-200/80 font-bold uppercase tracking-wider mt-1">HỆ THỐNG QUẢN LÝ HỌC SINH - SINH VIÊN</p>
              </div>
            </div>

            <p className="text-sm text-red-100/90 leading-relaxed font-medium max-w-xs mt-6 pt-4 border-t border-white/10">
              {language === 'vi' 
                ? 'Giải pháp quản lý giáo dục toàn diện, giúp nhà trường quản lý học tập, giảng dạy và thông tin sinh viên một cách hiệu quả.'
                : 'A comprehensive educational management solution helping schools manage learning, teaching, and student information effectively.'}
            </p>
          </div>

          {/* Feature Highlights Banner */}
          <div className="relative z-10 mt-12 md:mt-0 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="text-center p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-200 flex items-center justify-center mx-auto mb-1.5">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <p className="text-[9px] font-bold text-red-100">{language === 'vi' ? 'Quản lý toàn diện' : 'Total Admin'}</p>
              </div>
              <div className="text-center p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-200 flex items-center justify-center mx-auto mb-1.5">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <p className="text-[9px] font-bold text-red-100">{language === 'vi' ? 'Thống kê trực quan' : 'Visual Stats'}</p>
              </div>
              <div className="text-center p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-200 flex items-center justify-center mx-auto mb-1.5">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <p className="text-[9px] font-bold text-red-100">{language === 'vi' ? 'Bảo mật an toàn' : 'High Security'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white relative">
          
          {/* Header language picker */}
          <div className="flex justify-end items-center gap-2 mb-6">
            <div className="relative">
              <button 
                onClick={() => setLanguage(l => l === 'vi' ? 'en' : 'vi')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                <span className="text-[10px] bg-red-50 text-red-700 px-1 rounded uppercase font-extrabold border border-red-100">
                  {language === 'vi' ? 'vi' : 'en'}
                </span>
              </button>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="max-w-md w-full mx-auto my-auto space-y-6">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-gray-900">
                {language === 'vi' ? 'Đăng nhập hệ thống' : 'Sign In to Portal'}
              </h2>
              <p className="text-xs text-gray-400 font-semibold">
                {language === 'vi' ? 'Chào mừng bạn quay trở lại EduManager' : 'Welcome back to EduManager Portal'}
              </p>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-bold animate-pulse">
                <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">
                  {language === 'vi' ? 'Tên đăng nhập / Email' : 'Username or Email'}
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'vi' ? 'student@mssv.com, teacher@school.com hoặc admin@school.com' : 'student@mssv.com, teacher@school.com or admin@school.com'}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-red-600 focus:bg-white pl-10 pr-4 py-3 rounded-2xl text-xs font-bold text-gray-800 outline-none transition-all placeholder:text-gray-400 placeholder:font-medium"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-red-700 transition-colors" />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">
                  {language === 'vi' ? 'Mật khẩu' : 'Password'}
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-red-600 focus:bg-white pl-10 pr-10 py-3 rounded-2xl text-xs font-bold text-gray-800 outline-none transition-all placeholder:text-gray-400"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-red-700 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-all"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-500 hover:text-gray-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4.5 h-4.5 border-gray-300 rounded text-red-700 focus:ring-red-500 accent-red-700 cursor-pointer"
                  />
                  <span>{language === 'vi' ? 'Ghi nhớ đăng nhập' : 'Remember me'}</span>
                </label>
                <a href="#forgot" className="font-bold text-red-600 hover:text-red-800 transition-colors">
                  {language === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-700 hover:bg-red-800 active:bg-red-950 text-white font-bold text-sm py-3 rounded-2xl mt-2 flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-700/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-red-700/20 active:scale-98"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{language === 'vi' ? 'Đang xác thực...' : 'Authenticating...'}</span>
                  </>
                ) : (
                  <span>{language === 'vi' ? 'Đăng nhập' : 'Sign In'}</span>
                )}
              </button>
            </form>

            {/* Quick Demo logins banner */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'vi' ? 'Tài khoản thử nghiệm' : 'Demo Credentials'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillCredentials('student')}
                  className="bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 px-2 py-2 rounded-xl text-left transition-all group"
                >
                  <p className="text-[10px] font-black text-gray-700 group-hover:text-red-700 leading-tight">Học sinh</p>
                  <p className="text-[8px] text-gray-400 group-hover:text-red-600 font-medium truncate">student@mssv.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('teacher')}
                  className="bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 px-2 py-2 rounded-xl text-left transition-all group"
                >
                  <p className="text-[10px] font-black text-gray-700 group-hover:text-red-700 leading-tight">Giáo viên</p>
                  <p className="text-[8px] text-gray-400 group-hover:text-red-600 font-medium truncate">teacher@school.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillCredentials('admin')}
                  className="bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 px-2 py-2 rounded-xl text-left transition-all group"
                >
                  <p className="text-[10px] font-black text-gray-700 group-hover:text-red-700 leading-tight">Quản trị viên</p>
                  <p className="text-[8px] text-gray-400 group-hover:text-red-600 font-medium truncate">admin@school.com</p>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                {language === 'vi' ? 'hoặc đăng nhập với' : 'or sign in with'}
              </span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-700 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-700 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23" fill="currentColor">
                  <path fill="#f35325" d="M0 0h11v11H0z"/>
                  <path fill="#81bc06" d="M12 0h11v11H12z"/>
                  <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                  <path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
                <span>Microsoft</span>
              </button>
            </div>
          </div>

          {/* Footer security badge */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-semibold mt-6">
            <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {language === 'vi' 
                ? 'Thông tin của bạn được bảo mật an toàn tuyệt đối' 
                : 'Your connection and data are fully encrypted and secure'}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
