import { ReactNode } from "react";
// import Sidenav from "../../../components/Sidenav";

interface LayoutProps {
  children: ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      {/* <Sidenav /> */}
      {children}
    </div>
  );
}

export default layout;
