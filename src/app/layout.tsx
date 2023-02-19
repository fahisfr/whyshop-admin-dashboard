import "./globals.css";

import AppQueryWrapper from "@/helper/AppWrapper";
import NavBar from "@/components/NavBar";
import SidePopUpMessage from "@/components/sidePopUpMessage";

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
          <div className="w-full h-full flex">
            <SidePopUpMessage />
            <NavBar />
            <div className=" flex-grow p-4  h-screen overflow-scroll bg-secondary">
              {children}
            </div>
          </div>
        </AppQueryWrapper>
      </body>
    </html>
  );
}
