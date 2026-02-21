import { useState, useEffect, useCallback, useRef } from "react";
import Icon from "@/components/ui/icon";

// ——— Типы ———
interface ChatMessage {
  id: number;
  sender: string;
  role?: "admin" | "player";
  text: string;
}

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  visible: boolean;
}

interface KillFeed {
  id: number;
  killer: string;
  victim: string;
}

// ——— Константы ———
const CHAT_TABS = ["Назем.", "Назем.", "Назем.", "Назем.", "Назем.", "Назем.", "Назем."];

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, sender: "Romario Richardson [654]", text: "Hello, литл пуськи!" },
  { id: 2, sender: "АДМИНИСТРАТОР", role: "admin", text: "Romario Richardson [654]: Открыты заявления на пост каптурщика гетто!" },
  { id: 3, sender: "Romario Richardson [654]", text: "Подавай заяку, чо смотришь?" },
  { id: 4, sender: "Romario Richardson [654]", text: "Подавай заяку, чо смотришь?" },
  { id: 5, sender: "Romario Richardson [654]", text: "Подавай заяку, чо смотришь?" },
  { id: 6, sender: "Romario Richardson [654]", text: "Подавай заяку, чо смотришь?" },
  { id: 7, sender: "Romario Richardson [654]", text: "Подавай заяку, чо смотришь?" },
];

const KILL_FEED: KillFeed[] = [
  { id: 1, killer: "J.Dorian", victim: "R.Richardson" },
  { id: 2, killer: "J.Dorian", victim: "R.Richardson" },
  { id: 3, killer: "J.Dorian", victim: "R.Richardson" },
  { id: 4, killer: "J.Dorian", victim: "R.Richardson" },
];

const QUEST_TASKS = [
  { text: "Убить Билла бейсбольной битой без следов крови", done: false },
  { text: "Воссоединение с семьёй Доменика Тореты без свидетелей (50/780)", done: false },
  { text: "Дать Наше силой взрослиться, чтобы он перестал просыпаться от кошмаров", done: false },
];

const VOICE_SLOTS = ["Микрофон", "Микрофон", "Микрофон", "Микрофон", "Микрофон", "Микрофон"];

