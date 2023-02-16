import "./globals.css";

import AppQueryWrapper from "@/helper/AppWrapper";
import NavBar from "@/components/navBar/NavBar";
import SidePopUpMessage from "@/components/sidePopUpMessage/sidePopUpMessage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <AppQueryWrapper>
          <div className="app">
            <SidePopUpMessage />
            <NavBar />
            <div className="container">{children}</div>
          </div>
        </AppQueryWrapper>
      </body>
    </html>
  );
}
