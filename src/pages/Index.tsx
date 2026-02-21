import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const WEAPONS = [
  { name: "Кулаки", icon: "HandMetal", ammo: null, reserve: null },
  { name: "Пистолет", icon: "Crosshair", ammo: 17, reserve: 68 },
  { name: "MP5", icon: "Zap", ammo: 30, reserve: 120 },
  { name: "AK-47", icon: "Target", ammo: 30, reserve: 90 },
  { name: "Снайперка", icon: "Telescope", ammo: 5, reserve: 20 },
  { name: "Гранаты", icon: "Bomb", ammo: null, reserve: 5 },
];

const NOTIFICATIONS = [
  "Вы вошли в зону San Fierro",
  "Игрок Big Smoke вошёл на сервер",
  "Получено задание: Ограбление банка",
  "Вы получили $500 за убийство",
  "Внимание: розыск 3 звезды!",
];

export default function Index() {
  const [health, setHealth] = useState(87);
  const [armor, setArmor] = useState(54);
  const [money, setMoney] = useState(12450);
  const [displayMoney, setDisplayMoney] = useState(12450);
  const [weaponIndex, setWeaponIndex] = useState(1);
  const [gameHour, setGameHour] = useState(14);
  const [gameMinute, setGameMinute] = useState(37);
  const [notifications, setNotifications] = useState<
    { id: number; text: string; visible: boolean }[]
  >([]);
  const [notifCounter, setNotifCounter] = useState(0);
  const [wantedLevel, setWantedLevel] = useState(2);

  // Анимация денег
  useEffect(() => {
    const diff = money - displayMoney;
    if (diff === 0) return;
    const step = Math.ceil(Math.abs(diff) / 10);
    const timer = setTimeout(() => {
      setDisplayMoney((prev) =>
        diff > 0
          ? Math.min(prev + step, money)
          : Math.max(prev - step, money)
      );
    }, 30);
    return () => clearTimeout(timer);
  }, [money, displayMoney]);

  // Игровое время
  useEffect(() => {
    const timer = setInterval(() => {
      setGameMinute((m) => {
        if (m >= 59) {
          setGameHour((h) => (h >= 23 ? 0 : h + 1));
          return 0;
        }
        return m + 1;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const addNotification = useCallback(() => {
    const text = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
    const id = notifCounter;
    setNotifCounter((c) => c + 1);
    setNotifications((prev) => [...prev.slice(-3), { id, text, visible: true }]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, visible: false } : n))
      );
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 500);
    }, 4000);
  }, [notifCounter]);

  const isDay = gameHour >= 6 && gameHour < 20;

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      {/* Фон города */}
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? "linear-gradient(180deg, #87CEEB 0%, #B0D4E8 40%, #8FBC8F 70%, #556B2F 100%)"
            : "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 40%, #16213e 70%, #0f1a12 100%)",
          transition: "background 2s ease",
        }}
      />

      {/* Силуэт города */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-40"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{ height: "40%" }}
      >
        <path
          fill={isDay ? "#556B2F" : "#0a0a18"}
          d="M0,300 L0,180 L60,180 L60,120 L80,120 L80,80 L100,80 L100,60 L120,60 L120,80 L140,80 L140,100 L180,100 L180,60 L200,60 L200,40 L220,40 L220,60 L260,60 L260,140 L300,140 L300,100 L320,100 L320,80 L360,80 L360,120 L400,120 L400,80 L420,80 L420,50 L440,50 L440,30 L460,30 L460,50 L480,50 L480,80 L520,80 L520,140 L560,140 L560,100 L580,100 L580,60 L600,60 L600,80 L640,80 L640,120 L680,120 L680,80 L700,80 L700,50 L720,50 L720,70 L760,70 L760,140 L800,140 L800,100 L840,100 L840,60 L860,60 L860,40 L880,40 L880,60 L920,60 L920,120 L960,120 L960,80 L980,80 L980,100 L1020,100 L1020,160 L1060,160 L1060,100 L1080,100 L1080,60 L1100,60 L1100,80 L1140,80 L1140,130 L1180,130 L1180,90 L1200,90 L1200,60 L1220,60 L1220,40 L1240,40 L1240,60 L1280,60 L1280,120 L1320,120 L1320,80 L1360,80 L1360,140 L1400,140 L1400,180 L1440,180 L1440,300 Z"
        />
      </svg>

      {/* ===== HUD ===== */}

      {/* Нижний левый — Здоровье и Броня */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2">
        {/* Здоровье */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full border-2"
            style={{
              borderColor: "#ff4444",
              background: "rgba(255,68,68,0.15)",
              boxShadow: "0 0 8px rgba(255,68,68,0.5)",
            }}
          >
            <Icon name="Heart" size={14} color="#ff4444" />
          </div>
          <div className="flex flex-col gap-1">
            <div
              className="text-xs tracking-widest"
              style={{ color: "#ff4444", textShadow: "0 0 6px #ff4444" }}
            >
              {health}
            </div>
            <div
              className="relative h-3 rounded-sm overflow-hidden"
              style={{
                width: "140px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,68,68,0.4)",
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${health}%`,
                  background:
                    health > 50
                      ? "linear-gradient(90deg, #cc0000, #ff4444)"
                      : health > 25
                      ? "linear-gradient(90deg, #cc4400, #ff6600)"
                      : "linear-gradient(90deg, #880000, #cc0000)",
                  boxShadow:
                    health > 25
                      ? "0 0 8px rgba(255,68,68,0.6)"
                      : "0 0 8px rgba(204,0,0,0.8)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Броня */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full border-2"
            style={{
              borderColor: "#4488ff",
              background: "rgba(68,136,255,0.15)",
              boxShadow: "0 0 8px rgba(68,136,255,0.5)",
            }}
          >
            <Icon name="Shield" size={14} color="#4488ff" />
          </div>
          <div className="flex flex-col gap-1">
            <div
              className="text-xs tracking-widest"
              style={{ color: "#4488ff", textShadow: "0 0 6px #4488ff" }}
            >
              {armor}
            </div>
            <div
              className="relative h-3 rounded-sm overflow-hidden"
              style={{
                width: "140px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(68,136,255,0.4)",
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${armor}%`,
                  background: "linear-gradient(90deg, #2244cc, #4488ff)",
                  boxShadow: "0 0 8px rgba(68,136,255,0.6)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Розыск */}
        <div className="flex items-center gap-1 mt-1">
          {[1, 2, 3, 4, 5, 6].map((star) => (
            <span
              key={star}
              style={{
                color: star <= wantedLevel ? "#FFD700" : "#333",
                textShadow:
                  star <= wantedLevel ? "0 0 6px #FFD700" : "none",
                fontSize: "14px",
                transition: "all 0.3s",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Нижний правый — Оружие */}
      <div
        className="absolute bottom-8 right-8 flex flex-col items-end gap-2"
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded"
          style={{
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,200,0,0.3)",
            boxShadow: "0 0 15px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,200,0,0.03)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 flex items-center justify-center rounded"
              style={{ background: "rgba(255,200,0,0.1)" }}
            >
              <Icon
                name={WEAPONS[weaponIndex].icon}
                size={22}
                color="#FFD700"
              />
            </div>
            <span
              className="text-xs mt-1"
              style={{ color: "#aaa", fontFamily: "'Roboto Condensed', sans-serif" }}
            >
              {WEAPONS[weaponIndex].name}
            </span>
          </div>

          {WEAPONS[weaponIndex].ammo !== null ? (
            <div className="flex flex-col items-end">
              <div
                className="text-3xl font-bold leading-none"
                style={{ color: "#fff", textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
              >
                {WEAPONS[weaponIndex].ammo}
              </div>
              <div
                className="text-sm"
                style={{ color: "#888" }}
              >
                / {WEAPONS[weaponIndex].reserve}
              </div>
              <div
                className="flex gap-0.5 mt-1"
              >
                {Array.from({ length: Math.min(WEAPONS[weaponIndex].ammo!, 17) }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: "4px",
                      height: "10px",
                      background: i < (WEAPONS[weaponIndex].ammo! / 17) * 17 ? "#FFD700" : "#333",
                      boxShadow: "0 0 3px rgba(255,215,0,0.4)",
                    }}
                  />
                ))}
              </div>
            </div>
          ) : WEAPONS[weaponIndex].reserve !== null ? (
            <div
              className="text-2xl font-bold"
              style={{ color: "#fff" }}
            >
              x{WEAPONS[weaponIndex].reserve}
            </div>
          ) : (
            <div
              className="text-sm"
              style={{ color: "#666", fontFamily: "'Roboto Condensed', sans-serif" }}
            >
              —
            </div>
          )}
        </div>
      </div>

      {/* Верхний правый — Деньги и Время */}
      <div className="absolute top-6 right-8 flex flex-col items-end gap-2">
        {/* Деньги */}
        <div
          className="px-4 py-2 rounded"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(0,200,100,0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            className="text-2xl font-bold tracking-wider"
            style={{
              color: "#00CC44",
              textShadow: "0 0 12px rgba(0,204,68,0.7)",
            }}
          >
            ${displayMoney.toLocaleString("ru-RU")}
          </span>
        </div>

        {/* Время */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Icon
            name={isDay ? "Sun" : "Moon"}
            size={14}
            color={isDay ? "#FFD700" : "#aaa"}
          />
          <span
            className="text-lg font-bold tracking-widest"
            style={{
              color: "#fff",
              textShadow: "0 0 8px rgba(255,255,255,0.3)",
            }}
          >
            {String(gameHour).padStart(2, "0")}:{String(gameMinute).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Уведомления */}
      <div className="absolute top-6 left-8 flex flex-col gap-2" style={{ maxWidth: "360px" }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="px-4 py-2 rounded flex items-center gap-2"
            style={{
              background: "rgba(0,0,0,0.82)",
              border: "1px solid rgba(255,200,0,0.25)",
              backdropFilter: "blur(4px)",
              opacity: n.visible ? 1 : 0,
              transform: n.visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              fontFamily: "'Roboto Condensed', sans-serif",
            }}
          >
            <Icon name="Bell" size={13} color="#FFD700" />
            <span style={{ color: "#eee", fontSize: "13px" }}>{n.text}</span>
          </div>
        ))}
      </div>

      {/* Панель управления (демо-режим) */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Roboto Condensed', sans-serif" }}
        >
          Демо-режим
        </span>
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setHealth((h) => Math.max(0, h - 10))}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(255,50,50,0.2)",
              border: "1px solid rgba(255,50,50,0.5)",
              color: "#ff6666",
            }}
          >
            -HP
          </button>
          <button
            onClick={() => setHealth((h) => Math.min(100, h + 10))}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(50,255,100,0.2)",
              border: "1px solid rgba(50,255,100,0.5)",
              color: "#66ff88",
            }}
          >
            +HP
          </button>
          <button
            onClick={() => setArmor((a) => Math.max(0, a - 10))}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(50,100,255,0.2)",
              border: "1px solid rgba(50,100,255,0.5)",
              color: "#6688ff",
            }}
          >
            -Броня
          </button>
          <button
            onClick={() => setMoney((m) => m + Math.floor(Math.random() * 2000 + 500))}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(0,200,80,0.2)",
              border: "1px solid rgba(0,200,80,0.5)",
              color: "#00cc44",
            }}
          >
            +Деньги
          </button>
          <button
            onClick={() =>
              setWeaponIndex((i) => (i + 1) % WEAPONS.length)
            }
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(255,200,0,0.2)",
              border: "1px solid rgba(255,200,0,0.5)",
              color: "#FFD700",
            }}
          >
            Оружие
          </button>
          <button
            onClick={addNotification}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(200,200,200,0.2)",
              border: "1px solid rgba(200,200,200,0.4)",
              color: "#ccc",
            }}
          >
            Уведомление
          </button>
          <button
            onClick={() => setWantedLevel((w) => (w >= 6 ? 0 : w + 1))}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all hover:scale-105"
            style={{
              background: "rgba(255,215,0,0.2)",
              border: "1px solid rgba(255,215,0,0.5)",
              color: "#FFD700",
            }}
          >
            ★ Розыск
          </button>
        </div>
      </div>
    </div>
  );
}