import { useState } from 'react';
import logoJpg from '../../assets/images/logo.jpg';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  GraduationCap,
  UserCheck,
  Award,
  CreditCard,
  Bell,
  User,
  Settings,
  Search,
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// Import subcomponents
import TongQuan from './tongquan';
import KhoaHoc from './khoahoc';
import DangKyHoc from './dangkyhoc';
import ThoiKhoaBieu from './thoikhoabieu';
import KetQua from './ketqua';
import DiemDanh from './diemdanh';
import LichThi from './lichthi';
import HocPhi from './hocphi';
import ThongBao from './thongbao';
import HoSo from './hoso';

export interface StudentProps {
  studentName?: string;
  studentId?: string;
  avatarUrl?: string;
  major?: string;
  classCode?: string;
  onLogout?: () => void;
}

export default function StudentDashboard({
  studentName = 'Lê Minh Tuấn',
  studentId = 'SV2024001',
  avatarUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop',
  major = 'Công nghệ thông tin',
  classCode = 'CNTT01',
  onLogout
}: StudentProps) {
  const [activeTab, setActiveTab] = useState<string>('tong-quan');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedSemester, setSelectedSemester] = useState<string>('HK2 - 2023-2024');

  const menuItems = [
    { id: 'tong-quan', label: 'Tổng quan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'khoa-hoc', label: 'Khóa học của tôi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'dang-ky-hoc', label: 'Đăng ký học phần', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'thoi-khoa-bieu', label: 'Thời khóa biểu', icon: <Calendar className="w-5 h-5" /> },
    { id: 'ket-qua', label: 'Kết quả học tập', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'diem-danh', label: 'Điểm danh', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'lich-thi', label: 'Lịch thi', icon: <Award className="w-5 h-5" /> },
    { id: 'hoc-phi', label: 'Học phí', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'thong-bao', label: 'Thông báo', icon: <Bell className="w-5 h-5" /> },
    { id: 'ho-so', label: 'Hồ sơ', icon: <User className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tong-quan':
        return <TongQuan studentName={studentName} />;
      case 'khoa-hoc':
        return <KhoaHoc />;
      case 'dang-ky-hoc':
        return <DangKyHoc />;
      case 'thoi-khoa-bieu':
        return <ThoiKhoaBieu />;
      case 'ket-qua':
        return <KetQua />;
      case 'diem-danh':
        return <DiemDanh />;
      case 'lich-thi':
        return <LichThi />;
      case 'hoc-phi':
        return <HocPhi />;
      case 'thong-bao':
        return <ThongBao />;
      case 'ho-so':
        return (
          <HoSo
            studentName={studentName}
            studentId={studentId}
            avatarUrl={avatarUrl}
            major={major}
            classCode={classCode}
          />
        );
      default:
        return <TongQuan studentName={studentName} />;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex font-sans antialiased text-gray-700">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 shrink-0 z-20">
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <img src={logoJpg} alt="EduManager Logo" className="w-11 h-11 rounded-xl object-cover shadow-md border border-gray-100/50" />
          <div>
            <h2 className="text-lg font-black tracking-tight text-red-700 leading-tight">EduManager</h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-0.5">Cổng thông tin sinh viên</p>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  isActive
                    ? 'bg-red-50 text-red-700 shadow-sm shadow-red-100/50'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
                }`}
              >
                <div className={`transition-colors duration-200 ${isActive ? 'text-red-700' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar User Footer */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/20">
          <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all cursor-pointer" onClick={() => setActiveTab('ho-so')}>
            <img
              src={avatarUrl}
              alt={studentName}
              className="w-10 h-10 rounded-full object-cover border border-gray-100"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-black text-gray-800 truncate leading-tight">{studentName}</h4>
              <p className="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{studentId}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar overlay Drawer */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          
          {/* Drawer container */}
          <div className="relative flex flex-col w-72 max-w-xs bg-white h-full shadow-2xl z-50 animate-slide-right">
            {/* Close Button inside drawer */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500 border border-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Brand Header */}
            <div className="p-6 border-b border-gray-50 flex items-center gap-3">
              <img src={logoJpg} alt="EduManager Logo" className="w-9 h-9 rounded-lg object-cover shadow-sm border border-gray-100/50" />
              <div>
                <h2 className="text-base font-black text-red-700 leading-tight">EduManager</h2>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Cổng sinh viên</p>
              </div>
            </div>

            {/* Drawer Navigation List */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-red-50 text-red-700'
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={isActive ? 'text-red-700' : 'text-gray-400'}>{item.icon}</div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Drawer User Footer */}
            <div className="p-4 border-t border-gray-50 bg-gray-50/20">
              <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-100" onClick={() => { setActiveTab('ho-so'); setIsSidebarOpen(false); }}>
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-gray-800 truncate">{studentName}</h4>
                  <p className="text-[9px] text-gray-400 font-medium truncate">{studentId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Panel Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 gap-4">
          
          {/* Left search or Hamburger Toggle for mobile */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 border border-gray-100 transition-all shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Input bar */}
            <div className="relative w-full hidden sm:block">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, sự kiện..."
                className="w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 hover:border-gray-200 focus:border-red-500 focus:bg-white px-10 py-2.5 rounded-xl text-xs font-semibold text-gray-700 transition-all focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right actions dropdown / notifications */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Notifications Button */}
            <button
              onClick={() => setActiveTab('thong-bao')}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-800 border border-gray-100 transition-all"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border-2 border-white ring-1 ring-red-300"></span>
            </button>

            {/* Settings Button */}
            <button className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-800 border border-gray-100 transition-all">
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* Divider */}
            <span className="h-6 w-px bg-gray-100 hidden sm:inline-block"></span>

            {/* Semester Dropdown */}
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 px-3 py-2.5 pr-8 rounded-xl text-xs font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer transition-all"
              >
                <option>HK2 - 2023-2024</option>
                <option>HK1 - 2023-2024</option>
                <option>HK2 - 2022-2023</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic Component Render */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-16">
          {renderContent()}
        </main>
      </div>

    </div>
  );
}
