import { useState } from 'react';
import { Eye, Plus, Sparkles, Filter, Calendar, Users, MapPin, Search } from 'lucide-react';

interface LopGiangDayProps {
  onNavigate: (tabId: string) => void;
}

export default function LopGiangDay({ onNavigate }: LopGiangDayProps) {
  const [semester, setSemester] = useState('HKI 2023-2024');
  const [status, setStatus] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const classData = [
    {
      code: 'IT001',
      name: 'Cấu trúc dữ liệu và Giải thuật',
      type: 'Lý thuyết',
      students: '45 / 50',
      schedule: 'Thứ 2, Tiết 1-3',
      room: 'C101',
      status: 'Đang diễn ra',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      code: 'CS202',
      name: 'Lập trình hướng đối tượng',
      type: 'Thực hành',
      students: '38 / 40',
      schedule: 'Thứ 4, Tiết 7-9',
      room: 'Lab S02',
      status: 'Đang diễn ra',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      code: 'MATH301',
      name: 'Toán rời rạc',
      type: 'Lý thuyết',
      students: '62 / 65',
      schedule: 'Thứ 6, Tiết 1-3',
      room: 'B201',
      status: 'Sắp bắt đầu',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-100'
    },
    {
      code: 'DB404',
      name: 'Hệ quản trị Cơ sở dữ liệu',
      type: 'Thực hành',
      students: '42 / 45',
      schedule: 'Thứ 3, Tiết 4-6',
      room: 'Lab 301',
      status: 'Đang diễn ra',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    }
  ];

  // Simple filtering
  const filteredClasses = classData.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cls.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = status === 'Tất cả' || cls.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header text */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">Quản lý Lớp học</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Chào mừng trở lại! Hôm nay bạn có 3 lớp cần giảng dạy.</p>
        </div>
        
        {/* Top summary stats in header block */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 block uppercase">TỔNG SỐ LỚP</span>
            <span className="text-lg font-black text-red-600">08</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 block uppercase">TỔNG SINH VIÊN</span>
            <span className="text-lg font-black text-red-600">342</span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        
        {/* Left filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[140px]">
            <span className="text-[9px] font-black text-gray-400 absolute top-1.5 left-3">HỌC KỲ</span>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl px-3 pt-5 pb-1.5 text-xs font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer"
            >
              <option>HKI 2023-2024</option>
              <option>HKII 2023-2024</option>
              <option>HKI 2022-2023</option>
            </select>
          </div>

          <div className="relative min-w-[120px]">
            <span className="text-[9px] font-black text-gray-400 absolute top-1.5 left-3">TRẠNG THÁI</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl px-3 pt-5 pb-1.5 text-xs font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer"
            >
              <option>Tất cả</option>
              <option>Đang diễn ra</option>
              <option>Sắp bắt đầu</option>
            </select>
          </div>

          <div className="relative flex-1 min-w-[180px]">
            <input
              type="text"
              placeholder="Tìm kiếm mã lớp, tên môn học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-100 focus:border-red-500 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-700 focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button className="flex items-center justify-center gap-1.5 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-black text-gray-700 rounded-xl transition-all cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Lọc nâng cao</span>
          </button>
          
          <button className="flex items-center justify-center gap-1.5 px-4 py-3 bg-red-700 hover:bg-red-800 text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Mở lớp mới</span>
          </button>
        </div>

      </div>

      {/* Classes Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-black text-gray-400 tracking-wider uppercase">
                <th className="px-6 py-4">Mã lớp</th>
                <th className="px-6 py-4">Tên học phần</th>
                <th className="px-6 py-4">Sĩ số</th>
                <th className="px-6 py-4">Lịch học</th>
                <th className="px-6 py-4">Phòng học</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4.5 font-black text-gray-900">{cls.code}</td>
                    <td className="px-6 py-4.5">
                      <div>
                        <p className="text-gray-800 font-black">{cls.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{cls.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-gray-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>{cls.students}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-gray-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{cls.schedule}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-gray-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {cls.room}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-black ${cls.statusColor}`}>
                        {cls.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-2">
                        {/* Details View */}
                        <button 
                          onClick={() => onNavigate('danh-sach-sinh-vien')}
                          title="Xem danh sách sinh viên"
                          className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-700 border border-gray-100 hover:border-red-100 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {/* Attendance quick launch */}
                        <button 
                          onClick={() => onNavigate('diem-danh')}
                          title="Điểm danh lớp học"
                          className="p-1.5 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-700 border border-gray-100 hover:border-blue-100 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                        </button>
                        
                        {/* Enter Grades quick launch */}
                        <button 
                          onClick={() => onNavigate('quan-ly-diem')}
                          title="Nhập điểm"
                          className="p-1.5 bg-gray-50 hover:bg-amber-50 text-gray-500 hover:text-amber-700 border border-gray-100 hover:border-amber-100 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 font-semibold">
                    Không tìm thấy lớp học nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info pagination */}
        <div className="p-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-gray-500">
          <span>Hiển thị 1 - {filteredClasses.length} trong tổng số 8 lớp</span>
          
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400" disabled>
              &lt;
            </button>
            <button className="px-3.5 py-1.5 bg-red-700 text-white rounded-lg border border-red-700 shadow-sm shadow-red-700/10">
              1
            </button>
            <button className="px-3.5 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
              2
            </button>
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Promotion tip card at bottom */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 text-white rounded-3xl p-6 relative overflow-hidden shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none skew-x-12" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center border border-white/10 shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="bg-red-600/30 text-red-200 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border border-red-500/20 tracking-wider">
              Mẹo quản lý
            </span>
            <h4 className="text-sm font-black text-gray-100 mt-1 leading-snug">Số hóa điểm danh nhanh chóng</h4>
            <p className="text-xs text-gray-400 font-medium leading-relaxed mt-0.5">
              Sinh viên có thể sử dụng mã QR để tự quét và ghi nhận sự hiện diện. Tiết kiệm 10 phút đầu mỗi buổi học.
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('diem-danh')}
          className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-black rounded-xl transition-all shadow-md shrink-0 active:scale-95 self-start md:self-auto cursor-pointer"
        >
          Thử ngay
        </button>
      </div>

    </div>
  );
}
