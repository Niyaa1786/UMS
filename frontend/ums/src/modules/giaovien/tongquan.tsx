import { BookOpen, Users, Clock, Star, ArrowRight, CheckCircle, Bell, Award, HelpCircle } from 'lucide-react';

interface TongQuanProps {
  teacherName: string;
  onNavigate: (tabId: string) => void;
}

export default function TongQuan({ teacherName, onNavigate }: TongQuanProps) {
  const kpis = [
    {
      title: 'TỔNG LỚP GIẢNG DẠY',
      value: '8',
      subtitle: '+2 học kỳ này',
      icon: <BookOpen className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50'
    },
    {
      title: 'TỔNG SINH VIÊN',
      value: '245',
      subtitle: 'Hoạt động tốt',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'SỐ TIẾT HÔM NAY',
      value: '4',
      subtitle: '2 ca sáng, 2 ca chiều',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50'
    },
    {
      title: 'ĐIỂM TRUNG BÌNH LỚP',
      value: '3.2',
      subtitle: '/ 4.0 (Khá)',
      icon: <Star className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50'
    }
  ];

  const schedule = [
    {
      time: '07:30 SÁNG',
      title: 'Lập trình Java Nâng cao',
      location: 'Phòng B.204',
      class: 'Lớp Java_K24_A',
      color: 'border-red-600'
    },
    {
      time: '09:45 SÁNG',
      title: 'Cấu trúc Dữ liệu & Giải thuật',
      location: 'Phòng C.101',
      class: 'Lớp DSA_01',
      color: 'border-blue-600'
    },
    {
      time: '13:30 CHIỀU',
      title: 'Phân tích Hệ thống',
      location: 'Học trực tuyến (Zoom)',
      class: 'Lớp PTHS_K24_B',
      color: 'border-purple-600'
    }
  ];

  const classes = [
    { name: 'Trí tuệ Nhân tạo - AI01', code: 'IT4844', students: 45, progress: 85, color: 'bg-red-600' },
    { name: 'Thương mại Điện tử - EC2', code: 'BUS302', students: 32, progress: 60, color: 'bg-blue-600' },
    { name: 'Đồ họa máy tính - CG_K15', code: 'DES102', students: 28, progress: 40, color: 'bg-amber-500' }
  ];

  const activities = [
    {
      type: 'warning',
      title: 'Hạn nộp bài tập cuối kỳ sắp đến',
      desc: 'Lớp Lập trình Java Nâng cao còn 15 sinh viên chưa nộp bài. Hãy nhắc nhở các em trong tiết học tiếp theo.',
      time: '2 giờ trước'
    },
    {
      type: 'info',
      title: 'Sinh viên mới đăng ký',
      desc: 'Lê Minh Tuấn vừa được thêm vào danh sách lớp Trí tuệ Nhân tạo - AI01 từ phòng Đào tạo.',
      time: 'Hôm qua'
    },
    {
      type: 'success',
      title: 'Tài liệu đã được tải lên thành công',
      desc: 'Hệ thống đã tự động sao lưu tài liệu bài giảng tuần 10 lên server đám mây.',
      time: '2 ngày trước'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Message banner */}
      <div className="bg-gradient-to-r from-red-800 to-red-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-red-700/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none skew-x-12" />
        <div className="relative z-10 max-w-2xl">
          <span className="bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-1 rounded-full text-red-100 uppercase tracking-widest">
            Học kỳ 1 - 2024
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-3">Chào buổi sáng, {teacherName}!</h2>
          <p className="text-sm text-red-100/90 leading-relaxed font-medium mt-1.5">
            Đây là những thông tin tổng quan và nhiệm vụ giảng dạy của bạn trong ngày hôm nay. Hãy có một ngày làm việc hiệu quả!
          </p>
        </div>
      </div>

      {/* KPI stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100/80 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black tracking-wider text-gray-400 block">{kpi.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{kpi.value}</span>
                <span className="text-xs font-bold text-gray-500">{kpi.subtitle}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bg} transition-transform group-hover:scale-110`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout - No Charts! */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (takes 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Lịch dạy hôm nay */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900">Lịch dạy hôm nay</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Thời gian biểu lên lớp của ngày hôm nay</p>
              </div>
              <button 
                onClick={() => onNavigate('thoi-khoa-bieu')}
                className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 group"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schedule.map((item, idx) => (
                <div key={idx} className={`p-4 bg-gray-50/50 rounded-xl border-l-4 ${item.color} border border-y-gray-100 border-r-gray-100 space-y-2 hover:bg-gray-50 transition-all`}>
                  <span className="text-[10px] font-extrabold text-gray-400">{item.time}</span>
                  <div>
                    <h4 className="text-xs font-black text-gray-800 line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{item.location} • {item.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lớp giảng dạy tiêu biểu */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-900">Lớp giảng dạy tiêu biểu</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tiến độ chương trình học của các lớp chủ nhiệm</p>
              </div>
              <button 
                onClick={() => onNavigate('lop-giang-day')}
                className="text-gray-400 hover:text-gray-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              </button>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                    <th className="px-4 py-3">Tên lớp</th>
                    <th className="px-4 py-3">Sinh viên</th>
                    <th className="px-4 py-3">Tiến độ</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                  {classes.map((cls, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="text-gray-800 font-black">{cls.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">Mã HP: {cls.code}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 font-semibold">{cls.students} học viên</td>
                      <td className="px-4 py-3.5 min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className={`${cls.color} h-2 rounded-full`} style={{ width: `${cls.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-500 font-bold shrink-0">{cls.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button 
                          onClick={() => onNavigate('lop-giang-day')}
                          className="text-[10px] font-black text-red-600 hover:text-red-800 transition-colors"
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Thông báo & Hoạt động */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-base font-black text-gray-900">Thông báo & Hoạt động</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Nhật ký hoạt động và thông tin cập nhật gần đây</p>
            </div>
            <div className="space-y-3">
              {activities.map((act, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:bg-slate-50/30 transition-all">
                  <div className="shrink-0 mt-0.5">
                    {act.type === 'warning' && (
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                        <Bell className="w-4 h-4" />
                      </div>
                    )}
                    {act.type === 'info' && (
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Users className="w-4 h-4" />
                      </div>
                    )}
                    {act.type === 'success' && (
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-black text-gray-800">{act.title}</h4>
                      <span className="text-[9px] text-gray-400 font-semibold">{act.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column */}
        <div className="space-y-6">
          
          {/* Thao tác nhanh */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl shadow-md p-6 space-y-4 border border-red-500/20">
            <div>
              <h3 className="text-sm font-black tracking-wide uppercase">Thao tác nhanh</h3>
              <p className="text-[10px] text-red-200/90 font-medium mt-0.5">Lối tắt xử lý công việc trực tuyến nhanh</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onNavigate('quan-ly-diem')}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-left transition-all group active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center mb-2 shadow-inner">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs font-black leading-tight">Nhập điểm</p>
              </button>
              
              <button 
                onClick={() => onNavigate('diem-danh')}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-left transition-all group active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center mb-2 shadow-inner">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs font-black leading-tight">Điểm danh</p>
              </button>
              
              <button 
                onClick={() => onNavigate('thong-bao')}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-left transition-all group active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center mb-2 shadow-inner">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs font-black leading-tight">Thông báo</p>
              </button>
              
              <button 
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-left transition-all group active:scale-95 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center mb-2 shadow-inner">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs font-black leading-tight">Tải tài liệu</p>
              </button>
            </div>
          </div>

          {/* Trung tâm hỗ trợ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto border border-red-100">
              <HelpCircle className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-gray-900">Trung tâm hỗ trợ</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[200px] mx-auto">
                Cần hỗ trợ về quản lý điểm hoặc học sinh? Liên hệ với quản trị viên.
              </p>
            </div>
            <button className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-xs font-black text-gray-700 rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer">
              Liên hệ IT Admin
            </button>
          </div>

          {/* Additional visual content: Teaching tips (to cover empty space beautifully) */}
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full pointer-events-none translate-x-4 translate-y-4" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-1.5 text-[9px] text-red-400 font-extrabold uppercase tracking-wider">
                <span>Tips giảng dạy hôm nay</span>
              </div>
              <h4 className="text-xs font-black leading-snug text-gray-100">Bảo mật thông tin & Số hóa điểm danh</h4>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                Sử dụng tính năng QR Code trên thiết bị di động để sinh viên có thể điểm danh tự động nhanh chóng và chính xác hơn trong vòng 5 phút đầu giờ.
              </p>
              <button 
                onClick={() => onNavigate('diem-danh')}
                className="text-[10px] font-black text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 group mt-2"
              >
                <span>Thử ngay</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
