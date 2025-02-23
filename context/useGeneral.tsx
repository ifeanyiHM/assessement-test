import { useContext } from "react";
import { GeneralContext } from "./GeneralContext";
// import { GeneralContext } from "./GeneralProvider";

function useGeneral() {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneral must be used within a BlogProvider");
  }
  return context;
}

export default useGeneral;
