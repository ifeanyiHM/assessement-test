"use client";

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

      <div className="overflow-x-scroll">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">Add Fee</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Fee Name"
              className="w-full border p-2 mb-2"
            />
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Value"
              className="w-full border p-2 mb-2"
            />
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option value="One Off">One Off</option>
              <option value="Monthly">Monthly</option>
            </select>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
            <select
              name="accountPad"
              value={formData.accountPad}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option value="None">None</option>
              <option value="Branch Code Prefix">Branch Code Prefix</option>
              <option value="Branch Code Suffix">Branch Code Suffix</option>
            </select>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleChange}
              placeholder="Account"
              className="w-full border p-2 mb-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#014DAF] text-white py-2 px-4 rounded"
              >
                Add Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="mt-4 border border-[#E2E2E2] bg-white px-4 pt-4 pb-20 rounded-xl">
        <h3 className="text-lg font-medium text-[#121212]">Fees</h3>
        <button
          onClick={addFee}
          className="bg-[#014DAF] py-2 px-3.5 mt-6 mb-[11px] flex items-center gap-2 text-white text-xs font-medium rounded"
        >
          <span className="text-xl">&#x2B;</span>
          <span>Add Fee</span>
        </button>

        <table className="w-full border-collapse border mt-2">
          <thead>
            <tr className="bg-[#EAECF0] text-[#475467]  text-xs font-medium">
              <th className="border p-2">Name</th>
              <th className="border p-2">Value</th>
              <th className="border p-2">Frequency</th>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Account Pad</th>
              <th className="border p-2">Account</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={index} className="text-center">
                {Object.keys(fee).map((key) => {
                  return (
                    <td key={key} className="border h-[2.625rem] text-xs">
 
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */
}
