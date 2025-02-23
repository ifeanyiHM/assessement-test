"use client";

import Image from "next/image";
import { useState } from "react";

interface Fee {
  name: string;
  value: number;
  frequency: string;
  currency: string;
  time: string;
  accountPad: string;
  account: string;
}

const inputStyle =
  "w-full border border-[#D0D5DD] py-2 xl:py-2.5 px-3.5 text-xs min-[1395px]:text-normal rounded-lg text-[#667085]";
const labelStyle = "text-xs min-[1395px]:text-sm font-medium text-[#344054]";
const radioStyle =
  "w-2 h-2 md:w-4 md:h-4 min-[1395px]:w-6 min-[1395px]:h-6 accent-[#014DAF]";
const radioTextStyle =
  "text-[#121212] text-xs md:text-sm min-[1395px]:text-normal";

export default function FeesTable() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Fee>({
    name: "",
    value: 0,
    frequency: "",
    currency: "NGN",
    time: new Date().toLocaleTimeString(),
    accountPad: "None",
    account: "",
  });

  const addFee = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setFees([...fees, formData]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      value: 0,
      frequency: "One Off",
      currency: "NGN",
      time: new Date().toLocaleTimeString(),
      accountPad: "None",
      account: "",
    });
  };

  return (
    <div className="mt-4 border border-[#E2E2E2] bg-white px-4 pt-4 pb-20 rounded-xl">
      <h3 className="text-lg font-medium text-[#121212]">Fees</h3>
      <button
        onClick={addFee}
        className="bg-[#014DAF] py-2 px-3.5 mt-6 mb-[11px] flex items-center gap-2 text-white text-xs font-medium rounded"
      >
        <span className="text-xl">&#x2B;</span>
        <span>Add Fee</span>
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border mt-2">
          <thead>
            <tr className="bg-[#EAECF0] text-[#475467] text-xs font-medium whitespace-nowrap">
              <th className="border py-2 px-4 md:p-2">Name</th>
              <th className="border py-2 px-4 md:p-2">Value</th>
              <th className="border py-2 px-4 md:p-2">Frequency</th>
              <th className="border py-2 px-4 md:p-2">Currency</th>
              <th className="border py-2 px-4 md:p-2">Time</th>
              <th className="border py-2 px-4 md:p-2">Account Pad</th>
              <th className="border py-2 px-4 md:p-2">Account</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={index} className="text-center">
                {Object.values(fee).map((value, i) => (
                  <td key={i} className="border h-[2.625rem] text-xs">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#101828] bg-opacity-70 z-10 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-3 md:p-6 rounded-2xl w-[90%] md:w-[31rem]">
            <div className="flex justify-between items-top pb-3 xl:pb-5 mb-3 xl:mb-5 border-b border-[#EAECF0]">
              <div className="flex items-center gap-4">
                <div className="border border-[#EAECF0] p-3.5 rounded-xl w-fit">
                  <Image
                    src={`/icons/add-fee.svg`}
                    alt="add fee"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <h3 className="text-lg text-[#101828] font-bold">Add Fee</h3>
                  <p className="text-sm text-[#475467]">
                    Fill in feild details
                  </p>
                </div>
              </div>
              <span
                onClick={closeModal}
                className="hover:bg-[#F6F6F6] w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
              >
                ✖
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2 xl:space-y-4">
                <div className="flex space-x-2 min-[1395px]:flex-col min-[1395px]:space-y-4">
                  <div className="space-y-1.5">
                    <label className={labelStyle}>Fee Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Maintenance"
                      required
                      className={inputStyle}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelStyle}>Value</label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleChange}
                      placeholder="0"
                      className={inputStyle}
                    />
                  </div>
                </div>
                <div className="min-[1395px]:space-y-1.5">
                  <h3 className={labelStyle}>Currency</h3>
                  <div className="flex space-x-4">
                    {["NGN", "USD"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="currency"
                          value={option}
                          checked={formData.currency === option}
                          onChange={handleChange}
                          className={radioStyle}
                          disabled
                        />
                        <span className={radioTextStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="min-[1395px]:space-y-1.5">
                  <h3 className={labelStyle}>Fee Frequency</h3>
                  <div className="flex space-x-4">
                    {["One Off", "Monthly"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={option}
                          checked={formData.frequency === option}
                          onChange={handleChange}
                          className={radioStyle}
                        />
                        <span className={radioTextStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="min-[1395px]:space-y-1.5">
                  <h3 className={labelStyle}>Fee Impact</h3>
                  <div className="flex space-x-4">
                    {["Issuance", "Pin Reissue"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="feeImpact"
                          value={option}
                          // checked={option === option}
                          // onChange={handleChange}
                          className={radioStyle}
                        />
                        <span className={radioTextStyle}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="min-[1395px]:space-y-1.5">
                  <h3 className={labelStyle}>AccountPad</h3>
                  <div className="flex space-x-4">
                    {["None", "Branch Code Prefix", "Branch Code Suffix"].map(
                      (option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="accountPad"
                            value={option}
                            checked={formData.accountPad === option}
                            onChange={handleChange}
                            className={radioStyle}
                          />
                          <span className={radioTextStyle}>{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelStyle}>Account</label>
                  <input
                    type="text"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    placeholder="Maintenance"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="border-t border-[#EAECF0] mt-4 pt-4 xl:mt-8 xl:pt-6">
                <button
                  type="submit"
                  className="bg-[#014DAF] text-white font-bold py-1.5 xl:py-2.5 rounded w-full"
                >
                  Add Fee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
