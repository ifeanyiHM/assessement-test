"use client";

import { useRouter } from "next/navigation";
import { CardProfileDataProps } from "../../../context/GeneralContext";
import useGeneral from "../../../context/useGeneral";
import FeesTable from "./FeesTable";

const Styles = {
  container: "max-full xl:max-w-[28rem] flex flex-col gap-1.5",
  label: "text-[#344054] font-medium text-sm",
  input:
    "w-full px-3.5 py-2.5 text-[#101828] border border-[#D0D5DD] rounded-md bg-[#F5F5F7] box-shadow: 0px 1px 2px 0px #1018280D",
  button:
    "text-white font-medium lg:text-[12px] w-fit xl:text-sm px-2 xl:px-3.5 py-[9px] rounded flex items-center justify-between gap-1 xl:gap-2",
  image: "w-4 h-4 xl:w-5 xl:w-4",
};

function CreateProfile() {
  const { cardDetails, setCardDetails, data, setData } = useGeneral();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newCard: CardProfileDataProps = {
      ...cardDetails,
      name: cardDetails.cardName,
      expiration: `${cardDetails.expiration} Months`,
      created: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(",", ""),
    };

    setData([...data, newCard]);
    setCardDetails({
      cardName: "",
      binPrefix: "",
      expiration: "",
      description: "",
      cardScheme: "Verve",
      branchBlacklist: "Head Office",
      currency: "NGN",
    });
    router.back();
    console.log("Submitted Card Details:", newCard);
  };

  return (
    <div className="w-full px-5 py-2.5">
      <div className="flex flex-col gap-1 pb-2.5">
        <h2 className="text-lg font-bold text-[#101828]">Create Profile</h2>
        <p className="text-sm text-[#475467]">
          Fill the profile Details and add card fee.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border border-[#E2E2E2] bg-white p-4 rounded-xl">
          <h3 className="pb-[26px] text-lg font-medium">Profile Details</h3>
          <div className="grid md:grid-cols-2 gap-y-5 gap-x-8 xl:gap-x-0 mb-5">
            <div className={Styles.container}>
              <label className={Styles.label}>Card Name*</label>
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleChange}
                className={Styles.input}
                required
              />
            </div>
            <div className={Styles.container}>
              <label className={Styles.label}>Bin Prefix*</label>
              <input
                type="text"
                name="binPrefix"
                value={cardDetails.binPrefix}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCardDetails({ ...cardDetails, binPrefix: value });
                }}
                className={Styles.input}
                required
                placeholder="000000"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className={Styles.container}>
              <label className={Styles.label}>Card Scheme*</label>
              <select
                name="cardScheme"
                value={cardDetails.cardScheme}
                onChange={handleChange}
                className={Styles.input}
                required
              >
                <option>Verve</option>
                <option>Visa</option>
                <option>Mastercard</option>
              </select>
            </div>
            <div className={Styles.container}>
              <label className={Styles.label}>Expiration*</label>
              <input
                type="number"
                name="expiration"
                value={cardDetails.expiration}
                onChange={handleChange}
                className={Styles.input}
                required
                placeholder="0"
              />
            </div>
            <div className={Styles.container}>
              <label className={Styles.label}>Description</label>
              <input
                type="text"
                name="description"
                value={cardDetails.description}
                onChange={handleChange}
                className={Styles.input}
              />
            </div>

            <div className={Styles.container}>
              <label className={Styles.label}>Currency*</label>
              <select
                name="currency"
                value={cardDetails.currency}
                onChange={handleChange}
                className={Styles.input}
                required
              >
                <option>NGN</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>

        <FeesTable />

        <button
          type="submit"
          className="mt-[2.188rem] bg-[#014DAF] font-bold text-white py-2.5 px-24 rounded"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default CreateProfile;
