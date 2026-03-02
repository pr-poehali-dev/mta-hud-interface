import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const POSTS = [
  {
    id: 1,
    author: "RickyMartin_666",
    rank: "Нарушитель",
    rankColor: "#ff4444",
    avatar: "R",
    avatarColor: "#ff4444",
    joined: "Март 2022",
    posts: 1842,
    reputation: -24,
    role: "Игрок",
    content: `Я был в зелёной зоне, мирно стоял у заправки, когда этот игрок подбежал и без предупреждения начал бить меня. Я ничего не делал, просто ждал своего друга.

Прошу разобраться с ситуацией и применить меры согласно правилам сервера. Скриншоты прилагаются.`,
    time: "28 февраля 2024, 14:22",
    isOp: true,
    edited: false,
    likes: 2,
    dislikes: 8,
  },
  {
    id: 2,
    author: "Moderator_Alex",
    rank: "Модератор",
    rankColor: "#4488ff",
    avatar: "M",
    avatarColor: "#4488ff",
    joined: "Январь 2020",
    posts: 12430,
    reputation: 892,
    role: "Модератор",
    content: `Принято в работу. 

@RickyMartin_666, просим вас предоставить:
- Скриншоты с временными метками
- Ник нарушителя точно (с регистром)
- ID чата или репорта в игре

Ожидайте ответа в течение 24 часов.`,
    time: "28 февраля 2024, 15:41",
    isOp: false,
    edited: false,
    likes: 12,
    dislikes: 0,
  },
  {
    id: 3,
    author: "Victim_01",
    rank: "Новичок",
    rankColor: "#888",
    avatar: "V",
    avatarColor: "#888",
    joined: "Февраль 2024",
    posts: 14,
    reputation: 3,
    role: "Игрок",
    content: `Подтверждаю слова автора жалобы. Я тоже был рядом и видел всё происходящее. Игрок явно нарушал правила RDM, атаковал без причины.

Могу скинуть скриншоты если нужно.`,
    time: "28 февраля 2024, 16:05",
    isOp: false,
    edited: true,
    likes: 5,
    dislikes: 1,
  },
  {
    id: 4,
    author: "Admin_Supreme",
    rank: "Администратор",
    rankColor: "#FF6600",
    avatar: "A",
    avatarColor: "#FF6600",
    joined: "Декабрь 2019",
    posts: 34120,
    reputation: 4801,
    role: "Администратор",
    content: `После рассмотрения жалобы и изучения логов сервера:

Игрок **RickyMartin** получает предупреждение за нарушение правил RDM (Random Death Match).

При повторном нарушении — временный бан 7 дней.

Жалоба закрыта. ✓`,
    time: "28 февраля 2024, 19:30",
    isOp: false,
    edited: false,
    likes: 31,
    dislikes: 2,
    isClosed: true,
  },
];

const TOPIC = {
  title: "Жалоба на игрока RickyMartin [654] за нарушение RDM",
  category: "Жалобы на игроков",
  categoryLink: "/forum/section/6",
  views: 1247,
  replies: 12,
  status: "closed",
};

