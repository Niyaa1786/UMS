import { useState } from 'react';
import {
  Mail,
  ShieldAlert,
  Briefcase,
  MapPin,
  ShieldCheck,
  Phone,
  Edit3,
  Save,
  X,
  Camera,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  User,
  LogOut,
  Activity
} from 'lucide-react';

interface HoSoProps {
  adminName: string;
  adminId: string;
  avatarUrl: string;
}

interface ActivityLog {
  action: string;
  time: string;
  icon: React.ReactNode;
  type: 'login' | 'edit' | 'approve' | 'system';
}

export default function HoSo({ adminName, adminId, avatarUrl }: HoSoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Editable fields
  const [editName, setEditName] = useState(adminName);
  const [editEmail, setEditEmail] = useState('admin@school.edu.vn');
  const [editPhone, setEditPhone] = useState('0909 123 456');
  const [editOffice, setEditOffice] = useState('Tòa nhà A1, Phòng 102 - IT Admin Hub');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const permissions = [
    { title: 'Quản trị Hệ thống (System Admin)', desc: 'Toàn quyền cấu hình cổng đăng ký học phần, sao lưu & phục hồi CSDL', color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
    { title: 'Quản lý Người dùng (User Management)', desc: 'Thêm, sửa, xóa tài khoản hồ sơ Học sinh & Giảng viên', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
    { title: 'Phê duyệt học thuật (Academic Approval)', desc: 'Duyệt công bố bảng điểm lớp học phần, duyệt đơn học bổng tự động', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
    { title: 'Quản lý Tài chính (Finance Access)', desc: 'Xem báo cáo thu chi học phí, xuất báo cáo tài chính học kỳ', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-100' },
  ];

  const activityLogs: ActivityLog[] = [
    { action: 'Đăng nhập hệ thống thành công', time: '10:24 - Hôm nay', icon: <LogOut className="w-3.5 h-3.5 text-blue-600" />, type: 'login' },
    { action: 'Phê duyệt 12 bảng điểm lớp CNTT101', time: '09:45 - Hôm nay', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />, type: 'approve' },
    { action: 'Cập nhật cấu hình học kỳ HKII 2023-2024', time: '08:30 - Hôm nay', icon: <Edit3 className="w-3.5 h-3.5 text-amber-600" />, type: 'edit' },
    { action: 'Gửi thông báo bảo trì hệ thống', time: 'Hôm qua', icon: <Activity className="w-3.5 h-3.5 text-purple-600" />, type: 'system' },
    { action: 'Đăng nhập hệ thống thành công', time: 'Hôm qua', icon: <LogOut className="w-3.5 h-3.5 text-blue-600" />, type: 'login' },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    setSuccessMsg('Cập nhật hồ sơ thành công!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setOldPass('');
    setNewPass('');
    setShowPasswordSection(false);
    setSuccessMsg('Đổi mật khẩu thành công!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Hồ sơ Admin</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý thông tin tài khoản quản trị viên của bạn.</p>
        </div>
        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-2.5 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Profile card */}
        <div className="lg:col-span-2 space-y-6">

          {/* Info card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            {/* Avatar + name */}
            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-gray-50 pb-5">
              <div className="relative group shrink-0">
                <img
                  src={avatarUrl}
                  alt={adminName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-gray-100"
                />
                <button className="absolute inset-0 bg-gray-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-gray-900 leading-none">{isEditing ? editName : adminName}</h2>
                  <span className="bg-red-50 text-red-700 border border-red-100 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                    ROOT ADMIN
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-semibold">{adminId} • Quản trị viên cấp cao</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                    <span>Phòng Đào tạo & Quản trị</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Từ tháng 01/2020</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto ${
                  isEditing
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
              </button>
            </div>

            {/* Detail fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Họ và tên', icon: <User className="w-3.5 h-3.5" />, value: editName, onChange: setEditName },
                { label: 'Email làm việc', icon: <Mail className="w-3.5 h-3.5" />, value: editEmail, onChange: setEditEmail },
                { label: 'Số điện thoại', icon: <Phone className="w-3.5 h-3.5" />, value: editPhone, onChange: setEditPhone },
                { label: 'Văn phòng làm việc', icon: <MapPin className="w-3.5 h-3.5" />, value: editOffice, onChange: setEditOffice },
              ].map((field, idx) => (
                <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="text-gray-400">{field.icon}</span>
                    {field.label}
                  </span>
                  {isEditing ? (
                    <input
                      value={field.value}
                      onChange={e => field.onChange(e.target.value)}
                      className="w-full text-xs font-bold text-gray-800 bg-white border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-red-400 transition-all"
                    />
                  ) : (
                    <p className="text-xs font-bold text-gray-800">{field.value}</p>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Hủy chỉnh sửa
              </button>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <Lock className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-800">Bảo mật mật khẩu</h3>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Thay đổi mật khẩu đăng nhập tài khoản</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="text-xs font-bold text-red-700 hover:text-red-900 cursor-pointer"
              >
                {showPasswordSection ? 'Ẩn' : 'Đổi mật khẩu'}
              </button>
            </div>

            {showPasswordSection && (
              <form onSubmit={handleChangePassword} className="space-y-3 pt-2 border-t border-gray-50">
                {[
                  { label: 'Mật khẩu hiện tại', value: oldPass, onChange: setOldPass, show: showOldPass, toggle: () => setShowOldPass(!showOldPass) },
                  { label: 'Mật khẩu mới', value: newPass, onChange: setNewPass, show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                ].map((field, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.show ? 'text' : 'password'}
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white px-3.5 py-2.5 pr-10 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={field.toggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {field.show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  Xác nhận đổi mật khẩu
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Permissions + Activity */}
        <div className="space-y-6">

          {/* Permissions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
              <span>Phân quyền đang hoạt động</span>
            </h4>
            <div className="space-y-2.5">
              {permissions.map((perm, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-start gap-2.5 ${perm.bg}`}>
                  <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${perm.color}`} />
                  <div>
                    <h5 className={`text-[10px] font-black ${perm.color}`}>{perm.title}</h5>
                    <p className="text-[9px] text-gray-500 font-semibold leading-relaxed mt-0.5">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Lịch sử hoạt động gần đây</span>
            </h4>
            <div className="space-y-3">
              {activityLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    log.type === 'login' ? 'bg-blue-50' :
                    log.type === 'approve' ? 'bg-emerald-50' :
                    log.type === 'edit' ? 'bg-amber-50' : 'bg-purple-50'
                  }`}>
                    {log.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-700 leading-snug">{log.action}</p>
                    <p className="text-[9px] text-gray-400 font-semibold mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
