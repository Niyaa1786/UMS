import { useState } from 'react';
import {
  Bell,
  Send,
  Trash2,
  CheckCircle2,
  Clock,
  Users,
  GraduationCap,
  School,
  AlertTriangle,
  BookOpen,
  DollarSign,
  Filter,
  Search,
  X,
  Pin,
  Eye,
  ChevronDown
} from 'lucide-react';

type NotifCategory = 'KỸ THUẬT' | 'HỌC VỤ' | 'TÀI CHÍNH';
type RecipientGroup = 'all' | 'students' | 'teachers' | 'admins';

interface NotificationLog {
  id: string;
  title: string;
  category: NotifCategory;
  sentTime: string;
  content: string;
  readsCount: number;
  recipients: RecipientGroup;
  isPinned: boolean;
}

const categoryConfig: Record<NotifCategory, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'KỸ THUẬT': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', icon: <AlertTriangle className="w-3 h-3" /> },
  'HỌC VỤ': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', icon: <BookOpen className="w-3 h-3" /> },
  'TÀI CHÍNH': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: <DollarSign className="w-3 h-3" /> },
};

const recipientConfig: Record<RecipientGroup, { label: string; icon: React.ReactNode; color: string }> = {
  all: { label: 'Tất cả', icon: <Users className="w-3 h-3" />, color: 'text-gray-600' },
  students: { label: 'Sinh viên', icon: <School className="w-3 h-3" />, color: 'text-blue-600' },
  teachers: { label: 'Giảng viên', icon: <GraduationCap className="w-3 h-3" />, color: 'text-emerald-600' },
  admins: { label: 'Quản trị viên', icon: <Bell className="w-3 h-3" />, color: 'text-purple-600' },
};

