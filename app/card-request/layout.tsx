import { ReactNode } from "react";
import Sidenav from "../../components/Sidenav";

interface LayoutProps {
  children: ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidenav />
      {children}
    </div>
  );
}

export default layout;
