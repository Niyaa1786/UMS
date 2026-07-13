import { useState } from 'react';
import {
  Settings,
  Save,
  Database,
  ShieldCheck,
  CalendarDays,
  CheckCircle2,
  Bell,
  Globe,
  Lock,
  Server,
  RefreshCw,
  AlertTriangle,
  Wifi,
  Clock,
  Users,
  BookOpen,
  Moon,
  Mail
} from 'lucide-react';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none shrink-0 ${
        disabled ? 'opacity-40 cursor-not-allowed' :
        checked ? 'bg-red-700 shadow-sm shadow-red-300' : 'bg-gray-200 hover:bg-gray-300'
      } cursor-pointer`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

interface SettingRowProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge?: string;
  disabled?: boolean;
}

function SettingRow({ icon, iconBg, title, desc, checked, onChange, badge, disabled }: SettingRowProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
      disabled ? 'opacity-60 bg-gray-50 border-gray-100' :
      checked ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'
    }`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-black text-gray-800">{title}</p>
            {badge && (
              <span className="bg-red-50 text-red-700 border border-red-100 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">{badge}</span>
            )}
          </div>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-0.5">{desc}</p>
        </div>
      </div>
      <div className="ml-4">
        <Toggle checked={checked} onChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
}

export default function SystemSettings() {
  const [semester, setSemester] = useState('HKII 2023-2024');
  const [backupSchedule, setBackupSchedule] = useState('daily');
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Toggles
  const [isRegPortalOpen, setIsRegPortalOpen] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [darkModeForUsers, setDarkModeForUsers] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Đã lưu toàn bộ cấu hình hệ thống thành công.');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const sectionClass = 'bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4';
  const sectionHeaderClass = 'flex items-center gap-3 border-b border-gray-50 pb-4';

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Cấu hình tham số vận hành, chính sách bảo mật và hành vi hệ thống.</p>
        </div>
        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-2.5 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Section 1: Academic Config */}
        <div className={sectionClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-red-50 rounded-xl">
              <BookOpen className="w-4.5 h-4.5 text-red-700" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Cấu hình học vụ</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tham số liên quan đến năm học, học kỳ và cổng đăng ký</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Học kỳ hiện hành</span>
              </label>
              <select
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option>HKI 2022-2023</option>
                <option>HKII 2022-2023</option>
                <option>HKI 2023-2024</option>
                <option>HKII 2023-2024</option>
                <option>HKI 2024-2025</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Giới hạn sĩ số lớp tối đa</span>
              </label>
              <input
                type="number"
                defaultValue={60}
                min={20}
                max={120}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={<Globe className="w-4 h-4 text-blue-700" />}
              iconBg="bg-blue-50"
              title="Mở cổng đăng ký học phần"
              desc="Cho phép sinh viên đăng ký môn học trực tuyến qua cổng portal"
              checked={isRegPortalOpen}
              onChange={setIsRegPortalOpen}
              badge="Đang hoạt động"
            />
            <SettingRow
              icon={<RefreshCw className="w-4 h-4 text-emerald-700" />}
              iconBg="bg-emerald-50"
              title="Tự động duyệt hồ sơ sinh viên"
              desc="Hệ thống AI quét thông tin và tự động phê duyệt nếu đủ điều kiện học bổng"
              checked={autoApprove}
              onChange={setAutoApprove}
            />
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className={sectionClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-blue-50 rounded-xl">
              <Bell className="w-4.5 h-4.5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Cấu hình thông báo</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Điều chỉnh kênh gửi thông báo đến sinh viên và giảng viên</p>
            </div>
          </div>
          <div className="space-y-3">
            <SettingRow
              icon={<Mail className="w-4 h-4 text-blue-700" />}
              iconBg="bg-blue-50"
              title="Gửi thông báo qua Email"
              desc="Tự động gửi email khi có thông báo học vụ, kết quả thi, lịch học"
              checked={emailNotify}
              onChange={setEmailNotify}
            />
            <SettingRow
              icon={<Wifi className="w-4 h-4 text-amber-700" />}
              iconBg="bg-amber-50"
              title="Gửi thông báo qua SMS"
              desc="Nhắn tin SMS khẩn cấp khi có sự cố bảo trì hệ thống hoặc thay đổi lịch thi"
              checked={smsNotify}
              onChange={setSmsNotify}
            />
          </div>
        </div>

        {/* Section 3: Security */}
        <div className={sectionClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-red-50 rounded-xl">
              <ShieldCheck className="w-4.5 h-4.5 text-red-700" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Bảo mật & Phân quyền</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Cài đặt bảo mật tài khoản và phiên đăng nhập hệ thống</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Thời gian timeout phiên (phút)</span>
              </label>
              <select
                value={sessionTimeout}
                onChange={e => setSessionTimeout(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="30">30 phút</option>
                <option value="60">60 phút</option>
                <option value="120">2 giờ</option>
                <option value="480">8 giờ</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Số lần đăng nhập sai tối đa</span>
              </label>
              <select
                value={maxLoginAttempts}
                onChange={e => setMaxLoginAttempts(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="3">3 lần</option>
                <option value="5">5 lần</option>
                <option value="10">10 lần</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={<Lock className="w-4 h-4 text-red-700" />}
              iconBg="bg-red-50"
              title="Xác thực hai yếu tố (2FA)"
              desc="Bắt buộc xác thực OTP qua email khi đăng nhập từ thiết bị lạ"
              checked={twoFactorAuth}
              onChange={setTwoFactorAuth}
              badge="Khuyến nghị"
            />
            <SettingRow
              icon={<Clock className="w-4 h-4 text-amber-700" />}
              iconBg="bg-amber-50"
              title="Tự động đăng xuất khi không hoạt động"
              desc={`Đăng xuất tự động sau ${sessionTimeout} phút không có tương tác`}
              checked={autoLogout}
              onChange={setAutoLogout}
            />
          </div>
        </div>

        {/* Section 4: Database & Server */}
        <div className={sectionClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-purple-50 rounded-xl">
              <Database className="w-4.5 h-4.5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Cơ sở dữ liệu & Máy chủ</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Quản lý tần suất sao lưu và chế độ bảo trì hệ thống</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Tần suất tự động sao lưu dữ liệu</span>
            </label>
            <select
              value={backupSchedule}
              onChange={e => setBackupSchedule(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
            >
              <option value="hourly">Mỗi giờ</option>
              <option value="daily">Hàng ngày (02:00 AM)</option>
              <option value="weekly">Hàng tuần (Chủ nhật)</option>
              <option value="monthly">Hàng tháng (Ngày 1)</option>
            </select>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={<Moon className="w-4 h-4 text-gray-600" />}
              iconBg="bg-gray-100"
              title="Giao diện tối cho người dùng (Dark Mode)"
              desc="Cho phép sinh viên và giảng viên bật/tắt chế độ tối trên portal"
              checked={darkModeForUsers}
              onChange={setDarkModeForUsers}
            />
            <SettingRow
              icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
              iconBg="bg-red-50"
              title="Chế độ bảo trì hệ thống"
              desc="Tạm thời ngắt quyền truy cập của sinh viên và giảng viên, chỉ Admin mới đăng nhập được"
              checked={maintenanceMode}
              onChange={setMaintenanceMode}
              badge={maintenanceMode ? 'Đang bật' : undefined}
            />
          </div>

          {maintenanceMode && (
            <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
              <p className="text-[10px] text-red-700 font-bold leading-relaxed">
                <strong>Cảnh báo:</strong> Chế độ bảo trì đang được BẬT. Sinh viên và giảng viên sẽ không thể đăng nhập hệ thống cho đến khi bạn tắt chế độ này.
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
            <Server className="w-3.5 h-3.5" />
            <span>Thay đổi sẽ có hiệu lực ngay sau khi lưu</span>
          </div>
          <button
            type="submit"
            className="bg-red-800 hover:bg-red-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            Lưu tất cả thay đổi
          </button>
        </div>

      </form>
    </div>
  );
}


