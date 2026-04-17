import { useState } from "react"
import Icon from "@/components/ui/icon"

const MOCK_USER = {
  name: "Dep.FNA | Vlad Hall | 227028",
  username: "@vlad05",
  id: "533424994789752832",
  avatar: "https://cdn.poehali.dev/projects/9b197a59-33d2-4f6b-82ba-d3fd16734697/bucket/6fe73572-df15-461e-986e-c924644a4bed.png",
  roles: ["FNA", "Academy"],
  faction: "Во фракции",
}

const TICKET_TYPES = [
  { id: "join", label: "Вступление в отдел" },
  { id: "rank", label: "Повышение ранга" },
  { id: "academy", label: "Тестирование Academy" },
  { id: "weapon", label: "Запрос Спец.вооружения" },
  { id: "ic_leave", label: "IC отпуск" },
  { id: "ooc_leave", label: "OOC отпуск" },
]

const DEPARTMENTS = [
  "Отдел внутренних расследований (ОВР)",
  "Специальный отдел (СО)",
  "Отдел по борьбе с организованной преступностью (ОБОП)",
  "Информационный отдел (ИО)",
  "Отдел по надзору (ОН)",
  "Научно-технический отдел (НТО)",
]

const RANKS = [
  "Стажёр", "Агент 3 класса", "Агент 2 класса", "Агент 1 класса",
  "Старший агент", "Специальный агент", "Старший специальный агент",
  "Супервайзер", "Заместитель директора", "Директор",
]

const MOCK_TICKETS = [
  {
    id: 2731,
    type: "ОТДЕЛ",
    date: "16.04.2026",
    department: "IB",
    rank: "Ранг: 11",
    status: "rejected",
    statusLabel: "Отклонено",
  },
  {
    id: 2721,
    type: "ОТДЕЛ",
    date: "15.04.2026",
    department: "SCD",
    rank: "Ранг: 10",
    status: "approved",
    statusLabel: "Одобрено",
  },
  {
    id: 2698,
    type: "РАНГ",
    date: "12.04.2026",
    department: "FNA",
    rank: "Ранг: 9",
    status: "pending",
    statusLabel: "Ожидает",
  },
]

