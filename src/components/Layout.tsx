import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "/", icon: "Home" },
  { label: "Форум", href: "/forum", icon: "MessageSquare" },
  { label: "Игроки", href: "/players", icon: "Users" },
  { label: "Фракции", href: "/factions", icon: "Shield" },
  { label: "Правила", href: "/rules", icon: "BookOpen" },
];

const ONLINE_COUNT = 247;

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(220,14%,7%)" }}>
      {/* ===== TOP BAR ===== */}
      <div
        style={{
          background: "#FF6600",
          height: "3px",
          width: "100%",
        }}
      />

      {/* ===== HEADER ===== */}
      <header
        style={{
          background: "rgba(12,14,20,0.98)",
          borderBottom: "1px solid rgba(255,102,0,0.25)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-3">
            <div
              style={{
                background: "#FF6600",
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
              }}
            >
              <span style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: "16px", color: "#000" }}>NR</span>
            </div>
            <div>
              <div style={{ fontFamily: "Oswald", fontWeight: 700, fontSize: "20px", color: "#fff", letterSpacing: "2px" }}>
                NETWORK <span style={{ color: "#FF6600" }}>REDUX</span>
              </div>
              <div style={{ fontSize: "10px", color: "#666", letterSpacing: "3px", marginTop: "-2px" }}>
                MTA:SA ROLEPLAY
              </div>
            </div>
          </Link>

          {/* Навигация — десктоп */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    padding: "6px 14px",
                    fontFamily: "Oswald",
                    fontSize: "13px",
                    letterSpacing: "1px",
                    fontWeight: 500,
                    color: active ? "#FF6600" : "#aaa",
                    borderBottom: active ? "2px solid #FF6600" : "2px solid transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Icon name={link.icon} size={14} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3">
            {/* Онлайн */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5"
              style={{
                background: "rgba(255,102,0,0.1)",
                border: "1px solid rgba(255,102,0,0.25)",
                borderRadius: "3px",
              }}
            >
              <div style={{ width: "7px", height: "7px", background: "#4CAF50", borderRadius: "50%", boxShadow: "0 0 6px #4CAF50" }} />
              <span style={{ fontFamily: "Oswald", fontSize: "12px", color: "#ccc" }}>
                {ONLINE_COUNT} онлайн
              </span>
            </div>

            {/* Войти */}
            <Link
              to="/login"
              style={{
                padding: "7px 16px",
                background: "#FF6600",
                color: "#000",
                fontFamily: "Oswald",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "1px",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.2s",
              }}
            >
              ВОЙТИ
            </Link>

            {/* Бургер мобайл */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "#aaa", background: "none", border: "none", cursor: "pointer" }}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10,12,18,0.99)",
              borderTop: "1px solid rgba(255,102,0,0.2)",
              padding: "8px 0",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  fontFamily: "Oswald",
                  fontSize: "14px",
                  color: location.pathname === link.href ? "#FF6600" : "#bbb",
                  textDecoration: "none",
                  borderLeft: location.pathname === link.href ? "3px solid #FF6600" : "3px solid transparent",
                }}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ===== BREADCRUMB ===== */}
      {location.pathname !== "/" && (
        <div
          style={{
            background: "rgba(10,12,18,0.8)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "8px 0",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2" style={{ fontSize: "12px", color: "#666" }}>
              <Link to="/" style={{ color: "#FF6600", textDecoration: "none" }}>Главная</Link>
              {location.pathname.startsWith("/forum") && (
                <>
                  <span>/</span>
                  <Link to="/forum" style={{ color: location.pathname === "/forum" ? "#ccc" : "#FF6600", textDecoration: "none" }}>Форум</Link>
                </>
              )}
              {location.pathname.startsWith("/forum/topic") && (
                <>
                  <span>/</span>
                  <span style={{ color: "#ccc" }}>Тема</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          background: "rgba(8,10,15,0.98)",
          borderTop: "1px solid rgba(255,102,0,0.2)",
          padding: "24px 0",
          marginTop: "40px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div style={{ fontFamily: "Oswald", color: "#FF6600", fontWeight: 700, fontSize: "16px", letterSpacing: "2px" }}>
                NETWORK REDUX
              </div>
              <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>
                © 2024 Network Redux. MTA:SA Roleplay Server.
              </div>
            </div>
            <div className="flex gap-6">
              {["Discord", "Telegram", "VK"].map((s) => (
                <a key={s} href="#" style={{ fontSize: "12px", color: "#555", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6600")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}