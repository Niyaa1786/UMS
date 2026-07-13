import { useState, FormEvent } from 'react';
import { Send, CheckCircle, Clock, Trash, AlertCircle } from 'lucide-react';

export default function ThongBao() {
  const [selectedClass, setSelectedClass] = useState('IT001');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      class: 'IT001',
      title: 'Hạn nộp bài tập cuối kỳ sắp đến',
      content: 'Nhắc nhở lớp Lập trình Java Nâng cao còn 15 sinh viên chưa nộp bài. Hạn cuối là 23:59 ngày 15/06/2026.',
      time: '14:20 - 10/06/2026',
      status: 'Đã gửi'
    },
    {
      id: 2,
      class: 'CS202',
      title: 'Dời phòng học thực hành ngày mai',
      content: 'Lớp Lập trình hướng đối tượng di chuyển sang học tại phòng Lab S03 thay vì Lab S02 do bảo trì mạng.',
      time: '08:45 - 09/06/2026',
      status: 'Đã gửi'
    }
  ]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAnn = {
      id: announcements.length + 1,
      class: selectedClass,
      title,
      content,
      time: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'Đã gửi'
    };

    setAnnouncements([newAnn, ...announcements]);
    setTitle('');
    setContent('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">Thông báo & Sự kiện</h2>
        <p className="text-xs text-gray-500 font-semibold mt-1">Tạo thông báo đẩy gửi trực tiếp đến hộp thư của sinh viên các lớp học</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left pane: Dispatch Form (takes 2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase">Tạo thông báo mới</h3>

            {success && (
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold animate-pulse">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Gửi thông báo thành công đến sinh viên!</span>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-4 text-xs font-bold text-gray-700">
              {/* Class target */}
              <div className="space-y-1.5">
                <label className="text-gray-500">Đối tượng lớp nhận</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 font-bold text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option value="IT001">IT001 - Cấu trúc dữ liệu và Giải thuật</option>
                  <option value="CS202">CS202 - Lập trình hướng đối tượng</option>
                  <option value="MATH301">MATH301 - Toán rời rạc</option>
                  <option value="DB404">DB404 - Hệ quản trị Cơ sở dữ liệu</option>
                  <option value="ALL">Tất cả lớp giảng dạy</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-gray-500">Tiêu đề thông báo</label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề ngắn gọn..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-red-500 focus:bg-white rounded-xl px-4 py-2.5 font-semibold text-gray-800 focus:outline-none transition-all"
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="text-gray-500">Nội dung chi tiết</label>
                <textarea
                  placeholder="Nhập nội dung đầy đủ của thông báo..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-red-500 focus:bg-white rounded-xl px-4 py-2.5 font-semibold text-gray-800 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Dispatch Button */}
              <button
                type="submit"
                className="w-full py-3 bg-red-700 hover:bg-red-800 active:bg-red-950 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi thông báo</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right pane: Dispatch History logs (takes 3 spans) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-xs font-black tracking-wide text-gray-400 uppercase">Lịch sử thông báo đã gửi</h3>

            <div className="space-y-3.5 max-h-[450px] overflow-y-auto custom-scrollbar pr-1">
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div key={ann.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100/50 space-y-2 relative group">
                    
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-700 bg-white border border-gray-100 hover:border-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      title="Xóa thông báo"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-red-50 border border-red-100 text-red-700 text-[9px] font-black px-2 py-0.5 rounded-md">
                        Lớp: {ann.class}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ann.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-gray-900 pr-6">{ann.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{ann.content}</p>
                    
                    <div className="pt-1.5 flex items-center gap-1 text-[9px] text-emerald-600 font-extrabold uppercase">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{ann.status}</span>
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 font-semibold flex flex-col items-center gap-1.5 justify-center">
                  <AlertCircle className="w-5 h-5 text-gray-300" />
                  <span>Chưa có thông báo nào được gửi đi trong hôm nay.</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
