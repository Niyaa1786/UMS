import { useState } from 'react';
import {
  Download,
  FileText,
  Table,
  TrendingUp,
  Users,
  FileBarChart2,
  Filter,
  Search,
  ChevronDown,
  Star,
  BookOpen,
  GraduationCap,
  DollarSign,
  Award,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Clock,
  Eye
} from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  category: 'Student' | 'Academic' | 'Financial' | 'Staff';
  generatedDate: string;
  fileSize: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'ready' | 'processing';
}

const categoryConfig: Record<string, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Student: { label: 'Sinh viên', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', icon: <Users className="w-3.5 h-3.5" /> },
  Academic: { label: 'Học vụ', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', icon: <BookOpen className="w-3.5 h-3.5" /> },
  Financial: { label: 'Tài chính', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: <DollarSign className="w-3.5 h-3.5" /> },
  Staff: { label: 'Giảng viên', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: <GraduationCap className="w-3.5 h-3.5" /> },
};

const formatConfig: Record<string, { bg: string; text: string }> = {
  PDF: { bg: 'bg-red-50', text: 'text-red-700' },
  Excel: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  CSV: { bg: 'bg-blue-50', text: 'text-blue-700' },
};

export default function ReportsManagement() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'Student' | 'Academic' | 'Financial' | 'Staff'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [reports, setReports] = useState<ReportItem[]>([
    { id: 'RP-2024-001', name: 'Báo cáo tổng kết tuyển sinh khóa K68', category: 'Student', generatedDate: '24/10/2024', fileSize: '1.2 MB', format: 'PDF', status: 'ready' },
    { id: 'RP-2024-002', name: 'Thống kê kết quả học tập HKI 2023-2024', category: 'Academic', generatedDate: '22/10/2024', fileSize: '2.4 MB', format: 'Excel', status: 'ready' },
    { id: 'RP-2024-003', name: 'Quyết toán học phí và công nợ học kỳ 2', category: 'Financial', generatedDate: '15/10/2024', fileSize: '850 KB', format: 'PDF', status: 'ready' },
    { id: 'RP-2024-004', name: 'Đánh giá giảng dạy và chất lượng giảng viên', category: 'Staff', generatedDate: '10/10/2024', fileSize: '1.8 MB', format: 'Excel', status: 'ready' },
    { id: 'RP-2024-005', name: 'Báo cáo học bổng và hỗ trợ sinh viên khó khăn', category: 'Financial', generatedDate: '08/10/2024', fileSize: '540 KB', format: 'CSV', status: 'ready' },
    { id: 'RP-2024-006', name: 'Thống kê tỷ lệ đỗ/trượt theo khoa đào tạo', category: 'Academic', generatedDate: '05/10/2024', fileSize: '3.1 MB', format: 'Excel', status: 'ready' },
  ]);

  const topClasses = [
    { className: 'Trí tuệ nhân tạo - AI01', code: 'IT4844', gpa: 3.42, passRate: 100, teacher: 'TS. Nguyễn Văn A', trend: 'up' },
    { className: 'Lập trình Java nâng cao', code: 'CNTT205', gpa: 3.28, passRate: 98, teacher: 'ThS. Trần Thị B', trend: 'up' },
    { className: 'Cơ sở dữ liệu - L01', code: 'CSDL201', gpa: 3.18, passRate: 96, teacher: 'TS. Lê Văn C', trend: 'down' },
    { className: 'Kỹ thuật phần mềm', code: 'CNTT312', gpa: 3.05, passRate: 95, teacher: 'TS. Phạm Văn E', trend: 'up' },
  ];

  const kpiMetrics = [
    { label: 'Tỷ lệ SV Khá/Giỏi', value: '68.2%', delta: '+2.4%', isPositive: true, icon: <TrendingUp className="w-4.5 h-4.5 text-red-700" />, bg: 'bg-red-50' },
    { label: 'Lấp đầy bình quân lớp', value: '85%', delta: '+1.2%', isPositive: true, icon: <Users className="w-4.5 h-4.5 text-blue-700" />, bg: 'bg-blue-50' },
    { label: 'Tổng thu học phí HK', value: '4.2 tỷ', delta: '+18%', isPositive: true, icon: <DollarSign className="w-4.5 h-4.5 text-emerald-700" />, bg: 'bg-emerald-50' },
    { label: 'GPA TB toàn trường', value: '3.12', delta: '+0.04', isPositive: true, icon: <Award className="w-4.5 h-4.5 text-amber-700" />, bg: 'bg-amber-50' },
  ];

  const quickExports = [
    { label: 'Danh sách sinh viên', desc: 'Hồ sơ & học lực đầy đủ', icon: <FileText className="w-4 h-4" />, color: 'text-red-800', bg: 'bg-red-50', format: 'PDF' },
    { label: 'Sổ điểm tổng kết', desc: 'Chi tiết theo khoa đào tạo', icon: <Table className="w-4 h-4" />, color: 'text-emerald-800', bg: 'bg-emerald-50', format: 'Excel' },
    { label: 'Báo cáo tài chính', desc: 'Thu chi học phí học kỳ', icon: <DollarSign className="w-4 h-4" />, color: 'text-blue-800', bg: 'bg-blue-50', format: 'PDF' },
    { label: 'Danh sách giảng viên', desc: 'Phân công & giờ dạy', icon: <GraduationCap className="w-4 h-4" />, color: 'text-amber-800', bg: 'bg-amber-50', format: 'Excel' },
    { label: 'Thống kê học bổng', desc: 'Danh sách đạt học bổng', icon: <Star className="w-4 h-4" />, color: 'text-purple-800', bg: 'bg-purple-50', format: 'CSV' },
  ];

  const handleGenerate = (id: string, name: string) => {
    setGeneratingId(id);
    setTimeout(() => {
      setGeneratingId(null);
      setSuccessMsg(`Đã xuất file thành công: ${name}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1500);
  };

  const filteredReports = reports.filter(r => {
    const matchCat = filterCategory === 'all' || r.category === filterCategory;
    const matchSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Báo cáo & Thống kê</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Xuất bản báo cáo vận hành, thống kê học tập và tài chính toàn trường.</p>
        </div>
        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-2.5 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-gray-200 transition-all">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{kpi.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{kpi.value}</span>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  kpi.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {kpi.delta}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${kpi.bg} group-hover:scale-110 transition-transform shrink-0`}>
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Top classes + quick export */}
        <div className="lg:col-span-2 space-y-6">

          {/* Top performance classes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900">Lớp học có thành tích tốt nhất</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Top 4 lớp học phần theo GPA học kỳ này</p>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-lg">
                <Star className="w-3 h-3" /> Học kỳ II 2023-2024
              </span>
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-[9px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                    <th className="px-4 py-3">Hạng</th>
                    <th className="px-4 py-3">Lớp học</th>
                    <th className="px-4 py-3">Giảng viên</th>
                    <th className="px-4 py-3 text-center">GPA</th>
                    <th className="px-4 py-3 text-right">Tỷ lệ qua</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[11px] font-bold text-gray-700">
                  {topClasses.map((cls, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black ${
                          idx === 0 ? 'bg-amber-100 text-amber-700' :
                          idx === 1 ? 'bg-gray-100 text-gray-600' :
                          idx === 2 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'
                        }`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800 font-black">{cls.className}</p>
                        <p className="text-[9px] text-gray-400 font-semibold">{cls.code}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 font-semibold">{cls.teacher}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-black text-red-800">{cls.gpa.toFixed(2)}</span>
                        {cls.trend === 'up'
                          ? <TrendingUp className="w-3 h-3 text-emerald-500 inline ml-1" />
                          : <ArrowDownRight className="w-3 h-3 text-red-400 inline ml-1" />}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-black ${cls.passRate === 100 ? 'text-emerald-700' : 'text-blue-700'}`}>{cls.passRate}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty distribution bars */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900">Phân bố học lực theo khoa</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tỷ lệ sinh viên đạt điểm khá/giỏi theo từng khoa đào tạo</p>
            </div>
            <div className="space-y-3.5">
              {[
                { name: 'Khoa Công nghệ thông tin', value: 72, color: 'bg-red-500', bg: 'bg-red-50 text-red-700' },
                { name: 'Khoa Kinh tế & Quản trị', value: 68, color: 'bg-blue-500', bg: 'bg-blue-50 text-blue-700' },
                { name: 'Khoa Ngoại ngữ', value: 64, color: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700' },
                { name: 'Khoa Điện tử - Viễn thông', value: 61, color: 'bg-purple-500', bg: 'bg-purple-50 text-purple-700' },
                { name: 'Khoa Thiết kế Đồ họa', value: 74, color: 'bg-amber-500', bg: 'bg-amber-50 text-amber-700' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-700">{item.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.bg}`}>{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick export panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900">Xuất file nhanh</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tải báo cáo định dạng PDF, Excel, CSV</p>
            </div>
            <div className="space-y-2">
              {quickExports.map((exp, idx) => (
                <button
                  key={idx}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 p-3.5 rounded-xl flex items-center justify-between transition-all group cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${exp.bg} ${exp.color}`}>{exp.icon}</div>
                    <div className="text-left">
                      <p className={`text-xs font-black text-gray-800 group-hover:${exp.color} leading-tight`}>{exp.label}</p>
                      <p className="text-[9px] text-gray-400 font-semibold mt-0.5">{exp.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${formatConfig[exp.format].bg} ${formatConfig[exp.format].text}`}>{exp.format}</span>
                    <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Report period selector */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Kỳ báo cáo
            </h3>
            <div className="space-y-2">
              {['HKII 2023-2024 (Hiện tại)', 'HKI 2023-2024', 'Cả năm học 2023-2024', 'HKII 2022-2023'].map((period, idx) => (
                <label key={idx} className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all border ${
                  idx === 0 ? 'bg-red-50 border-red-100' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'
                }`}>
                  <input type="radio" name="period" defaultChecked={idx === 0} className="accent-red-700 shrink-0" />
                  <span className={`text-[10px] font-bold ${idx === 0 ? 'text-red-800' : 'text-gray-600'}`}>{period}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reports Log Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-gray-900">Nhật ký xuất bản báo cáo</h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Danh sách tài liệu thống kê đã được hệ thống xuất bản</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm báo cáo..."
                className="bg-gray-50 border border-gray-100 pl-7 pr-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-red-300 w-36 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>}
            </div>
            {/* Category filter buttons */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl">
              {(['all', 'Student', 'Academic', 'Financial', 'Staff'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả' : categoryConfig[cat].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 text-[9px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100">
                <th className="px-5 py-3.5">Mã file</th>
                <th className="px-5 py-3.5">Tên tài liệu</th>
                <th className="px-5 py-3.5">Phân loại</th>
                <th className="px-5 py-3.5">Định dạng</th>
                <th className="px-5 py-3.5">Ngày xuất bản</th>
                <th className="px-5 py-3.5">Dung lượng</th>
                <th className="px-5 py-3.5 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400 font-semibold text-sm">
                    Không tìm thấy báo cáo nào
                  </td>
                </tr>
              ) : filteredReports.map((rp) => {
                const cat = categoryConfig[rp.category];
                const fmt = formatConfig[rp.format];
                const isGenerating = generatingId === rp.id;
                return (
                  <tr key={rp.id} className="hover:bg-slate-50/45 transition-colors">
                    <td className="px-5 py-4 text-gray-500 font-bold text-[10px]">{rp.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-gray-800 font-black max-w-xs">{rp.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black border ${cat.bg} ${cat.text} ${cat.border}`}>
                        {cat.icon}
                        {cat.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black ${fmt.bg} ${fmt.text}`}>{rp.format}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 font-semibold">{rp.generatedDate}</td>
                    <td className="px-5 py-4 text-gray-400 font-semibold">{rp.fileSize}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          className="p-1.5 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Xem trước"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleGenerate(rp.id, rp.name)}
                          disabled={isGenerating}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isGenerating
                              ? 'text-gray-300 bg-gray-50'
                              : 'text-gray-400 hover:text-red-800 hover:bg-red-50'
                          }`}
                          title="Tải về"
                        >
                          {isGenerating
                            ? <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                            : <Download className="w-3.5 h-3.5" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold pt-1">
          <span>Hiển thị {filteredReports.length} / {reports.length} tài liệu</span>
          <button className="text-red-700 hover:text-red-900 font-bold cursor-pointer">Tạo báo cáo mới →</button>
        </div>
      </div>
    </div>
  );
}
