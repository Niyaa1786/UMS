import { useState, useEffect } from 'react';
import Login from './modules/login/login';
import StudentDashboard from './modules/hocsinh/student';
import TeacherDashboard from './modules/giaovien/teacher';
import AdminDashboard from './modules/admin/admin';

interface UserSession {
  role: 'student' | 'teacher' | 'admin';
  name: string;
  id: string;
  avatar?: string;
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);

  // Load session from localStorage on initialization
  useEffect(() => {
    const savedSession = localStorage.getItem('ums_session');
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem('ums_session');
      }
    }
  }, []);

  const handleLogin = (role: 'student' | 'teacher' | 'admin', userDetails: { name: string; id: string; avatar?: string }) => {
    const newSession: UserSession = {
      role,
      name: userDetails.name,
      id: userDetails.id,
      avatar: userDetails.avatar
    };
    setSession(newSession);
    localStorage.setItem('ums_session', JSON.stringify(newSession));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('ums_session');
  };

  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  if (session.role === 'student') {
    return (
      <StudentDashboard
        studentName={session.name}
        studentId={session.id}
        avatarUrl={session.avatar}
        onLogout={handleLogout}
      />
    );
  }

  if (session.role === 'teacher') {
    return (
      <TeacherDashboard
        teacherName={session.name}
        teacherId={session.id}
        avatarUrl={session.avatar}
        onLogout={handleLogout}
      />
    );
  }

  if (session.role === 'admin') {
    return (
      <AdminDashboard
        adminName={session.name}
        adminId={session.id}
        avatarUrl={session.avatar}
        onLogout={handleLogout}
      />
    );
  }

  return <Login onLogin={handleLogin} />;
}
