// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// import { socket } from "@/lib/socket/socket";
// import { RootState } from "@/redux/store/store";

// export default function SocketProvider() {
//   // Get ONLY the access token from Redux
//   const accessToken = useSelector(
//     (state: RootState) => state.auth.accessToken
//   );

//   console.log("Socket Access Token:", accessToken);

//   useEffect(() => {
//     // Don't connect if user is not logged in
//     if (!accessToken) {
//       console.log("No access token. Socket not connecting.");
//       return;
//     }

//     // Set authentication data before connecting
//     socket.auth = {
//       token: accessToken,
//     };

//     // Connect socket
//     if (!socket.connected) {
//       console.log("Connecting socket...");
//       socket.connect();
//     }

//     // =========================
//     // SOCKET EVENTS
//     // =========================

//     const handleConnect = () => {
//       console.log("Socket connected:", socket.id);
//     };

//     const handleConnectError = (error: Error) => {
//       console.error("Socket connection error:", error.message);
//     };

//     const handleDisconnect = (reason: string) => {
//       console.log("Socket disconnected:", reason);
//     };

//     const handleRestaurantStatus = (data: {
//       restaurantName: string;
//       isOpen: boolean;
//     }) => {
//       console.log("RESTAURANT STATUS EVENT:", data);

//       alert(
//         `${data.restaurantName} is ${
//           data.isOpen ? "OPEN" : "CLOSED"
//         }`
//       );
//     };

//     const handleNewOrder = (data: any) => {
//       console.log("RESTAURANT NEW ORDER EVENT:", data);

//       alert("New order received!");
//     };

//     socket.on("connect", handleConnect);

//     socket.on("connect_error", handleConnectError);

//     socket.on("disconnect", handleDisconnect);

//     socket.on(
//       "restaurant:status",
//       handleRestaurantStatus
//     );

//     socket.on(
//       "restaurant:new-order",
//       handleNewOrder
//     );

//     return () => {
//       console.log("Cleaning socket listeners...");

//       socket.off("connect", handleConnect);

//       socket.off(
//         "connect_error",
//         handleConnectError
//       );

//       socket.off(
//         "disconnect",
//         handleDisconnect
//       );

//       socket.off(
//         "restaurant:status",
//         handleRestaurantStatus
//       );

//       socket.off(
//         "restaurant:new-order",
//         handleNewOrder
//       );
//     };
//   }, [accessToken]);

//   return null;
// }
"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

import { socket } from "@/lib/socket/socket";
import { useMyRestaurant } from "@/customHooks/owner/useFoodManagement";

export default function SocketProvider() {
  const { data: restaurantRes } = useMyRestaurant();
  const restaurantId = restaurantRes?.data?._id;

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      console.log("No access token cookie. Socket not connecting.");
      return;
    }

    socket.auth = { token: String(token) };

    if (!socket.connected) {
      console.log("Connecting socket...");
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      if (restaurantId) {
        socket.emit("restaurant:join", restaurantId);
        console.log("Joined room for restaurant:", restaurantId);
      }
    };

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error.message);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
    };

    // const handleRestaurantStatus = (data: {
    //   restaurantName: string;
    //   isOpen: boolean;
    // }) => {
    //   alert(`${data.restaurantName} is ${data.isOpen ? "OPEN" : "CLOSED"}`);
    // };

    // Global new-order notification — fires on every owner page,
    // since SocketProvider lives in owner/layout.tsx
    const handleNewOrder = (data: any) => {
      console.log("RESTAURANT NEW ORDER EVENT:", data);

      Swal.fire({
        title: "🛵 New Order Received!",
        text: `${data?.order?.items?.[0]?.food?.itemName || "N/A"} has been ordered`,
        icon: "success",
        confirmButtonText: "View Orders",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Dismiss",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/owner/order";
        }
      });
    };

    if (socket.connected && restaurantId) {
      socket.emit("restaurant:join", restaurantId);
    }

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);
    // socket.on("restaurant:status", handleRestaurantStatus);
    socket.on("restaurant:new-order", handleNewOrder);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
      // socket.off("restaurant:status", handleRestaurantStatus);
      socket.off("restaurant:new-order", handleNewOrder);
    };
  }, [restaurantId]);

  return null;
}
