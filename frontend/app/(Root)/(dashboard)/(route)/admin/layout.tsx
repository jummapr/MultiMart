import type { Metadata } from "next";
import SideNav from "./components/SideNav";



export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Ecomersh Admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden dashboard-bg">
        <div className="w-10 flex-none lg:w-72 ">
            <SideNav />
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
  );
}
