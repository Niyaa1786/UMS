import { useState } from 'react';
import { Check, X, Clock, Save } from 'lucide-react';

export default function DiemDanh() {
  const [selectedClass, setSelectedClass] = useState('IT001');
  const [attendanceState, setAttendanceState] = useState<{ [key: string]: 'present' | 'late' | 'absent' }>({
    '20206001': 'present',
    '20206002': 'present',
    '20206003': 'absent',
    '20206004': 'present',
    '20206005': 'late',
    '20206006': 'present',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const students = [
    { id: '20206001', name: 'Nguyễn Văn Anh', email: 'anh.nv@edu.vn', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop' },
    { id: '20206002', name: 'Lê Thị Bình', email: 'binh.lt@edu.vn', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
    { id: '20206003', name: 'Trần Minh Cường', email: 'cuong.tm@edu.vn', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
    { id: '20206004', name: 'Phạm Thư Dung', email: 'dung.pt@edu.vn', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
    { id: '20206005', name: 'Hoàng Gia Đạt', email: 'dat.hg@edu.vn', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
    { id: '20206006', name: 'Vũ Lan Hương', email: 'huong.vl@edu.vn', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' }
  ];

  const handleStatusChange = (studentId: string, status: 'present' | 'late' | 'absent') => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  // Stats calculation
  const total = students.length;
  const presentCount = Object.values(attendanceState).filter(s => s === 'present').length;
  const lateCount = Object.values(attendanceState).filter(s => s === 'late').length;
  const absentCount = Object.values(attendanceState).filter(s => s === 'absent').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">Điểm danh Lớp học</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Cập nhật sự hiện diện của sinh viên trong buổi học hôm nay</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Lưu bảng điểm danh</span>
        </button>
      </div>

      {/* Selector and stats block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left selector */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase">Cấu hình buổi điểm danh</h3>
          
          <div className="space-y-3 text-xs font-bold text-gray-700">
            <div className="space-y-1.5">
              <label className="text-gray-500">Chọn lớp giảng dạy</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 font-bold text-gray-800 focus:outline-none"
              >
                <option value="IT001">IT001 - Cấu trúc dữ liệu và Giải thuật</option>
                <option value="CS202">CS202 - Lập trình hướng đối tượng</option>
                <option value="MATH301">MATH301 - Toán rời rạc</option>
                <option value="DB404">DB404 - Hệ quản trị Cơ sở dữ liệu</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-gray-500">Ngày ghi nhận</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 font-bold text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right stats counters (2 spans on desktop) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase mb-3">Thống kê điểm danh hôm nay</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100/50 text-center">
              <span className="text-[10px] font-black text-gray-400 block uppercase">SĨ SỐ LỚP</span>
              <span className="text-xl font-black text-gray-800">{total}</span>
            </div>
            
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30 text-center">
              <span className="text-[10px] font-black text-emerald-600 block uppercase">ĐI HỌC ĐỦ</span>
              <span className="text-xl font-black text-emerald-700">{presentCount}</span>
            </div>
            
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/30 text-center">
              <span className="text-[10px] font-black text-amber-600 block uppercase">ĐI MUỘN</span>
              <span className="text-xl font-black text-amber-700">{lateCount}</span>
            </div>

            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100/30 text-center">
              <span className="text-[10px] font-black text-red-600 block uppercase">VẮNG MẶT</span>
              <span className="text-xl font-black text-red-700">{absentCount}</span>
            </div>
          </div>
        </div>

      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold animate-pulse">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Lưu thông tin điểm danh thành công! Hệ thống đã tự động tính chuyên cần cho sinh viên.</span>
        </div>
      )}

      {/* Student attendance list table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-black text-gray-400 tracking-wider uppercase">
                <th className="px-6 py-4">MSSV</th>
                <th className="px-6 py-4">Sinh viên</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Trạng thái điểm danh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {students.map((student) => {
                const currentStatus = attendanceState[student.id];
                return (
                  <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4.5 font-black text-gray-950">{student.id}</td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="text-gray-950 font-black whitespace-nowrap">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-gray-500 font-semibold">{student.email}</td>
                    <td className="px-6 py-4.5">
                      <div className="flex justify-center items-center gap-2">
                        {/* Present Button */}
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all cursor-pointer ${
                            currentStatus === 'present'
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                              : 'bg-white hover:bg-emerald-50 text-gray-500 border-gray-200 hover:border-emerald-200'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Có mặt</span>
                        </button>

                        {/* Late Button */}
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all cursor-pointer ${
                            currentStatus === 'late'
                              ? 'bg-amber-500 border-amber-500 text-white shadow-sm shadow-amber-500/20'
                              : 'bg-white hover:bg-amber-50 text-gray-500 border-gray-200 hover:border-amber-200'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Đi muộn</span>
                        </button>

                        {/* Absent Button */}
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all cursor-pointer ${
                            currentStatus === 'absent'
                              ? 'bg-red-500 border-red-500 text-white shadow-sm shadow-red-500/20'
                              : 'bg-white hover:bg-red-50 text-gray-500 border-gray-200 hover:border-red-200'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Vắng mặt</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
