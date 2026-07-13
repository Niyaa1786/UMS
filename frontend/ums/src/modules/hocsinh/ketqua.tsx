import { Award, CheckSquare, AlertTriangle, Download, HelpCircle } from 'lucide-react';

interface GradeRow {
  code: string;
  name: string;
  credits: number;
  attendance: number;
  midterm: number | string;
  final: number | string;
  total: number | string;
  letter: string;
}

export default function KetQua() {
  const grades: GradeRow[] = [
    {
      code: 'CS201',
      name: 'Cấu trúc dữ liệu & Giải thuật',
      credits: 4,
      attendance: 10,
      midterm: 9.0,
      final: 8.5,
      total: 8.8,
      letter: 'A',
    },
    {
      code: 'MA102',
      name: 'Giải tích 2',
      credits: 3,
      attendance: 10,
      midterm: 8.0,
      final: 7.5,
      total: 7.8,
      letter: 'B+',
    },
    {
      code: 'PH101',
      name: 'Vật lý đại cương 1',
      credits: 3,
      attendance: 9.5,
      midterm: 9.5,
      final: 9.0,
      total: 9.2,
      letter: 'A+',
    },
    {
      code: 'ENG301',
      name: 'Tiếng Anh chuyên ngành',
      credits: 2,
      attendance: 10,
      midterm: 8.5,
      final: 8.0,
      total: 8.3,
      letter: 'A',
    },
    {
      code: 'OS402',
      name: 'Hệ điều hành',
      credits: 3,
      attendance: 9.0,
      midterm: '-',
      final: '-',
      total: '-',
      letter: '-',
    }
  ];

  // Alternating chart representation: lists with progress meters
  const distributionData = [
    { label: 'Điểm A / A+', count: '12 môn', percent: 45, color: 'bg-red-700' },
    { label: 'Điểm B / B+', count: '8 môn', percent: 35, color: 'bg-blue-500' },
    { label: 'Điểm C / C+', count: '3 môn', percent: 15, color: 'bg-emerald-500' },
    { label: 'Điểm D / F', count: '1 môn', percent: 5, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GPA Term Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-100/50 rounded-xl text-red-700">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              +0.12
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 mt-4 uppercase">GPA Học kỳ</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">3.82</p>
        </div>

        {/* GPA Cumulative Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100/50 rounded-xl text-blue-700">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Top 5%
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 mt-4 uppercase">GPA Tích lũy</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">3.75</p>
        </div>

        {/* Checked Credits Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-100/50 rounded-xl text-emerald-700">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-400 mt-4 uppercase">Tín chỉ đạt</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">92 <span className="text-sm font-semibold text-gray-400">/ 120</span></p>
        </div>

        {/* Due Credits Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-100/40 text-red-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              Cần lưu ý
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 mt-4 uppercase">Tín chỉ nợ</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">0</p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detailed Grades Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Chi tiết học phần</h2>
              <button className="bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center gap-1.5">
                <Download className="w-4 h-4 text-gray-500" /> Xuất PDF
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/80 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Mã HP</th>
                    <th className="px-6 py-4">Tên môn học</th>
                    <th className="px-6 py-4 text-center">TC</th>
                    <th className="px-6 py-4 text-center">CC</th>
                    <th className="px-6 py-4 text-center">Giữa kỳ</th>
                    <th className="px-6 py-4 text-center">Cuối kỳ</th>
                    <th className="px-6 py-4 text-center">Tổng kết</th>
                    <th className="px-6 py-4 text-center">Điểm chữ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs md:text-sm font-semibold">
                  {grades.map((g, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-bold">{g.code}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{g.name}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{g.credits}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{g.attendance}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{g.midterm}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{g.final}</td>
                      <td className="px-6 py-4 text-center font-bold text-red-700">{g.total}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block font-extrabold ${g.letter.startsWith('A') ? 'text-red-700' : 'text-gray-700'}`}>
                          {g.letter}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column stats breakdown (no canvas charts) */}
        <div className="space-y-6">
          
          {/* Distribution list replacing original distribution bar chart */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">Phân bổ điểm số</h3>
            <div className="space-y-4">
              {distributionData.map((d, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-600">
                    <span>{d.label}</span>
                    <span className="text-gray-800">{d.count} ({d.percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden border border-gray-100/50">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rank Preview replacing circular progress chart */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">Xếp loại dự kiến</h3>
            
            <div className="bg-gradient-to-br from-red-50 to-orange-50/30 p-4 rounded-xl border border-red-100/50 text-center space-y-2">
              <span className="inline-block bg-red-700 text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">
                XUẤT SẮC
              </span>
              <p className="text-xs text-gray-500 mt-1.5 font-semibold">GPA tích lũy hiện tại &gt; 3.6</p>
            </div>

            <div className="space-y-3 pt-1 text-xs font-bold text-gray-700">
              <div className="flex justify-between items-center p-2.5 bg-gray-50/50 rounded-lg">
                <span className="text-gray-500 font-medium">Học bổng dự kiến:</span>
                <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-md">Loại A (Xuất sắc)</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-gray-50/50 rounded-lg">
                <span className="text-gray-500 font-medium">Điểm rèn luyện:</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">92 / 100 (Tốt)</span>
              </div>
            </div>
          </div>

          {/* Need help card */}
          <div className="bg-gradient-to-br from-red-800 to-red-900 text-white p-5 rounded-2xl shadow-md space-y-3 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-115 transition-all duration-300">
              <HelpCircle className="w-20 h-20" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-200">Cần cải thiện?</h3>
            <p className="text-xs text-red-100 leading-relaxed font-semibold">
              Hãy đăng ký các lớp phụ đạo hoặc liên hệ trực tiếp với giảng viên phụ trách để được hỗ trợ cải thiện kết quả học tập kịp thời.
            </p>
            <button className="w-full bg-white hover:bg-red-50 text-red-800 font-bold py-2.5 rounded-xl text-xs transition-all duration-300 shadow-sm active:scale-95">
              Hỗ trợ học tập
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
