import { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  Users,
  UserCheck,
  Award,
  CalendarDays,
  X
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  title: string;
  email: string;
  faculty: string;
  degree: string;
  status: 'active' | 'on_leave';
  avatar?: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 'GV2024081',
    name: 'PGS. TS. Nguyễn Thu Hà',
    title: 'Phó Giáo sư, Tiến sĩ',
    email: 'ha.nt@edumanager.edu.vn',
    faculty: 'Khoa CNTT',
    degree: 'Tiến sĩ',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'GV2024042',
    name: 'ThS. Trần Minh Hoàng',
    title: 'Thạc sĩ',
    email: 'hoang.tm@edumanager.edu.vn',
    faculty: 'Kinh tế đối ngoại',
    degree: 'Thạc sĩ',
    status: 'on_leave',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'GV1998085',
    name: 'GS. TS. Phạm Văn Vinh',
    title: 'Giáo sư, Tiến sĩ',
    email: 'vinh.pv@edumanager.edu.vn',
    faculty: 'Kỹ thuật Xây dựng',
    degree: 'Giáo sư',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'GV2015088',
    name: 'TS. Lê Thị Mai Anh',
    title: 'Tiến sĩ',
    email: 'anh.ltm@edumanager.edu.vn',
    faculty: 'Ngoại ngữ',
    degree: 'Tiến sĩ',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
  }
];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Tiến sĩ');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('Khoa CNTT');
  const [degree, setDegree] = useState('Tiến sĩ');
  const [status, setStatus] = useState<'active' | 'on_leave'>('active');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !name.trim()) return;

    if (teachers.some(t => t.id === id)) {
      alert('Mã số giảng viên đã tồn tại!');
      return;
    }

    const newTeacher: Teacher = {
      id,
      name,
      title,
      email: email || `${id.toLowerCase()}@edumanager.edu.vn`,
      faculty,
      degree,
      status,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'
    };

    setTeachers([newTeacher, ...teachers]);
    setShowAddModal(false);

    // Reset Form
    setId('');
    setName('');
    setTitle('Tiến sĩ');
    setEmail('');
    setFaculty('Khoa CNTT');
    setDegree('Tiến sĩ');
    setStatus('active');
  };

  const handleDeleteTeacher = (idToDelete: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa giảng viên mã số ${idToDelete}?`)) {
      setTeachers(prev => prev.filter(t => t.id !== idToDelete));
    }
  };

  // Filtering Logic
  const filteredTeachers = teachers.filter(tc => {
    const matchFaculty = facultyFilter === 'all' || tc.faculty.toLowerCase().includes(facultyFilter.toLowerCase());
    const matchDegree = degreeFilter === 'all' || tc.degree === degreeFilter;
    const matchSearch = searchQuery === '' || 
      tc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFaculty && matchDegree && matchSearch;
  });

  const metrics = [
    { label: 'Tổng số giảng viên', value: `${1240 + teachers.length - 4}`, change: '+4%', icon: <Users className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50' },
    { label: 'Giảng viên mới (Học kỳ)', value: '42', change: '+12%', icon: <UserCheck className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50' },
    { label: 'Tỷ lệ đạt chuẩn', value: '86.5%', change: 'Mục tiêu 90%', icon: <Award className="w-5 h-5 text-cyan-700" />, bg: 'bg-cyan-50' },
    { label: 'Nghỉ phép hôm nay', value: '12', change: 'Học vụ theo dõi', icon: <CalendarDays className="w-5 h-5 text-amber-700" />, bg: 'bg-amber-50' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header action panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý giảng viên</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý hồ sơ, trình độ và trạng thái công tác của cán bộ giảng dạy.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-red-855 hover:bg-red-955 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm giảng viên mới</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((met, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{met.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{met.value}</span>
                <span className="text-xs font-bold text-gray-500">{met.change}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${met.bg} group-hover:scale-110 transition-transform`}>
              {met.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            
            {/* Faculty filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Khoa:</span>
              <select 
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả các khoa</option>
                <option value="CNTT">CNTT</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Xây dựng">Xây dựng</option>
                <option value="Ngoại ngữ">Ngoại ngữ</option>
              </select>
            </div>

            {/* Qualification filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Trình độ:</span>
              <select 
                value={degreeFilter}
                onChange={(e) => setDegreeFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả trình độ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Giáo sư">Giáo sư</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm giảng viên..."
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 focus:border-red-500 focus:bg-white pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-gray-700 transition-all focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Teacher directory Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                <th className="px-6 py-4">Giảng viên</th>
                <th className="px-6 py-4">Mã số</th>
                <th className="px-6 py-4">Khoa/Bộ môn</th>
                <th className="px-6 py-4">Trình độ</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((tc) => (
                  <tr key={tc.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={tc.avatar} 
                          alt={tc.name} 
                          className="w-9 h-9 rounded-xl object-cover border border-gray-100"
                        />
                        <div>
                          <p className="text-gray-800 font-black">{tc.name}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{tc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-500 font-bold">{tc.id}</td>
                    <td className="px-6 py-5 font-bold text-gray-800">{tc.faculty}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-700 font-bold">{tc.degree}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                        tc.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tc.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {tc.status === 'active' ? 'Đang công tác' : 'Nghỉ phép'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button 
                        onClick={() => handleDeleteTeacher(tc.id)}
                        className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center font-bold"
                        title="Xóa giảng viên"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400 font-bold">
                    Không tìm thấy giảng viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginator */}
        <div className="bg-white border-t border-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-gray-400">
          <span>Hiển thị {filteredTeachers.length} giảng viên</span>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 cursor-pointer" disabled>
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-red-800 text-white font-black text-xs flex items-center justify-center shadow-sm shadow-red-800/10">1</button>
            <button className="p-1.5 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer" disabled>
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-lg z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Thêm giảng viên mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã số giảng viên *</label>
                  <input
                    type="text"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="VD: GV2024001"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: PGS. TS. Nguyễn Thu Hà"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Chức danh / Học vị</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Tiến sĩ"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Khoa công tác</label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Khoa CNTT">Khoa CNTT</option>
                    <option value="Kinh tế đối ngoại">Kinh tế đối ngoại</option>
                    <option value="Kỹ thuật Xây dựng">Kỹ thuật Xây dựng</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Trình độ</label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Tiến sĩ">Tiến sĩ</option>
                    <option value="Thạc sĩ">Thạc sĩ</option>
                    <option value="Giáo sư">Giáo sư</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Trạng thái công tác</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="active">Đang công tác</option>
                    <option value="on_leave">Nghỉ phép</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Email (Bỏ trống tự động sinh)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VD: giangvien@sis.edu.vn"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-800 hover:bg-red-900 transition-all shadow-md shadow-red-800/10 cursor-pointer"
                >
                  Thêm giảng viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
