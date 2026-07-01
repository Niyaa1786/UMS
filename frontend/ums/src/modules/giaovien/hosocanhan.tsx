import { useState, FormEvent } from 'react';
import { Shield, Smartphone, Award, Clock, Users, BookOpen, Save, Key, User, Settings, CheckCircle } from 'lucide-react';

export default function HoSoCaNhan() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state fields
  const [name, setName] = useState('Nguyễn Văn An');
  const teacherId = 'GV2023-001';
  const [email, setEmail] = useState('a.nguyenvan@university.edu.vn');
  const [phone, setPhone] = useState('0901 234 567');
  const [birthdate, setBirthdate] = useState('1975-05-20');
  const [department, setDepartment] = useState('Khoa học máy tính');
  const [address, setAddress] = useState('Số 123, Đường Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh');
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner and Profile Summary Header */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Cover red background */}
        <div className="h-32 md:h-44 bg-gradient-to-r from-red-700 to-red-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
        </div>
        
        {/* Profile Details Block */}
        <div className="px-6 py-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-10 relative z-10 border-b border-gray-50 bg-white">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop"
              alt="TS. Nguyễn Văn An"
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-4 border-white shadow-md shrink-0 bg-white"
            />
            <div className="pb-1 space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-gray-900">TS. Nguyễn Văn An</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Khoa Công nghệ thông tin • Giảng viên cao cấp
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-red-700 hover:bg-red-800 active:bg-red-950 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer active:scale-95 shrink-0 self-center md:self-auto"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 bg-white flex border-b border-gray-100 text-xs font-bold text-gray-500 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-4 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-red-700 text-red-700 font-black'
                : 'border-transparent hover:text-gray-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-4 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'password'
                ? 'border-red-700 text-red-700 font-black'
                : 'border-transparent hover:text-gray-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Key className="w-4 h-4" />
              Đổi mật khẩu
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-4 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-red-700 text-red-700 font-black'
                : 'border-transparent hover:text-gray-800'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Settings className="w-4 h-4" />
              Cài đặt tài khoản
            </span>
          </button>
        </div>
      </div>

      {/* Main Forms & Stats Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Dynamic Tab Panels (takes 2 colspans) */}
        <div className="lg:col-span-2 space-y-6">
          {saveSuccess && (
            <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold animate-pulse">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Cập nhật thông tin giảng viên thành công! Dữ liệu đã được đồng bộ với hệ thống trường học.</span>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="pb-4 border-b border-gray-50 mb-5">
                <h3 className="text-base font-black text-gray-900">Chỉnh sửa thông tin</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Vui lòng cập nhật thông tin cá nhân và tài khoản giảng dạy của bạn</p>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-bold text-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Họ và tên */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Họ và tên</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Mã giảng viên */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Mã giảng viên</label>
                    <input
                      type="text"
                      value={teacherId}
                      disabled
                      className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email công vụ */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Email công vụ</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Số điện thoại */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Số điện thoại</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Ngày sinh */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Ngày sinh</label>
                    <input
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Bộ môn */}
                  <div className="space-y-1.5">
                    <label className="text-gray-500">Bộ môn</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all appearance-none"
                    >
                      <option>Khoa học máy tính</option>
                      <option>Công nghệ phần mềm</option>
                      <option>Hệ thống thông tin</option>
                      <option>An toàn thông tin</option>
                    </select>
                  </div>
                </div>

                {/* Địa chỉ liên lạc */}
                <div className="space-y-1.5">
                  <label className="text-gray-500">Địa chỉ liên lạc</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all resize-none"
                  />
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="pb-4 border-b border-gray-50">
                <h3 className="text-base font-black text-gray-900">Đổi mật khẩu</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Đặt lại mật khẩu bảo vệ tài khoản giảng viên</p>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-bold text-gray-700 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-gray-500">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500">Mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-500">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-semibold text-gray-800 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
                  />
                </div>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="pb-4 border-b border-gray-50">
                <h3 className="text-base font-black text-gray-900">Cài đặt tài khoản</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tùy biến các cấu hình thông báo và tùy chọn riêng tư</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 accent-red-700 w-4 h-4" />
                  <div>
                    <h4 className="text-xs font-black text-gray-800">Nhận thông báo qua Email</h4>
                    <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Gửi các bản tóm tắt học thuật và lịch dạy của khoa định kỳ hàng tuần</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-1 accent-red-700 w-4 h-4" />
                  <div>
                    <h4 className="text-xs font-black text-gray-800">Thông báo điểm danh tự động</h4>
                    <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Gửi thông báo đẩy về thiết bị khi có sinh viên trễ hoặc vắng học không lý do</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Widgets (takes 1 colspan) */}
        <div className="space-y-6">
          
          {/* Thống kê nhanh */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-gray-50">
              <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase">Thống kê nhanh</h3>
            </div>
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-xs">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span>Lớp đang dạy</span>
                </div>
                <span className="text-sm font-black text-gray-900">05</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-xs">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Tổng sinh viên</span>
                </div>
                <span className="text-sm font-black text-gray-900">248</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-xs">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Giờ giảng/Tuần</span>
                </div>
                <span className="text-sm font-black text-gray-900">18h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-xs">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Đánh giá TB</span>
                </div>
                <span className="text-sm font-black text-emerald-600">4.9 / 5</span>
              </div>
            </div>
          </div>

          {/* Bảo mật an toàn */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-gray-50">
              <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase">Bảo mật</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4.5 h-4.5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-gray-800">Xác thực 2 yếu tố</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Bảo vệ tài khoản qua tin nhắn SMS OTP</p>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 font-black">
                  ĐÃ BẬT
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="w-4.5 h-4.5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-gray-800">Thiết bị đăng nhập</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">MacBook Pro - TP. HCM</p>
                  </div>
                </div>
                <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 font-black">
                  HIỆN TẠI
                </span>
              </div>

              <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-black text-gray-700 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer">
                Quản lý thiết bị
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
