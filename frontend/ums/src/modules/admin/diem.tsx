import { useState } from 'react';
import {
  Award,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  ThumbsUp,
  FileCheck,
  Search,
  Filter,
  Download,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Star,
  BookOpen,
  Users,
  X,
  Eye,
  Plus
} from 'lucide-react';

interface GradeSheet {
  classCode: string;
  className: string;
  teacherName: string;
  studentsCount: number;
  averageGpa: number;
  passRate: number;
  failCount: number;
  excellentCount: number;
  status: 'approved' | 'pending';
  submittedDate: string;
}

interface StudentGrade {
  rank: number;
  name: string;
  mssv: string;
  midterm: number;
  final: number;
  gpa: number;
  grade: string;
  status: 'pass' | 'fail' | 'excellent';
}

const gradeColor = (gpa: number) => {
  if (gpa >= 3.6) return 'text-emerald-700 font-black';
  if (gpa >= 3.0) return 'text-blue-700 font-black';
  if (gpa >= 2.0) return 'text-amber-700 font-black';
  return 'text-red-700 font-black';
};

const gradeBadge = (grade: string) => {
  const map: Record<string, string> = {
    'A+': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'A': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'B+': 'bg-blue-50 text-blue-700 border-blue-100',
    'B': 'bg-blue-50 text-blue-600 border-blue-100',
    'C+': 'bg-amber-50 text-amber-700 border-amber-100',
    'C': 'bg-amber-50 text-amber-600 border-amber-100',
    'D': 'bg-orange-50 text-orange-700 border-orange-100',
    'F': 'bg-red-50 text-red-700 border-red-100',
  };
  return map[grade] ?? 'bg-gray-50 text-gray-600 border-gray-100';
};

