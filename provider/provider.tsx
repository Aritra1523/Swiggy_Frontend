// "use client";

// import { useEffect } from "react";
// import { Provider, useDispatch } from "react-redux";
// import { getCookie } from "cookies-next";
// import { store, AppDispatch } from "@/redux/store/store";
// import { hydrateUser } from "@/redux/slice/auth/authSlice";

// function AuthHydrator({ children }: { children: React.ReactNode }) {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const rawUser = getCookie("user");
//     if (!rawUser) return;

//     try {
//       dispatch(hydrateUser(JSON.parse(String(rawUser))));
//     } catch {
      
//     }
//   }, [dispatch]);

//   return <>{children}</>;
// }

// export default function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Provider store={store}>
//       <AuthHydrator>{children}</AuthHydrator>
//     </Provider>
//   );
// }


"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";

import { store, AppDispatch } from "@/redux/store/store";
import { hydrateUser } from "@/redux/slice/auth/authSlice";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function AuthHydrator({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const rawUser = getCookie("user");

    if (!rawUser) return;

    try {
      dispatch(
        hydrateUser(
          JSON.parse(String(rawUser))
        )
      );
    } catch (error) {
      console.error("Failed to hydrate user:", error);
    }
  }, [dispatch]);

  return <>{children}</>;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthHydrator>
          {children}
        </AuthHydrator>
      </QueryClientProvider>
    </Provider>
  );
}