export default function Index() {
  const [activeTab, setActiveTab] = useState("join")
  const [showBanner, setShowBanner] = useState(true)
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    department: "",
    rank: "",
    experience: "",
    motivation: "",
    contacts: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const activeTicketType = TICKET_TYPES.find((t) => t.id === activeTab)

  return (
    <div className="min-h-screen bg-[#1a1c2e] text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#13152a] border-b border-[#2a2d4a] px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e63946] rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              Система заявок <span className="text-[#e63946]">FIB</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">{MOCK_USER.name}</div>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-green-400">{MOCK_USER.faction}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e63946]">
              <img src={MOCK_USER.avatar} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e2140] hover:bg-[#252848] transition-colors text-sm text-gray-300 border border-[#2a2d4a]">
              <Icon name="BookOpen" size={14} />
              <span className="hidden sm:inline">Инструкция</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e2140] hover:bg-[#252848] transition-colors text-sm text-gray-300 border border-[#2a2d4a]">
              <Icon name="RefreshCw" size={14} />
              <span className="hidden sm:inline">Обновить</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e63946]/20 hover:bg-[#e63946]/30 transition-colors text-sm text-[#e63946] border border-[#e63946]/30">
              <Icon name="LogOut" size={14} />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      {showBanner && (
        <div className="bg-[#2d2a1a] border-b border-[#5a4a1a] px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <Icon name="AlertCircle" size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200 flex-1">
              <strong>Важная информация:</strong> Заявки обрабатываются автоматически и поступают в Discord-каналы с небольшой задержкой (до 1 минуты). Статус можно отслеживать в разделе «Мои последние заявки».
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="text-yellow-400 hover:text-yellow-200 flex-shrink-0 transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Column */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-[#13152a] rounded-xl border border-[#2a2d4a] p-6">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#e63946] rounded-full"></div>
              Профиль
            </h2>

            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e63946]">
                  <img src={MOCK_USER.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#13152a]"></div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-base truncate">{MOCK_USER.name}</h3>
                <p className="text-gray-400 text-sm">{MOCK_USER.username}</p>
                <p className="text-gray-500 text-xs mt-1">ID: {MOCK_USER.id}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {MOCK_USER.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/30 flex items-center gap-1"
                    >
                      <Icon name="ArrowRight" size={10} />
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs mt-4 flex items-start gap-1.5">
              <Icon name="Info" size={12} className="flex-shrink-0 mt-0.5" />
              Если никнейм или роли отображаются неверно, нажмите зелёную кнопку «Обновить» вверху справа.
            </p>
          </div>

          {/* Recent Tickets */}
          <div className="bg-[#13152a] rounded-xl border border-[#2a2d4a] p-6">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#e63946] rounded-full"></div>
              <Icon name="GraduationCap" size={16} className="text-gray-400" />
              Мои последние заявки
            </h2>

            <div className="space-y-3">
              {MOCK_TICKETS.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-[#1a1c2e] rounded-lg border border-[#2a2d4a] p-4 hover:border-[#3a3d5a] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">Заявка #{ticket.id}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {ticket.type}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">{ticket.date}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Icon name="ArrowRight" size={12} className="text-gray-600" />
                      <span>{ticket.department}</span>
                      <span className="text-[#e63946] text-xs font-semibold">{ticket.rank}</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
                        ticket.status === "approved"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : ticket.status === "rejected"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      <Icon
                        name={ticket.status === "approved" ? "Check" : ticket.status === "rejected" ? "X" : "Clock"}
                        size={10}
                      />
                      {ticket.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Application Form */}
        <div className="bg-[#13152a] rounded-xl border border-[#2a2d4a] p-6">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#e63946] rounded-full"></div>
            Подача заявки
          </h2>

          {/* Tab Selector */}
          <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
            {TICKET_TYPES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#e63946] text-white shadow-lg shadow-[#e63946]/30"
                    : "bg-[#1a1c2e] text-gray-400 hover:text-gray-200 hover:bg-[#252848] border border-[#2a2d4a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40">
                <Icon name="Check" size={32} className="text-green-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">Заявка отправлена!</p>
                <p className="text-gray-400 text-sm mt-1">
                  Она появится в Discord-канале в течение минуты.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Icon name="User" size={13} className="text-gray-500" />
                    Ваше Имя Фамилия
                    <span className="text-[#e63946]">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#e63946] transition-colors"
                  required
                />
              </div>

              {/* Department Select */}
              {(activeTab === "join" || activeTab === "weapon") && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Icon name="MapPin" size={13} className="text-gray-500" />
                      {activeTab === "join" ? "Выберите отдел" : "Тип вооружения"}
                      <span className="text-[#e63946]">*</span>
                    </span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e63946] transition-colors cursor-pointer"
                    required
                  >
                    <option value="">
                      {activeTab === "join" ? "Выберите отдел для вступления" : "Выберите тип вооружения"}
                    </option>
                    {DEPARTMENTS.map((dep) => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Rank Select */}
              {(activeTab === "join" || activeTab === "rank") && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={13} className="text-gray-500" />
                      Ваш текущий ранг
                      <span className="text-[#e63946]">*</span>
                    </span>
                  </label>
                  <select
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e63946] transition-colors cursor-pointer"
                    required
                  >
                    <option value="">Выберите ранг</option>
                    {RANKS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Experience */}
              {(activeTab === "join" || activeTab === "rank" || activeTab === "academy") && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Briefcase" size={13} className="text-gray-500" />
                      Опыт работы
                      <span className="text-[#e63946]">*</span>
                    </span>
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                    placeholder="Опишите ваш опыт работы в данном или смежных отделах..."
                    className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#e63946] transition-colors resize-none"
                    required
                  />
                </div>
              )}

              {/* Motivation / Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Icon name="MessageSquare" size={13} className="text-gray-500" />
                    {activeTab === "ic_leave" || activeTab === "ooc_leave" ? "Причина и сроки" : "Мотивация"}
                    <span className="text-[#e63946]">*</span>
                  </span>
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  rows={4}
                  placeholder={
                    activeTab === "ic_leave" || activeTab === "ooc_leave"
                      ? "Укажите причину и предполагаемые сроки отпуска..."
                      : "Почему вы хотите вступить / получить повышение?"
                  }
                  className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#e63946] transition-colors resize-none"
                  required
                />
              </div>

              {/* Discord Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Icon name="AtSign" size={13} className="text-gray-500" />
                    Discord контакт
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.contacts}
                  onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                  placeholder="@username"
                  className="w-full bg-[#1a1c2e] border border-[#2a2d4a] rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#e63946] transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#e63946] hover:bg-[#c1121f] text-white font-bold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#e63946]/20 mt-2"
              >
                <Icon name="Send" size={16} />
                Подать заявку «{activeTicketType?.label}»
              </button>

              <p className="text-center text-xs text-gray-600">
                Заявка будет автоматически отправлена в Discord-канал FIB
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
