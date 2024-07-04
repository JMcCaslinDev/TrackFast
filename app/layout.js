import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrackFast",
  description: "1 Click Job App Tracking!",
  icons: {
    icon: "/logo.svg", // Path to the favicon in the public directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} type="image/svg+xml" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
