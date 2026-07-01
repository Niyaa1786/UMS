import { useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

export default function QuanLyDiem() {
  const [selectedClass, setSelectedClass] = useState('IT001');
  const [grades, setGrades] = useState<{ [key: string]: { midterm: number; final: number; attendance: number } }>({
    '20206001': { midterm: 8.5, final: 9.0, attendance: 10 },
    '20206002': { midterm: 7.5, final: 8.0, attendance: 9.5 },
    '20206003': { midterm: 4.0, final: 5.5, attendance: 7.2 },
    '20206004': { midterm: 9.5, final: 9.5, attendance: 10 },
    '20206005': { midterm: 6.5, final: 6.0, attendance: 8.8 },
    '20206006': { midterm: 7.0, final: 7.5, attendance: 9.2 }
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

  const handleGradeChange = (studentId: string, type: 'midterm' | 'final' | 'attendance', value: string) => {
    let parsed = parseFloat(value);
    if (isNaN(parsed)) parsed = 0;
    if (parsed > 10) parsed = 10;
    if (parsed < 0) parsed = 0;

    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: parsed
      }
    }));
  };

  const calculateGPA = (midterm: number, final: number, attendance: number) => {
    // 10% Attendance, 30% Midterm, 60% Final
    const average = (attendance * 1 + midterm * 3 + final * 6) / 10;
    return average.toFixed(2);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">Quản lý điểm</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Cập nhật và tính toán điểm thành phần cho sinh viên</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Lưu bảng điểm</span>
        </button>
      </div>

      {/* Class selector */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4 text-xs font-bold text-gray-700">
        <div className="relative flex-1 min-w-[280px]">
          <span className="text-[9px] font-black text-gray-400 absolute top-1.5 left-3">CHỌN LỚP HỌC</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 pt-5 pb-1.5 font-bold text-gray-800 focus:outline-none cursor-pointer"
          >
            <option value="IT001">IT001 - Cấu trúc dữ liệu và Giải thuật (Lý thuyết)</option>
            <option value="CS202">CS202 - Lập trình hướng đối tượng (Thực hành)</option>
            <option value="MATH301">MATH301 - Toán rời rạc (Lý thuyết)</option>
            <option value="DB404">DB404 - Hệ quản trị Cơ sở dữ liệu (Thực hành)</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-100/50 p-3.5 rounded-xl">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-[11px] font-semibold leading-relaxed">
            Công thức tính điểm trung bình (GPA): Chuyên cần (10%) + Giữa kỳ (30%) + Cuối kỳ (60%)
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold animate-pulse">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Đã cập nhật bảng điểm của lớp thành công!</span>
        </div>
      )}

      {/* Roster table for grade entry */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-black text-gray-400 tracking-wider uppercase text-center">
                <th className="px-6 py-4 text-left">MSSV</th>
                <th className="px-6 py-4 text-left">Sinh viên</th>
                <th className="px-4 py-4 w-28">Chuyên cần</th>
                <th className="px-4 py-4 w-28">Giữa kỳ</th>
                <th className="px-4 py-4 w-28">Cuối kỳ</th>
                <th className="px-6 py-4 w-28">Điểm TB (10)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {students.map((student) => {
                const sGrades = grades[student.id] || { midterm: 0, final: 0, attendance: 0 };
                const average = calculateGPA(sGrades.midterm, sGrades.final, sGrades.attendance);
                return (
                  <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-3.5 font-black text-gray-950 text-left">{student.id}</td>
                    <td className="px-6 py-3.5 text-left">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="text-gray-950 font-black whitespace-nowrap">{student.name}</span>
                      </div>
                    </td>
                    
                    {/* Attendance input */}
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={sGrades.attendance}
                          onChange={(e) => handleGradeChange(student.id, 'attendance', e.target.value)}
                          className="w-16 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg py-1 px-2 text-center text-xs font-bold text-gray-800 focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Midterm input */}
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={sGrades.midterm}
                          onChange={(e) => handleGradeChange(student.id, 'midterm', e.target.value)}
                          className="w-16 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg py-1 px-2 text-center text-xs font-bold text-gray-800 focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Final input */}
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={sGrades.final}
                          onChange={(e) => handleGradeChange(student.id, 'final', e.target.value)}
                          className="w-16 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 focus:border-red-500 rounded-lg py-1 px-2 text-center text-xs font-bold text-gray-800 focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Auto GPA average */}
                    <td className="px-6 py-3.5 text-center">
                      <span className={`text-sm font-extrabold ${
                        parseFloat(average) >= 8.0 
                          ? 'text-emerald-600' 
                          : parseFloat(average) < 5.0 
                          ? 'text-red-600' 
                          : 'text-gray-800'
                      }`}>
                        {average}
                      </span>
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
