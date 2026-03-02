import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const CATEGORIES = [
  {
    id: "server",
    title: "Сервер",
    color: "#FF6600",
    icon: "Server",
    sections: [
      {
        id: 1,
        title: "Новости сервера",
        description: "Официальные объявления, обновления и события",
        icon: "Megaphone",
        topics: 124,
        posts: 3482,
        lastTopic: { title: "Network Redux 4.2 — патч-ноты", author: "Admin", time: "2 ч назад" },
        color: "#FF6600",
      },
      {
        id: 2,
        title: "Правила сервера",
        description: "Обязательные правила поведения и игры",
        icon: "BookOpen",
        topics: 18,
        posts: 441,
        lastTopic: { title: "Правила PvP зон — обновление", author: "Moderator", time: "5 дн назад" },
        color: "#FF6600",
      },
    ],
  },
  {
    id: "game",
    title: "Игровая жизнь",
    color: "#4CAF50",
    icon: "Gamepad2",
    sections: [
      {
        id: 3,
        title: "Объявления игроков",
        description: "Игровые события, открытия, приглашения",
        icon: "Bell",
        topics: 892,
        posts: 12430,
        lastTopic: { title: "Открытие клуба The Dragon — VIP вечер", author: "DragonOwner", time: "15 мин назад" },
        color: "#4CAF50",
      },
      {
        id: 4,
        title: "Торговля",
        description: "Продажа и покупка имущества, транспорта, бизнеса",
        icon: "ShoppingCart",
        topics: 2341,
        posts: 18940,
        lastTopic: { title: "Продаю Porsche 911 GT3", author: "Seller_Pro", time: "12 мин назад" },
        color: "#4CAF50",
      },
      {
        id: 5,
        title: "Фракции и банды",
        description: "Информация о фракциях, набор в ряды",
        icon: "Shield",
        topics: 447,
        posts: 8210,
        lastTopic: { title: "Набор в LSPD — офицер", author: "LSPD_Chief", time: "3 ч назад" },
        color: "#4CAF50",
      },
    ],
  },
  {
    id: "admin",
    title: "Администрация",
    color: "#4488ff",
    icon: "Crown",
    sections: [
      {
        id: 6,
        title: "Жалобы на игроков",
        description: "Подача жалоб на нарушителей правил",
        icon: "AlertTriangle",
        topics: 1823,
        posts: 9410,
        lastTopic: { title: "Жалоба: RickyMartin — RDM", author: "Victim_01", time: "5 мин назад" },
        color: "#ff4444",
      },
      {
        id: 7,
        title: "Апелляции",
        description: "Обжалование банов и предупреждений",
        icon: "Scale",
        topics: 622,
        posts: 4130,
        lastTopic: { title: "Апелляция на бан — ID 45231", author: "Banned_Player", time: "1 ч назад" },
        color: "#4488ff",
      },
      {
        id: 8,
        title: "Баги и предложения",
        description: "Сообщайте об ошибках и предлагайте улучшения",
        icon: "Bug",
        topics: 934,
        posts: 5870,
        lastTopic: { title: "Баг с телепортом в тюрьме", author: "Bug_Hunter", time: "1 ч назад" },
        color: "#aa44ff",
      },
    ],
  },
  {
    id: "off",
    title: "Общение",
    color: "#888",
    icon: "MessageCircle",
    sections: [
      {
        id: 9,
        title: "Флудилка",
        description: "Свободное общение вне игровых тем",
        icon: "Coffee",
        topics: 4210,
        posts: 87430,
        lastTopic: { title: "Мем дня — подборка апрель", author: "Memer", time: "3 мин назад" },
        color: "#888",
      },
      {
        id: 10,
        title: "Вопросы и помощь",
        description: "Задайте вопрос — помогут опытные игроки",
        icon: "HelpCircle",
        topics: 3102,
        posts: 21890,
        lastTopic: { title: "Как работает система крафта?", author: "NewPlayer", time: "20 мин назад" },
        color: "#888",
      },
    ],
  },
];

