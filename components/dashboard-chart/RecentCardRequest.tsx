"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Sample Data
const cardRequests = [
  {
    id: 1,
    branch: "Corporate",
    cardType: "Instant",
    quantity: 10,
    status: "Ready",
  },
  {
    id: 2,
    branch: "Corporate",
    cardType: "Personalized",
    quantity: 10,
    status: "In Progress",
  },
  {
    id: 3,
    branch: "Corporate",
    cardType: "Personalized",
    quantity: 10,
    status: "Acknowledged",
  },
  {
    id: 4,
    branch: "Corporate",
    cardType: "Instant",
    quantity: 10,
    status: "Pending",
  },
];

// Status Badge Styling
const statusStyles: Record<string, string> = {
  Ready: "bg-[#ABEFC6] text-[#067647]",
  "In Progress": "bg-[#FEDF89] text-[#B54708]",
  Acknowledged: "bg-[#B2DDFF] text-[#175CD3]",
  Pending: "bg-[#EAECF0] text-[#344054]",
};

function RecentCardRequest() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`break-inside-avoid border px-4 pt-4 pb-8 bg-white rounded-2xl text-[#475467]`}
    >
      <Table
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-w-5xl">
            <Table
              onOpenModal={() => setIsModalOpen(false)}
              isModalOpen={isModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentCardRequest;

interface TableProps {
  onOpenModal: () => void;
  isModalOpen: boolean;
}

const Table = ({ onOpenModal, isModalOpen }: TableProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium text-[#121212]">
          Recent Card Requests
        </h2>
        <button
          onClick={onOpenModal}
          className="relative group rounded-full transition-transform duration-300"
        >
          {isModalOpen ? (
            <span
              className="absolute -top-10 -right-16 border border-[#E2E2E2] bg-[#F6F6F6] 
                     w-8 h-8 flex items-center justify-center rounded-full"
            >
              ✖
            </span>
          ) : (
            <Image
              src={`icons/expand.svg`}
              alt="expand view"
              width={19.6}
              height={19.6}
            />
          )}

          <span
            className={`${
              isModalOpen ? "-right-4 -top-12" : "right-0 top-full"
            } absolute mt-2 w-auto px-3 py-1 text-sm text-white bg-gray-800 
                       rounded-lg shadow-lg opacity-0 scale-95 transition-all duration-300 
                       group-hover:opacity-100`}
          >
            {isModalOpen ? "Close" : "Expand"}
          </span>
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F1F7FF] border border-[#E2E2E2] text-[#0000008F] text-center text-xs">
            <th className="py-2.5 font-medium">Branch</th>
            <th className="py-2.5 font-medium">Card Type</th>
            <th className="py-2.5 font-medium">Quantity</th>
            <th className="py-2.5 font-medium">Status</th>
            <th className="py-2.5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {cardRequests.map(
            ({ id, branch, cardType, quantity, status }, index) => (
              <tr
                key={id}
                className={`${
                  index !== cardRequests.length - 1 ? "border-b" : ""
                } text-[10px] text-center`}
              >
                <td className="py-3">{branch}</td>
                <td className="py-3">{cardType}</td>
                <td className="py-3">{quantity}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 font-medium rounded-full ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="py-3">
                  <Link href="#" className="text-blue-500 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>{" "}
    </>
  );
};
