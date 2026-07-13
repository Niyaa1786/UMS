import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Users,
  School,
  CheckCircle,
  Calendar,
  X
} from 'lucide-react';

interface ClassItem {
  classCode: string;
  className: string;
  subjectCode: string;
  teacherName: string;
  sizeCurrent: number;
  sizeMax: number;
  schedule: string;
  room: string;
  status: 'active' | 'scheduled' | 'ended';
}

const initialClasses: ClassItem[] = [
  { classCode: 'CNTT101-L01', className: 'Lập trình cơ bản - L01', subjectCode: 'CNTT101', teacherName: 'TS. Nguyễn Văn A', sizeCurrent: 32, sizeMax: 45, schedule: 'Thứ 2, 4 (07:30 - 09:15)', room: 'A101', status: 'active' },
  { classCode: 'CNTT203-L02', className: 'Cấu trúc dữ liệu - L02', subjectCode: 'CNTT203', teacherName: 'ThS. Trần Thị B', sizeCurrent: 28, sizeMax: 45, schedule: 'Thứ 3, 5 (09:30 - 11:15)', room: 'A202', status: 'active' },
  { classCode: 'CSDL201-L01', className: 'Cơ sở dữ liệu - L01', subjectCode: 'CSDL201', teacherName: 'TS. Lê Văn C', sizeCurrent: 32, sizeMax: 45, schedule: 'Thứ 2, 4 (13:00 - 14:45)', room: 'A103', status: 'active' },
  { classCode: 'TOAN101-L02', className: 'Giải tích 1 - L02', subjectCode: 'TOAN101', teacherName: 'TS. Phạm Thị D', sizeCurrent: 40, sizeMax: 50, schedule: 'Thứ 3, 5 (07:30 - 09:15)', room: 'B201', status: 'active' },
  { classCode: 'ANHV101-L01', className: 'Tiếng Anh học thuật 1 - L01', subjectCode: 'ANHV101', teacherName: 'ThS. Hoàng Minh E', sizeCurrent: 25, sizeMax: 40, schedule: 'Thứ 6 (09:30 - 11:15)', room: 'C301', status: 'scheduled' }
];

