import { useState } from 'react';
import { Search, ChevronDown, Check, BookOpen, AlertCircle, Trash2 } from 'lucide-react';

interface CourseToRegister {
  id: string;
  title: string;
  credits: number;
  teacher: string;
  schedule: string;
  registeredCount: number;
  capacity: number;
  status?: 'full' | 'open';
}

export default function DangKyHoc() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('Tất cả khoa');
  const [selectedCredits, setSelectedCredits] = useState('Tất cả');

  const availableCourses: CourseToRegister[] = [
    {
      id: 'INT3306',
      title: 'Phát triển ứng dụng Web',
      credits: 3,
      teacher: 'TS. Nguyễn Văn A',
      schedule: 'Thứ 3 (Tiết 1-3), Thứ 5 (Tiết 4-6)',
      registeredCount: 42,
      capacity: 50,
    },
    {
      id: 'INT3307',
      title: 'Cơ sở dữ liệu nâng cao',
      credits: 4,
      teacher: 'ThS. Lê Thị B',
      schedule: 'Thứ 2 (Tiết 7-9), Thứ 6 (Tiết 1-3)',
      registeredCount: 15,
      capacity: 50,
    },
    {
      id: 'ACC1001',
      title: 'Nguyên lý kế toán',
      credits: 2,
      teacher: 'TS. Phạm Văn C',
      schedule: 'Thứ 4 (Tiết 1-2)',
      registeredCount: 48,
      capacity: 50,
    },
    {
      id: 'MGT2010',
      title: 'Quản trị nhân sự',
      credits: 3,
      teacher: 'PGS.TS Trần Thị D',
      schedule: 'Thứ 7 (Tiết 1-4)',
      registeredCount: 50,
      capacity: 50,
      status: 'full',
    },
    {
      id: 'IT3090',
      title: 'Xử lý hình ảnh',
      credits: 3,
      teacher: 'TS. Hoàng Đức E',
      schedule: 'Thứ 6 (Tiết 7-9)',
      registeredCount: 30,
      capacity: 40,
    },
    {
      id: 'MAT109',
      title: 'Đại số tuyến tính',
      credits: 3,
      teacher: 'ThS. Nguyễn Văn F',
      schedule: 'Thứ 3 (Tiết 7-9), Thứ 5 (Tiết 7-9)',
      registeredCount: 22,
      capacity: 60,
    }
  ];

  const handleToggleRegister = (courseId: string, isFull: boolean) => {
    if (isFull) return;
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleClearAll = () => {
    setSelectedCourses([]);
  };

  // Calculate selected metrics
  const selectedCount = selectedCourses.length;
  const totalCredits = availableCourses
    .filter(c => selectedCourses.includes(c.id))
    .reduce((sum, c) => sum + c.credits, 0);

  // Filter courses
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCredits = selectedCredits === 'Tất cả' || course.credits.toString() === selectedCredits;
    return matchesSearch && matchesCredits;
  });

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header Info Panel */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Đang mở
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Đăng ký học phần - Học kỳ 2 (2023 - 2024)
              </h1>
            </div>
            <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Thời gian còn lại: 03 ngày 14 giờ 22 phút
            </p>
          </div>

          <div className="flex items-center gap-6 divide-x divide-gray-100 bg-gray-50/50 px-5 py-3 rounded-xl border border-gray-100 self-stretch lg:self-auto justify-around">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Hạn ngạch TC</p>
              <p className="text-base font-bold text-gray-800 mt-0.5">12 - 24</p>
            </div>
            <div className="text-center pl-6">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Đã đăng ký</p>
              <p className={`text-base font-bold mt-0.5 ${totalCredits > 0 ? 'text-red-700' : 'text-gray-800'}`}>
                {totalCredits} TC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dropdown 1: Dept */}
        <div>
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
            Khoa / Viện đào tạo
          </label>
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 focus:outline-none appearance-none cursor-pointer"
            >
              <option>Tất cả khoa</option>
              <option>Khoa Công nghệ thông tin</option>
              <option>Khoa Kinh tế & Quản trị</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Dropdown 2: Credits */}
        <div>
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
            Số tín chỉ
          </label>
          <div className="relative">
            <select
              value={selectedCredits}
              onChange={(e) => setSelectedCredits(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="2">2 Tín chỉ</option>
              <option value="3">3 Tín chỉ</option>
              <option value="4">4 Tín chỉ</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Search Box */}
        <div>
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
            Tìm kiếm môn học
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tên hoặc mã học phần..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 hover:border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-gray-700 focus:outline-none focus:bg-white focus:border-red-500 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const isRegistered = selectedCourses.includes(course.id);
            const isFull = course.status === 'full' || course.registeredCount >= course.capacity;

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between shadow-sm relative group overflow-hidden ${
                  isRegistered
                    ? 'border-red-700 shadow-md ring-1 ring-red-700/20'
                    : 'border-gray-100 hover:border-gray-300 hover:scale-[1.01]'
                }`}
              >
                {/* Glow Background for Registered */}
                {isRegistered && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-700/5 rounded-bl-full pointer-events-none"></div>
                )}

                <div>
                  {/* Top badges */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {course.id}
                    </span>
                    <span className="bg-red-50 text-red-800 px-2 py-0.5 rounded-md text-[10px] font-bold border border-red-100/50">
                      {course.credits} Tín chỉ
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-bold text-gray-800 text-base mb-3 leading-snug">
                    {course.title}
                  </h3>

                  {/* Course info list */}
                  <div className="space-y-2 text-xs font-medium text-gray-500 mb-5">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      <span>Giảng viên: <strong className="text-gray-700">{course.teacher}</strong></span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5"></span>
                      <span>Lịch học: <strong className="text-gray-700">{course.schedule}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Seat Capacity Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                    <span>Sĩ số lớp</span>
                    <span className={isFull ? 'text-red-600' : 'text-gray-700'}>
                      {course.registeredCount} / {course.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-red-700'}`}
                      style={{ width: `${(course.registeredCount / course.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Register Action Button */}
                {isFull ? (
                  <button
                    disabled
                    className="w-full py-2.5 bg-gray-100 text-gray-400 font-bold text-xs rounded-xl cursor-not-allowed text-center"
                  >
                    Hết chỗ
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleRegister(course.id, isFull)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      isRegistered
                        ? 'bg-red-50 text-red-800 border border-red-300 hover:bg-red-100/60'
                        : 'bg-red-700 hover:bg-red-800 text-white shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98]'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Đã chọn
                      </>
                    ) : (
                      'Đăng ký ngay'
                    )}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Không có môn học nào phù hợp với bộ lọc</p>
          </div>
        )}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 md:left-76 md:right-8 bg-white border border-gray-100 shadow-2xl rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-40 animate-slide-up">
        <div className="flex items-center gap-6 divide-x divide-gray-100 w-full sm:w-auto justify-around sm:justify-start">
          <div className="space-y-0.5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Môn học đã chọn</p>
            <p className="text-sm font-bold text-gray-800">{selectedCount} môn</p>
          </div>
          <div className="pl-6 space-y-0.5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tổng số tín chỉ</p>
            <p className="text-sm font-bold text-red-700">{totalCredits} TC</p>
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleClearAll}
            disabled={selectedCount === 0}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${
              selectedCount === 0
                ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                : 'border-red-200 text-red-700 hover:bg-red-50 bg-white'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Hủy tất cả
          </button>

          <button
            disabled={selectedCount === 0}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
              selectedCount === 0
                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                : 'bg-red-700 hover:bg-red-800 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <Check className="w-3.5 h-3.5" /> Xác nhận đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
