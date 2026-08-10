import React, { useState, useEffect } from "react";
import {
  Search, Calendar, Users, Wifi, Coffee, Waves, Utensils, Car,
  Star, MapPin, Phone, Mail, ChevronLeft, ShieldCheck, BedDouble,
  Sun, Moon, LogIn, UserPlus,
} from "lucide-react";
import { Link } from '@inertiajs/react';

// ---------- Theme tokens (light is default; dark is ready to extend) ----------
const THEMES = {
  light: {
    bg: "#F6F8F7",
    surface: "#FFFFFF",
    surfaceAlt: "#EFF4F2",
    border: "#DCE6E3",
    text: "#12302E",
    textMuted: "#5C7472",
    gold: "#B9862F",
    goldSoft: "#F1E4C8",
    teal: "#2E8B84",
    shadow: "0 20px 45px -25px rgba(18,48,46,0.25)",
  },
  dark: {
    bg: "#0F2B2E",
    surface: "#16393D",
    surfaceAlt: "#123336",
    border: "#2C5C61",
    text: "#F4EFE3",
    textMuted: "#8FA6A5",
    gold: "#CBA135",
    goldSoft: "#2A2314",
    teal: "#3FA9A0",
    shadow: "0 20px 45px -25px rgba(0,0,0,0.5)",
  },
};

const ROOMS = [
  { id: 1, name: "اتاق دولوکس رو به باغ", price: "۲٬۸۵۰٬۰۰۰", guests: 2, size: 28, status: "available", tags: ["تخت کینگ", "بالکن", "صبحانه رایگان"] },
  { id: 2, name: "سوئیت خانوادگی", price: "۴٬۲۰۰٬۰۰۰", guests: 4, size: 42, status: "booked", tags: ["دو اتاق‌خواب", "آشپزخانه کوچک", "نشیمن"] },
  { id: 3, name: "اتاق استاندارد", price: "۱٬۹۵۰٬۰۰۰", guests: 2, size: 20, status: "available", tags: ["تخت دو نفره", "میز کار"] },
  { id: 4, name: "سوئیت رویال", price: "۶٬۷۰۰٬۰۰۰", guests: 3, size: 55, status: "maintenance", tags: ["جکوزی", "چشم‌انداز شهر", "پذیرایی VIP"] },
];

function statusMap(theme) {
  return {
    available: { label: "خالی", color: theme.teal },
    booked: { label: "رزرو شده", color: theme.gold },
    maintenance: { label: "در حال تعمیر", color: "#C4593D" },
  };
}

const AMENITIES = [
  { icon: Wifi, title: "اینترنت پرسرعت", desc: "در تمام فضاهای هتل" },
  { icon: Coffee, title: "صبحانه کامل", desc: "هرروز از ساعت ۷ صبح" },
  { icon: Waves, title: "استخر و اسپا", desc: "دسترسی ۲۴ ساعته" },
  { icon: Utensils, title: "رستوران سنتی", desc: "منوی محلی و بین‌المللی" },
  { icon: Car, title: "پارکینگ اختصاصی", desc: "رایگان برای مهمانان" },
  { icon: ShieldCheck, title: "امنیت و نگهبانی", desc: "شبانه‌روزی" },
];

const REVIEWS = [
  { name: "سارا احمدی", rating: 5, text: "برخورد پرسنل فوق‌العاده بود و اتاق دقیقاً همون چیزی بود که تو عکس‌ها دیدم." },
  { name: "محمد رضایی", rating: 4, text: "موقعیت مکانی عالی، فقط صبحانه می‌تونست تنوع بیشتری داشته باشه." },
  { name: "نگار حسینی", rating: 5, text: "برای اقامت خانوادگی بهترین انتخاب بود، بچه‌ها عاشق استخرش شدن." },
];

