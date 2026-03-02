import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const STATS = [
  { label: "Игроков онлайн", value: "247", icon: "Users", color: "#4CAF50" },
  { label: "Зарегистрировано", value: "18 492", icon: "UserCheck", color: "#FF6600" },
  { label: "Тем на форуме", value: "3 241", icon: "MessageSquare", color: "#4488ff" },
  { label: "Фракций", value: "24", icon: "Shield", color: "#aa44ff" },
];

const NEWS = [
  {
    id: 1,
    category: "ОБНОВЛЕНИЕ",
    categoryColor: "#FF6600",
    title: "Network Redux 4.2 — Новая система бизнеса и недвижимости",
    date: "28 февраля 2024",
    author: "Администратор",
    views: 4820,
    replies: 94,
    excerpt: "В этом обновлении мы полностью переработали систему бизнеса. Теперь вы можете владеть магазинами, заправками и ресторанами...",
  },
  {
    id: 2,
    category: "СОБЫТИЕ",
    categoryColor: "#4CAF50",
    title: "Турнир по дрэг-рейсингу — призовой фонд $5.000.000",
    date: "25 февраля 2024",
    author: "EventTeam",
    views: 2341,
    replies: 47,
    excerpt: "Приглашаем всех водителей принять участие в ежемесячном турнире. Регистрация открыта до 5 марта...",
  },
  {
    id: 3,
    category: "НАБОР",
    categoryColor: "#4488ff",
    title: "Открыт набор в полицейское управление LSPD",
    date: "20 февраля 2024",
    author: "LSPD_Command",
    views: 1876,
    replies: 63,
    excerpt: "Полицейское управление Los Santos объявляет о наборе новых офицеров. Требования: минимум 50 часов игры...",
  },
];

const FORUM_PREVIEW = [
  { id: 1, title: "Жалоба на игрока RickyMartin за нарушение RDM", category: "Жалобы", replies: 12, time: "5 мин назад", hot: true },
  { id: 2, title: "Продаю Porsche 911 GT3 в идеальном состоянии", category: "Торговля", replies: 8, time: "12 мин назад", hot: false },
  { id: 3, title: "Помогите разобраться с системой наркоторговли", category: "Вопросы", replies: 24, time: "31 мин назад", hot: true },
  { id: 4, title: "Репорт: баг с телепортом в тюрьме", category: "Баги", replies: 5, time: "1 час назад", hot: false },
  { id: 5, title: "Открытие нового клуба The Dragon — приглашаем всех", category: "Объявления", replies: 41, time: "2 часа назад", hot: false },
];

