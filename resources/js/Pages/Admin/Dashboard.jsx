import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="پنل مدیریت هتل" />

            <div
                dir="rtl"
                style={{
                    minHeight: "100vh",
                    background: "#eef2f5",
                    padding: "40px",
                    fontFamily: "Vazirmatn, sans-serif",
                }}
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "auto",
                    }}
                >
                    <h1>
                        پنل مدیریت هتل
                    </h1>

                    <p
                        style={{
                            color: "#75808d",
                            marginTop: "8px",
                        }}
                    >
                        خوش آمدید {auth.user.name}
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(200px,1fr))",
                            gap: "20px",
                            marginTop: "35px",
                        }}
                    >
                        <AdminCard
                            title="اتاق‌ها"
                            value="0"
                        />

                        <AdminCard
                            title="رزروها"
                            value="0"
                        />

                        <AdminCard
                            title="مشتریان"
                            value="0"
                        />

                        <AdminCard
                            title="درآمد"
                            value="0 تومان"
                        />
                    </div>

                    <div
                        style={{
                            marginTop: "35px",
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                marginLeft: "20px",
                            }}
                        >
                            صفحه اصلی
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            style={{
                                border: 0,
                                background: "#b83b3b",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            خروج از حساب
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

function AdminCard({ title, value }) {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow:
                    "0 5px 25px rgba(0,0,0,0.05)",
            }}
        >
            <p
                style={{
                    color: "#778291",
                }}
            >
                {title}
            </p>

            <strong
                style={{
                    display: "block",
                    marginTop: "10px",
                    fontSize: "25px",
                    color: "#173f5f",
                }}
            >
                {value}
            </strong>
        </div>
    );
}