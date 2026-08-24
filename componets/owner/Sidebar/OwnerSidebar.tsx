"use client";
 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/redux/slice/auth/authSlice";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Plus,
  Store,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings,
  HelpCircle,
  Bell,
  User,
  Home,
  TrendingUp,
  Users,
  Star,
  ClipboardList,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
 
const NAV_ITEMS = [
  { 
    label: "Dashboard", 
    href: "/owner", 
    icon: LayoutDashboard,
    description: "Overview & analytics"
  },
  { 
    label: "Menu Management", 
    href: "/owner/foods/foodList", 
    icon: UtensilsCrossed,
    description: "Manage your dishes"
  },
  { 
    label: "Orders", 
    href: "/owner/order", 
    icon: ClipboardList,
    description: "Manage incoming orders"
  },
  { 
    label: "Add New Item", 
    href: "/owner/foods/add", 
    icon: Plus,
    description: "Create new dish",
    highlight: true
  },
  { 
    label: "Restaurant", 
    href: "/owner/restaurant", 
    icon: Store,
    description: "Restaurant settings"
  },
];
 
export default function OwnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
 
  const isActive = (href: string) =>
    href === "/owner" ? pathname === "/owner" : pathname.startsWith(href);
 
  const handleLogout = async () => {
  // Show confirmation dialog first
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out of your account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    background: 'white',
    backdrop: 'rgba(0,0,0,0.4)',
    customClass: {
      popup: 'rounded-2xl',
      title: 'text-lg font-bold',
      confirmButton: 'px-6 py-2.5 text-sm font-medium',
      cancelButton: 'px-6 py-2.5 text-sm font-medium',
    },
  });
 
  // If user cancels, stop the logout process
  if (!result.isConfirmed) {
    return;
  }
 
  setIsLoggingOut(true);
 
  try {
    // Show loading toast
    Swal.fire({
      title: 'Logging out...',
      text: 'Please wait while we log you out',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'rounded-2xl',
      },
    });
 
    // Delete all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      // Delete with multiple path variations
      ['/', '/api', '/admin', '/auth', '/owner'].forEach(path => {
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${window.location.hostname};`;
      });
    });
 
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
 
    // The actual fix for "UI doesn't update until refresh" — same root
    // cause as the customer Navbar: cookies were cleared but Redux/query
    // cache never were, so every owner page kept rendering stale data.
    dispatch(logout());
    queryClient.clear();
 
    // Wait a moment for cookies to be cleared
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success message
    await Swal.fire({
      icon: 'success',
      title: 'Logged Out!',
      text: 'You have been successfully logged out.',
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-2xl',
      },
    });
    
    // Redirect to home page
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
    
    // Show error message
    await Swal.fire({
      icon: 'error',
      title: 'Logout Failed',
      text: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Try Again',
      customClass: {
        popup: 'rounded-2xl',
      },
    });
  } finally {
    setIsLoggingOut(false);
  }
};
 
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
 
  const content = (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-semibold text-base shadow-lg shadow-orange-500/20">
              {user?.name?.charAt(0).toUpperCase() || "R"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user?.name || "Restaurant Owner"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "owner@restaurant.com"}</p>
          </div>
        </div>
      </div>
 
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium 
                  transition-all duration-200 relative
                  ${active 
                    ? "bg-orange-50 text-orange-600 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon className={`
                  w-4.5 h-4.5 transition-colors flex-shrink-0
                  ${active ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"}
                `} />
                <span className="flex-1">{item.label}</span>
                {item.highlight && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-orange-100 text-orange-600 rounded-full flex-shrink-0">
                    New
                  </span>
                )}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
 
      {/* Footer with Logout Button */}
      <div className="px-3 py-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50/80 rounded-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Store className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Restaurant Pro</p>
              <p className="text-[10px] text-gray-400">v2.0.0</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative group"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            )}
          </button>
        </div>
        
        {/* Optional: Add a small logout text below */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full mt-2 px-3 py-2 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          {isLoggingOut ? "Logging out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
 
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 h-14">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "R"}
          </div>
          <span className="font-semibold text-gray-900 text-sm">Restaurant</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
 
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {user?.name?.charAt(0).toUpperCase() || "R"}
                </div>
                <span className="font-semibold text-gray-900 text-sm">Restaurant</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {content}
            </div>
          </div>
        </div>
      )}
 
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-[260px] bg-white border-r border-gray-100">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {content}
        </div>
      </aside>
    </>
  );
}