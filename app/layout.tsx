// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Providers from "@/provider/provider";
// import SocketProvider from "@/lib/socket/SocketProvider/SocketProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Hungrly - Food Delivery",
//   description: "Order delicious food from your favorite restaurants.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <Providers>
//           {/* <SocketProvider /> */}
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/provider/provider";
import SocketProvider from "@/lib/socket/SocketProvider/SocketProvider";

export const metadata: Metadata = {
  title: "Hungrly - Food Delivery",
  description: "Order delicious food from your favorite restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          {/* <SocketProvider /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}