export default function Index() {
  const [speed, setSpeed] = useState(85);
  const [health] = useState(100);
  const [fuel, setFuel] = useState(70);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activeTab, setActiveTab] = useState(0);
  const [killFeed] = useState<KillFeed[]>(KILL_FEED);
  const [notification, setNotification] = useState<Notification | null>({
    id: 1,
    title: "ДОСТИЖЕНИЕ ПОЛУЧЕНО!",
    subtitle: "Скилл Паши повышен",
    visible: true,
  });
  const [money] = useState(13000000);
  const [bankMoney] = useState(13000000);
  const [captureLeft] = useState(44);
  const [captureRight] = useState(13);
  const [locationName] = useState("Rockford Ave");
  const [locationSub] = useState("Ocean DriveWay");
  const [hp] = useState(588);
  const [armor] = useState(158);
  const msgIdRef = useRef(100);

  // Авто-скрытие уведомления
  useEffect(() => {
    const t = setTimeout(() => {
      setNotification((n) => (n ? { ...n, visible: false } : null));
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  // Анимация спидометра
  useEffect(() => {
    const t = setInterval(() => {
      setSpeed((s) => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(0, Math.min(200, s + delta));
      });
    }, 800);
    return () => clearInterval(t);
  }, []);

  const sendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    msgIdRef.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: msgIdRef.current, sender: "Вы", text: chatInput.trim() },
    ]);
    setChatInput("");
  }, [chatInput]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  const speedAngle = (speed / 200) * 240 - 120; // от -120 до +120 deg

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        fontFamily: "'Oswald', 'Roboto Condensed', sans-serif",
        background: "#111",
      }}
    >
      {/* Фоновое изображение — GTA сцена */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
        }}
      />
      {/* Имитация городской сцены */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1400 800">
        <rect x="0" y="0" width="1400" height="800" fill="#222" />
        <rect x="200" y="100" width="120" height="500" fill="#333" />
        <rect x="350" y="150" width="80" height="450" fill="#2a2a2a" />
        <rect x="500" y="200" width="200" height="400" fill="#333" />
        <rect x="750" y="50" width="100" height="550" fill="#2a2a2a" />
        <rect x="900" y="120" width="150" height="480" fill="#333" />
        <rect x="1100" y="80" width="120" height="520" fill="#2a2a2a" />
        <rect x="0" y="650" width="1400" height="150" fill="#1a1a1a" />
      </svg>

      {/* ===== ЧАТ — левый нижний блок ===== */}
      <div
        className="absolute bottom-20 left-4 flex flex-col"
        style={{ width: "340px" }}
      >
        {/* Сообщения */}
        <div
          className="flex flex-col gap-0.5 mb-2"
          style={{ maxHeight: "180px", overflowY: "auto" }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{ fontSize: "12px", lineHeight: "1.4" }}>
              {msg.role === "admin" ? (
                <span style={{ color: "#FF6600", fontWeight: 700 }}>
                  {msg.sender}{" "}
                </span>
              ) : (
                <span style={{ color: "#ccc" }}>{msg.sender}: </span>
              )}
              <span style={{ color: msg.role === "admin" ? "#FF8822" : "#fff" }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Табы */}
        <div className="flex gap-1 mb-1">
          {CHAT_TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "2px 6px",
                fontSize: "10px",
                background: activeTab === i ? "rgba(255,120,0,0.8)" : "rgba(0,0,0,0.6)",
                border: activeTab === i ? "1px solid #FF7800" : "1px solid rgba(255,255,255,0.15)",
                color: activeTab === i ? "#fff" : "#999",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Инпут */}
        <div
          className="flex items-center"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "2px",
          }}
        >
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Введите сообщение..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              padding: "5px 8px",
              fontSize: "11px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "5px 8px",
              background: "rgba(255,120,0,0.2)",
              border: "none",
              color: "#FF7800",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        </div>
      </div>

      {/* ===== ЗАХВАТ — верхний центр ===== */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ minWidth: "280px" }}
      >
        {/* Достижение */}
        {notification && (
          <div
            style={{
              background: "rgba(255,120,0,0.9)",
              border: "2px solid #FF7800",
              padding: "6px 24px",
              marginBottom: "8px",
              textAlign: "center",
              opacity: notification.visible ? 1 : 0,
              transition: "opacity 0.5s ease",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(255,120,0,0.5)",
            }}
          >
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", letterSpacing: "2px" }}>
              {notification.title}
            </div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>
              {notification.subtitle}
            </div>
          </div>
        )}

        {/* Счёт захвата */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded"
          style={{
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex items-center gap-2">
            <div style={{ width: "10px", height: "10px", background: "#4CAF50", borderRadius: "50%" }} />
            <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>{captureLeft}</span>
            <span style={{ color: "#4CAF50", fontSize: "10px" }}>The Families</span>
          </div>

          <div
            className="flex flex-col items-center px-3"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", borderRight: "1px solid rgba(255,255,255,0.15)" }}
          >
            <span style={{ color: "#FF7800", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>DM6</span>
            <span style={{ color: "#ccc", fontSize: "13px", fontWeight: 700, letterSpacing: "3px" }}>ЗАХВАТ</span>
          </div>

          <div className="flex items-center gap-2">
            <span style={{ color: "#4488ff", fontSize: "10px" }}>The Ballas</span>
            <span style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>{captureRight}</span>
            <div style={{ width: "10px", height: "10px", background: "#4488ff", borderRadius: "50%" }} />
          </div>
        </div>
      </div>

      {/* ===== ПРАВАЯ ПАНЕЛЬ — статы + квест + килл-фид ===== */}
      <div
        className="absolute top-4 right-4 flex flex-col gap-2"
        style={{ width: "200px" }}
      >
        {/* HP / Броня + ник */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px 10px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1">
                <div style={{ width: "8px", height: "8px", background: "#4CAF50", borderRadius: "50%" }} />
                <span style={{ color: "#ccc", fontSize: "11px" }}>{hp}</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div style={{ width: "8px", height: "8px", background: "#4488ff", borderRadius: "50%" }} />
                <span style={{ color: "#ccc", fontSize: "11px" }}>{armor}</span>
              </div>
            </div>
            <div className="text-right">
              <div style={{ color: "#FF7800", fontSize: "14px", fontWeight: 700 }}>RAMPAGE</div>
              <div style={{ color: "#888", fontSize: "10px", letterSpacing: "1px" }}>DEATHMATCH</div>
            </div>
          </div>

          {/* Оружие */}
          <div
            className="flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              <div style={{ color: "#fff", fontSize: "20px", fontWeight: 700 }}>05</div>
              <div style={{ color: "#666", fontSize: "10px" }}>0:06</div>
            </div>
            <div
              style={{
                background: "rgba(255,120,0,0.15)",
                border: "1px solid rgba(255,120,0,0.3)",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Icon name="Crosshair" size={14} color="#FF7800" />
              <span style={{ color: "#FF7800", fontSize: "11px" }}>AK-47</span>
            </div>
          </div>
        </div>

        {/* Деньги */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "6px 10px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>
              $ {money.toLocaleString("ru-RU")}.00
            </span>
            <Icon name="Wallet" size={12} color="#4CAF50" />
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span style={{ color: "#888", fontSize: "11px" }}>
              $ {bankMoney.toLocaleString("ru-RU")}.00
            </span>
            <Icon name="Building2" size={12} color="#4488ff" />
          </div>
        </div>

        {/* Квест */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "8px 10px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ color: "#FF7800", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>
            НАЗВАНИЕ КВЕСТА ТУТ
          </div>
          {QUEST_TASKS.map((task, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-2">
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: task.done ? "#4CAF50" : "#555",
                  borderRadius: "50%",
                  marginTop: "4px",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#aaa", fontSize: "10px", lineHeight: "1.4", textAlign: "center" }}>
                {task.text}
              </span>
            </div>
          ))}
        </div>

        {/* Килл-фид */}
        <div className="flex flex-col gap-1">
          {killFeed.map((k) => (
            <div
              key={k.id}
              className="flex items-center justify-end gap-1"
              style={{
                background: "rgba(0,0,0,0.6)",
                padding: "3px 8px",
                borderLeft: "2px solid rgba(255,120,0,0.5)",
              }}
            >
              <span style={{ color: "#FF7800", fontSize: "11px" }}>{k.killer}</span>
              <Icon name="Crosshair" size={10} color="#888" />
              <span style={{ color: "#aaa", fontSize: "11px" }}>{k.victim}</span>
            </div>
          ))}
        </div>

        {/* Голосовые слоты */}
        <div className="flex flex-col gap-1 mt-1">
          {VOICE_SLOTS.map((slot, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
              style={{
                background: "rgba(0,0,0,0.5)",
                padding: "3px 8px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#666", fontSize: "10px" }}>{slot}</span>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#888",
                }}
              >
                N
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== СПИДОМЕТР — правый нижний ===== */}
      <div
        className="absolute bottom-6 right-6 flex items-center gap-3"
      >
        {/* Круглый спидометр */}
        <div className="relative" style={{ width: "100px", height: "100px" }}>
          <svg viewBox="0 0 100 100" width="100" height="100">
            {/* Фон дуги */}
            <circle
              cx="50" cy="50" r="42"
              fill="rgba(0,0,0,0.7)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Серый трек */}
            <path
              d="M 15 72 A 42 42 0 1 1 85 72"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Оранжевая дуга скорости */}
            <path
              d="M 15 72 A 42 42 0 1 1 85 72"
              fill="none"
              stroke="#FF6600"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(speed / 200) * 197} 197`}
              style={{ transition: "stroke-dasharray 0.4s ease" }}
            />
            {/* Центральное число */}
            <text
              x="50" y="48"
              textAnchor="middle"
              fill="#fff"
              fontSize="20"
              fontWeight="700"
              fontFamily="Oswald, sans-serif"
            >
              {speed}
            </text>
            <text
              x="50" y="62"
              textAnchor="middle"
              fill="#888"
              fontSize="8"
              fontFamily="Oswald, sans-serif"
            >
              КМ/Ч
            </text>
          </svg>
        </div>

        {/* Правые индикаторы */}
        <div className="flex flex-col gap-2">
          {/* Иконки авто-действий */}
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center justify-center"
              style={{
                width: "24px", height: "24px",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Icon name="Eye" size={12} color="#888" />
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                width: "24px", height: "24px",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Icon name="Lock" size={12} color="#888" />
            </div>
          </div>

          {/* Топливо */}
          <div
            className="flex flex-col gap-1 items-center"
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "4px 6px",
            }}
          >
            <Icon name="Fuel" size={10} color="#FF7800" />
            <div
              style={{
                width: "6px",
                height: "40px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${fuel}%`,
                  background: fuel > 30 ? "#FF7800" : "#ff4444",
                  transition: "height 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Здоровье авто */}
          <div
            className="flex flex-col gap-1 items-center"
            style={{
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "4px 6px",
            }}
          >
            <Icon name="Heart" size={10} color="#4CAF50" />
            <div
              style={{
                width: "6px",
                height: "40px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${health}%`,
                  background: "#4CAF50",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== ЛОКАЦИЯ — нижний левый у спидометра ===== */}
      <div
        className="absolute"
        style={{ bottom: "130px", left: "4px" }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Icon name="Navigation" size={12} color="#FF7800" />
          <div>
            <div style={{ color: "#FF7800", fontSize: "12px", fontWeight: 600 }}>{locationName}</div>
            <div style={{ color: "#666", fontSize: "10px" }}>{locationSub}</div>
          </div>
        </div>
      </div>

      {/* ===== ДЕМО КНОПКИ ===== */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {[
          { label: "⚡ Скорость", action: () => setSpeed(Math.floor(Math.random() * 180 + 20)) },
          { label: "⛽ -Топливо", action: () => setFuel((f) => Math.max(5, f - 15)) },
          { label: "🔔 Достижение", action: () => setNotification({ id: Date.now(), title: "ДОСТИЖЕНИЕ ПОЛУЧЕНО!", subtitle: "Скилл повышен!", visible: true }) },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            style={{
              padding: "4px 10px",
              background: "rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,120,0,0.4)",
              color: "#FF7800",
              fontSize: "10px",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all 0.2s",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
