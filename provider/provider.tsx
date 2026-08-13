"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { store, AppDispatch } from "@/redux/store/store";
import { hydrateUser } from "@/redux/slice/auth/authSlice";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const rawUser = getCookie("user");
    if (!rawUser) return;

    try {
      dispatch(hydrateUser(JSON.parse(String(rawUser))));
    } catch {
      
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}