function FacadeIllustration({ theme }) {
  const [lit, setLit] = useState(() => new Set([1, 4, 6, 9, 13, 16, 19, 22]));

  useEffect(() => {
    const id = setInterval(() => {
      setLit((prev) => {
        const next = new Set(prev);
        const idx = Math.floor(Math.random() * 24);
        next.has(idx) ? next.delete(idx) : next.add(idx);
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // The facade itself always reads as a night scene (it's the signature
  // element for "live room status") regardless of the page theme.
  const cols = 6, rows = 4;
  const windows = [];
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 40 + c * 58, y = 60 + r * 58;
      const on = lit.has(n);
      windows.push(
        <rect key={n} x={x} y={y} width="34" height="34" rx="3"
          style={{ fill: on ? "#E7C468" : "#1C4A4F", opacity: on ? 1 : 0.55, transition: "fill 900ms ease, opacity 900ms ease" }} />
      );
      n++;
    }
  }

  return (
    <svg viewBox="0 0 420 420" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1F22" />
          <stop offset="100%" stopColor="#123336" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="420" fill="url(#skyGrad)" />
      <circle cx="360" cy="55" r="26" fill="#F4EFE3" opacity="0.9" />
      <circle cx="352" cy="48" r="26" fill="#0A1F22" />
      {[...Array(18)].map((_, i) => (
        <circle key={i} cx={(i * 53 + 20) % 400 + 10} cy={(i * 37) % 120 + 10} r="1.6" fill="#F4EFE3" opacity="0.5" />
      ))}
      <rect x="20" y="40" width="380" height="360" rx="6" fill="#123336" stroke="#2C5C61" strokeWidth="2" />
      {windows}
      <rect x="170" y="330" width="80" height="70" rx="4" fill="#0A1F22" />
      <rect x="170" y="330" width="80" height="70" rx="4" fill="none" stroke={theme.gold} strokeWidth="2" />
      <rect x="0" y="392" width="420" height="28" fill="#0A1F22" />
    </svg>
  );
}

export default function HotelHomepage({ canLogin = true, canRegister = true } = {}) {
  const [mode, setMode] = useState("light");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const theme = THEMES[mode];
  const STATUS_MAP = statusMap(theme);

  return (
    <div dir="rtl" style={{
      fontFamily: "'Vazirmatn', sans-serif",
      background: theme.bg, color: theme.text, minHeight: "100%",
      transition: "background 300ms ease, color 300ms ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .hh-btn { transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease; }
        .hh-btn:hover { transform: translateY(-1px); }
        .hh-card { transition: transform 200ms ease, border-color 200ms ease; }
        .hh-card:hover { transform: translateY(-4px); }
        .hh-input:focus { outline: none; }
        .hh-theme-toggle { transition: background 160ms ease, border-color 160ms ease; }
        @media (max-width: 860px) {
          .hh-hero { grid-template-columns: 1fr !important; }
          .hh-hero-art { display: none !important; }
          .hh-auth-labels { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 6%", borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BedDouble size={26} color={theme.gold} />
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: 0.5 }}>هتل مروارید</span>
        </div>

        <nav style={{ display: "flex", gap: 28, fontSize: 15, color: theme.textMuted }}>
          <a href="#rooms" style={{ color: "inherit", textDecoration: "none" }}>اتاق‌ها</a>
          <a href="#amenities" style={{ color: "inherit", textDecoration: "none" }}>امکانات</a>
          <a href="#reviews" style={{ color: "inherit", textDecoration: "none" }}>نظرات</a>
          <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>تماس</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            aria-label={mode === "light" ? "فعال‌سازی حالت تیره" : "فعال‌سازی حالت روشن"}
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="hh-theme-toggle hh-btn"
            style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.surfaceAlt, color: theme.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            {mode === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {canLogin && (
  <Link href="/login" className="hh-btn" style={{
    background: "transparent", color: theme.text, border: `1px solid ${theme.border}`,
    borderRadius: 8, padding: "9px 16px", fontWeight: 600, fontSize: 14,
    fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
    textDecoration: "none",
  }}>
    <LogIn size={15} />
    <span className="hh-auth-labels">ورود</span>
  </Link>
)}

{canRegister && (
  <Link href="/register" className="hh-btn" style={{
    background: theme.gold, color: "#FFFFFF", border: "none",
    borderRadius: 8, padding: "9px 16px", fontWeight: 700, fontSize: 14,
    fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
    textDecoration: "none",
  }}>
    <UserPlus size={15} />
    <span className="hh-auth-labels">ثبت‌نام</span>
  </Link>
)}
        </div>
      </header>

      {/* Hero */}
      <section className="hh-hero" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center", padding: "56px 6% 30px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 20, padding: "6px 14px", fontSize: 13, color: theme.teal, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: theme.teal, display: "inline-block" }} />
            وضعیت اتاق‌ها به‌صورت لحظه‌ای به‌روزرسانی می‌شود
          </div>
          <h1 style={{ fontSize: 44, lineHeight: 1.35, fontWeight: 800, margin: "0 0 18px" }}>
            اقامتی آرام، <span style={{ color: theme.gold }}>رزروی ساده</span>
          </h1>
          <p style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.9, maxWidth: 460, marginBottom: 34 }}>
            اتاق خودتون رو بر اساس تاریخ سفر، تعداد مهمان و امکانات مورد نظر پیدا کنید و در چند ثانیه رزرو رو نهایی کنید.
          </p>

          {/* Search widget */}
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 14, boxShadow: theme.shadow }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: theme.textMuted }}>
              تاریخ ورود
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px" }}>
                <Calendar size={16} color={theme.gold} />
                <input className="hh-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="۱۴۰۴/۰۵/۲۰"
                  style={{ background: "transparent", border: "none", color: theme.text, fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: theme.textMuted }}>
              تاریخ خروج
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px" }}>
                <Calendar size={16} color={theme.gold} />
                <input className="hh-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="۱۴۰۴/۰۵/۲۳"
                  style={{ background: "transparent", border: "none", color: theme.text, fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: theme.textMuted }}>
              مهمانان
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px" }}>
                <Users size={16} color={theme.gold} />
                <input className="hh-input" type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)}
                  style={{ background: "transparent", border: "none", color: theme.text, fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <button className="hh-btn" style={{ alignSelf: "end", background: theme.gold, border: "none", borderRadius: 8, color: "#FFFFFF", fontWeight: 700, fontSize: 14, padding: "0 22px", height: 40, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "inherit" }}>
              <Search size={16} /> جستجو
            </button>
          </div>
        </div>

        <div className="hh-hero-art" style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${theme.border}`, aspectRatio: "1", boxShadow: theme.shadow }}>
          <FacadeIllustration theme={theme} />
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" style={{ padding: "70px 6%" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>امکانات هتل</h2>
        <p style={{ color: theme.textMuted, marginBottom: 34, fontSize: 14 }}>هرچیزی که برای یک اقامت راحت لازم دارید</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {AMENITIES.map((a, i) => (
            <div key={i} className="hh-card" style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20, boxShadow: theme.shadow }}>
              <a.icon size={22} color={theme.teal} />
              <div style={{ fontWeight: 700, fontSize: 15, margin: "12px 0 4px" }}>{a.title}</div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" style={{ padding: "20px 6% 70px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>اتاق‌ها و سوئیت‌ها</h2>
        <p style={{ color: theme.textMuted, marginBottom: 34, fontSize: 14 }}>وضعیت هر اتاق به‌صورت زنده نمایش داده می‌شود</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {ROOMS.map((room) => {
            const st = STATUS_MAP[room.status];
            return (
              <div key={room.id} className="hh-card" style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, boxShadow: theme.shadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: st.color, background: `${st.color}1A`, padding: "4px 10px", borderRadius: 20 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.color, display: "inline-block" }} />
                    {st.label}
                  </div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{room.size} متر</div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{room.name}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {room.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: 11, color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "3px 9px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${theme.border}`, paddingTop: 14 }}>
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: theme.gold }}>{room.price}</span>
                    <span style={{ fontSize: 12, color: theme.textMuted }}> تومان / شب</span>
                  </div>
                  <button className="hh-btn" disabled={room.status !== "available"} style={{
                    background: "transparent",
                    border: `1px solid ${room.status === "available" ? theme.gold : theme.border}`,
                    color: room.status === "available" ? theme.gold : theme.textMuted,
                    borderRadius: 8, padding: "8px 14px", fontSize: 13, fontFamily: "inherit",
                    cursor: room.status === "available" ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    رزرو <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" style={{ padding: "20px 6% 70px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>نظر مهمانان</h2>
        <p style={{ color: theme.textMuted, marginBottom: 34, fontSize: 14 }}>تجربه‌ی واقعی کسانی که اینجا اقامت داشتند</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="hh-card" style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20, boxShadow: theme.shadow }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} color={theme.gold} fill={s < r.rating ? theme.gold : "none"} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: theme.text, lineHeight: 1.9, marginBottom: 14 }}>{r.text}</p>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ borderTop: `1px solid ${theme.border}`, padding: "34px 6%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BedDouble size={20} color={theme.gold} />
          <span style={{ fontWeight: 700 }}>هتل مروارید</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: theme.textMuted }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} /> تهران، خیابان ولیعصر</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} /> ۰۲۱-۱۲۳۴۵۶۷۸</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} /> info@morvarid-hotel.ir</div>
        </div>
      </footer>
    </div>
  );
}
