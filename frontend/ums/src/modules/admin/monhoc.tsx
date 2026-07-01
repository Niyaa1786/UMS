import { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
  X
} from 'lucide-react';

interface Subject {
  code: string;
  name: string;
  faculty: string;
  credits: number;
  hours: number;
  prerequisite: string;
  status: 'active' | 'suspended';
}

const initialSubjects: Subject[] = [
  { code: 'CNTT101', name: 'Lập trình cơ bản', faculty: 'Công nghệ thông tin', credits: 3, hours: 45, prerequisite: '-', status: 'active' },
  { code: 'CNTT203', name: 'Cấu trúc dữ liệu và giải thuật', faculty: 'Công nghệ thông tin', credits: 3, hours: 45, prerequisite: 'CNTT101', status: 'active' },
  { code: 'CSDL201', name: 'Cơ sở dữ liệu', faculty: 'Công nghệ thông tin', credits: 3, hours: 45, prerequisite: 'CNTT101', status: 'active' },
  { code: 'TOAN101', name: 'Giải tích 1', faculty: 'Toán học', credits: 4, hours: 60, prerequisite: '-', status: 'active' },
  { code: 'ANHV101', name: 'Tiếng Anh học thuật 1', faculty: 'Ngoại ngữ', credits: 2, hours: 30, prerequisite: '-', status: 'active' },
  { code: 'KT101', name: 'Kinh tế vi mô', faculty: 'Kinh tế', credits: 3, hours: 45, prerequisite: '-', status: 'suspended' }
];

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState('Công nghệ thông tin');
  const [credits, setCredits] = useState(3);
  const [hours, setHours] = useState(45);
  const [prerequisite, setPrerequisite] = useState('-');
  const [status, setStatus] = useState<'active' | 'suspended'>('active');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    if (subjects.some(sub => sub.code === code)) {
      alert('Mã môn học đã tồn tại!');
      return;
    }

    const newSubject: Subject = {
      code: code.trim().toUpperCase(),
      name: name.trim(),
      faculty,
      credits,
      hours,
      prerequisite: prerequisite.trim() || '-',
      status
    };

    setSubjects([newSubject, ...subjects]);
    setShowAddModal(false);

    // Reset Form
    setCode('');
    setName('');
    setFaculty('Công nghệ thông tin');
    setCredits(3);
    setHours(45);
    setPrerequisite('-');
    setStatus('active');
  };

  const handleDeleteSubject = (codeToDelete: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa môn học mã số ${codeToDelete}?`)) {
      setSubjects(prev => prev.filter(sub => sub.code !== codeToDelete));
    }
  };

  // Filter Logic
  const filteredSubjects = subjects.filter(sub => {
    const matchFaculty = facultyFilter === 'all' || 
      (facultyFilter === 'CNTT' && sub.faculty === 'Công nghệ thông tin') ||
      (facultyFilter === 'Toán' && sub.faculty === 'Toán học') ||
      (facultyFilter === 'Ngoại ngữ' && sub.faculty === 'Ngoại ngữ') ||
      (facultyFilter === 'Kinh tế' && sub.faculty === 'Kinh tế');
    const matchStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchSearch = searchQuery === '' || 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFaculty && matchStatus && matchSearch;
  });

  const statCards = [
    { title: 'Tổng môn học', value: `${120 + subjects.length - 6}`, sub: '12.4% so với kỳ trước', isUp: true, icon: <BookOpen className="w-5 h-5 text-red-700" />, bg: 'bg-red-50' },
    { title: 'Đang mở', value: `${subjects.filter(s => s.status === 'active').length + 90}`, sub: '8.7%', isUp: true, icon: <CheckCircle className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50' },
    { title: 'Tạm dừng', value: `${subjects.filter(s => s.status === 'suspended').length + 12}`, sub: '2.3%', isUp: true, icon: <AlertTriangle className="w-5 h-5 text-amber-700" />, bg: 'bg-amber-50' },
    { title: 'Tổng tín chỉ', value: `${subjects.reduce((sum, s) => sum + s.credits, 0) + 420}`, sub: '14.6%', isUp: true, icon: <FolderOpen className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50' }
  ];

  const departmentBreakdown = [
    { name: 'Công nghệ thông tin', count: subjects.filter(s => s.faculty === 'Công nghệ thông tin').length + 42, percent: 37.5, color: 'bg-red-600' },
    { name: 'Kinh tế', count: subjects.filter(s => s.faculty === 'Kinh tế').length + 18, percent: 17.2, color: 'bg-blue-600' },
    { name: 'Toán học', count: subjects.filter(s => s.faculty === 'Toán học').length + 10, percent: 9.4, color: 'bg-cyan-500' },
    { name: 'Ngoại ngữ', count: subjects.filter(s => s.faculty === 'Ngoại ngữ').length + 10, percent: 9.4, color: 'bg-amber-500' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý môn học</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý tất cả các môn học trong hệ thống học tập.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-red-800 hover:bg-red-955 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm môn học mới</span>
        </button>
      </div>

      {/* KPI stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-gray-400 block uppercase">{card.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{card.value}</span>
                <span className="text-[10px] text-gray-400 font-semibold">{card.sub}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid: Left directory table vs Right faculty breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Table + filters */}
        <div className="lg:col-span-2 space-y-4">
          {/* Table Filters panel */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <select 
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả khoa</option>
                <option value="CNTT">Công nghệ thông tin</option>
                <option value="Toán">Toán học</option>
                <option value="Ngoại ngữ">Ngoại ngữ</option>
                <option value="Kinh tế">Kinh tế</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang mở</option>
                <option value="suspended">Tạm dừng</option>
              </select>
            </div>
            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm môn học..."
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 focus:border-red-500 focus:bg-white pl-9 pr-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 transition-all focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Subjects data table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                    <th className="px-4 py-3">Mã môn</th>
                    <th className="px-4 py-3">Tên môn học</th>
                    <th className="px-4 py-3">Khoa</th>
                    <th className="px-4 py-3">Tín chỉ</th>
                    <th className="px-4 py-3">Số tiết</th>
                    <th className="px-4 py-3">Tiên quyết</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((sub) => (
                      <tr key={sub.code} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-4 py-4 text-red-700 font-black">{sub.code}</td>
                        <td className="px-4 py-4 text-gray-800 font-black">{sub.name}</td>
                        <td className="px-4 py-4 text-gray-500 font-semibold">{sub.faculty}</td>
                        <td className="px-4 py-4">{sub.credits}</td>
                        <td className="px-4 py-4 font-semibold">{sub.hours}</td>
                        <td className="px-4 py-4 font-semibold text-gray-400">{sub.prerequisite}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${
                            sub.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {sub.status === 'active' ? 'Đang mở' : 'Tạm dừng'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => handleDeleteSubject(sub.code)}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-450 hover:text-red-700 cursor-pointer" 
                              title="Xóa môn học"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-gray-400 font-bold">
                        Không tìm thấy môn học nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="bg-white border-t border-gray-50 px-4 py-3 flex items-center justify-between text-xs font-semibold text-gray-400">
              <span>Hiển thị {filteredSubjects.length} môn học</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-6 h-6 rounded-md bg-red-850 text-white font-black text-xs flex items-center justify-center">1</button>
                <button className="p-1 border border-gray-100 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Faculty breakdowns */}
        <div className="space-y-6">
          {/* Department Distribution Progress Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900">Thống kê theo khoa</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tỷ lệ số lượng môn học theo từng khoa chủ quản</p>
            </div>

            <div className="space-y-3 pt-2">
              {departmentBreakdown.map((dept, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-md ${dept.color}`} />
                      <span>{dept.name}</span>
                    </div>
                    <div className="space-x-1">
                      <span className="text-gray-900 font-black">{dept.count} môn</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${dept.color} h-1.5 rounded-full`} style={{ width: `${(dept.count / subjects.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-lg z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Thêm môn học mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã môn học *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="VD: CNTT303"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tên môn học *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Lập trình di động"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Khoa phụ trách</label>
                  <select
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Toán học">Toán học</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                    <option value="Kinh tế">Kinh tế</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Số tín chỉ</label>
                  <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Số tiết học</label>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Môn tiên quyết</label>
                  <input
                    type="text"
                    value={prerequisite}
                    onChange={(e) => setPrerequisite(e.target.value)}
                    placeholder="VD: CNTT101 hoặc -"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="active">Đang mở</option>
                    <option value="suspended">Tạm dừng</option>
                  </select>
                </div>
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
                  Thêm môn học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
