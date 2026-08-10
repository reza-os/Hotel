import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="پنل کاربری" />

            <div
                dir="rtl"
                style={{
                    minHeight: "100vh",
                    background: "#f5f7fa",
                    padding: "40px",
                    fontFamily: "Vazirmatn, sans-serif",
                }}
            >
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "auto",
                        background: "#fff",
                        padding: "35px",
                        borderRadius: "20px",
                    }}
                >
                    <h1>
                        سلام {auth.user.name} 👋
                    </h1>

                    <p
                        style={{
                            color: "#777",
                            marginTop: "10px",
                        }}
                    >
                        به پنل کاربری هتل خوش آمدید.
                    </p>

                    <p
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        نقش:
                        {" "}
                        <strong>
                            کاربر
                        </strong>
                    </p>

                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            marginTop: "30px",
                            marginLeft: "15px",
                            color: "#173f5f",
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
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        خروج
                    </Link>
                </div>
            </div>
        </>
    );
}