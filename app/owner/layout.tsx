"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import OwnerSidebar from "@/componets/owner/Sidebar/OwnerSidebar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.auth.user);

  // Real access control happens in middleware.ts (server-side, verifies
  // the JWT before this page ever renders). This check is just to avoid
  // a flash of the sidebar + owner UI while Redux is still hydrating from
  // the "user" cookie on first load — middleware would have already
  // redirected away by the time this could matter for a genuinely
  // unauthorized visitor.
  if (!user || user.role !== "restaurant_owner") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-lg font-semibold text-gray-900">
            This area is for restaurant owners
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {!user
              ? "Please log in with a restaurant owner account."
              : "Your account doesn't have owner access."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <OwnerSidebar />
      <div className="flex-1 md:ml-64">{children}</div>
    </div>
  );
}