import "./globals.css";

import ReactQueryWrapper from "@/helper/ReactQueryWrapper";
import NavBar from "@/components/navBar/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReactQueryWrapper>
          <div className="app">
            <NavBar />
            <div className="container">{children}</div>
          </div>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
