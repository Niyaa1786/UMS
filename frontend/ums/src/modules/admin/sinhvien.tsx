import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Users,
  UserPlus,
  UserMinus,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  X
} from 'lucide-react';

interface Student {
  mssv: string;
  name: string;
  age: number;
  gender: string;
  faculty: string;
  major: string;
  cohort: string;
  email: string;
  status: 'active' | 'suspended' | 'graduated';
  avatar?: string;
}

const initialStudents: Student[] = [
  {
    mssv: '20201234',
    name: 'Nguyễn Thành Nam',
    age: 21,
    gender: 'Nam',
    faculty: 'CNTT',
    major: 'Khoa học máy tính',
    cohort: 'K65',
    email: 'nam.nt201234@sis.hust.edu.vn',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop'
  },
  {
    mssv: '20214567',
    name: 'Lê Thị Mai Chi',
    age: 20,
    gender: 'Nữ',
    faculty: 'Cơ khí',
    major: 'Kỹ thuật ô tô',
    cohort: 'K66',
    email: 'chi.ltm20214567@sis.hust.edu.vn',
    status: 'suspended',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    mssv: '20195678',
    name: 'Trần Văn Hùng',
    age: 23,
    gender: 'Nam',
    faculty: 'Điện tử',
    major: 'Viễn thông',
    cohort: 'K64',
    email: 'hung.tv195678@sis.hust.edu.vn',
    status: 'graduated',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    mssv: '20228899',
    name: 'Hoàng Minh Tuấn',
    age: 19,
    gender: 'Nam',
    faculty: 'Kinh tế',
    major: 'Quản trị kinh doanh',
    cohort: 'K67',
    email: 'tuan.hm228899@sis.hust.edu.vn',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [cohortFilter, setCohortFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [mssv, setMssv] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('Nam');
  const [faculty, setFaculty] = useState('CNTT');
  const [major, setMajor] = useState('Khoa học máy tính');
  const [cohort, setCohort] = useState('K66');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'active' | 'suspended' | 'graduated'>('active');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mssv.trim() || !name.trim()) return;

    // Avoid duplicates
    if (students.some(st => st.mssv === mssv)) {
      alert('MSSV đã tồn tại trong hệ thống!');
      return;
    }

    const newStudent: Student = {
      mssv,
      name,
      age,
      gender,
      faculty,
      major,
      cohort,
      email: email || `${mssv}@sis.edu.vn`,
      status,
      avatar: gender === 'Nữ' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'
    };

    setStudents([newStudent, ...students]);
    setShowAddModal(false);

    // Reset Form
    setMssv('');
    setName('');
    setAge(20);
    setGender('Nam');
    setFaculty('CNTT');
    setMajor('Khoa học máy tính');
    setCohort('K66');
    setEmail('');
    setStatus('active');
  };

  const handleDeleteStudent = (mssvToDelete: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên mã số ${mssvToDelete}?`)) {
      setStudents(prev => prev.filter(st => st.mssv !== mssvToDelete));
    }
  };

  // Filter Logic
  const filteredStudents = students.filter(st => {
    const matchFaculty = facultyFilter === 'all' || st.faculty === facultyFilter;
    const matchCohort = cohortFilter === 'all' || st.cohort === cohortFilter;
    const matchSearch = searchQuery === '' || 
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      st.mssv.includes(searchQuery);
    return matchFaculty && matchCohort && matchSearch;
  });

  const bottomMetrics = [
    { label: 'Tổng sinh viên', value: `${15480 + students.length - 4}`, percent: '+2.4%', isUp: true, icon: <Users className="w-5 h-5 text-red-700" />, bg: 'bg-red-50' },
    { label: 'Nhập học mới', value: '3,120', percent: '+12%', isUp: true, icon: <UserPlus className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50' },
    { label: 'Bảo lưu / Thôi học', value: '45', percent: '-0.5%', isUp: false, icon: <UserMinus className="w-5 h-5 text-amber-700" />, bg: 'bg-amber-50' },
    { label: 'Tốt nghiệp năm nay', value: '2,850', percent: '+5.2%', isUp: true, icon: <GraduationCap className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý sinh viên</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý danh sách, hồ sơ và trạng thái học tập của sinh viên.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95">
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất file</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-850 hover:bg-red-950 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sinh viên mới</span>
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Faculty select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 tracking-wider uppercase">KHOA</label>
            <select 
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
            >
              <option value="all">Tất cả các khoa</option>
              <option value="CNTT">Khoa Công nghệ thông tin</option>
              <option value="Cơ khí">Khoa Cơ khí</option>
              <option value="Điện tử">Khoa Điện tử</option>
              <option value="Kinh tế">Khoa Kinh tế</option>
            </select>
          </div>
          {/* Cohort select */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 tracking-wider uppercase">KHÓA HỌC</label>
            <select 
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
            >
              <option value="all">Tất cả các khóa</option>
              <option value="K64">Khóa K64</option>
              <option value="K65">Khóa K65</option>
              <option value="K66">Khóa K66</option>
              <option value="K67">Khóa K67</option>
            </select>
          </div>
          {/* Search bar */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 tracking-wider uppercase">TÌM KIẾM SINH VIÊN</label>
            <div className="relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên hoặc MSSV..."
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 focus:border-red-500 focus:bg-white pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-gray-700 transition-all focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Student data table wrapper */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                <th className="px-6 py-4">MSSV</th>
                <th className="px-6 py-4">Họ và tên</th>
                <th className="px-6 py-4">Khoa / Ngành</th>
                <th className="px-6 py-4">Khóa học</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((st) => (
                  <tr key={st.mssv} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-6 py-5 text-red-700 font-extrabold">{st.mssv}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={st.avatar} 
                          alt={st.name} 
                          className="w-9 h-9 rounded-xl object-cover border border-gray-100"
                        />
                        <div>
                          <p className="text-gray-800 font-black">{st.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{st.gender} • {st.age} tuổi</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-gray-800">{st.faculty}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{st.major}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-500 font-semibold">{st.cohort}</td>
                    <td className="px-6 py-5 text-gray-500 font-medium">{st.email}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        st.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : st.status === 'suspended'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {st.status === 'active' ? 'Đang học' : st.status === 'suspended' ? 'Bảo lưu' : 'Tốt nghiệp'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => handleDeleteStudent(st.mssv)}
                          className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Xóa sinh viên"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 font-bold">
                    Không tìm thấy sinh viên phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginator */}
        <div className="bg-white border-t border-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-gray-400">
          <span>Hiển thị {filteredStudents.length} sinh viên</span>
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

      {/* Bottom stat KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {bottomMetrics.map((met, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100/90 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{met.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{met.value}</span>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-extrabold ${met.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                  {met.isUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {met.percent}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${met.bg} group-hover:scale-110 transition-transform`}>
              {met.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Add student modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-lg z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Thêm sinh viên mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã số sinh viên (MSSV) *</label>
                  <input
                    type="text"
                    required
                    value={mssv}
                    onChange={(e) => setMsv(e.target.value)}
                    placeholder="VD: 20224567"
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
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tuổi</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Giới tính</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Khoa</label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="CNTT">Khoa Công nghệ thông tin</option>
                    <option value="Cơ khí">Khoa Cơ khí</option>
                    <option value="Điện tử">Khoa Điện tử</option>
                    <option value="Kinh tế">Khoa Kinh tế</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Ngành học</label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Khóa học</label>
                  <select
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="K64">Khóa K64</option>
                    <option value="K65">Khóa K65</option>
                    <option value="K66">Khóa K66</option>
                    <option value="K67">Khóa K67</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="active">Đang học</option>
                    <option value="suspended">Bảo lưu</option>
                    <option value="graduated">Tốt nghiệp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Email (Bỏ trống tự động sinh)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VD: sinhvien@sis.edu.vn"
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
                  Thêm sinh viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
