import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  variable: "--font-mono-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "MONO® — studio for type-first brands",
  description:
    "Brutalist typography, GSAP SplitText choreography, and a two-color diet: black, white, and one scream of red.",
};

export default function MonoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={archivo.variable}>{children}</div>;
}