export default function Home() {
  return (
    <Layout>
      {/* ===== HERO ===== */}
      <div
        className="relative rounded overflow-hidden mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(255,102,0,0.08) 0%, rgba(10,12,18,0.95) 60%)",
          border: "1px solid rgba(255,102,0,0.2)",
          padding: "48px 40px",
          overflow: "hidden",
        }}
      >
        {/* Фоновая сетка */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,102,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,102,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative">
          <div
            style={{
              display: "inline-block",
              background: "#FF6600",
              color: "#000",
              fontFamily: "Oswald",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "3px",
              padding: "3px 10px",
              marginBottom: "12px",
            }}
          >
            MTA:SA ROLEPLAY
          </div>
          <h1
            style={{
              fontFamily: "Oswald",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "16px",
              letterSpacing: "2px",
            }}
          >
            NETWORK <span style={{ color: "#FF6600" }}>REDUX</span>
          </h1>
          <p style={{ color: "#888", fontSize: "15px", maxWidth: "480px", marginBottom: "28px", lineHeight: 1.6 }}>
            Лучший русскоязычный MTA RP-сервер. Живая экономика, 24 фракции, реальная жизнь в Los Santos.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              style={{
                padding: "12px 28px",
                background: "#FF6600",
                color: "#000",
                fontFamily: "Oswald",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "2px",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon name="Play" size={16} />
              ИГРАТЬ
            </a>
            <Link
              to="/forum"
              style={{
                padding: "12px 28px",
                background: "transparent",
                color: "#FF6600",
                fontFamily: "Oswald",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "2px",
                textDecoration: "none",
                border: "1px solid rgba(255,102,0,0.5)",
                borderRadius: "2px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Icon name="MessageSquare" size={16} />
              ФОРУМ
            </Link>
          </div>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(15,17,24,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: `2px solid ${stat.color}`,
              padding: "18px 20px",
              borderRadius: "2px",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={stat.icon} size={16} color={stat.color} />
              <span style={{ fontSize: "11px", color: "#666", letterSpacing: "1px" }}>{stat.label.toUpperCase()}</span>
            </div>
            <div style={{ fontFamily: "Oswald", fontSize: "28px", fontWeight: 700, color: "#fff" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== NEWS ===== */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "Oswald", fontSize: "18px", color: "#fff", letterSpacing: "2px" }}>
              <span style={{ color: "#FF6600" }}>|</span> НОВОСТИ
            </h2>
            <Link
              to="/forum"
              style={{ fontSize: "12px", color: "#FF6600", textDecoration: "none" }}
            >
              Все новости →
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {NEWS.map((news) => (
              <div
                key={news.id}
                style={{
                  background: "rgba(15,17,24,0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,102,0,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div style={{ padding: "16px 20px" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{
                        background: news.categoryColor,
                        color: news.categoryColor === "#FF6600" ? "#000" : "#fff",
                        fontSize: "10px",
                        fontFamily: "Oswald",
                        fontWeight: 700,
                        padding: "2px 8px",
                        letterSpacing: "1px",
                      }}
                    >
                      {news.category}
                    </span>
                    <span style={{ fontSize: "11px", color: "#555" }}>{news.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "Oswald", fontSize: "17px", color: "#fff", marginBottom: "8px", fontWeight: 600 }}>
                    {news.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6, marginBottom: "12px" }}>
                    {news.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "11px", color: "#555" }}>
                      <span style={{ color: "#FF6600" }}>@</span> {news.author}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={11} color="#555" />
                      <span style={{ fontSize: "11px", color: "#555" }}>{news.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MessageCircle" size={11} color="#555" />
                      <span style={{ fontSize: "11px", color: "#555" }}>{news.replies}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SIDEBAR ===== */}
        <div className="flex flex-col gap-4">
          {/* Последние темы */}
          <div
            style={{
              background: "rgba(15,17,24,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontFamily: "Oswald", fontSize: "14px", color: "#fff", letterSpacing: "1px" }}>
                ПОСЛЕДНИЕ ТЕМЫ
              </span>
              <Link to="/forum" style={{ fontSize: "11px", color: "#FF6600", textDecoration: "none" }}>
                все →
              </Link>
            </div>
            <div>
              {FORUM_PREVIEW.map((topic, i) => (
                <Link
                  key={topic.id}
                  to={`/forum/topic/${topic.id}`}
                  style={{
                    display: "block",
                    padding: "10px 16px",
                    borderBottom: i < FORUM_PREVIEW.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,102,0,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div className="flex items-start gap-2">
                    {topic.hot && (
                      <div style={{ width: "6px", height: "6px", background: "#FF6600", borderRadius: "50%", marginTop: "5px", flexShrink: 0 }} />
                    )}
                    {!topic.hot && (
                      <div style={{ width: "6px", height: "6px", background: "#333", borderRadius: "50%", marginTop: "5px", flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#ccc",
                          marginBottom: "3px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {topic.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#555",
                            background: "rgba(255,255,255,0.05)",
                            padding: "1px 5px",
                            borderRadius: "2px",
                          }}
                        >
                          {topic.category}
                        </span>
                        <span style={{ fontSize: "10px", color: "#444" }}>{topic.time}</span>
                        <span style={{ fontSize: "10px", color: "#444" }}>· {topic.replies} отв.</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Сервер */}
          <div
            style={{
              background: "rgba(15,17,24,0.9)",
              border: "1px solid rgba(255,102,0,0.2)",
              borderRadius: "2px",
              padding: "20px",
            }}
          >
            <div style={{ fontFamily: "Oswald", fontSize: "14px", color: "#fff", letterSpacing: "1px", marginBottom: "14px" }}>
              ПОДКЛЮЧИТЬСЯ
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginBottom: "6px" }}>IP-адрес сервера:</div>
            <div
              className="flex items-center justify-between"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "8px 12px",
                borderRadius: "2px",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontFamily: "Oswald", fontSize: "14px", color: "#FF6600" }}>play.networkredux.ru</span>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}
                onClick={() => navigator.clipboard?.writeText("play.networkredux.ru")}
              >
                <Icon name="Copy" size={14} />
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1" style={{ flex: 1, background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)", padding: "6px 10px", borderRadius: "2px" }}>
                <div style={{ width: "6px", height: "6px", background: "#4CAF50", borderRadius: "50%" }} />
                <span style={{ fontSize: "11px", color: "#4CAF50", fontFamily: "Oswald" }}>ОНЛАЙН</span>
              </div>
              <div style={{ flex: 1, background: "rgba(255,102,0,0.1)", border: "1px solid rgba(255,102,0,0.2)", padding: "6px 10px", borderRadius: "2px", textAlign: "center" }}>
                <span style={{ fontSize: "11px", color: "#FF6600", fontFamily: "Oswald" }}>247 / 500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
