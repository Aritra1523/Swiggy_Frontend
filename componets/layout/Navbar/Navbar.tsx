"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import LoginDrawer from "@/componets/auth/Login/LoginDrawer";
import RegisterDrawer from "@/componets/auth/Register/RegisterDrawer";
import OTPDrawer from "@/componets/auth/Otp/OTPDrawer";

import PartnerEmailDrawer from "../../partner/AuthPartner/PartnerEmailDrawer";
import PartnerOtpDrawer from "../../partner/AuthPartner/PartnerOtpDrawer";
import useCart from "@/customHooks/order/useCart";
import { logout } from "@/redux/slice/auth/authSlice";

export default function Navbar() {
  const [auth, setAuth] = useState<"login" | "register" | "otp" | null>(null);
  const [partnerStep, setPartnerStep] = useState<
    "email" | "otp" | "details" | null
  >(null);
  const [partnerEmail, setPartnerEmail] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const { cart, handleFetchCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      handleFetchCart();
    }
  }, [user, handleFetchCart]);

  // Handle Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl",
        confirmButton:
          "px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors",
        cancelButton:
          "px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsLoggingOut(true);

    try {
      Swal.fire({
        title: "Logging out...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup: "rounded-2xl",
        },
      });

      // Delete all cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        if (name.trim()) {
          ["/", "/api", "/admin", "/auth", "/owner", "/user"].forEach(
            (path) => {
              document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
              document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${window.location.hostname};`;
            },
          );
        }
      });

      localStorage.clear();
      sessionStorage.clear();

      dispatch(logout());
      queryClient.clear();

      setShowProfile(false);
      setIsMobileMenuOpen(false);

      await new Promise((resolve) => setTimeout(resolve, 500));

      await Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-2xl",
        },
      });

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);

      await Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
        customClass: {
          popup: "rounded-2xl",
        },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

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

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-4 sm:px-6 md:px-10 shadow-md bg-white/95 backdrop-blur-sm border-b border-gray-100">
     
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <img
              src="/icon.jpg"
              alt="Hungrly Logo"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
            Hungrly
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6">
          {["Search", "Offers", "Help"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm lg:text-base"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => router.push("/Order")}
            className="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm lg:text-base"
          >
            Orders
          </button>

          <button
            onClick={handleBecomePartner}
            className="px-5 py-2 text-orange-500 hover:text-white font-semibold rounded-lg hover:bg-orange-500 border-2 border-orange-500 transition-all duration-200 text-sm lg:text-base"
          >
            Become a Partner
          </button>

          {!user ? (
            <button
              onClick={() => setAuth("login")}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all duration-200 text-sm lg:text-base"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-lg uppercase hover:shadow-lg hover:shadow-orange-200 transition-all duration-200 ring-2 ring-orange-200 hover:ring-orange-300"
              >
                {userInitial}
              </button>

              {showProfile && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfile(false)}
                  />
                  <div className="absolute right-0 top-14 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="pb-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 text-lg">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <button
                        onClick={() => {
                          setShowProfile(false);
                          router.push("/profile");
                        }}
                        className="w-full text-left px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          setShowProfile(false);
                          router.push("/Order");
                        }}
                        className="w-full text-left px-3 py-2.5 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        My Orders
                      </button>

                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left px-3 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Logging out...
                          </span>
                        ) : (
                          "Logout"
                        )}
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

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          {/* Cart Icon - Always visible on mobile */}
          <button
            onClick={() => {
              if (!user) {
                setAuth("login");
                return;
              }
              router.push("/cart");
            }}
            className="relative p-2 text-gray-600 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-2">
              {/* Show user info if logged in */}
              {user && (
                <div className="pb-4 border-b border-gray-100 mb-2">
                  <p className="font-semibold text-gray-900 text-lg">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              )}

              {["Search", "Offers", "Help"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/Order");
                }}
                className="w-full text-left px-4 py-3 text-gray-600 hover:text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-all duration-200 text-base"
              >
                Orders
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleBecomePartner();
                }}
                className="w-full text-left px-4 py-3 text-orange-500 hover:text-white font-semibold rounded-lg hover:bg-orange-500 border-2 border-orange-500 transition-all duration-200 text-base text-center"
              >
                Become a Partner
              </button>

              {!user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuth("login");
                  }}
                  className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md shadow-orange-200 transition-all duration-200 text-base text-center"
                >
                  Sign In
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/profile");
                    }}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-base font-medium"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/Order");
                    }}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-base font-medium"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    disabled={isLoggingOut}
                    className="w-full text-left px-4 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Logging out...
                      </span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Auth Drawers */}
      {auth === "login" && (
        <LoginDrawer
          close={() => setAuth(null)}
          openRegister={() => setAuth("register")}
        />
      )}

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

      {auth === "otp" && (
        <OTPDrawer
          email={otpEmail}
          close={() => setAuth(null)}
          openLogin={() => setAuth("login")}
        />
      )}

      {partnerStep === "email" && (
        <PartnerEmailDrawer
          close={() => setPartnerStep(null)}
          openOtp={(email) => {
            setPartnerEmail(email);
            setPartnerStep("otp");
          }}
        />
      )}

      {partnerStep === "otp" && (
        <PartnerOtpDrawer
          email={partnerEmail}
          close={() => setPartnerStep(null)}
        />
      )}
    </>
  );
}
