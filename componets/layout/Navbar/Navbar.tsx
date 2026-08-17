"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import LoginDrawer from "@/componets/auth/Login/LoginDrawer";
import RegisterDrawer from "@/componets/auth/Register/RegisterDrawer";
import OTPDrawer from "@/componets/auth/Otp/OTPDrawer";

import PartnerEmailDrawer from "../../partner/AuthPartner/PartnerEmailDrawer";
import PartnerOtpDrawer from "../../partner/AuthPartner/PartnerOtpDrawer";
import useCart from "@/customHooks/order/useCart";
import { useRouter } from "next/navigation";
import { Link } from "lucide-react";
export default function Navbar() {
  const [auth, setAuth] = useState<"login" | "register" | "otp" | null>(null);

  const [partnerStep, setPartnerStep] = useState<
    "email" | "otp" | "details" | null
  >(null);

  const [partnerEmail, setPartnerEmail] = useState("");

  const [otpEmail, setOtpEmail] = useState("");

  const [showProfile, setShowProfile] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const { cart, handleFetchCart } = useCart();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      handleFetchCart();
    }
  }, [user, handleFetchCart]);
  // Become Partner

  const handleBecomePartner = () => {
    if (!user) {
      setAuth("login");
      return;
    }

    setPartnerStep("email");
  };
  const cartCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  // User initial

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 shadow-md bg-white/95 backdrop-blur-sm border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-md shadow-orange-200 group-hover:scale-105 transition-transform duration-200">
            S
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Swiggy
          </h1>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {["Search", "Offers", "Help"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm lg:text-base"
            >
              {item}
            </button>
          ))}
          {/* Orders Link - Fixed */}
         <button
  onClick={() => router.push("/Order")}
  className="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm lg:text-base"
>
  Orders
</button>
          {/* Become Partner */}
          <button
            onClick={handleBecomePartner}
            className="px-5 py-2 text-orange-500 hover:text-white font-semibold rounded-lg hover:bg-orange-500 border-2 border-orange-500 transition-all duration-200 text-sm lg:text-base"
          >
            Become a Partner
          </button>

          {/* SIGN IN / USER PROFILE */}
          {!user ? (
            <button
              onClick={() => setAuth("login")}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all duration-200 text-sm lg:text-base"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              {/* Avatar */}
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-lg uppercase hover:shadow-lg hover:shadow-orange-200 transition-all duration-200 ring-2 ring-orange-200 hover:ring-orange-300"
              >
                {userInitial}
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfile(false)}
                  />
                  <div className="absolute right-0 top-14 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="pb-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 text-lg">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      {["Profile", ].map((item) => (
                        <button
                          key={item}
                          className="w-full text-left px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm font-medium"
                        >
                          {item}
                        </button>
                      ))}
                      <button className="w-full text-left px-3 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium">
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Cart */}
          <button
            onClick={() => {
              if (!user) {
                setAuth("login");
                return;
              }

              router.push("/cart");
            }}
            className="relative p-2.5 text-gray-600 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {!user ? (
            <button
              onClick={() => setAuth("login")}
              className="px-4 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-lg"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-sm uppercase"
            >
              {userInitial}
            </button>
          )}
          <button className="p-2 text-gray-600 hover:text-orange-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Login Drawer */}
      {auth === "login" && (
        <LoginDrawer
          close={() => setAuth(null)}
          openRegister={() => setAuth("register")}
        />
      )}

      {/* Register Drawer */}
      {auth === "register" && (
        <RegisterDrawer
          close={() => setAuth(null)}
          backToLogin={() => setAuth("login")}
          onSuccess={(email: string) => {
            setOtpEmail(email);
            setAuth("otp");
          }}
        />
      )}

      {/* User OTP Drawer */}
      {auth === "otp" && (
        <OTPDrawer
          email={otpEmail}
          close={() => setAuth(null)}
          openLogin={() => setAuth("login")}
        />
      )}

      {/* Partner Email Drawer */}
      {partnerStep === "email" && (
        <PartnerEmailDrawer
          close={() => setPartnerStep(null)}
          openOtp={(email) => {
            setPartnerEmail(email);
            setPartnerStep("otp");
          }}
        />
      )}

      {/* Partner OTP Drawer */}
      {partnerStep === "otp" && (
        <PartnerOtpDrawer
          email={partnerEmail}
          close={() => setPartnerStep(null)}
        />
      )}
    </>
  );
}
