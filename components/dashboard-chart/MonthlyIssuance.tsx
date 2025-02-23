import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Image from "next/image";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePickerComponent from "./DatePicker";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyIssuanceProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

const MonthlyIssuance = ({ startDate, setStartDate }: MonthlyIssuanceProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(2);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateAspectRatio = () => {
        setAspectRatio(
          window.innerWidth < 1024 ? 1.3 : window.innerWidth < 1280 ? 1.4 : 2
        );
      };

      updateAspectRatio();
      window.addEventListener("resize", updateAspectRatio);

      return () => window.removeEventListener("resize", updateAspectRatio);
    }
  }, []);

  const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const defaultData = {
    personalized: [10, 20, 5, 8, 15, 18, 8],
    instance: [40, 50, 25, 52, 35, 65, 62],
  };

  const generateRandomData = () => {
    return Array.from({ length: labels.length }, () =>
      Math.floor(Math.random() * 50)
    );
  };

  const data = useMemo(() => {
    const isToday = startDate.toDateString() === new Date().toDateString();

    return {
      labels,
      datasets: [
        {
          label: "Personalized",
          data: isToday ? defaultData.personalized : generateRandomData(),
          backgroundColor: "#014DAF",
          borderColor: "#014DAF",
          borderWidth: 1,
          borderRadius: { topLeft: 2, topRight: 2 },
        },
        {
          label: "Instance",
          data: isToday ? defaultData.instance : generateRandomData(),
          backgroundColor: "#CCE2FF",
          borderColor: "#CCE2FF",
          borderWidth: 1,
          borderRadius: { topLeft: 8, topRight: 8 },
        },
      ],
    };
  }, [startDate]);

  console.log(data);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
          },
          boxWidth: 8,
          boxHeight: 8,
          padding: 25,
        },
        onHover: (event) => {
          if (event?.native?.target) {
            (event.native.target as HTMLElement).style.cursor = "pointer";
          }
        },
      },
    },
    aspectRatio,
    scales: {
      x: {
        stacked: true,
        ticks: {
          stepSize: 20,
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
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#667085",
          font: {
            size: 12,
            weight: "lighter",
          },
          callback: (tickValue: number | string) =>
            typeof tickValue === "number" ? tickValue : "",
        },
        grid: {
          display: true,
          color: "#F2F4F7",
        },
        border: {
          display: false,
          width: 0,
        },
      },
    },
    datasets: {
      bar: {
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    },
  };

  return (
    <div className="relative break-inside-avoid border px-4 py-4 pb-1 bg-white rounded-2xl">
      <Chartjs
        onOpenModal={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      >
        <Bar data={data} options={options} />
      </Chartjs>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/5 max-w-5xl">
            <Chartjs
              onOpenModal={() => setIsModalOpen(false)}
              isModalOpen={isModalOpen}
              startDate={startDate}
              setStartDate={setStartDate}
            >
              <Bar data={data} options={options} />
            </Chartjs>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyIssuance;

interface ChartjsProps {
  children: ReactNode;
  onOpenModal: () => void;
  isModalOpen: boolean;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
}

const Chartjs = ({
  children,
  onOpenModal,
  isModalOpen,
  startDate,
  setStartDate,
}: ChartjsProps) => {
  return (
    <>
      <div className="flex justify-between items-center backdrop:text-lg font-medium mb-[22px]">
        <h2 className="text-lg font-medium text-[#121212]">Monthly Issuance</h2>
        {startDate && (
          <DatePickerComponent
            startDate={startDate ?? new Date()}
            setStartDate={setStartDate ?? (() => {})}
          />
        )}
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

      <hr className="absolute left:-0 right-0 h-[1px] w-full bottom-10" />
    </>
  );
};