export default function GradeManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');
  const [sheets, setSheets] = useState<GradeSheet[]>([
    { classCode: 'CNTT101-L01', className: 'Lập trình cơ bản - L01', teacherName: 'TS. Nguyễn Văn A', studentsCount: 45, averageGpa: 3.25, passRate: 98, failCount: 1, excellentCount: 18, status: 'approved', submittedDate: '10/05/2024' },
    { classCode: 'CSDL201-L01', className: 'Cơ sở dữ liệu - L01', teacherName: 'TS. Lê Văn C', studentsCount: 45, averageGpa: 3.02, passRate: 91, failCount: 4, excellentCount: 10, status: 'pending', submittedDate: '12/05/2024' },
    { classCode: 'TOAN101-L02', className: 'Giải tích 1 - L02', teacherName: 'TS. Phạm Thị D', studentsCount: 50, averageGpa: 2.85, passRate: 88, failCount: 6, excellentCount: 7, status: 'approved', submittedDate: '09/05/2024' },
    { classCode: 'CNTT203-L02', className: 'Cấu trúc dữ liệu - L02', teacherName: 'ThS. Trần Thị B', studentsCount: 42, averageGpa: 3.41, passRate: 100, failCount: 0, excellentCount: 20, status: 'pending', submittedDate: '13/05/2024' },
    { classCode: 'VALY101-L01', className: 'Vật lý đại cương - L01', teacherName: 'TS. Hoàng Minh K', studentsCount: 55, averageGpa: 2.62, passRate: 84, failCount: 9, excellentCount: 4, status: 'pending', submittedDate: '14/05/2024' },
  ]);

  // Form State for new Grade Sheet
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClassCode, setNewClassCode] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newStudentsCount, setNewStudentsCount] = useState(45);
  const [newAverageGpa, setNewAverageGpa] = useState(3.0);
  const [newPassRate, setNewPassRate] = useState(95);
  const [newFailCount, setNewFailCount] = useState(1);
  const [newExcellentCount, setNewExcellentCount] = useState(12);

  const handleAddSheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassCode.trim() || !newClassName.trim()) return;

    if (sheets.some(s => s.classCode === newClassCode)) {
      alert('Mã lớp học phần này đã có bảng điểm!');
      return;
    }

    const newSheet: GradeSheet = {
      classCode: newClassCode.trim().toUpperCase(),
      className: newClassName.trim(),
      teacherName: newTeacherName.trim() || 'Chưa phân công',
      studentsCount: newStudentsCount,
      averageGpa: newAverageGpa,
      passRate: newPassRate,
      failCount: newFailCount,
      excellentCount: newExcellentCount,
      status: 'pending',
      submittedDate: new Date().toLocaleDateString('vi-VN')
    };

    setSheets([newSheet, ...sheets]);
    setShowAddModal(false);

    // Reset Form
    setNewClassCode('');
    setNewClassName('');
    setNewTeacherName('');
    setNewStudentsCount(45);
    setNewAverageGpa(3.0);
    setNewPassRate(95);
    setNewFailCount(1);
    setNewExcellentCount(12);
  };

  const studentGrades: StudentGrade[] = [
    { rank: 1, name: 'Nguyễn Thành Long', mssv: '20210456', midterm: 9.5, final: 9.8, gpa: 3.95, grade: 'A+', status: 'excellent' },
    { rank: 2, name: 'Trần Thị Lan', mssv: '20210123', midterm: 9.0, final: 9.2, gpa: 3.80, grade: 'A', status: 'excellent' },
    { rank: 3, name: 'Lê Minh Tuấn', mssv: '20210789', midterm: 8.5, final: 8.7, gpa: 3.60, grade: 'A', status: 'excellent' },
    { rank: 4, name: 'Phạm Thu Hương', mssv: '20210234', midterm: 8.0, final: 8.2, gpa: 3.40, grade: 'B+', status: 'pass' },
    { rank: 5, name: 'Hoàng Văn Nam', mssv: '20210567', midterm: 7.5, final: 7.8, gpa: 3.20, grade: 'B', status: 'pass' },
    { rank: 6, name: 'Vũ Thị Hoa', mssv: '20210890', midterm: 7.0, final: 7.2, gpa: 3.00, grade: 'B', status: 'pass' },
    { rank: 7, name: 'Đỗ Quốc Bảo', mssv: '20210345', midterm: 6.5, final: 6.8, gpa: 2.80, grade: 'C+', status: 'pass' },
    { rank: 8, name: 'Bùi Anh Khoa', mssv: '20210678', midterm: 5.0, final: 4.5, gpa: 1.50, grade: 'F', status: 'fail' },
  ];

  const kpis = [
    { label: 'GPA Trung bình', value: '3.12', unit: '/ 4.0', sub: '↑ +0.04 HK trước', icon: <Award className="w-5 h-5 text-red-700" />, bg: 'bg-red-50', trend: 'up' },
    { label: 'Tỷ lệ đỗ môn', value: '94.2', unit: '%', sub: '↑ +0.5% so kỳ trước', icon: <CheckCircle className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50', trend: 'up' },
    { label: 'Bảng điểm chờ duyệt', value: '15', unit: ' lớp', sub: 'Cần xử lý khẩn', icon: <AlertTriangle className="w-5 h-5 text-amber-700" />, bg: 'bg-amber-50', trend: 'neutral' },
    { label: 'Sinh viên xuất sắc', value: '450', unit: ' SV', sub: 'Tỷ lệ: 3.6%', icon: <Star className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50', trend: 'up' },
  ];

  const gpaDistribution = [
    { label: 'Xuất sắc (3.6–4.0)', count: 450, percent: 36, color: 'bg-emerald-500' },
    { label: 'Giỏi (3.2–3.59)', count: 280, percent: 22, color: 'bg-blue-500' },
    { label: 'Khá (2.5–3.19)', count: 380, percent: 30, color: 'bg-amber-500' },
    { label: 'Trung bình (2.0–2.49)', count: 110, percent: 9, color: 'bg-orange-500' },
    { label: 'Yếu / Trượt (<2.0)', count: 30, percent: 3, color: 'bg-red-500' },
  ];

  const handleApprove = (classCode: string) => {
    setSheets(prev => prev.map(s => s.classCode === classCode ? { ...s, status: 'approved' } : s));
  };

  const handleApproveAll = () => {
    setSheets(prev => prev.map(s => ({ ...s, status: 'approved' })));
  };

  const filteredSheets = sheets.filter(s => {
    const matchSearch = s.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.classCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const pendingCount = sheets.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý điểm</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Quản trị kết quả học tập, duyệt bảng điểm và thống kê xếp loại sinh viên.</p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              onClick={handleApproveAll}
              className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Duyệt tất cả ({pendingCount})</span>
            </button>
          )}
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-800 hover:bg-red-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bảng điểm mới</span>
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{kpi.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{kpi.value}</span>
                <span className="text-xs font-bold text-gray-500">{kpi.unit}</span>
              </div>
              <p className={`text-[10px] font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-gray-400'}`}>{kpi.sub}</p>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bg} group-hover:scale-110 transition-transform shrink-0`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/70 p-1 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Danh sách bảng điểm', icon: <BookOpen className="w-3.5 h-3.5" /> },
          { id: 'detail', label: 'Điểm chi tiết lớp', icon: <Users className="w-3.5 h-3.5" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* GPA Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div>
                <h3 className="text-sm font-black text-gray-900">Phân phối xếp loại học lực</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tổng hợp cơ cấu học lực sinh viên toàn trường học kỳ này</p>
              </div>
              <div className="space-y-3">
                {gpaDistribution.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{item.count} SV</span>
                        <span className="text-gray-900 font-black w-8 text-right">{item.percent}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`${item.color} h-2 rounded-full transition-all duration-700`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wide">Tóm tắt học kỳ</h4>
                {[
                  { label: 'Tổng bảng điểm đã nộp', value: `${sheets.length}`, icon: <FileCheck className="w-3.5 h-3.5 text-gray-500" /> },
                  { label: 'Đã phê duyệt', value: `${sheets.filter(s=>s.status==='approved').length}`, icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> },
                  { label: 'Chờ phê duyệt', value: `${pendingCount}`, icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> },
                  { label: 'Tổng sinh viên được chấm', value: '1,250', icon: <Users className="w-3.5 h-3.5 text-blue-500" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50/60 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-700" />
                  <h4 className="text-xs font-black text-red-800">So sánh học kỳ</h4>
                </div>
                <p className="text-[10px] text-red-600 font-semibold leading-relaxed">GPA trung bình tăng <strong>0.04</strong> so với HKI 2023-2024. Tỷ lệ sinh viên xuất sắc tăng thêm <strong>1.2%</strong>.</p>
              </div>
            </div>
          </div>

          {/* Grade Sheets Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-gray-900">Danh sách bảng điểm lớp học phần</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Phê duyệt và công bố điểm — {sheets.filter(s => s.status === 'pending').length} bảng điểm đang chờ duyệt</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm lớp, giảng viên..."
                    className="bg-gray-50 border border-gray-100 pl-8 pr-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-red-300 w-44 transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {/* Filter */}
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as any)}
                    className="bg-gray-50 border border-gray-100 pl-7 pr-3 py-2 rounded-xl text-xs font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="approved">Đã duyệt</option>
                  </select>
                  <Filter className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                    <th className="px-5 py-3.5">Lớp học phần</th>
                    <th className="px-5 py-3.5">Giảng viên</th>
                    <th className="px-5 py-3.5">Sĩ số</th>
                    <th className="px-5 py-3.5">GPA lớp</th>
                    <th className="px-5 py-3.5">Tỷ lệ đạt</th>
                    <th className="px-5 py-3.5">Trượt / Xuất sắc</th>
                    <th className="px-5 py-3.5">Trạng thái</th>
                    <th className="px-5 py-3.5 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                  {filteredSheets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400 font-semibold text-sm">
                        Không tìm thấy bảng điểm nào phù hợp
                      </td>
                    </tr>
                  ) : filteredSheets.map((sheet) => (
                    <tr key={sheet.classCode} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-gray-800 font-black">{sheet.className}</p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{sheet.classCode} • Nộp: {sheet.submittedDate}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-700 font-bold">{sheet.teacherName}</td>
                      <td className="px-5 py-4 text-gray-500 font-semibold">{sheet.studentsCount} SV</td>
                      <td className={`px-5 py-4 ${gradeColor(sheet.averageGpa)}`}>{sheet.averageGpa.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <span className={`font-black ${sheet.passRate >= 95 ? 'text-emerald-700' : sheet.passRate >= 85 ? 'text-blue-700' : 'text-amber-700'}`}>{sheet.passRate}%</span>
                          <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-1.5 rounded-full ${sheet.passRate >= 95 ? 'bg-emerald-500' : sheet.passRate >= 85 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${sheet.passRate}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                          <span className="flex items-center gap-1 text-red-600">
                            <TrendingDown className="w-3 h-3" /> {sheet.failCount}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1 text-emerald-600">
                            <Star className="w-3 h-3" /> {sheet.excellentCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                          sheet.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sheet.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                          {sheet.status === 'approved' ? 'Đã công bố' : 'Chờ duyệt'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => { setSelectedClass(sheet.classCode); setActiveTab('detail'); }}
                            className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {sheet.status === 'pending' ? (
                            <button
                              onClick={() => handleApprove(sheet.classCode)}
                              className="bg-red-800 hover:bg-red-950 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95 inline-flex items-center gap-1"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>Duyệt</span>
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                if (confirm(`Bạn có chắc chắn muốn xóa bảng điểm của lớp ${sheet.classCode}?`)) {
                                  setSheets(prev => prev.filter(s => s.classCode !== sheet.classCode));
                                }
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-750 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa bảng điểm"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'detail' && (
        <div className="space-y-6">
          {/* Class Selector */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-gray-900">
                {selectedClass ? sheets.find(s => s.classCode === selectedClass)?.className : 'Điểm chi tiết theo lớp'}
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                {selectedClass
                  ? `${selectedClass} • GV: ${sheets.find(s => s.classCode === selectedClass)?.teacherName}`
                  : 'Chọn lớp học phần để xem bảng điểm chi tiết'}
              </p>
            </div>
            <div className="relative self-start sm:self-auto">
              <select
                value={selectedClass ?? ''}
                onChange={e => setSelectedClass(e.target.value || null)}
                className="bg-gray-50 border border-gray-100 pl-3 pr-8 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">-- Chọn lớp --</option>
                {sheets.map(s => (
                  <option key={s.classCode} value={s.classCode}>{s.className}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {selectedClass ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-gray-900">Bảng điểm sinh viên</h3>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Danh sách điểm chi tiết từng sinh viên trong lớp học phần</p>
                </div>
                <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto">
                  <Download className="w-3.5 h-3.5" />
                  Xuất bảng điểm
                </button>
              </div>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                      <th className="px-5 py-3.5">STT</th>
                      <th className="px-5 py-3.5">Sinh viên</th>
                      <th className="px-5 py-3.5 text-center">Giữa kỳ</th>
                      <th className="px-5 py-3.5 text-center">Cuối kỳ</th>
                      <th className="px-5 py-3.5 text-center">GPA (4.0)</th>
                      <th className="px-5 py-3.5 text-center">Xếp loại</th>
                      <th className="px-5 py-3.5 text-center">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                    {studentGrades.map((sg) => (
                      <tr key={sg.mssv} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-5 py-3.5 text-gray-400 font-semibold">{sg.rank}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-red-50 text-red-800 flex items-center justify-center font-black text-[10px] border border-red-100">
                              {sg.name.split(' ').slice(-1)[0][0]}
                            </div>
                            <div>
                              <p className="text-gray-800 font-black">{sg.name}</p>
                              <p className="text-[9px] text-gray-400 font-semibold">{sg.mssv}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center font-bold text-gray-700">{sg.midterm}</td>
                        <td className="px-5 py-3.5 text-center font-bold text-gray-700">{sg.final}</td>
                        <td className={`px-5 py-3.5 text-center ${gradeColor(sg.gpa)}`}>{sg.gpa.toFixed(2)}</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black border ${gradeBadge(sg.grade)}`}>
                            {sg.grade}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black border ${
                            sg.status === 'excellent'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : sg.status === 'pass'
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sg.status === 'excellent' ? 'bg-emerald-500' : sg.status === 'pass' ? 'bg-blue-500' : 'bg-red-500'}`} />
                            {sg.status === 'excellent' ? 'Xuất sắc' : sg.status === 'pass' ? 'Đạt' : 'Trượt'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                <BookOpen className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-black text-gray-400">Chưa chọn lớp học phần</p>
              <p className="text-xs text-gray-300 font-semibold mt-1">Vui lòng chọn lớp ở trên để xem bảng điểm chi tiết</p>
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-lg z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Tạo bảng điểm lớp học phần mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddSheet} className="space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã lớp học phần *</label>
                  <input
                    type="text"
                    required
                    value={newClassCode}
                    onChange={(e) => setNewClassCode(e.target.value)}
                    placeholder="VD: CNTT303-L01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tên lớp học phần *</label>
                  <input
                    type="text"
                    required
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="VD: Lập trình di động - L01"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Giảng viên giảng dạy *</label>
                  <input
                    type="text"
                    required
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    placeholder="VD: TS. Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Sĩ số sinh viên</label>
                  <input
                    type="number"
                    value={newStudentsCount}
                    onChange={(e) => setNewStudentsCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Điểm trung bình (GPA)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newAverageGpa}
                    onChange={(e) => setNewAverageGpa(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tỷ lệ qua môn (%)</label>
                  <input
                    type="number"
                    value={newPassRate}
                    onChange={(e) => setNewPassRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Số sinh viên trượt</label>
                  <input
                    type="number"
                    value={newFailCount}
                    onChange={(e) => setNewFailCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Số sinh viên xuất sắc</label>
                  <input
                    type="number"
                    value={newExcellentCount}
                    onChange={(e) => setNewExcellentCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
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
                  Tạo bảng điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
