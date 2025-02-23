import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface CardDistributionProps {
  startDate: Date;
}

const CardDistribution = ({ startDate }: CardDistributionProps) => {
  const [aspectRatio, setAspectRatio] = useState(2);
  const [legendPadding, setLegendPadding] = useState(35);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateAspectRatio = () => {
        setAspectRatio(window.innerWidth < 1280 ? 1.6 : 1.7);
      };

      updateAspectRatio();
      window.addEventListener("resize", updateAspectRatio);

      return () => window.removeEventListener("resize", updateAspectRatio);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateLegendPadding = () => {
        setLegendPadding(
          window.innerWidth < 1024 ? 10 : window.innerWidth < 1280 ? 15 : 35
        );
      };

      updateLegendPadding();
      window.addEventListener("resize", updateLegendPadding);

      return () => window.removeEventListener("resize", updateLegendPadding);
    }
  }, []);

  const defaultData = {
    personalized: [1800, 300, 150, 100, 50],
  };

  const generateRandomData = () => {
    return Array.from({ length: defaultData.personalized.length }, () =>
      Math.floor(Math.random() * 50)
    );
  };

  const data = useMemo(() => {
    const isToday = startDate.toDateString() === new Date().toDateString();

    return {
      labels: ["Active", "Expired", "Inactive", "Blocked", "Lost"],
      datasets: [
        {
          label: "Personalized",
          data: isToday ? defaultData.personalized : generateRandomData(),
          backgroundColor: [
            "#01A4AF",
            "#FFBA24",
            "#014DAF",
            "#8020E7",
            "#FF4457",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
          cutout: "88%",
          borderRadius: 5,
        },
      ],
    };
  }, [startDate]);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    aspectRatio,
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
          padding: legendPadding,
        },
        onHover: (event) => {
          if (event?.native?.target) {
            (event.native.target as HTMLElement).style.cursor = "pointer";
          }
        },
      },
    },
  };

  const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: Chart) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      // Set font styles
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Title: "Total Cards"
      ctx.font = "lighter 12px sans-serif";
      ctx.fillStyle = "#808080";
      ctx.fillText("Total Cards", width / 2, height / 2 - 15);

      // Total Sum
      ctx.font = "normal 24px sans-serif";
      ctx.fillStyle = "#121212";
      ctx.fillText(`${total}`, width / 2, height / 2 + 10);

      ctx.save();
    },
  };

  return (
    <div className="break-inside-avoid border p-4 bg-white rounded-2xl">
      <h2 className="text-lg font-medium text-[#121212]">
        Card Status Distribution
      </h2>

      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default CardDistribution;
