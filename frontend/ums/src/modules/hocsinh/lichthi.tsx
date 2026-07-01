import { useState } from 'react';
import { Calendar, Search, MapPin, ClipboardList, Info, Mail, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface ExamItem {
  id: string;
  title: string;
  type: 'Giữa kỳ' | 'Cuối kỳ';
  date: string;
  time: string;
  room: string;
  seat: string;
  status: 'upcoming' | 'completed';
}

export default function LichThi() {
  const [activeTab, setActiveTab] = useState<'all' | 'giua-ky' | 'cuoi-ky'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const examsList: ExamItem[] = [
    {
      id: 'IT3040',
      title: 'Hệ quản trị Cơ sở dữ liệu',
      type: 'Cuối kỳ',
      date: '25/05/2024',
      time: '08:00 - 10:00',
      room: 'A1-302 Tòa nhà A1',
      seat: '42',
      status: 'upcoming'
    },
    {
      id: 'IT2120',
      title: 'Kỹ thuật lập trình',
      type: 'Cuối kỳ',
      date: '28/05/2024',
      time: '13:30 - 15:30',
      room: 'D9-401 Tòa nhà D9',
      seat: '15',
      status: 'upcoming'
    },
    {
      id: 'MA3021',
      title: 'Xác suất thống kê',
      type: 'Cuối kỳ',
      date: '02/06/2024',
      time: '07:30 - 09:30',
      room: 'B1-205 Tòa nhà B1',
      seat: '108',
      status: 'upcoming'
    },
    {
      id: 'SSH1111',
      title: 'Triết học Mác-Lênin',
      type: 'Giữa kỳ',
      date: '15/04/2024',
      time: 'Đã hoàn thành',
      room: 'D3-102 Tòa nhà D3',
      seat: '05',
      status: 'completed'
    }
  ];

  const filteredExams = examsList.filter((exam) => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'giua-ky' && exam.type === 'Giữa kỳ') ||
      (activeTab === 'cuoi-ky' && exam.type === 'Cuối kỳ');
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      exam.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Lịch thi sinh viên</h1>
          <p className="text-xs text-gray-500 mt-1 font-semibold">Cổng tra cứu phòng thi, thời gian và số báo danh</p>
        </div>
        
        {/* Search bar inside header */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Tìm kiếm môn thi, phòng thi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 hover:border-gray-200 focus:border-red-500 focus:bg-white px-10 py-2.5 rounded-xl text-xs font-semibold text-gray-700 transition-all focus:outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Countdown Card (Huge premium layout) */}
      <div className="bg-gradient-to-r from-red-800 to-red-950 p-6 rounded-2xl text-white relative overflow-hidden group shadow-lg shadow-red-950/10">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-bl-full pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-red-200 uppercase tracking-wider">Môn thi tiếp theo</p>
          <h2 className="text-lg md:text-xl font-bold">Hệ quản trị Cơ sở dữ liệu (IT3040)</h2>
          <p className="text-xs text-red-100/80">Vào lúc 08:00 • 25/05/2024 | Phòng: A1-302 - Tòa nhà A1</p>
        </div>

        {/* Timer countdown numbers */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">02</span>
            <span className="text-[9px] font-semibold text-red-200 mt-1.5 uppercase">Ngày</span>
          </div>
          <span className="text-xl font-black text-white/50 mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">14</span>
            <span className="text-[9px] font-semibold text-red-200 mt-1.5 uppercase">Giờ</span>
          </div>
          <span className="text-xl font-black text-white/50 mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-black bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">34</span>
            <span className="text-[9px] font-semibold text-red-200 mt-1.5 uppercase">Phút</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left sidebar, Middle list of exams, Right room regulations */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar inside Grid (1/4 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tiến độ ôn tập card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Tiến độ ôn tập</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1.5">
                  <span>Hệ quản trị CSDL</span>
                  <span className="text-red-700">75%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-700 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1.5">
                  <span>Kỹ thuật lập trình</span>
                  <span className="text-blue-600">40%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle column: Exam List (2/4 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs header card */}
          <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab('giua-ky')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'giua-ky'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Giữa kỳ
              </button>
              <button
                onClick={() => setActiveTab('cuoi-ky')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'cuoi-ky'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Cuối kỳ
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-initial bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 transition-all">
                Kỳ học
              </button>
              <button className="flex-1 sm:flex-initial bg-white hover:bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center justify-center gap-1">
                <Download className="w-3.5 h-3.5 text-gray-500" /> Xuất PDF
              </button>
            </div>
          </div>

          {/* Detailed list view of exams */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-5 space-y-4">
            <div className="flex justify-between items-center mb-2 border-b border-gray-50 pb-3">
              <h2 className="text-base font-bold text-gray-800">Danh sách môn thi</h2>
              <span className="bg-red-50 text-red-800 border border-red-100 px-2 py-0.5 rounded-md text-[10px] font-bold">Kỳ 2023.2</span>
            </div>

            <div className="space-y-4">
              {filteredExams.map((exam) => {
                const isCompleted = exam.status === 'completed';
                return (
                  <div
                    key={exam.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all ${
                      isCompleted 
                        ? 'border-gray-50 bg-gray-50/20 opacity-70' 
                        : 'border-gray-100 bg-white hover:scale-[1.01] hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Color indicator bar */}
                      <span className={`w-1 h-12 rounded-full mt-0.5 shrink-0 ${isCompleted ? 'bg-gray-300' : 'bg-red-700'}`}></span>
                      <div>
                        <h4 className="font-extrabold text-gray-800 text-sm leading-snug">
                          {exam.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">
                          {exam.id} • {exam.type}
                        </p>
                      </div>
                    </div>

                    {/* Middle stats block */}
                    <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-4 sm:mt-0 text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto">
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Thời gian</p>
                        <p className={`text-xs font-bold mt-1 whitespace-nowrap ${isCompleted ? 'text-gray-500' : 'text-red-700'}`}>
                          {exam.time}
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium mt-0.5">{exam.date}</p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Địa điểm</p>
                        <p className="text-xs font-bold text-gray-800 mt-1 whitespace-nowrap">
                          {exam.room.split(' ')[0]}
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium mt-0.5">Tòa {exam.room.split(' ').pop()}</p>
                      </div>

                      <div className="text-right flex flex-col items-end justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Số ghế</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="inline-block bg-gray-100 border border-gray-150 text-gray-800 font-bold text-xs px-2.5 py-0.5 rounded-lg">
                            {exam.seat}
                          </span>
                          {isCompleted && (
                            <CheckCircle className="w-4.5 h-4.5 text-emerald-500 fill-emerald-50" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full text-center text-xs font-bold text-red-700 hover:text-red-800 pt-3 border-t border-gray-50 block">
              Xem tất cả lịch sử thi
            </button>
          </div>
        </div>

        {/* Right column: Regulations & support request (1/4 width) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Quy định phòng thi */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <ClipboardList className="w-4 h-4 text-red-700" /> Quy định phòng thi
            </h3>
            
            <div className="space-y-3.5 text-xs leading-relaxed font-semibold">
              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Thẻ sinh viên
                </h4>
                <p className="text-[10px] text-gray-400 font-medium pl-3">Bắt buộc mang theo thẻ sinh viên hoặc CCCD để đối chiếu.</p>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Thời gian tập trung
                </h4>
                <p className="text-[10px] text-gray-400 font-medium pl-3">Có mặt trước phòng thi ít nhất 15 phút. Muộn 15 phút sau khi bắt đầu sẽ không được dự thi.</p>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Vật dụng cho phép
                </h4>
                <p className="text-[10px] text-gray-400 font-medium pl-3">Bút mực, bút chì, máy tính cầm tay không soạn thảo được văn bản.</p>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span> Vật dụng cấm
                </h4>
                <p className="text-[10px] text-gray-400 font-medium pl-3">Điện thoại di động, đồng hồ thông minh, tài liệu (trừ khi có quy định khác).</p>
              </div>

              {/* Warning box inside regulations */}
              <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong>CẢNH BÁO:</strong> Vi phạm quy chế thi có thể dẫn đến đình chỉ thi và kỷ luật nặng.
                </p>
              </div>
            </div>
          </div>

          {/* Need help support card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-sm text-gray-800">Cần hỗ trợ?</h3>
              <p className="text-[10px] text-gray-400 mt-1 leading-normal font-semibold">
                Mọi thắc mắc về lịch thi, vui lòng liên hệ phòng Đào tạo.
              </p>
            </div>
            <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
              <Mail className="w-4 h-4" /> Gửi yêu cầu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
