import "./globals.css";
import { Providers } from "@/context/providers";

export const metadata = {
  title: "StudySync - Student Productivity",
  description: "Study time-blocker and planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}