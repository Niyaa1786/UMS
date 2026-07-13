import { useState } from 'react';
import { Download, Plus, Search, UserCheck, AlertTriangle, Award, TrendingUp } from 'lucide-react';

export default function DanhSachSinhVien() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const students = [
    {
      id: '20206001',
      name: 'Nguyễn Văn Anh',
      email: 'anh.nv@edu.vn',
      gender: 'Nam',
      major: 'Khoa học Máy tính',
      gpa: 3.8,
      attendance: '98%',
      status: 'KHEN THƯỞNG',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '20206002',
      name: 'Lê Thị Bình',
      email: 'binh.lt@edu.vn',
      gender: 'Nữ',
      major: 'Kỹ thuật Phần mềm',
      gpa: 3.5,
      attendance: '95%',
      status: 'BÌNH THƯỜNG',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '20206003',
      name: 'Trần Minh Cường',
      email: 'cuong.tm@edu.vn',
      gender: 'Nam',
      major: 'An toàn Thông tin',
      gpa: 2.1,
      attendance: '72%',
      status: 'CẢNH BÁO',
      badgeClass: 'bg-red-50 text-red-700 border-red-100',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '20206004',
      name: 'Phạm Thư Dung',
      email: 'dung.pt@edu.vn',
      gender: 'Nữ',
      major: 'Khoa học Máy tính',
      gpa: 3.9,
      attendance: '100%',
      status: 'KHEN THƯỞNG',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '20206005',
      name: 'Hoàng Gia Đạt',
      email: 'dat.hg@edu.vn',
      gender: 'Nam',
      major: 'Kỹ thuật Phần mềm',
      gpa: 2.9,
      attendance: '88%',
      status: 'BÌNH THƯỜNG',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
    },
    {
      id: '20206006',
      name: 'Vũ Lan Hương',
      email: 'huong.vl@edu.vn',
      gender: 'Nữ',
      major: 'Hệ thống Thông tin',
      gpa: 3.2,
      attendance: '92%',
      status: 'BÌNH THƯỜNG',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-100',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
    }
  ];

  // Filtering
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.id.includes(searchTerm) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || 
                          (filterStatus === 'KHEN THƯỞNG' && student.status === 'KHEN THƯỞNG') ||
                          (filterStatus === 'CẢNH BÁO' && student.status === 'CẢNH BÁO') ||
                          (filterStatus === 'BÌNH THƯỜNG' && student.status === 'BÌNH THƯỜNG');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and top buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">Quản lý Sinh viên</h2>
          <p className="text-xs text-gray-500 font-semibold mt-1">Danh sách sinh viên lớp K64-CS01 (Học kỳ II - 2023-2024)</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#00875A] hover:bg-[#006644] text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
          
          <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Thêm sinh viên</span>
          </button>
        </div>
      </div>

      {/* KPI Stats widgets grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 block uppercase">Tổng số SV</span>
            <span className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors">120</span>
          </div>
          <div className="p-2.5 bg-gray-50 text-gray-500 rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 block uppercase">Khen thưởng</span>
            <span className="text-xl font-black text-emerald-600">15</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 block uppercase">Cảnh báo</span>
            <span className="text-xl font-black text-red-600">8</span>
          </div>
          <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 block uppercase">GPA TB Lớp</span>
            <span className="text-xl font-black text-blue-600">3.24</span>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm MSSV, Họ tên, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-100 focus:border-red-500 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-gray-700 focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs font-bold text-gray-400 mr-1">Bộ lọc:</span>
          <div className="flex bg-gray-100 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'All' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterStatus('KHEN THƯỞNG')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'KHEN THƯỞNG' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Khen thưởng
            </button>
            <button
              onClick={() => setFilterStatus('CẢNH BÁO')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'CẢNH BÁO' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Cảnh báo
            </button>
          </div>
        </div>
      </div>

      {/* Student List Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-black text-gray-400 tracking-wider uppercase">
                <th className="px-6 py-4">MSSV</th>
                <th className="px-6 py-4">Họ tên</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Giới tính</th>
                <th className="px-6 py-4">Chuyên ngành</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Chuyên cần</th>
                <th className="px-6 py-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4 font-black text-gray-950">{student.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100 shrink-0"
                        />
                        <span className="text-gray-900 font-black whitespace-nowrap">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold whitespace-nowrap">{student.email}</td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{student.gender}</td>
                    <td className="px-6 py-4 text-gray-500 font-semibold whitespace-nowrap">{student.major}</td>
                    <td className={`px-6 py-4 font-black ${student.gpa >= 3.6 ? 'text-emerald-600' : student.gpa < 2.5 ? 'text-red-600' : 'text-gray-800'}`}>
                      {student.gpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-semibold">{student.attendance}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider ${student.badgeClass}`}>
                          {student.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-400 font-semibold">
                    Không tìm thấy sinh viên nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info pagination */}
        <div className="p-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-gray-500">
          <span>Hiển thị 1 - {filteredStudents.length} trong tổng số {students.length} sinh viên</span>
          
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-400" disabled>
              &lt;
            </button>
            <button className="px-3.5 py-1.5 bg-red-700 text-white rounded-lg border border-red-700 shadow-sm shadow-red-700/10">
              1
            </button>
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
              &gt;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
