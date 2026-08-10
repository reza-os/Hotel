import React, { useState, useEffect } from "react";
import {
  Search, Calendar, Users, Wifi, Coffee, Waves, Utensils, Car,
  Star, MapPin, Phone, Mail, ChevronLeft, ShieldCheck, BedDouble
} from "lucide-react";

const ROOMS = [
  {
    id: 1,
    name: "اتاق دولوکس رو به باغ",
    price: "۲٬۸۵۰٬۰۰۰",
    guests: 2,
    size: 28,
    status: "available",
    tags: ["تخت کینگ", "بالکن", "صبحانه رایگان"],
  },
  {
    id: 2,
    name: "سوئیت خانوادگی",
    price: "۴٬۲۰۰٬۰۰۰",
    guests: 4,
    size: 42,
    status: "booked",
    tags: ["دو اتاق‌خواب", "آشپزخانه کوچک", "نشیمن"],
  },
  {
    id: 3,
    name: "اتاق استاندارد",
    price: "۱٬۹۵۰٬۰۰۰",
    guests: 2,
    size: 20,
    status: "available",
    tags: ["تخت دو نفره", "میز کار"],
  },
  {
    id: 4,
    name: "سوئیت رویال",
    price: "۶٬۷۰۰٬۰۰۰",
    guests: 3,
    size: 55,
    status: "maintenance",
    tags: ["جکوزی", "چشم‌انداز شهر", "پذیرایی VIP"],
  },
];

const STATUS_MAP = {
  available: { label: "خالی", color: "#3FA9A0" },
  booked: { label: "رزرو شده", color: "#CBA135" },
  maintenance: { label: "در حال تعمیر", color: "#B5563C" },
};

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

function FacadeIllustration() {
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

  const cols = 6, rows = 4;
  const windows = [];
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 40 + c * 58;
      const y = 60 + r * 58;
      const on = lit.has(n);
      windows.push(
        <rect
          key={n}
          x={x} y={y} width="34" height="34" rx="3"
          style={{
            fill: on ? "#E7C468" : "#1C4A4F",
            opacity: on ? 1 : 0.55,
            transition: "fill 900ms ease, opacity 900ms ease",
          }}
        />
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
      <rect x="170" y="330" width="80" height="70" rx="4" fill="none" stroke="#CBA135" strokeWidth="2" />
      <rect x="0" y="392" width="420" height="28" fill="#0A1F22" />
    </svg>
  );
}

