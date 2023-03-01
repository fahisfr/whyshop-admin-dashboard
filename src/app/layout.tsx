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
          <div className="w-full h-screen flex flex-col sm:flex-row  overflow-hidden ">
            {/* <SidePopUpMessage /> */}
            <NavBar />
            <div className=" flex-grow p-4 flex flex-col gap-4 bg-theme-secondary  h-screen  overflow-auto -sm:order-1 ">
              {children}
            </div>
          </div>
        </AppQueryWrapper>
      </body>
    </html>
  );
}