export default function AnnouncementsManagement() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NotifCategory>('HỌC VỤ');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState<RecipientGroup>('all');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<'all' | NotifCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [logs, setLogs] = useState<NotificationLog[]>([
    { id: '1', title: 'Bảo trì hệ thống định kỳ', category: 'KỸ THUẬT', sentTime: '2 phút trước', content: 'Hệ thống sẽ tạm dừng hoạt động từ 23:00 tối nay đến 02:00 sáng mai để nâng cấp server lưu trữ và cơ sở dữ liệu.', readsCount: 245, recipients: 'all', isPinned: true },
    { id: '2', title: 'Cập nhật danh sách thi tốt nghiệp đợt 2', category: 'HỌC VỤ', sentTime: '1 giờ trước', content: 'Danh sách đợt 2 đã được phê duyệt và đồng bộ sang cổng thông tin sinh viên. Sinh viên kiểm tra danh sách tại trang Kết quả.', readsCount: 1040, recipients: 'students', isPinned: false },
    { id: '3', title: 'Nhắc nhở quyết toán học phí học kỳ phụ', category: 'TÀI CHÍNH', sentTime: '3 giờ trước', content: 'Hạn chót đóng học phí học kỳ phụ sẽ kết thúc vào thứ Sáu tuần này. Sinh viên chưa hoàn tất vui lòng liên hệ phòng Tài vụ.', readsCount: 382, recipients: 'students', isPinned: false },
    { id: '4', title: 'Lịch họp hội đồng khoa tháng 06', category: 'HỌC VỤ', sentTime: 'Hôm qua', content: 'Buổi họp hội đồng khoa sẽ diễn ra vào thứ Tư tuần tới tại Hội trường A1. Đề nghị các giảng viên tham dự đầy đủ và đúng giờ.', readsCount: 98, recipients: 'teachers', isPinned: false },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newLog: NotificationLog = {
      id: Date.now().toString(),
      title,
      category,
      sentTime: 'Vừa xong',
      content,
      readsCount: 0,
      recipients,
      isPinned: false
    };
    setLogs(prev => [newLog, ...prev]);
    setTitle('');
    setContent('');
    setSuccessMsg(`Đã gửi thông báo thành công đến "${recipientConfig[recipients].label}".`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleDelete = (id: string) => setLogs(prev => prev.filter(l => l.id !== id));
  const handlePin = (id: string) => setLogs(prev => prev.map(l => l.id === id ? { ...l, isPinned: !l.isPinned } : l));

  const filteredLogs = logs
    .filter(l => {
      const matchCat = filterCat === 'all' || l.category === filterCat;
      const matchSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const totalSent = logs.length;
  const totalReads = logs.reduce((s, l) => s + l.readsCount, 0);
  const pinnedCount = logs.filter(l => l.isPinned).length;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Thông báo</h1>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Soạn thảo và gửi thông báo khẩn cấp, tin tức học vụ đến giảng viên & sinh viên.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Thông báo đã gửi', value: totalSent, icon: <Send className="w-4 h-4 text-red-700" />, bg: 'bg-red-50' },
          { label: 'Lượt xem tổng', value: totalReads.toLocaleString(), icon: <Eye className="w-4 h-4 text-blue-700" />, bg: 'bg-blue-50' },
          { label: 'Ghim quan trọng', value: pinnedCount, icon: <Pin className="w-4 h-4 text-amber-700" />, bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-black text-gray-900 group-hover:text-red-700 transition-colors mt-0.5">{stat.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Composer panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 self-start">
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Soạn thông báo mới</h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Đăng tin lên bảng tin cổng thông tin portal EduManager</p>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Recipient group */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide uppercase block">NHÓM NHẬN THÔNG BÁO</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(recipientConfig) as RecipientGroup[]).map(grp => {
                  const cfg = recipientConfig[grp];
                  const isActive = recipients === grp;
                  return (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setRecipients(grp)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-red-50 border-red-200 text-red-800'
                          : 'bg-slate-50/50 border-slate-200 text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className={isActive ? 'text-red-700' : cfg.color}>{cfg.icon}</span>
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide block uppercase">TIÊU ĐỀ THÔNG BÁO</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ví dụ: Lịch thi học kỳ chính thức..."
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-medium"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide block uppercase">PHÂN LOẠI</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as NotifCategory)}
                  className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-red-400 px-3.5 py-2.5 pr-8 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="HỌC VỤ">📚 HỌC VỤ — Thông tin đào tạo</option>
                  <option value="KỸ THUẬT">⚠️ KỸ THUẬT — Sự cố hệ thống</option>
                  <option value="TÀI CHÍNH">💰 TÀI CHÍNH — Học phí, học bổng</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 tracking-wide block uppercase">NỘI DUNG CHI TIẾT</label>
              <textarea
                rows={5}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Nhập nội dung thông báo chi tiết..."
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white p-3.5 rounded-xl text-xs font-bold text-gray-700 focus:outline-none transition-all resize-none placeholder:text-gray-400 placeholder:font-medium"
                required
              />
              <p className="text-[9px] text-gray-400 font-semibold text-right">{content.length} ký tự</p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-800/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi thông báo đến "{recipientConfig[recipients].label}"</span>
            </button>
          </form>
        </div>

        {/* Log panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Nhật ký thông báo</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Danh sách tin đã phát đi trong học kỳ</p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm thông báo..."
                  className="bg-gray-50 border border-gray-100 pl-7 pr-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-red-300 w-36 transition-all"
                />
                <Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-2.5 h-2.5" /></button>}
              </div>
              {/* Category filter */}
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl">
                {(['all', 'HỌC VỤ', 'KỸ THUẬT', 'TÀI CHÍNH'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-2 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      filterCat === cat ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {cat === 'all' ? 'Tất cả' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center text-gray-300">
                <Bell className="w-10 h-10 mb-3" />
                <p className="text-sm font-black">Không có thông báo</p>
              </div>
            ) : filteredLogs.map(log => {
              const cat = categoryConfig[log.category];
              const recip = recipientConfig[log.recipients];
              return (
                <div
                  key={log.id}
                  className={`p-4 border rounded-2xl flex items-start gap-3 transition-all group ${
                    log.isPinned
                      ? 'bg-amber-50/40 border-amber-100 hover:bg-amber-50/60'
                      : 'bg-slate-50/30 border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center border ${cat.bg} ${cat.border}`}>
                    <Bell className={`w-4 h-4 ${cat.text}`} />
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md border text-[9px] font-black flex items-center gap-1 ${cat.bg} ${cat.text} ${cat.border}`}>
                          {cat.icon} {log.category}
                        </span>
                        <span className={`text-[9px] font-bold flex items-center gap-1 ${recip.color}`}>
                          {recip.icon} {recip.label}
                        </span>
                        {log.isPinned && (
                          <span className="flex items-center gap-0.5 text-[9px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded">
                            <Pin className="w-2.5 h-2.5" /> Ghim
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 flex items-center gap-0.5 text-[9px] font-bold shrink-0">
                        <Clock className="w-3 h-3" /> {log.sentTime}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-gray-800">{log.title}</h4>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed line-clamp-2">{log.content}</p>

                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {log.readsCount.toLocaleString()} lượt xem
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePin(log.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        log.isPinned
                          ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                          : 'text-gray-400 hover:text-amber-700 hover:bg-amber-50'
                      }`}
                      title={log.isPinned ? 'Bỏ ghim' : 'Ghim thông báo'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa thông báo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredLogs.length > 0 && (
            <p className="text-[10px] text-gray-400 font-semibold text-center pt-1">
              Hiển thị {filteredLogs.length} / {logs.length} thông báo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
