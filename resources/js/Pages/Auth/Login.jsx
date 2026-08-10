import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import "../../../css/login.css";

export default function Login({ status }) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="ورود به حساب کاربری" />

            <div className="login-page" dir="rtl">

                <Link href="/" className="back-home">
                    ← بازگشت به سایت
                </Link>

                <div className="login-container">

                    {/* Right Side */}
                    <div className="login-info">

                        <Link href="/" className="login-logo">
                            <div className="login-logo-icon">
                                H
                            </div>

                            <div>
                                <strong>هتل آریا</strong>
                                <span>ARIA HOTEL</span>
                            </div>
                        </Link>

                        <div className="login-info-content">

                            <span className="login-small-title">
                                خوش آمدید
                            </span>

                            <h1>
                                مدیریت هوشمند
                                <span> اقامت شما</span>
                            </h1>

                            <p>
                                با ورود به حساب کاربری می‌توانید رزروهای خود
                                را مشاهده، مدیریت و تجربه‌ای راحت‌تر از اقامت
                                در هتل داشته باشید.
                            </p>

                            <div className="login-feature">
                                <span>✓</span>
                                مشاهده رزروهای فعال
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                مشاهده تاریخچه رزروها
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                مدیریت اطلاعات حساب
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                ثبت نظر و امتیاز
                            </div>

                        </div>

                        <div className="login-info-footer">
                            اقامتی آرام، لوکس و به‌یادماندنی
                        </div>

                    </div>


                    {/* Left Side */}
                    <div className="login-form-wrapper">

                        <div className="login-form-header">

                            <h2>
                                ورود به حساب
                            </h2>

                            <p>
                                برای ادامه اطلاعات حساب خود را وارد کنید.
                            </p>

                        </div>


                        {status && (
                            <div className="login-status">
                                {status}
                            </div>
                        )}


                        <form
                            onSubmit={submit}
                            className="login-form"
                        >

                            {/* Email */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    ایمیل
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        ✉
                                    </span>

                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="example@email.com"
                                        autoComplete="username"
                                        autoFocus
                                    />

                                </div>

                                {errors.email && (
                                    <div className="input-error">
                                        {errors.email}
                                    </div>
                                )}

                            </div>


                            {/* Password */}

                            <div className="form-group">

                                <label htmlFor="password">
                                    رمز عبور
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        🔒
                                    </span>

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        placeholder="رمز عبور خود را وارد کنید"
                                        autoComplete="current-password"
                                    />

                                    <button
                                        type="button"
                                        className="show-password"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "🙈"
                                            : "👁"}
                                    </button>

                                </div>

                                {errors.password && (
                                    <div className="input-error">
                                        {errors.password}
                                    </div>
                                )}

                            </div>


                            <div className="login-options">

                                <label className="remember-me">

                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        مرا به خاطر بسپار
                                    </span>

                                </label>


                                <Link
                                    href="/forgot-password"
                                    className="forgot-password"
                                >
                                    رمز عبور را فراموش کرده‌اید؟
                                </Link>

                            </div>


                            <button
                                type="submit"
                                className="submit-login"
                                disabled={processing}
                            >
                                {processing
                                    ? "در حال ورود..."
                                    : "ورود به حساب"}
                            </button>


                            <div className="register-link">

                                حساب کاربری ندارید؟

                                <Link href="/register">
                                    ثبت نام کنید
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}