export default function HotelHomepage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  return (
    <div dir="rtl" style={{ fontFamily: "'Vazirmatn', sans-serif", background: "#0F2B2E", color: "#F4EFE3", minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .hh-btn { transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease; }
        .hh-btn:hover { transform: translateY(-1px); }
        .hh-card { transition: transform 200ms ease, border-color 200ms ease; }
        .hh-card:hover { transform: translateY(-4px); border-color: #CBA135 !important; }
        .hh-input:focus { outline: none; border-color: #CBA135 !important; }
        @media (max-width: 860px) {
          .hh-hero { grid-template-columns: 1fr !important; }
          .hh-hero-art { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 6%", borderBottom: "1px solid #1C4A4F" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BedDouble size={26} color="#CBA135" />
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: 0.5 }}>هتل مروارید</span>
        </div>
        <nav style={{ display: "flex", gap: 28, fontSize: 15, color: "#D8D2C2" }}>
          <a href="#rooms" style={{ color: "inherit", textDecoration: "none" }}>اتاق‌ها</a>
          <a href="#amenities" style={{ color: "inherit", textDecoration: "none" }}>امکانات</a>
          <a href="#reviews" style={{ color: "inherit", textDecoration: "none" }}>نظرات</a>
          <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>تماس</a>
        </nav>
        <button className="hh-btn" style={{ background: "#CBA135", color: "#0F2B2E", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
          ورود مدیریت
        </button>
      </header>

      {/* Hero */}
      <section className="hh-hero" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center", padding: "56px 6% 30px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#16393D", border: "1px solid #2C5C61", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#3FA9A0", marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3FA9A0", display: "inline-block" }} />
            وضعیت اتاق‌ها به‌صورت لحظه‌ای به‌روزرسانی می‌شود
          </div>
          <h1 style={{ fontSize: 44, lineHeight: 1.35, fontWeight: 800, margin: "0 0 18px" }}>
            اقامتی آرام، <span style={{ color: "#CBA135" }}>رزروی ساده</span>
          </h1>
          <p style={{ fontSize: 16, color: "#B9C3C2", lineHeight: 1.9, maxWidth: 460, marginBottom: 34 }}>
            اتاق خودتون رو بر اساس تاریخ سفر، تعداد مهمان و امکانات مورد نظر پیدا کنید و در چند ثانیه رزرو رو نهایی کنید.
          </p>

          {/* Search widget */}
          <div style={{ background: "#16393D", border: "1px solid #2C5C61", borderRadius: 16, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 14 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#8FA6A5" }}>
              تاریخ ورود
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0F2B2E", border: "1px solid #2C5C61", borderRadius: 8, padding: "10px 12px" }}>
                <Calendar size={16} color="#CBA135" />
                <input className="hh-input" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="۱۴۰۴/۰۵/۲۰"
                  style={{ background: "transparent", border: "none", color: "#F4EFE3", fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#8FA6A5" }}>
              تاریخ خروج
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0F2B2E", border: "1px solid #2C5C61", borderRadius: 8, padding: "10px 12px" }}>
                <Calendar size={16} color="#CBA135" />
                <input className="hh-input" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="۱۴۰۴/۰۵/۲۳"
                  style={{ background: "transparent", border: "none", color: "#F4EFE3", fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#8FA6A5" }}>
              مهمانان
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0F2B2E", border: "1px solid #2C5C61", borderRadius: 8, padding: "10px 12px" }}>
                <Users size={16} color="#CBA135" />
                <input className="hh-input" type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)}
                  style={{ background: "transparent", border: "none", color: "#F4EFE3", fontFamily: "inherit", fontSize: 13, width: "100%" }} />
              </div>
            </label>
            <button className="hh-btn" style={{ alignSelf: "end", background: "#CBA135", border: "none", borderRadius: 8, color: "#0F2B2E", fontWeight: 700, fontSize: 14, padding: "0 22px", height: 40, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "inherit" }}>
              <Search size={16} /> جستجو
            </button>
          </div>
        </div>

        <div className="hh-hero-art" style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #2C5C61", aspectRatio: "1", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)" }}>
          <FacadeIllustration />
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" style={{ padding: "70px 6%" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>امکانات هتل</h2>
        <p style={{ color: "#8FA6A5", marginBottom: 34, fontSize: 14 }}>هرچیزی که برای یک اقامت راحت لازم دارید</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {AMENITIES.map((a, i) => (
            <div key={i} style={{ background: "#16393D", border: "1px solid #2C5C61", borderRadius: 14, padding: 20 }}>
              <a.icon size={22} color="#3FA9A0" />
              <div style={{ fontWeight: 700, fontSize: 15, margin: "12px 0 4px" }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "#8FA6A5" }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section id="rooms" style={{ padding: "20px 6% 70px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>اتاق‌ها و سوئیت‌ها</h2>
        <p style={{ color: "#8FA6A5", marginBottom: 34, fontSize: 14 }}>وضعیت هر اتاق به‌صورت زنده نمایش داده می‌شود</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {ROOMS.map((room) => {
            const st = STATUS_MAP[room.status];
            return (
              <div key={room.id} className="hh-card" style={{ background: "#16393D", border: "1px solid #2C5C61", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: st.color, background: `${st.color}22`, padding: "4px 10px", borderRadius: 20 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.color, display: "inline-block" }} />
                    {st.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#8FA6A5" }}>{room.size} متر</div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{room.name}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {room.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: 11, color: "#B9C3C2", border: "1px solid #2C5C61", borderRadius: 12, padding: "3px 9px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #2C5C61", paddingTop: 14 }}>
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#CBA135" }}>{room.price}</span>
                    <span style={{ fontSize: 12, color: "#8FA6A5" }}> تومان / شب</span>
                  </div>
                  <button className="hh-btn" disabled={room.status !== "available"} style={{
                    background: room.status === "available" ? "transparent" : "#0F2B2E",
                    border: `1px solid ${room.status === "available" ? "#CBA135" : "#2C5C61"}`,
                    color: room.status === "available" ? "#CBA135" : "#5C7472",
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
        <p style={{ color: "#8FA6A5", marginBottom: 34, fontSize: 14 }}>تجربه‌ی واقعی کسانی که اینجا اقامت داشتند</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "#16393D", border: "1px solid #2C5C61", borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} color="#CBA135" fill={s < r.rating ? "#CBA135" : "none"} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: "#D8D2C2", lineHeight: 1.9, marginBottom: 14 }}>{r.text}</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#F4EFE3" }}>{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ borderTop: "1px solid #1C4A4F", padding: "34px 6%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BedDouble size={20} color="#CBA135" />
          <span style={{ fontWeight: 700 }}>هتل مروارید</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8FA6A5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} /> تهران، خیابان ولیعصر</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} /> ۰۲۱-۱۲۳۴۵۶۷۸</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} /> info@morvarid-hotel.ir</div>
        </div>
      </footer>
    </div>
  );
}
