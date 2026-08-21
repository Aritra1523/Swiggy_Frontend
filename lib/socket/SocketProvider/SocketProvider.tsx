"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "@/lib/socket/socket";
import { RootState } from "@/redux/store/store";

export default function SocketProvider() {
    const token = useSelector((state) => state.auth.token);

    console.log("hdh",token)
    useEffect(() => {
        if (!token) return;

        if (!socket.connected) {
            socket.auth = { token };
            socket.connect();
        }

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("restaurant:status", (data) => {
            console.log("EVENT RECEIVED", data);
            alert(
                `${data.restaurantName} is ${data.isOpen ? "OPEN" : "CLOSED"
                }`
            );
        });

        return () => {
            socket.off("connect");
            socket.off("restaurant:status");
        };
    }, [token]);
    return null;
}