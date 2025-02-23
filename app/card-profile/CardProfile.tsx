"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useGeneral from "../../context/useGeneral";

const CardProfile = () => {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    currency: "",
    expiration: "",
    binPrefix: "",
    created: "",
  });

  const { data, setData } = useGeneral();

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(index: number) {
    setData(data.filter((_, i) => i !== index));
  }

  function handleEdit(index: number) {
    setEditIndex(index);
    setEditForm(data[index]);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = {
        ...editForm,
        expiration: `${editForm.expiration} Months`,
      };
      setData(updatedData);
      setEditIndex(null);
    }
  }

  return (
    <div className="px-5 py-2.5 text-[#475467]">
      <div className="flex flex-col gap-2 pb-[11px]">
        <h2 className="text-lg font-bold text-[#101828]">Card Request</h2>
        <p className="text-sm">View and attend to card requests here.</p>
      </div>

      <div className="border-y border-[#98A2B3] flex justify-between items-center">
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
        <Link
          href="/card-profile/create-profile"
          className="bg-[#014DAF] py-2 px-3.5 flex items-center gap-2 text-white text-xs font-medium"
        >
          <span className="text-xl">&#x2B;</span>
          <span>Add Profile</span>
        </Link>
      </div>

      {!data.length ? (
        <p className="text-center text-gray-500 py-4">Start by adding data</p>
      ) : !filteredData.length ? (
        <p className="text-center text-gray-500 py-4">
          The card with the name
          <span className="font-semibold">
            &nbsp; &quot;{search}&quot;
          </span>{" "}
          does not exist!
        </p>
      ) : (
        <div className="overflow-x-auto py-2.5">
          <table className="w-full border-collapse border border-[#EAECF0] rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#F9FAFB] text-center text-sm">
                {[
                  "Card Name",
                  "Currency",
                  "Expiration",
                  "Bin Prefix",
                  "Date Created",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className={`${
                      header === "Action" ? "py-3 px-5 md:p-3" : "p-3"
                    } border border-[#EAECF0] font-medium whitespace-nowrap`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => {
                return (
                  <tr key={index} className="bg-white text-[10px] text-center">
                    <td className="p-3 border border-[#EAECF0] whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="p-3 border border-[#EAECF0] whitespace-nowrap">
                      {row.currency}
                    </td>
                    <td className="p-3 border border-[#EAECF0] whitespace-nowrap">
                      {row.expiration}
                    </td>
                    <td className="p-3 border border-[#EAECF0] whitespace-nowrap">
                      {row.binPrefix}
                    </td>
                    <td className="p-3 border border-[#EAECF0] whitespace-nowrap">
                      {row.created}
                    </td>

                    <td className="p-3 border border-gray-200 font-bold whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(index)}
                        className="relative group"
                      >
                        <Image
                          src={`/icons/delete.svg`}
                          className="w-6 h-6 md:w-[36px] md:h-[36px]"
                          alt=""
                          width={36}
                          height={36}
                        />
                        <span
                          className="absolute right-7 top-5 px-3 py-1 text-xs text-white bg-gray-800 
                          rounded-lg shadow-lg opacity-0 transition-all duration-300 
                          group-hover:opacity-100 font-normal"
                        >
                          delete
                        </span>
                      </button>
                      <button
                        className="relative group"
                        onClick={() => handleEdit(index)}
                      >
                        <Image
                          src={`/icons/edit.svg`}
                          className="w-6 h-6 md:w-[36px] md:h-[36px]"
                          alt=""
                          width={36}
                          height={36}
                        />
                        <span
                          className="absolute -right-7 top-5 px-3 py-1 text-xs text-white bg-gray-800 
                          rounded-lg shadow-lg opacity-0 transition-all duration-300 
                          group-hover:opacity-100 font-normal"
                        >
                          Edit
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#101828] bg-opacity-70 z-10 backdrop-blur-md">
          <div className="mt-4 p-4 border border-gray-300 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Edit Card Profile</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Card Name"
              />

              <select
                name="currency"
                value={editForm.currency}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option>NGN</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
              <input
                type="number"
                name="expiration"
                value={editForm.expiration}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Expiration"
              />
              <input
                type="text"
                name="binPrefix"
                value={editForm.binPrefix}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setEditForm({ ...editForm, binPrefix: value });
                }}
                className="border p-2 rounded"
                placeholder="Bin Prefix"
                pattern="[0-9]*"
              />
              <input
                type="text"
                name="created"
                value={Date.now()}
                className="border p-2 rounded"
                placeholder="Date Created"
                disabled
              />
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditIndex(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default CardProfile;