export default function Forum() {
  return (
    <Layout>
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "Oswald", fontSize: "24px", color: "#fff", letterSpacing: "2px" }}>
          <span style={{ color: "#FF6600" }}>|</span> ФОРУМ
        </h1>
        <Link
          to="/forum/new"
          style={{
            padding: "8px 18px",
            background: "#FF6600",
            color: "#000",
            fontFamily: "Oswald",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "1px",
            textDecoration: "none",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Icon name="Plus" size={14} />
          НОВАЯ ТЕМА
        </Link>
      </div>

      {/* Категории */}
      <div className="flex flex-col gap-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            {/* Заголовок категории */}
            <div
              className="flex items-center gap-3 mb-2 px-4 py-2"
              style={{
                background: "rgba(15,17,24,0.6)",
                borderLeft: `3px solid ${cat.color}`,
              }}
            >
              <Icon name={cat.icon} size={16} color={cat.color} />
              <span style={{ fontFamily: "Oswald", fontSize: "14px", color: cat.color, letterSpacing: "2px", fontWeight: 600 }}>
                {cat.title.toUpperCase()}
              </span>
            </div>

            {/* Разделы */}
            <div
              style={{
                background: "rgba(15,17,24,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              {/* Шапка таблицы */}
              <div
                className="hidden md:grid"
                style={{
                  gridTemplateColumns: "1fr 80px 80px 1fr",
                  padding: "8px 16px",
                  background: "rgba(0,0,0,0.3)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  gap: "16px",
                }}
              >
                {["Раздел", "Тем", "Постов", "Последнее"].map((h) => (
                  <div key={h} style={{ fontSize: "10px", color: "#555", letterSpacing: "1px", fontFamily: "Oswald" }}>
                    {h.toUpperCase()}
                  </div>
                ))}
              </div>

              {/* Строки разделов */}
              {cat.sections.map((section, i) => (
                <Link
                  key={section.id}
                  to={`/forum/section/${section.id}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    padding: "14px 16px",
                    borderBottom: i < cat.sections.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    textDecoration: "none",
                    transition: "background 0.15s",
                    gap: "8px",
                  }}
                  className="md:grid"
                  onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(${section.color === "#FF6600" ? "255,102,0" : section.color === "#4CAF50" ? "76,175,80" : "80,80,80"},0.05)`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto auto",
                      gap: "16px",
                      alignItems: "center",
                    }}
                    className="hidden md:grid"
                  >
                    {/* Название */}
                    <div className="flex items-start gap-3">
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          background: `rgba(${section.color === "#FF6600" ? "255,102,0" : section.color === "#4CAF50" ? "76,175,80" : section.color === "#4488ff" ? "68,136,255" : section.color === "#ff4444" ? "255,68,68" : section.color === "#aa44ff" ? "170,68,255" : "136,136,136"},0.12)`,
                          border: `1px solid ${section.color}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          borderRadius: "2px",
                        }}
                      >
                        <Icon name={section.icon} size={16} color={section.color} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "Oswald", fontSize: "15px", color: "#fff", marginBottom: "2px" }}>
                          {section.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#555" }}>{section.description}</div>
                      </div>
                    </div>

                    {/* Темы */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Oswald", fontSize: "18px", color: "#fff" }}>{section.topics.toLocaleString()}</div>
                    </div>

                    {/* Посты */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Oswald", fontSize: "18px", color: "#fff" }}>{section.posts.toLocaleString()}</div>
                    </div>

                    {/* Последнее */}
                    <div style={{ minWidth: "160px" }}>
                      <div style={{ fontSize: "12px", color: "#ccc", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                        {section.lastTopic.title}
                      </div>
                      <div style={{ fontSize: "11px", color: "#555" }}>
                        <span style={{ color: "#FF6600" }}>@</span>{section.lastTopic.author} · {section.lastTopic.time}
                      </div>
                    </div>
                  </div>

                  {/* Мобильная версия */}
                  <div className="flex items-start gap-3 md:hidden">
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        background: `${section.color}18`,
                        border: `1px solid ${section.color}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        borderRadius: "2px",
                      }}
                    >
                      <Icon name={section.icon} size={14} color={section.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Oswald", fontSize: "14px", color: "#fff", marginBottom: "2px" }}>{section.title}</div>
                      <div style={{ fontSize: "11px", color: "#555", marginBottom: "4px" }}>{section.description}</div>
                      <div className="flex gap-3">
                        <span style={{ fontSize: "11px", color: "#666" }}>{section.topics} тем</span>
                        <span style={{ fontSize: "11px", color: "#666" }}>{section.posts} постов</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Статистика форума */}
      <div
        className="mt-6 flex flex-wrap gap-4 items-center justify-between"
        style={{
          background: "rgba(15,17,24,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 20px",
          borderRadius: "2px",
        }}
      >
        <div className="flex flex-wrap gap-6">
          {[
            { label: "Всего тем", value: "13 718" },
            { label: "Всего постов", value: "172 404" },
            { label: "Пользователей", value: "18 492" },
            { label: "Новый участник", value: "Toretto_Fan" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span style={{ fontSize: "11px", color: "#555" }}>{s.label}:</span>
              <span style={{ fontSize: "12px", color: "#FF6600", fontFamily: "Oswald" }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: "6px", height: "6px", background: "#4CAF50", borderRadius: "50%" }} />
          <span style={{ fontSize: "12px", color: "#555" }}>Сейчас онлайн:</span>
          <span style={{ fontSize: "12px", color: "#4CAF50", fontFamily: "Oswald" }}>47 пользователей</span>
        </div>
      </div>
    </Layout>
  );
}
