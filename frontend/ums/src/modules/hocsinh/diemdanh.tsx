import { Calendar, AlertTriangle, ArrowRight, Info, RefreshCw } from 'lucide-react';

export default function DiemDanh() {
  const subjectsAttendance = [
    { name: 'Mạng máy tính', total: 30, present: 29, absent: 0, late: 1, rate: 96.7, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { name: 'Cấu trúc dữ liệu & Giải thuật', total: 45, present: 32, absent: 8, late: 5, rate: 82.0, color: 'text-red-600 bg-red-50 border-red-100' },
    { name: 'Hệ điều hành', total: 24, present: 23, absent: 0, late: 1, rate: 95.8, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { name: 'Tiếng Anh chuyên ngành', total: 45, present: 40, absent: 2, late: 3, rate: 88.9, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Điểm danh & Chuyên cần</h1>
          <p className="text-xs text-gray-500 mt-1 font-semibold">Năm học 2023 - 2024</p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 transition-all">
            Lọc theo kỳ
          </button>
          <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm">
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Main Grid: Left metrics/table, Right warning details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top metrics grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:scale-[1.01] transition-all">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng số buổi học</p>
                <p className="text-2xl font-black text-gray-800 mt-0.5">142 <span className="text-xs font-semibold text-gray-400">buổi</span></p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:scale-[1.01] transition-all">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Số buổi vắng</p>
                <p className="text-2xl font-black text-red-700 mt-0.5">16 <span className="text-xs font-semibold text-gray-400">buổi</span></p>
              </div>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Chi tiết chuyên cần môn học</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50/80 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4.5 w-1/3">Tên môn học</th>
                    <th className="px-6 py-4.5 text-center">Tổng</th>
                    <th className="px-6 py-4.5 text-center">Có mặt</th>
                    <th className="px-6 py-4.5 text-center">Vắng</th>
                    <th className="px-6 py-4.5 text-center">Late</th>
                    <th className="px-6 py-4.5 text-right">Tỷ lệ %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs md:text-sm font-semibold text-gray-700">
                  {subjectsAttendance.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-extrabold">{sub.name}</td>
                      <td className="px-6 py-4 text-center text-gray-500">{sub.total}</td>
                      <td className="px-6 py-4 text-center text-emerald-600">{sub.present}</td>
                      <td className="px-6 py-4 text-center text-red-600">{sub.absent}</td>
                      <td className="px-6 py-4 text-center text-amber-600">{sub.late}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${sub.color}`}>
                          {sub.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Cảnh báo chuyên cần */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-5 space-y-4">
            <div className="flex items-start gap-3 text-red-700">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm">Cảnh báo chuyên cần</h3>
                <p className="text-xs text-red-600 leading-relaxed mt-2 font-semibold">
                  Môn <strong className="text-red-800">Cấu trúc dữ liệu & Giải thuật</strong> hiện đang có tỷ lệ vắng <strong className="text-red-800">18%</strong>. Bạn chỉ còn được phép vắng thêm <strong className="text-red-800">1 buổi</strong> nữa trước khi bị đình chỉ thi.
                </p>
              </div>
            </div>
            <button className="w-full bg-white hover:bg-red-50 text-red-800 border border-red-200 font-bold py-2.5 rounded-xl text-xs transition-all text-center">
              Xem chi tiết môn học
            </button>
          </div>

          {/* Lịch học ngày mai */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Lịch học ngày mai</h3>
              <span className="text-[10px] font-bold text-slate-400">Thứ 3, 24/10</span>
            </div>
            
            <div className="space-y-3">
              {/* Event 1 */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                  <span>07:30 AM</span>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md text-[9px]">Điểm danh bắt buộc</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">Mạng máy tính</h4>
                <p className="text-[10px] text-slate-400">Phòng: A.205</p>
              </div>

              {/* Event 2 */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                  <span>13:15 PM</span>
                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md text-[9px]">Thực hành nhóm</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">Hệ điều hành</h4>
                <p className="text-[10px] text-slate-400">Phòng: B.110</p>
              </div>
            </div>

            <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all text-center">
              Xem thời khóa biểu đầy đủ
            </button>
          </div>

          {/* Ghi chú chuyên cần */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Ghi chú chuyên cần</h3>
            <div className="space-y-3.5">
              <div className="flex gap-3 items-start text-xs">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Quy định vắng</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-0.5">Vắng quá 20% tổng số tiết sẽ không được phép dự thi cuối kỳ.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Thời gian cập nhật</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-0.5">Dữ liệu điểm danh được giảng viên cập nhật trong vòng 24h sau buổi học.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Xin nghỉ phép online banner */}
          <div className="bg-gradient-to-br from-red-800 to-red-950 text-white p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden group">
            <div className="space-y-1">
              <h3 className="font-bold text-sm">Cần xin nghỉ phép?</h3>
              <p className="text-[10px] text-red-200 leading-normal font-semibold">
                Gửi đơn xin nghỉ phép trực tuyến nhanh chóng và thuận tiện tại đây.
              </p>
            </div>
            <button className="bg-white hover:bg-red-50 text-red-800 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 hover:scale-[1.03] shadow-sm">
              Bắt đầu ngay <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
