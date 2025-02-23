"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formattedItem } from "../../utils/FormatString";

export const cardRequestData = [
  {
    branch: "Corporate",
    initiator: "RootUser",
    quantity: 10,
    batch: "847264905",
    date: "11/14/2024 10:27:43",
    status: "Ready",
    charges: "1500",
    cardType: "Classic Debit",
  },
  {
    branch: "Business",
    initiator: "RootUser",
    quantity: 20,
    batch: "327264900",
    date: "11/14/2024 10:27:43",
    status: "Ready",
    charges: "3000",
    cardType: "Credit",
  },
  {
    branch: "Government",
    initiator: "RootUser",
    quantity: 40,
    batch: "377264901",
    date: "11/14/2024 10:27:43",
    status: "In Progress",
    charges: "800",
    cardType: "Direct Debit",
  },
  {
    branch: "Joint Ventures",
    initiator: "RootUser",
    quantity: 60,
    batch: "257264944",
    date: "11/14/2024 10:27:43",
    status: "Pending",
    charges: "2800",
    cardType: "Direct Debit",
  },
  {
    branch: "Individual",
    initiator: "RootUser",
    quantity: 80,
    batch: "657264922",
    date: "11/14/2024 10:27:43",
    status: "Acknowledged",
    charges: "6500",
    cardType: "Debit",
  },
];

const CardRequests = () => {
  const [search, setSearch] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]";
      case "In Progress":
        return "bg-[#FFFAEB] border-[#FEDF89] text-[#B54708]";
      case "Pending":
        return "bg-[#F9FAFB] border-[#EAECF0] text-[#344054]";
      case "Acknowledged":
        return "bg-[#EFF8FF] border-[#B2DDFF] text-[#175CD3]";
      default:
        return "";
    }
  };

  const filteredData = cardRequestData.filter((row) =>
    row.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-2.5 text-[#475467]">
      <div className="flex flex-col gap-2 pb-[11px]">
        <h2 className="text-lg font-bold text-[#101828]">Card Request</h2>
        <p className="text-sm">View and attend to card requests here.</p>
      </div>

      <div className="border-y border-[#98A2B3]">
        <div className="relative max-w-80 py-2.5">
          <input
            type="text"
            placeholder="Search by branch"
            className="w-full py-[11px] pl-[2.384rem] text-xs border border-[#D0D5DD] rounded-lg focus:ring focus:ring-blue-300 outline-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Image
            className="absolute left-[0.858rem] top-1/2 -translate-y-1/2"
            src="icons/search.svg"
            alt="lapo logo"
            width={16}
            height={16}
          />
        </div>
      </div>

      <div className="overflow-x-auto py-2.5">
        <table className="w-full border-collapse border border-[#EAECF0] rounded-lg shadow-sm">
          <thead>
            <tr className="bg-[#F9FAFB] text-center text-sm">
              {[
                "Branch",
                "Initiator",
                "Quantity",
                "Batch",
                "Date Requested",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 border border-[#EAECF0] font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const branchParams = formattedItem(row.branch);
              return (
                <tr key={index} className="bg-white text-[10px] text-center">
                  <td className="p-3 border border-[#EAECF0]">{row.branch}</td>
                  <td className="p-3 border border-[#EAECF0]">
                    {row.initiator}
                  </td>
                  <td className="p-3 border border-[#EAECF0]">
                    {row.quantity}
                  </td>
                  <td className="p-3 border border-[#EAECF0]">{row.batch}</td>
                  <td className="p-3 border border-[#EAECF0]">{row.date}</td>
                  <td className="p-3 border border-[#EAECF0]">
                    <span
                      className={`px-2 py-1 rounded-3xl font-medium ${getStatusColor(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-200 font-bold">
                    <Link
                      href={`/card-request/${branchParams}`}
                      className="text-[#014DAF] hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardRequests;
