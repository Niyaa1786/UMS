import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, Settings, Shield, ExternalLink, ChevronRight, LogIn } from 'lucide-react';
import { useState } from 'react';

interface HoSoProps {
  studentName: string;
  studentId: string;
  avatarUrl: string;
  major: string;
  classCode: string;
}

export default function HoSo({ studentName, studentId, avatarUrl, major, classCode }: HoSoProps) {
  const [activeTab, setActiveTab] = useState<'ca-nhan' | 'bao-mat' | 'cai-dat'>('ca-nhan');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Architectural red background banner */}
        <div className="h-40 bg-gradient-to-r from-red-800 to-red-950 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          {/* Mock edit overlay icon */}
          <button className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Details Bar */}
        <div className="p-6 pt-0 relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-10 md:pb-6 border-b border-gray-50">
          <img
            src={avatarUrl}
            alt={studentName}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md relative z-10"
          />
          <div className="flex-1 text-center md:text-left space-y-1.5 md:mb-1">
            <h1 className="text-xl md:text-2xl font-black text-gray-800">{studentName}</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <span>MSSV: {studentId}</span>
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 md:mb-1">
            Sửa hồ sơ
          </button>
        </div>

        {/* Three Columns Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center py-4 bg-gray-50/50">
          <div className="py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Khoa</p>
            <p className="text-xs font-bold text-gray-800 mt-1">Công nghệ Thông tin</p>
          </div>
          <div className="py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ngành</p>
            <p className="text-xs font-bold text-gray-800 mt-1">{major}</p>
          </div>
          <div className="py-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Khóa</p>
            <p className="text-xs font-bold text-gray-800 mt-1">K66 (2021 - 2025)</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left tabs details, Right statistics & logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Tabs Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Selection */}
          <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex border-b border-gray-150 text-xs font-bold">
              <button
                onClick={() => setActiveTab('ca-nhan')}
                className={`pb-3 px-4 border-b-2 transition-all ${
                  activeTab === 'ca-nhan'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Thông tin cá nhân
              </button>
              <button
                onClick={() => setActiveTab('bao-mat')}
                className={`pb-3 px-4 border-b-2 transition-all ${
                  activeTab === 'bao-mat'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Bảo mật
              </button>
              <button
                onClick={() => setActiveTab('cai-dat')}
                className={`pb-3 px-4 border-b-2 transition-all ${
                  activeTab === 'cai-dat'
                    ? 'border-red-700 text-red-700'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Cài đặt
              </button>
            </div>

            {/* Render Tab Contents */}
            {activeTab === 'ca-nhan' && (
              <div className="pt-6 space-y-6">
                {/* Thông tin liên hệ */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-red-700" /> Thông tin liên hệ
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-gray-700">
                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Email Sinh viên</p>
                      <p className="text-gray-800 truncate">{studentId.toLowerCase()}214532@sis.edu.vn</p>
                    </div>

                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Số điện thoại</p>
                      <p className="text-gray-800">+84 987 654 321</p>
                    </div>

                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl col-span-1 sm:col-span-2 space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Email cá nhân</p>
                      <p className="text-gray-800">minhquan.dev@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Địa chỉ thường trú */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-700" /> Địa chỉ thường trú
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-gray-700">
                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl sm:col-span-3 space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Địa chỉ</p>
                      <p className="text-gray-800">Số 12, Ngõ 45, Đường Xuân Thủy</p>
                    </div>

                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Quận/Huyện</p>
                      <p className="text-gray-800">Cầu Giấy</p>
                    </div>

                    <div className="p-3 bg-gray-50 border border-gray-100/50 rounded-xl space-y-0.5">
                      <p className="text-[10px] text-gray-400 font-medium">Thành phố</p>
                      <p className="text-gray-800">Hà Nội</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bao-mat' && (
              <div className="pt-6 space-y-4 text-xs font-bold text-gray-600">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100/50 transition-all">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4.5 h-4.5 text-red-700" />
                    <div>
                      <p className="text-gray-800">Đổi mật khẩu tài khoản</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Cập nhật mật khẩu bảo vệ tài khoản định kỳ.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100/50 transition-all">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4.5 h-4.5 text-red-700" />
                    <div>
                      <p className="text-gray-800">Kích hoạt bảo mật 2 lớp (2FA)</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">Yêu cầu mã OTP khi đăng nhập hệ thống.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}

            {activeTab === 'cai-dat' && (
              <div className="pt-6 space-y-4 text-xs font-bold text-gray-600">
                <div className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100/50 transition-all">
                  <div>
                    <p className="text-gray-800">Thông báo qua Email</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Nhận thông báo dời lịch học, điểm thi qua hòm thư điện tử.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-700 cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: GPA overview & Activity logs (1/3 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Kết quả học tập summary */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Kết quả học tập</h3>
              <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-700 transition-colors" />
            </div>

            <div className="space-y-4">
              {/* GPA */}
              <div className="bg-red-50/30 p-3 rounded-xl border border-red-100/50 flex justify-between items-center text-xs font-bold">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">GPA hiện tại</p>
                  <p className="text-lg font-black text-red-700 mt-0.5">3.64 <span className="text-[10px] text-gray-400 font-bold">/ 4.0</span></p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">+0.12%</span>
              </div>

              {/* Credits progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Tín chỉ tích lũy</span>
                  <span>92 / 135 TC</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-700 h-full rounded-full" style={{ width: `${(92 / 135) * 100}%` }}></div>
                </div>
              </div>

              {/* Ranks list */}
              <div className="space-y-2 pt-2 border-t border-gray-50 text-xs font-bold text-gray-600">
                <div className="flex justify-between items-center cursor-pointer hover:text-red-700 transition-colors">
                  <span className="text-gray-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Xếp loại:
                  </span>
                  <span className="flex items-center gap-1 text-gray-800 font-black">
                    Giỏi <ChevronRight className="w-4 h-4 text-gray-400" />
                  </span>
                </div>

                <div className="flex justify-between items-center cursor-pointer hover:text-red-700 transition-colors">
                  <span className="text-gray-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Học bổng:
                  </span>
                  <span className="flex items-center gap-1 text-gray-800 font-black">
                    4 kỳ <ChevronRight className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nhật ký hoạt động */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Nhật ký hoạt động</h3>
            
            {/* Timeline */}
            <div className="relative pl-5 border-l border-gray-100 space-y-5 py-1 text-xs">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-[25.5px] top-0.5 p-1 bg-red-700 rounded-full text-white ring-4 ring-white">
                  <LogIn className="w-3 h-3" />
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-gray-800">Đăng nhập hệ thống</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Từ trình duyệt Chrome, MacOS</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1">10 phút trước</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-[25.5px] top-0.5 p-1 bg-blue-600 rounded-full text-white ring-4 ring-white">
                  <User className="w-3 h-3" />
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-gray-800">Cập nhật ảnh đại diện</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Thay đổi thông tin hồ sơ cá nhân</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1">2 giờ trước</p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <span className="absolute -left-[25.5px] top-0.5 p-1 bg-emerald-500 rounded-full text-white ring-4 ring-white">
                  <Settings className="w-3 h-3" />
                </span>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-gray-800">Thay đổi mật khẩu</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Cập nhật bảo mật định kỳ</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1">Hôm qua, 14:20</p>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-800 pt-3 border-t border-gray-50 block">
              Xem tất cả hoạt động
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
