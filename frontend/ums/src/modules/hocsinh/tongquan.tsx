import { useState } from 'react';
import { Star, BookOpen, Calendar, Award, ChevronLeft, ChevronRight, ArrowRight, ExternalLink, GraduationCap, CheckCircle } from 'lucide-react';

interface TongQuanProps {
  studentName: string;
}

export default function TongQuan({ studentName }: TongQuanProps) {
  const [selectedDay, setSelectedDay] = useState<string>('T4');

  // Greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const days = [
    { key: 'T2', name: 'T2', date: '20' },
    { key: 'T3', name: 'T3', date: '21' },
    { key: 'T4', name: 'T4', date: '22' },
    { key: 'T5', name: 'T5', date: '23' },
    { key: 'T6', name: 'T6', date: '24' },
    { key: 'T7', name: 'T7', date: '25' },
    { key: 'CN', name: 'CN', date: '26' },
  ];

  const scheduleData: Record<string, Array<{ time: string; name: string; code: string; room: string; color: string }>> = {
    T2: [
      { time: '07:30 - 09:10', name: 'Giải tích 2', code: 'MAT102', room: 'Phòng 402 - Tòa A1', color: 'border-red-500 text-red-700 bg-red-50/50' },
    ],
    T3: [
      { time: '09:20 - 11:00', name: 'Phân tích hệ thống', code: 'IS201', room: 'Phòng 505 - Tòa C1', color: 'border-amber-500 text-amber-700 bg-amber-50/50' },
    ],
    T4: [
      { time: '07:30 - 09:10', name: 'Giải tích 2', code: 'MAT102', room: 'Phòng 402 - Tòa A1', color: 'border-red-500 text-red-700 bg-red-50/50' },
      { time: '13:30 - 15:10', name: 'Cấu trúc dữ liệu & Giải thuật', code: 'IT201', room: 'Lab 203 - Tòa C2', color: 'border-blue-500 text-blue-700 bg-blue-50/50' },
    ],
    T5: [
      { time: '09:20 - 11:00', name: 'Mạng máy tính', code: 'IT202', room: 'Phòng 102 - Tòa A2', color: 'border-blue-500 text-blue-700 bg-blue-50/50' },
      { time: '15:20 - 17:00', name: 'Tiếng Anh chuyên ngành', code: 'ENG301', room: 'Phòng 404 - Tòa A1', color: 'border-emerald-500 text-emerald-700 bg-emerald-50/50' },
    ],
    T6: [
      { time: '07:30 - 09:10', name: 'Lập trình Java', code: 'IT203', room: 'Lab 05 - Tòa B2', color: 'border-purple-500 text-purple-700 bg-purple-50/50' },
    ],
    T7: [],
    CN: [],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50/30 p-6 rounded-2xl border border-red-100/50">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          {getGreeting()}, <span className="text-red-700">{studentName}</span>! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Hôm nay bạn có {scheduleData[selectedDay]?.length || 0} buổi học. Hãy chuẩn bị thật tốt nhé.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GPA Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-100/50 rounded-xl text-red-700">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
              +0.12
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-4 uppercase tracking-wider">GPA Hiện tại</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">3.72</p>
        </div>

        {/* Credits Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100/50 rounded-xl text-blue-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Mục tiêu: 120
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-4 uppercase tracking-wider">Tổng tín chỉ</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">84</p>
        </div>

        {/* Attendance Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-100/50 rounded-xl text-emerald-700">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              Tốt
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-4 uppercase tracking-wider">Tỷ lệ chuyên cần</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">98%</p>
        </div>

        {/* Rank Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-100/50 rounded-xl text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Hạng 15/450
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-4 uppercase tracking-wider">Xếp loại</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">Xuất sắc</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Timetable & Grades */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Timetable Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Thời khóa biểu tuần này</h2>
              <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                <button className="p-1 hover:bg-white rounded-lg transition-all text-gray-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-gray-700">20 Th05 - 26 Th05</span>
                <button className="p-1 hover:bg-white rounded-lg transition-all text-gray-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Tabs */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day) => (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={`flex flex-col items-center py-2.5 rounded-xl transition-all border ${
                    selectedDay === day.key
                      ? 'bg-red-700 border-red-700 text-white shadow-md shadow-red-700/10'
                      : 'bg-white hover:bg-gray-50 border-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-xs font-medium">{day.name}</span>
                  <span className="text-base font-bold mt-0.5">{day.date}</span>
                </button>
              ))}
            </div>

            {/* Schedule Events */}
            <div className="space-y-3 min-h-[160px] flex flex-col justify-center">
              {scheduleData[selectedDay] && scheduleData[selectedDay].length > 0 ? (
                scheduleData[selectedDay].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-xl border-l-4 border ${item.color} transition-all hover:scale-[1.01]`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-sm font-semibold whitespace-nowrap mt-0.5">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm md:text-base">
                          {item.name} ({item.code})
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          {item.room}
                        </p>
                      </div>
                    </div>
                    <button className="p-1.5 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 rounded-lg shadow-sm border border-gray-100 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Không có lịch học trong ngày này</p>
                </div>
              )}
            </div>
          </div>

          {/* Newest Grades Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Bảng điểm số mới nhất</h2>
              <button className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1">
                Xem tất cả <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Mã HP</th>
                    <th className="px-6 py-4">Tên môn học</th>
                    <th className="px-6 py-4 text-center">Hệ 10</th>
                    <th className="px-6 py-4 text-center">Điểm chữ</th>
                    <th className="px-6 py-4 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  <tr className="hover:bg-gray-50/55 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">PHY101</td>
                    <td className="px-6 py-4 text-gray-600">Vật lý đại cương 1</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">8.5</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">A</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                        Hoàn thành
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/55 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">ENG202</td>
                    <td className="px-6 py-4 text-gray-600">Tiếng Anh chuyên ngành</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">7.8</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">B+</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                        Hoàn thành
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/55 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">POL301</td>
                    <td className="px-6 py-4 text-gray-600">Kinh tế chính trị</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">9.2</td>
                    <td className="px-6 py-4 text-center font-bold text-gray-800">A+</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                        Hoàn thành
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Course Progress & Credit Info (No charts!) */}
        <div className="space-y-6">
          
          {/* Subject Progress Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Tiến độ môn học</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1.5">
                  <span>Giải tích 2</span>
                  <span className="text-red-700">75%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-700 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1.5">
                  <span>Cấu trúc dữ liệu & Giải thuật</span>
                  <span className="text-blue-600">40%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1.5">
                  <span>Lập trình hướng đối tượng</span>
                  <span className="text-emerald-600">90%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Accumulation Card (Clean design without charts as requested) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tích lũy tín chỉ</h2>
            
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Tổng số tín chỉ:</span>
                <span className="text-base font-bold text-gray-800">120 TC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Đã đạt tích lũy:</span>
                <span className="text-base font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">84 TC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Còn thiếu:</span>
                <span className="text-base font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">36 TC</span>
              </div>
            </div>

            {/* Linear completion progress */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                <span>Tiến độ chương trình</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-orange-500 h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            {/* Expected graduation info */}
            <div className="flex items-center gap-3 p-3 bg-red-50/50 border border-red-100/50 rounded-xl">
              <div className="p-2 bg-red-100/60 text-red-700 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Dự kiến tốt nghiệp</p>
                <p className="text-sm font-bold text-gray-800">Tháng 06 / 2026</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-red-800 to-red-950 p-6 md:p-8 rounded-2xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-red-950/15">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-red-400" />
            Đăng ký thực tập sớm?
          </h3>
          <p className="text-sm text-red-100 leading-relaxed">
            Bạn đã hoàn thành 70% chương trình học. Hệ thống gợi ý bạn nên bắt đầu tìm hiểu các vị trí thực tập doanh nghiệp ngay từ bây giờ để có sự chuẩn bị tốt nhất.
          </p>
        </div>
        <button className="bg-white hover:bg-red-50 text-red-800 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.03] text-sm whitespace-nowrap">
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  );
}
