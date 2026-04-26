import localFont from "next/font/local";

export const fraunces = localFont({
  src: "../public/fonts/FrauncesVariable.woff2",
  variable: "--font-fraunces",
  display: "optional",
  weight: "300 700",
});

export const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 600",
});

export const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMonoVariable.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});
