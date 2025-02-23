import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ThisWeekIncome() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Personalized",
        data: [50, 20, 40, 35, 60, 25, 80],
        borderColor: "#4DAF01",
        backgroundColor: "none",
        borderWidth: 2,
        pointRadius: 0,
        pointBackgroundColor: "none",
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#667085",
          font: {
            size: 12,
            weight: "lighter",
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
          width: 0,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: "#F2F4F7",
        },
        border: {
          display: false,
          width: 0,
        },
      },
    },
  };

  return (
    <div className="border p-4 bg-white rounded-2xl">
      <ThisWeek
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      >
        <Line data={data} options={options} />
      </ThisWeek>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-w-5xl">
            <ThisWeek
              onOpenModal={() => setIsModalOpen(false)}
              isModalOpen={isModalOpen}
            >
              <Line data={data} options={options} />
            </ThisWeek>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThisWeekIncome;

interface ThisWeekProps {
  onOpenModal: () => void;
  children: ReactNode;
  isModalOpen: boolean;
}

const ThisWeek = ({ onOpenModal, children, isModalOpen }: ThisWeekProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#121212]">
          This Week&apos;s Income
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
      {children}
    </>
  );
};
