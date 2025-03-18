import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-popins",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// Metadatos de mi aplicacion web
export const metadata = {
  title: "BubbleStore || Shopping",
  description: "Tienda en línea con los mejores productos.",
  icons: {
    icon: "/logo.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
