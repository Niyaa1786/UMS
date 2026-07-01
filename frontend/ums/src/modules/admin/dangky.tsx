import { useState } from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  CheckCircle,
  FileText,
  Clock,
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';

interface RegistrationRequest {
  name: string;
  mssv: string;
  courseCode: string;
  courseName: string;
  time: string;
  status: 'success' | 'pending';
}

const initialRequests: RegistrationRequest[] = [
  { name: 'Nguyễn Thành Long', mssv: '20210456', courseCode: 'IT4440', courseName: 'UI/UX Design', time: '10:24 AM, Hôm nay', status: 'success' },
  { name: 'Hoàng Thu Thảo', mssv: '20210212', courseCode: 'EM3100', courseName: 'Kinh tế lượng', time: '09:15 AM, Hôm nay', status: 'pending' },
  { name: 'Phạm Quốc Việt', mssv: '20210596', courseCode: 'IT2020', courseName: 'Cơ sở dữ liệu', time: 'Hôm qua', status: 'success' },
  { name: 'Mai Anh Bình', mssv: '20210954', courseCode: 'IT4440', courseName: 'UI/UX Design', time: 'Hôm qua', status: 'pending' }
];

export default function RegistrationManagement() {
  const [requests, setRequests] = useState<RegistrationRequest[]>(initialRequests);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [courseCode, setCourseCode] = useState('IT4440');
  const [courseName, setCourseName] = useState('UI/UX Design');
  const [status, setStatus] = useState<'success' | 'pending'>('pending');

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mssv.trim()) return;

    const newRequest: RegistrationRequest = {
      name: name.trim(),
      mssv: mssv.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      courseName,
      time: 'Vừa xong',
      status
    };

    setRequests([newRequest, ...requests]);
    setShowAddModal(false);

    // Reset Form
    setName('');
    setMssv('');
    setStatus('pending');
  };

  const handleDeleteRequest = (mssvToDelete: string, courseCodeToDelete: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa yêu cầu đăng ký của MSSV ${mssvToDelete}?`)) {
      setRequests(prev => prev.filter(r => !(r.mssv === mssvToDelete && r.courseCode === courseCodeToDelete)));
    }
  };

  const kpiStats = [
    { label: 'Tổng sinh viên đăng ký', value: `${4250 + requests.length - 4}`, sub: '+12%', icon: <ClipboardList className="w-5 h-5 text-red-700" />, bg: 'bg-red-50' },
    { label: 'Tỷ lệ lấp đầy trung bình', value: 'Khá cao', sub: '85%', icon: <CheckCircle className="w-5 h-5 text-emerald-700" />, bg: 'bg-emerald-50' },
    { label: 'Đơn chờ duyệt', value: `${128 + requests.filter(r => r.status === 'pending').length - 2}`, sub: 'Hiện tại', icon: <FileText className="w-5 h-5 text-amber-700" />, bg: 'bg-amber-50' },
    { label: 'Đợt đang mở', value: '02', sub: 'Hiện tại', icon: <Clock className="w-5 h-5 text-blue-700" />, bg: 'bg-blue-50' }
  ];

  const fillRates = [
    { name: 'Khối Khoa học Máy tính', percent: 92, color: 'bg-red-700' },
    { name: 'Khối Kinh tế - Tài chính', percent: 78, color: 'bg-blue-700' },
    { name: 'Khối Ngoại ngữ', percent: 45, color: 'bg-emerald-700' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản lý Đăng ký học phần</h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Theo dõi và quản lý các đợt đăng ký học phần trong học kỳ 2 (2023-2024)</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-red-800 hover:bg-red-955 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center gap-1.5 cursor-pointer active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm đăng ký thủ công</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100/90 shadow-sm flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all group">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors">{stat.value}</span>
                <span className="text-xs font-bold text-gray-500">{stat.sub}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Periods & Fill Rates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active periods */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Các đợt đăng ký</h3>
              <button className="text-[10px] font-black text-red-700 hover:text-red-950">Xem tất cả</button>
            </div>

            <div className="space-y-4">
              {/* Period 1 */}
              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3 relative overflow-hidden">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600 m-3" />
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-gray-800">Đợt đăng ký chính thức - HK2</h4>
                  <p className="text-[10px] text-red-700 font-bold">Hết hạn trong: 2 ngày, 4 giờ</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop" alt="" />
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="" />
                    <div className="h-5 w-5 rounded-full ring-2 ring-white bg-gray-150 text-[8px] font-black flex items-center justify-center text-gray-500">+3k</div>
                  </div>
                </div>
              </div>

              {/* Period 2 */}
              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-gray-850">Đăng ký cải thiện / Học lại</h4>
                  <p className="text-[10px] text-gray-400 font-bold">Thời gian: 15/05 - 20/05</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fill Rates */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Tỷ lệ lấp đầy theo khối</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Tiến độ tuyển sinh / sĩ số các nhóm ngành đào tạo</p>
            </div>

            <div className="space-y-4 pt-1">
              {fillRates.map((rate, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>{rate.name}</span>
                    <span className="text-gray-900 font-black">{rate.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${rate.color} h-1.5 rounded-full`} style={{ width: `${rate.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Requests Feed */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Danh sách đăng ký gần đây</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Các giao dịch và yêu cầu đăng ký học phần gần nhất</p>
            </div>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {requests.length > 0 ? (
              requests.map((req, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-red-800 flex items-center justify-center font-black text-[10px] border border-red-100">
                      {req.name.split(' ').slice(-2).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800">{req.name}</p>
                      <p className="text-[9px] text-gray-400 font-semibold">MSSV {req.mssv}</p>
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <span className="inline-flex items-center px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] text-gray-700 font-extrabold uppercase">{req.courseCode}</span>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 hidden sm:block">{req.courseName}</p>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold text-gray-700 leading-tight">{req.time}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border ${
                      req.status === 'success'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${req.status === 'success' ? 'bg-blue-500' : 'bg-red-500'}`} />
                      {req.status === 'success' ? 'Thành công' : 'Chờ duyệt'}
                    </span>
                    <button 
                      onClick={() => handleDeleteRequest(req.mssv, req.courseCode)}
                      className="p-1 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-750 transition-colors"
                      title="Xóa yêu cầu"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 font-semibold text-xs">
                Không có giao dịch đăng ký nào.
              </div>
            )}
          </div>

          {/* Pagination controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-gray-400 pt-2">
            <span>Hiển thị {requests.length} yêu cầu đăng ký</span>
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

      {/* Add Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 space-y-4 w-full max-w-md z-10 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-gray-900">Thêm đăng ký học phần thủ công</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Họ và tên sinh viên *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Nguyễn Thành Long"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Mã số sinh viên (MSSV) *</label>
                <input
                  type="text"
                  required
                  value={mssv}
                  onChange={(e) => setMssv(e.target.value)}
                  placeholder="VD: 20210456"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Mã lớp / Mã HP</label>
                  <input
                    type="text"
                    required
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="VD: IT4440"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase">Tên lớp HP</label>
                  <input
                    type="text"
                    required
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="VD: UI/UX Design"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase">Trạng thái đăng ký</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="success">Đăng ký thành công</option>
                  <option value="pending">Chờ duyệt đơn</option>
                </select>
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
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
