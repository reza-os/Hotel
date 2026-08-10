import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import "../../../css/register.css";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/register", {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="ثبت نام" />

            <div className="register-page" dir="rtl">
                <Link href="/" className="register-back-home">
                    ← بازگشت به سایت
                </Link>

                <div className="register-container">

                    {/* بخش معرفی */}
                    <div className="register-info">
                        <Link href="/" className="register-logo">
                            <div className="register-logo-icon">
                                H
                            </div>

                            <div>
                                <strong>هتل آریا</strong>
                                <span>ARIA HOTEL</span>
                            </div>
                        </Link>

                        <div className="register-info-content">
                            <span className="register-small-title">
                                عضویت در هتل آریا
                            </span>

                            <h1>
                                سفر شما از
                                <span> اینجا شروع می‌شود</span>
                            </h1>

                            <p>
                                با ایجاد حساب کاربری می‌توانید اتاق‌های
                                هتل را به‌صورت آنلاین رزرو کرده، رزروهای
                                خود را مدیریت کنید و از پیشنهادهای ویژه
                                بهره‌مند شوید.
                            </p>

                            <RegisterFeature text="رزرو سریع و آنلاین اتاق" />
                            <RegisterFeature text="مشاهده وضعیت رزروها" />
                            <RegisterFeature text="مشاهده تاریخچه اقامت" />
                            <RegisterFeature text="ثبت نظر و امتیاز" />
                            <RegisterFeature text="دریافت پیشنهادهای ویژه" />
                        </div>

                        <div className="register-info-footer">
                            تجربه‌ای متفاوت از اقامت
                        </div>
                    </div>

                    {/* فرم */}
                    <div className="register-form-wrapper">

                        <div className="register-form-header">
                            <h2>ایجاد حساب کاربری</h2>

                            <p>
                                اطلاعات خود را وارد کنید تا حساب شما
                                ایجاد شود.
                            </p>
                        </div>

                        <form
                            onSubmit={submit}
                            className="register-form"
                        >

                            {/* نام */}
                            <div className="register-form-group">

                                <label htmlFor="name">
                                    نام و نام خانوادگی
                                </label>

                                <div className="register-input-wrapper">

                                    <span className="register-input-icon">
                                        👤
                                    </span>

                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="مثلاً علی رضایی"
                                        autoComplete="name"
                                        autoFocus
                                    />

                                </div>

                                {errors.name && (
                                    <div className="register-input-error">
                                        {errors.name}
                                    </div>
                                )}

                            </div>

                            {/* Email */}
                            <div className="register-form-group">

                                <label htmlFor="email">
                                    ایمیل
                                </label>

                                <div className="register-input-wrapper">

                                    <span className="register-input-icon">
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
                                    />

                                </div>

                                {errors.email && (
                                    <div className="register-input-error">
                                        {errors.email}
                                    </div>
                                )}

                            </div>

                            {/* Password */}
                            <div className="register-form-group">

                                <label htmlFor="password">
                                    رمز عبور
                                </label>

                                <div className="register-input-wrapper">

                                    <span className="register-input-icon">
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
                                        placeholder="رمز عبور"
                                        autoComplete="new-password"
                                    />

                                    <button
                                        type="button"
                                        className="register-show-password"
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
                                    <div className="register-input-error">
                                        {errors.password}
                                    </div>
                                )}

                            </div>

                            {/* Password Confirmation */}
                            <div className="register-form-group">

                                <label htmlFor="password_confirmation">
                                    تکرار رمز عبور
                                </label>

                                <div className="register-input-wrapper">

                                    <span className="register-input-icon">
                                        🔐
                                    </span>

                                    <input
                                        id="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            data.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="رمز عبور را تکرار کنید"
                                        autoComplete="new-password"
                                    />

                                    <button
                                        type="button"
                                        className="register-show-password"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation
                                            )
                                        }
                                    >
                                        {showPasswordConfirmation
                                            ? "🙈"
                                            : "👁"}
                                    </button>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="register-submit"
                                disabled={processing}
                            >
                                {processing
                                    ? "در حال ایجاد حساب..."
                                    : "ایجاد حساب کاربری"}
                            </button>

                            <div className="register-login-link">

                                قبلاً ثبت‌نام کرده‌اید؟

                                <Link href="/login">
                                    ورود به حساب
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </>
    );
}


function RegisterFeature({ text }) {
    return (
        <div className="register-feature">
            <span>✓</span>
            {text}
        </div>
    );
}