export default function ClassManagement() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const [subjectCode, setSubjectCode] = useState('CNTT101');
  const [teacherName, setTeacherName] = useState('TS. Nguyễn Văn A');
  const [sizeMax, setSizeMax] = useState(45);
  const [schedule, setSchedule] = useState('Thứ 2, 4 (07:30 - 09:15)');
  const [room, setRoom] = useState('A101');
  const [status, setStatus] = useState<'active' | 'scheduled' | 'ended'>('active');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode.trim() || !className.trim()) return;

    if (classes.some(cls => cls.classCode === classCode)) {
      alert('Mã lớp học phần đã tồn tại!');
      return;
    }

    const newClass: ClassItem = {
      classCode: classCode.trim().toUpperCase(),
      className: className.trim(),
      subjectCode,
      teacherName,
      sizeCurrent: 0,
      sizeMax,
      schedule,
      room,
      status
    };

    setClasses([newClass, ...classes]);
    setShowAddModal(false);

    // Reset Form
    setClassCode('');
    setClassName('');
    setSubjectCode('CNTT101');
    setTeacherName('TS. Nguyễn Văn A');
    setSizeMax(45);
    setSchedule('Thứ 2, 4 (07:30 - 09:15)');
    setRoom('A101');
    setStatus('active');
  };

  const handleDeleteClass = (codeToDelete: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa lớp học phần ${codeToDelete}?`)) {
      setClasses(prev => prev.filter(c => c.classCode !== codeToDelete));
    }
  };

  // Filtering Logic
  const filteredClasses = classes.filter(cls => {
    const matchFaculty = facultyFilter === 'all' || 
      (facultyFilter === 'CNTT' && cls.subjectCode.startsWith('CNTT')) ||
      (facultyFilter === 'Toán' && cls.subjectCode.startsWith('TOAN')) ||
      (facultyFilter === 'Anh' && cls.subjectCode.startsWith('ANHV'));
    const matchStatus = statusFilter === 'all' || cls.status === statusFilter;
    const matchSearch = searchQuery === '' || 
      cls.className.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cls.classCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cls.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFaculty && matchStatus && matchSearch;
  });

  const stats = [
    { title: 'Tổng lớp học', value: `${150 + classes.length - 5}`, sub: '+10.2% vs kỳ trước', icon: <School className="w-5 h-5 text-red-700" />, bg: 'bg-red-50' },
    { title: 'Tổng sinh viên', value: '2,456', sub: '+8.4%', icon: <Users className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50' },
    { title: 'Sĩ số trung bình', value: '28.3', sub: 'Không đổi', icon: <CheckCircle className="w-5 h-5 text-cyan-700" />, bg: 'bg-cyan-50' },
    { title: 'Đang hoạt động', value: `${classes.filter(c => c.status === 'active').length + 138}`, sub: '91.0%', icon: <Calendar className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50' }
  ];

  const classStatusBreakdown = [
    { name: 'Đang học', count: `${2156 + classes.filter(c => c.status === 'active').length - 4}`, percent: 87.8, color: 'bg-emerald-500' },
    { name: 'Sắp khai giảng', count: `${200 + classes.filter(c => c.status === 'scheduled').length - 1}`, percent: 8.1, color: 'bg-blue-500' },
    { name: 'Đã kết thúc', count: '100', percent: 4.1, color: 'bg-gray-400' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header action panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý lớp học</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản lý tất cả các lớp học trong hệ thống học tập.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95">
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất Excel</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-800 hover:bg-red-955 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo lớp học mới</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{stat.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{stat.value}</span>
                <span className="text-[10px] text-gray-400 font-semibold">{stat.sub}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left pane: Table directory */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Table filter panel */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <select 
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả khoa</option>
                <option value="CNTT">CNTT</option>
                <option value="Toán">Toán học</option>
                <option value="Anh">Ngoại ngữ</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang học</option>
                <option value="scheduled">Sắp khai giảng</option>
              </select>
            </div>
            <div className="relative w-full sm:w-60">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm lớp học..."
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 focus:border-red-500 focus:bg-white pl-9 pr-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 transition-all focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Classes Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                    <th className="px-4 py-3">Mã lớp</th>
                    <th className="px-4 py-3">Tên lớp học</th>
                    <th className="px-4 py-3">Môn học</th>
                    <th className="px-4 py-3">Giảng viên</th>
                    <th className="px-4 py-3">Sĩ số</th>
                    <th className="px-4 py-3">Lịch học</th>
                    <th className="px-4 py-3">Phòng học</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => (
                      <tr key={cls.classCode} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-4 py-4 text-red-700 font-bold">{cls.classCode}</td>
                        <td className="px-4 py-4 text-gray-800 font-black">{cls.className}</td>
                        <td className="px-4 py-4 text-gray-400">{cls.subjectCode}</td>
                        <td className="px-4 py-4 text-gray-700 font-bold">{cls.teacherName}</td>
                        <td className="px-4 py-4 min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                              <span>{cls.sizeCurrent}/{cls.sizeMax}</span>
                              <span>{cls.sizeMax > 0 ? Math.round((cls.sizeCurrent / cls.sizeMax) * 100) : 0}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-800 h-1.5 rounded-full" style={{ width: `${cls.sizeMax > 0 ? (cls.sizeCurrent / cls.sizeMax) * 100 : 0}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-500">{cls.schedule}</td>
                        <td className="px-4 py-4 text-gray-500">{cls.room}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${
                            cls.status === 'active' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : cls.status === 'scheduled'
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-gray-550 text-gray-700 border-gray-200'
                          }`}>
                            {cls.status === 'active' ? 'Đang học' : cls.status === 'scheduled' ? 'Sắp khai giảng' : 'Đã kết thúc'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => handleDeleteClass(cls.classCode)}
                              className="p-1 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-red-800 cursor-pointer"
                              title="Xóa lớp học"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-gray-400 font-bold">
                        Không tìm thấy lớp học nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="bg-white border-t border-gray-50 px-4 py-3 flex items-center justify-between text-xs font-semibold text-gray-400">
              <span>Hiển thị {filteredClasses.length} lớp học</span>
              <div className="flex items-center gap-1">
                <button className="p-1 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-6 h-6 rounded-md bg-red-850 text-white font-black text-xs flex items-center justify-center">1</button>
                <button className="p-1 border border-gray-100 rounded-lg text-gray-505 hover:bg-gray-50 cursor-pointer" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900">Sĩ số theo trạng thái lớp</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Thống kê tổng số lượng sinh viên theo tình trạng lớp</p>
            </div>

            <div className="space-y-4 pt-2">
              {classStatusBreakdown.map((breakdown, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${breakdown.color}`} />
                      <span>{breakdown.name}</span>
                    </div>
                    <div className="space-x-1">
                      <span className="text-gray-900 font-black">{breakdown.count} SV</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${breakdown.color} h-1.5 rounded-full`} style={{ width: `${breakdown.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-lg z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Tạo lớp học phần mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddClass} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã lớp học phần *</label>
                  <input
                    type="text"
                    required
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    placeholder="VD: CNTT303-L01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tên lớp học *</label>
                  <input
                    type="text"
                    required
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="VD: Lập trình di động - L01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Môn học</label>
                  <select
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="CNTT101">CNTT101 - Lập trình cơ bản</option>
                    <option value="CNTT203">CNTT203 - Cấu trúc dữ liệu</option>
                    <option value="CSDL201">CSDL201 - Cơ sở dữ liệu</option>
                    <option value="TOAN101">TOAN101 - Giải tích 1</option>
                    <option value="ANHV101">ANHV101 - Tiếng Anh học thuật 1</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Giảng viên</label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="VD: TS. Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Sĩ số tối đa</label>
                  <input
                    type="number"
                    value={sizeMax}
                    onChange={(e) => setSizeMax(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Phòng học</label>
                  <input
                    type="text"
                    required
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="VD: A101"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Lịch học</label>
                  <input
                    type="text"
                    required
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="VD: Thứ 2, 4 (07:30 - 09:15)"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Trạng thái khai giảng</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <option value="active">Đang học</option>
                    <option value="scheduled">Sắp khai giảng</option>
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
                  Tạo lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
