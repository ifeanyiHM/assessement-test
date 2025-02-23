"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface CardDetailsProps {
  cardName: string;
  binPrefix: string;
  expiration: string;
  description: string;
  cardScheme: string;
  branchBlacklist: string;
  currency: string;
}

export interface CardProfileDataProps {
  name: string;
  currency: string;
  expiration: string;
  binPrefix: string;
  created: string;
}

const details = {
  cardName: "",
  binPrefix: "",
  expiration: "",
  description: "",
  cardScheme: "Verve",
  branchBlacklist: "Head Office",
  currency: "NGN",
};

const cardProfileData = [
  {
    name: "Verve-1",
    currency: "NGN",
    expiration: "40 Months",
    binPrefix: "50611234",
    created: "15/10/2024  23:21:03",
  },
  {
    name: "Master-Card",
    currency: "USD",
    expiration: "20 Months",
    binPrefix: "50611234",
    created: "11/10/2024  23:21:03",
  },
  {
    name: "Debit-Card",
    currency: "NGN",
    expiration: "10 Months",
    binPrefix: "50611234",
    created: "18/10/2024  23:21:03",
  },
];

export interface GeneralContextProps {
  isNavOpen: boolean;
  setIsNavOpen: (type: boolean) => void;
  cardDetails: CardDetailsProps;
  setCardDetails: (details: CardDetailsProps) => void;
  data: CardProfileDataProps[];
  setData: Dispatch<SetStateAction<CardProfileDataProps[]>>;
}

export const defaultGeneralProps: GeneralContextProps = {
  isNavOpen: false,
  setIsNavOpen: () => {},
  cardDetails: details,
  setCardDetails: () => {},
  data: cardProfileData,
  setData: () => {},
};

interface GeneralProviderProps {
  children: ReactNode;
}

const GeneralContext = createContext<GeneralContextProps>(defaultGeneralProps);

function GeneralProvider({ children }: GeneralProviderProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<CardDetailsProps>(details);
  const [data, setData] = useState<CardProfileDataProps[]>(cardProfileData);

  return (
    <GeneralContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
        cardDetails,
        setCardDetails,
        data,
        setData,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export { GeneralContext, GeneralProvider };
