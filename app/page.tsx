"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import CardDistribution from "../components/dashboard-chart/CardDistribution";
import DatePickerComponent from "../components/dashboard-chart/DatePicker";
import MonthlyIssuance from "../components/dashboard-chart/MonthlyIssuance";
import RecentCardRequest from "../components/dashboard-chart/RecentCardRequest";
import ThisWeekIncome from "../components/dashboard-chart/ThisWeekIncome";
import Menu from "../components/Menu";
import Sidenav from "../components/Sidenav";

const card = [
  "Manage a Card",
  "Issue Instant Card",
  "Issue Personalized Card",
  "Review Card Request",
];

const data = [
  {
    title: "Total Active Cards",
    value: "26,478",
    growth: "+9%",
    period: "this month",
  },
  {
    title: "Total Personalized Cards",
    value: "15,703",
    growth: "+8.5%",
    period: "this month",
  },
  {
    title: "Today's Revenue",
    value: "₦9.3M",
    growth: "+6%",
    period: "vs yesterday",
  },
  {
    title: "Pending Requests",
    value: "38",
    warning: "Requires attention",
  },
];

export default function Home() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [analyticsData, setAnalyticsData] = useState(data);

  const formatFigure = (num: number | string): string => {
    return Number(num).toLocaleString("en-US");
  };

  useEffect(() => {
    const fetchAnalyticsData = (date: Date) => {
      const day = date.getDate();
      const newData = [
        {
          title: "Total Active Cards",
          value: `${formatFigure(26_000 + day)}`,
          growth: "+9%",
          period: "this month",
        },
        {
          title: "Total Personalized Cards",
          value: `${formatFigure(15_700 + day)}`,
          growth: "+8.5%",
          period: "this month",
        },
        {
          title: "Today's Revenue",
          value: `₦${9 + day * 0.1}M`,
          growth: "+6%",
          period: "vs yesterday",
        },
        {
          title: "Pending Requests",
          value: `${30 + (day % 10)}`,
          warning: "Requires attention",
        },
      ];
      setAnalyticsData(newData);
    };

    fetchAnalyticsData(startDate);
  }, [startDate]);

  return (
    <div className="flex">
      <Sidenav />
      <div className=" w-full">
        <Menu title="Dashboard" />

        <div className="px-5 pb-5 text-[#121212]">
          <div className="md:flex justify-between items-baseline mb-[13px]">
            <div className="md:hidden">
              <DatePickerComponent
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">
                Hi Nazeer, what would you like to do today?
              </h1>
              <p className="text-xs">
                <span className="font-medium">Last Login</span>: 26/11/2024
                14:39:58
              </p>
            </div>
            <div className="hidden md:block">
              <DatePickerComponent
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
          <div className="px-4 pt-4 pb-3.5 bg-white rounded-xl">
            <p>Your Quick Access</p>
            <ul className="grid sm:grid-cols-2 md:flex gap-2 mt-[13px]">
              {card.map((card, index) => (
                <li
                  key={index}
                  className="bg-[#F1F7FF] flex items-center gap-2 xl:gap-4 px-2 xl:px-4 py-2 md:w-[25%] text-sm font-medium"
                >
                  <Image
                    src={`icons/card${index + 1}.svg`}
                    className="lg:w-[25px] xl:w-[28px]"
                    alt={card}
                    width={28}
                    height={28}
                  />
                  <div className="flex items-center gap-1 xl:gap-1.5">
                    <span className="text-xs xl:text-sm"> {card}</span>
                    <Image
                      src={`icons/angle-right.svg`}
                      className="lg:w-[14px] xl:w-[16px]"
                      alt="angle right"
                      width={16}
                      height={16}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 py-2">
            <h2 className="text-lg font-bold">Analytics</h2>
            <hr className="w-full h-[1px] bg-[#D0D5DD]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 rounded-lg text-[#0000008F]">
            {analyticsData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between lg:block border border-[#E2E2E2] rounded-lg pt-3 pl-3 pr-3.5 pb-4 bg-white`}
              >
                <div>
                  {" "}
                  <Image
                    src={`icons/icon${index + 1}.svg`}
                    className="w-[13px] height-[10px]"
                    alt={item.title}
                    width={13.5}
                    height={10}
                  />
                  <h3 className="text-sm pt-1 pb-2.5 font-medium">
                    {item.title}
                  </h3>
                </div>

                <div className="xl:flex items-center justify-between">
                  <p className="text:lg xl:text-2xl font-bold text-[#121212]">
                    {item.value}
                  </p>
                  {item.growth ? (
                    <div className="text-xs flex gap-2">
                      <Image
                        src={`icons/chart${index + 1}.svg`}
                        alt="chart"
                        width={56}
                        height={20}
                      />{" "}
                      <span>{item.period}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#E78020] flex gap-2">
                      <Image
                        src={`icons/chart4.svg`}
                        alt="chart"
                        width={12}
                        height={12}
                      />{" "}
                      <span>{item.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="md:columns-2 gap-4 space-y-4">
            <MonthlyIssuance
              startDate={startDate}
              setStartDate={setStartDate}
            />
            <div className="md:hidden">
              <RecentCardRequest />
            </div>
            <ThisWeekIncome />
            <div className="hidden md:block">
              <RecentCardRequest />
            </div>
            <CardDistribution startDate={startDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
