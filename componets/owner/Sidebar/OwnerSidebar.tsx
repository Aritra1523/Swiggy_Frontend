// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store/store";
// import {
//   LayoutDashboard,
//   UtensilsCrossed,
//   Plus,
//   Store,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { useState } from "react";

// const NAV_ITEMS = [
//   { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
//   { label: "Menu", href: "/owner/foods/foodList", icon: UtensilsCrossed },
//   { label: "Add item", href: "/owner/foods/add", icon: Plus },
//   { label: "Restaurant", href: "/owner/restaurant", icon: Store },
// ];

// export default function OwnerSidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const isActive = (href: string) =>
//     href === "/owner" ? pathname === "/owner" : pathname.startsWith(href);

//   const handleLogout = () => {
//     // TODO: wire to your actual logout action (clear cookies + redux state)
//     router.push("/");
//   };

//   const content = (
//     <>
//       <div className="px-5 py-6 border-b border-gray-100">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
//             {user?.name?.charAt(0).toUpperCase() || "R"}
//           </div>
//           <div className="min-w-0">
//             <p className="font-semibold text-gray-900 text-sm truncate">
//               {user?.name || "Restaurant Owner"}
//             </p>
//             <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 px-3 py-4 space-y-1">
//         {NAV_ITEMS.map((item) => {
//           const Icon = item.icon;
//           const active = isActive(item.href);
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setMobileOpen(false)}
//               className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
//                 active
//                   ? "bg-orange-50 text-orange-600"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//             >
//               <Icon className="w-4.5 h-4.5" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="px-3 py-4 border-t border-gray-100">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
//         >
//           <LogOut className="w-4.5 h-4.5" />
//           Log out
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile top bar */}
//       <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b border-gray-100 px-4 h-16">
//         <span className="font-bold text-gray-900">Restaurant Owner</span>
//         <button
//           onClick={() => setMobileOpen(true)}
//           className="p-2 text-gray-600"
//           aria-label="Open menu"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Mobile drawer */}
//       {mobileOpen && (
//         <div className="md:hidden fixed inset-0 z-50">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMobileOpen(false)}
//           />
//           <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col">
//             <div className="flex justify-end px-3 pt-3">
//               <button
//                 onClick={() => setMobileOpen(false)}
//                 className="p-2 text-gray-500"
//                 aria-label="Close menu"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             {content}
//           </div>
//         </div>
//       )}

//       {/* Desktop sidebar */}
//       <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 bg-white border-r border-gray-100">
//         {content}
//       </aside>
//     </>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

// Sub navigation items for dashboard
const DASHBOARD_SUB_ITEMS = [
  { label: "Overview", href: "/owner", icon: Home },
  { label: "Analytics", href: "/owner/analytics", icon: TrendingUp },
  { label: "Customers", href: "/owner/customers", icon: Users },
];

export default function OwnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/owner" ? pathname === "/owner" : pathname.startsWith(href);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // TODO: wire to your actual logout action (clear cookies + redux state)
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate logout
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const content = (
    <>
      {/* User Profile Section */}
      <div className="px-4 py-5 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-500/25">
              {user?.name?.charAt(0).toUpperCase() || "R"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {user?.name || "Restaurant Owner"}
              </p>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-0.5 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="User menu"
              >
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-500 truncate">{user?.email || "owner@restaurant.com"}</p>
          </div>
        </div>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <div 
            ref={userMenuRef}
            className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
          >
            <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-sm text-gray-700">
              <User className="w-4 h-4 text-gray-400" />
              My Profile
            </button>
            <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-sm text-gray-700">
              <Settings className="w-4 h-4 text-gray-400" />
              Settings
            </button>
            <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-sm text-gray-700">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              Help & Support
            </button>
            <div className="h-px bg-gray-100 mx-4 my-1" />
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors text-sm text-red-600 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-0.5">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  active
                    ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-colors ${
                  active ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"
                }`} />
                <span className="flex-1">{item.label}</span>
                {item.highlight && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-orange-100 text-orange-600 rounded-full">
                    New
                  </span>
                )}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-500 rounded-r-full" />
                )}
                {item.description && (
                  <span className="text-xs text-gray-400 group-hover:text-gray-500 hidden lg:block">
                    {item.description}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-100/80">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quick Stats
          </p>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 font-medium">Total Orders</span>
                <span className="text-sm font-bold text-blue-700">1,284</span>
              </div>
            </div>
            <div className="px-3 py-2 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">Revenue</span>
                <span className="text-sm font-bold text-green-700">₹45,678</span>
              </div>
            </div>
            <div className="px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-600 font-medium">Rating</span>
                <span className="text-sm font-bold text-purple-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                  4.8
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100/80">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Store className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">Restaurant Pro</p>
              <p className="text-[10px] text-gray-400">v2.0.0</p>
            </div>
          </div>
          <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
            <Bell className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-100/80 px-4 h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || "R"}
          </div>
          <span className="font-bold text-gray-900 text-sm">Restaurant Owner</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || "R"}
                </div>
                <span className="font-bold text-gray-900 text-sm">Restaurant</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto relative">
              {content}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-[280px] bg-white border-r border-gray-100/80 shadow-sm">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {content}
        </div>
      </aside>
    </>
  );
}