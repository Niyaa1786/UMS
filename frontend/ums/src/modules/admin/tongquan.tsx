import { 
  Users, 
  GraduationCap, 
  School, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Server,
  Activity,
  Cpu,
  Database,
  ArrowRight,
  Plus,
  MoreVertical,
  Download
} from 'lucide-react';

interface TongQuanProps {
  adminName: string;
  onNavigate: (tabId: string) => void;
}

export default function TongQuan({ adminName, onNavigate }: TongQuanProps) {
  const stats = [
    {
      title: 'TỔNG SỐ SINH VIÊN',
      value: '12,450',
      change: '+12%',
      isPositive: true,
      icon: <Users className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50'
    },
    {
      title: 'TỔNG GIẢNG VIÊN',
      value: '862',
      change: '+4%',
      isPositive: true,
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'LỚP HỌC HIỆN TẠI',
      value: '456',
      change: '-2%',
      isPositive: false,
      icon: <School className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50'
    },
    {
      title: 'DOANH THU / HỌC PHÍ',
      value: '2.4B',
      change: '+24%',
      isPositive: true,
      icon: <DollarSign className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50'
    }
  ];

  const facultyDistribution = [
    { name: 'Khoa Công nghệ thông tin', count: '4,520', percent: 36, color: 'bg-red-600' },
    { name: 'Khoa Kinh tế & Quản trị', count: '3,210', percent: 26, color: 'bg-blue-600' },
    { name: 'Khoa Ngoại ngữ', count: '1,890', percent: 15, color: 'bg-emerald-600' },
    { name: 'Khoa Điện tử - Viễn thông', count: '1,530', percent: 12, color: 'bg-purple-600' },
    { name: 'Khoa Thiết kế Đồ họa', count: '1,300', percent: 11, color: 'bg-amber-500' }
  ];

  const serverHealth = [
    { label: 'Trạng thái máy chủ', value: 'Online', icon: <Server className="w-4 h-4 text-emerald-500" />, sub: '99.98% Uptime' },
    { label: 'Tải lượng CPU', value: '22%', icon: <Cpu className="w-4 h-4 text-blue-500" />, sub: 'Bình thường' },
    { label: 'Cơ sở dữ liệu', value: 'Connected', icon: <Database className="w-4 h-4 text-purple-500" />, sub: 'Sync: 0.2s trước' },
    { label: 'Độ trễ API', value: '45 ms', icon: <Activity className="w-4 h-4 text-amber-500" />, sub: 'Tối ưu hóa' }
  ];

  const announcements = [
    {
      tag: 'KỸ THUẬT',
      time: '2 phút trước',
      title: 'Bảo trì hệ thống định kỳ',
      desc: 'Hệ thống sẽ tạm dừng hoạt động từ 23:00 tối nay đến 02:00 sáng mai để nâng cấp server lưu trữ.',
      bg: 'bg-red-50 text-red-700 border-red-100'
    },
    {
      tag: 'HỌC VỤ',
      time: '1 giờ trước',
      title: 'Cập nhật danh sách thi tốt nghiệp',
      desc: 'Danh sách đợt 2 đã được phê duyệt và đồng bộ sang cổng thông tin sinh viên.',
      bg: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    {
      tag: 'TÀI CHÍNH',
      time: '3 giờ trước',
      title: 'Nhắc nhở quyết toán học phí',
      desc: 'Hạn chót đóng học phí học kỳ phụ sẽ kết thúc vào thứ Sáu tuần này.',
      bg: 'bg-amber-50 text-amber-700 border-amber-100'
    }
  ];

  const schedule = [
    {
      time: '08:30 - 10:00',
      title: 'Họp Hội đồng Quản trị',
      room: 'Phòng họp số 1',
      desc: 'Báo cáo tuyển sinh năm học mới',
      tag: 'Họp Hội đồng Quản trị',
      color: 'border-l-red-600 bg-red-50/30'
    },
    {
      time: '10:30 - 11:30',
      title: 'Phê duyệt hồ sơ',
      room: 'Phòng Học vụ',
      desc: 'Duyệt danh sách học bổng kỳ 1',
      tag: 'Phê duyệt hồ sơ',
      color: 'border-l-blue-600 bg-blue-50/30'
    },
    {
      time: '12:00 - 13:30',
      title: 'Nghỉ trưa',
      room: 'Canteen Giảng viên',
      desc: 'Nghỉ trưa',
      tag: 'Nghỉ trưa',
      color: 'border-l-gray-400 bg-gray-50/30'
    },
    {
      time: '14:00 - 16:30',
      title: 'Kiểm tra hệ thống',
      room: 'Phòng IT',
      desc: 'Review hạ tầng Cloud Server',
      tag: 'Kiểm tra hệ thống',
      color: 'border-l-emerald-600 bg-emerald-50/30'
    }
  ];

  const recentStudents = [
    { name: 'Nguyễn Văn Nam', id: 'SV2023-0145', major: 'Khoa CNTT', date: '24/10/2023', status: 'approved' },
    { name: 'Trần Thị Thu Hà', id: 'SV2023-0146', major: 'Quản trị Kinh doanh', date: '24/10/2023', status: 'pending' },
    { name: 'Lê Minh Hiếu', id: 'SV2023-0147', major: 'Thiết kế Đồ họa', date: '23/10/2023', status: 'approved' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Welcome Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Chào buổi sáng, {adminName}</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Dưới đây là thông số vận hành hệ thống EduManager hôm nay.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo</span>
          </button>
          <button 
            onClick={() => onNavigate('quan-ly-sinh-vien')}
            className="bg-red-800 hover:bg-red-950 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm sinh viên</span>
          </button>
        </div>
      </div>

      {/* Stats KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black tracking-wider text-gray-400 block">{stat.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{stat.value}</span>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {stat.isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} transition-transform group-hover:scale-110`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Middle row: Enrollment breakdowns & system status (Replaced Chart!) vs Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Enrollment Distribution (Replaced Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-gray-900">Thống kê Cơ cấu Sinh viên</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Phân bổ sinh viên các khóa theo khoa chủ quản</p>
            </div>
            <span className="text-[10px] font-bold bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-500">Năm 2024</span>
          </div>

          {/* Premium Progress Bar Grid */}
          <div className="space-y-4">
            {facultyDistribution.map((fac, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700">{fac.name}</span>
                  <div className="space-x-1">
                    <span className="text-gray-900 font-black">{fac.count}</span>
                    <span className="text-gray-400 text-[10px]">({fac.percent}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`${fac.color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${fac.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {serverHealth.map((health, idx) => (
              <div key={idx} className="bg-slate-50/50 p-2.5 rounded-xl border border-gray-50 flex items-center gap-2.5">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  {health.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 leading-none">{health.label}</p>
                  <p className="text-[11px] font-bold text-gray-800 mt-1">{health.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Announcements list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-gray-900">Thông báo hệ thống</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Quản lý các tin tức và thông báo của trường</p>
            </div>
            <button 
              onClick={() => onNavigate('thong-bao')}
              className="text-xs font-bold text-red-700 hover:text-red-950 flex items-center gap-0.5 group"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/40 border border-slate-100 rounded-xl space-y-2 hover:bg-slate-50 transition-all">
                <div className="flex items-center justify-between text-[9px] font-extrabold">
                  <span className={`px-2 py-0.5 rounded-md border ${ann.bg}`}>{ann.tag}</span>
                  <span className="text-gray-400 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {ann.time}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-800 line-clamp-1">{ann.title}</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed mt-1 line-clamp-2">{ann.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Calendar timeline Schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-gray-900">Lịch trình làm việc Admin</h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Thứ Ba, ngày 24 tháng 10 năm 2023</p>
          </div>
          <div className="flex items-center bg-gray-50 p-1 border border-gray-100 rounded-xl self-start sm:self-auto">
            <button className="bg-white text-gray-800 text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm">Ngày</button>
            <button className="text-gray-400 text-xs font-semibold py-1.5 px-3 hover:text-gray-700">Tuần</button>
            <button className="text-gray-400 text-xs font-semibold py-1.5 px-3 hover:text-gray-700">Tháng</button>
          </div>
        </div>

        {/* Schedule grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {schedule.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-l-4 border border-y-gray-100 border-r-gray-100 flex flex-col justify-between min-h-[110px] hover:shadow-sm transition-all ${item.color}`}>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-gray-400 tracking-wider block uppercase">{item.tag}</span>
                <h4 className="text-xs font-black text-gray-800">{item.desc}</h4>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold mt-3 pt-2 border-t border-gray-100/55">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{item.time} | {item.room}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent newly registered students table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-gray-900">Sinh viên đăng ký mới nhất</h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Danh sách hồ sơ nhập học vừa nhận của ngày hôm nay</p>
          </div>
          <button 
            onClick={() => onNavigate('quan-ly-sinh-vien')}
            className="text-xs font-bold text-red-700 hover:text-red-950 flex items-center gap-0.5 group"
          >
            <span>Xem tất cả danh sách</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                <th className="px-5 py-3.5">Họ và tên</th>
                <th className="px-5 py-3.5">Mã sinh viên</th>
                <th className="px-5 py-3.5">Chuyên ngành</th>
                <th className="px-5 py-3.5">Ngày đăng ký</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {recentStudents.map((st, idx) => (
                <tr key={idx} className="hover:bg-gray-50/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-red-800 flex items-center justify-center font-black text-[11px] border border-red-100">
                        {st.name.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <span className="text-gray-800 font-black">{st.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 font-semibold">{st.id}</td>
                  <td className="px-5 py-4 font-semibold">{st.major}</td>
                  <td className="px-5 py-4 text-gray-400 font-semibold">{st.date}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                      st.status === 'approved' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {st.status === 'approved' ? 'ĐÃ DUYỆT' : 'CHỜ DUYỆT'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