export default function Topic() {
  const { id } = useParams();
  const [replyText, setReplyText] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((p) => p !== postId) : [...prev, postId]
    );
  };

  return (
    <Layout>
      {/* Заголовок темы */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 style={{ fontFamily: "Oswald", fontSize: "clamp(16px, 3vw, 22px)", color: "#fff", lineHeight: 1.3 }}>
            {TOPIC.title}
          </h1>
          {TOPIC.status === "closed" && (
            <div
              style={{
                flexShrink: 0,
                background: "rgba(255,68,68,0.15)",
                border: "1px solid rgba(255,68,68,0.3)",
                padding: "4px 10px",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Icon name="Lock" size={12} color="#ff4444" />
              <span style={{ fontFamily: "Oswald", fontSize: "11px", color: "#ff4444", letterSpacing: "1px" }}>ЗАКРЫТА</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to={TOPIC.categoryLink} style={{ fontSize: "12px", color: "#FF6600", textDecoration: "none" }}>
            {TOPIC.category}
          </Link>
          <span style={{ color: "#444", fontSize: "12px" }}>·</span>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={12} color="#555" />
            <span style={{ fontSize: "12px", color: "#555" }}>{TOPIC.views.toLocaleString()} просмотров</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={12} color="#555" />
            <span style={{ fontSize: "12px", color: "#555" }}>{TOPIC.replies} ответов</span>
          </div>
        </div>
      </div>

      {/* Посты */}
      <div className="flex flex-col gap-4 mb-6">
        {POSTS.map((post) => (
          <div
            key={post.id}
            id={`post-${post.id}`}
            style={{
              background: "rgba(15,17,24,0.9)",
              border: post.isOp ? "1px solid rgba(255,102,0,0.2)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Шапка поста */}
            <div
              style={{
                background: post.isOp ? "rgba(255,102,0,0.06)" : "rgba(0,0,0,0.2)",
                padding: "10px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: "Oswald", fontSize: "13px", color: post.authorColor || "#ccc" }}>
                  {post.author}
                </span>
                <span
                  style={{
                    background: `${post.rankColor}22`,
                    border: `1px solid ${post.rankColor}44`,
                    color: post.rankColor,
                    fontSize: "10px",
                    padding: "1px 6px",
                    fontFamily: "Oswald",
                    letterSpacing: "1px",
                  }}
                >
                  {post.rank}
                </span>
                {post.isOp && (
                  <span style={{ background: "rgba(255,102,0,0.2)", color: "#FF6600", fontSize: "10px", padding: "1px 6px", fontFamily: "Oswald" }}>
                    ОП
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {post.edited && <span style={{ fontSize: "10px", color: "#555", fontStyle: "italic" }}>изменено</span>}
                <span style={{ fontSize: "11px", color: "#555" }}>#{post.id}</span>
                <span style={{ fontSize: "11px", color: "#555" }}>{post.time}</span>
              </div>
            </div>

            {/* Тело поста */}
            <div className="flex">
              {/* Аватар / инфо */}
              <div
                className="hidden sm:flex flex-col items-center gap-2 p-4"
                style={{
                  minWidth: "110px",
                  borderRight: "1px solid rgba(255,255,255,0.04)",
                  background: "rgba(0,0,0,0.15)",
                }}
              >
                {/* Аватар */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: `${post.avatarColor}22`,
                    border: `2px solid ${post.avatarColor}44`,
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Oswald",
                    fontSize: "24px",
                    color: post.avatarColor,
                    fontWeight: 700,
                  }}
                >
                  {post.avatar}
                </div>

                {/* Статистика */}
                <div className="flex flex-col items-center gap-1 w-full">
                  {[
                    { label: "Постов", value: post.posts.toLocaleString() },
                    { label: "С нами", value: post.joined },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center", width: "100%" }}>
                      <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.5px" }}>{s.label.toUpperCase()}</div>
                      <div style={{ fontSize: "11px", color: "#888", fontFamily: "Oswald" }}>{s.value}</div>
                    </div>
                  ))}

                  {/* Репутация */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.5px" }}>РЕПУТАЦИЯ</div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontFamily: "Oswald",
                        color: post.reputation > 0 ? "#4CAF50" : post.reputation < 0 ? "#ff4444" : "#888",
                      }}
                    >
                      {post.reputation > 0 ? "+" : ""}{post.reputation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div style={{ flex: 1, padding: "16px 20px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#ccc",
                    lineHeight: "1.7",
                    whiteSpace: "pre-line",
                  }}
                >
                  {post.content}
                </div>

                {post.isClosed && (
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "10px 14px",
                      background: "rgba(76,175,80,0.08)",
                      border: "1px solid rgba(76,175,80,0.2)",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Icon name="CheckCircle" size={16} color="#4CAF50" />
                    <span style={{ fontSize: "13px", color: "#4CAF50", fontFamily: "Oswald" }}>
                      Жалоба рассмотрена и закрыта
                    </span>
                  </div>
                )}

                {/* Реакции */}
                <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: likedPosts.includes(post.id) ? "#4CAF50" : "#555",
                      fontSize: "12px",
                      transition: "color 0.2s",
                    }}
                  >
                    <Icon name="ThumbsUp" size={13} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#555",
                      fontSize: "12px",
                    }}
                  >
                    <Icon name="ThumbsDown" size={13} />
                    {post.dislikes}
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#555",
                      fontSize: "12px",
                      marginLeft: "auto",
                    }}
                    onClick={() => setReplyText(`@${post.author}, `)}
                  >
                    <Icon name="CornerUpLeft" size={13} />
                    Ответить
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#555",
                      fontSize: "12px",
                    }}
                  >
                    <Icon name="Flag" size={13} />
                    Жалоба
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Форма ответа */}
      {TOPIC.status !== "closed" ? (
        <div
          style={{
            background: "rgba(15,17,24,0.9)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(0,0,0,0.2)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              fontFamily: "Oswald",
              fontSize: "13px",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            НАПИСАТЬ ОТВЕТ
          </div>
          <div style={{ padding: "16px" }}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Напишите ваш ответ..."
              rows={5}
              style={{
                width: "100%",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2px",
                color: "#ccc",
                fontSize: "14px",
                padding: "12px",
                resize: "vertical",
                outline: "none",
                fontFamily: "Roboto, sans-serif",
                lineHeight: 1.6,
                boxSizing: "border-box",
              }}
            />
            <div className="flex justify-end mt-3">
              <button
                style={{
                  padding: "9px 22px",
                  background: "#FF6600",
                  color: "#000",
                  fontFamily: "Oswald",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Icon name="Send" size={14} />
                ОТПРАВИТЬ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center gap-3 py-4"
          style={{
            background: "rgba(15,17,24,0.9)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "2px",
          }}
        >
          <Icon name="Lock" size={16} color="#555" />
          <span style={{ fontSize: "13px", color: "#555" }}>Тема закрыта — ответы не принимаются</span>
        </div>
      )}
    </Layout>
  );
}
