import Image from "next/image";
import DatePicker from "react-datepicker";

interface DatePickerProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
}

function DatePickerComponent({ startDate, setStartDate }: DatePickerProps) {
  const formatRelativeDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return "One week ago";
    if (diffInDays < 21) return "Two weeks ago";
    if (diffInDays < 28) return "Three weeks ago";
    if (diffInDays < 60) return "One month ago";
    if (diffInDays < 61) return "Over a month month ago";
    return "Date";
  };

  return (
    <div className="flex text-xs px-3 py-2 border border-[#D0D5DD] rounded m-2">
      <div className="flex gap-2 font-medium">
        <Image
          src="icons/calendar.svg"
          alt="date calendat"
          width={14}
          height={14}
        />
        {startDate && (
          <span className="text-gray-500">{formatRelativeDate(startDate)}</span>
        )}
      </div>{" "}
      <div className="">
        {" "}
        &nbsp; |{" "}
        <DatePicker
          selected={startDate}
          onChange={(date) => date && setStartDate(date)}
          dateFormat="dd MMM yyyy"
          popperPlacement="top-end"
          className="custom-input bg-transparent border-none outline-none focus:ring-0 w-[70px] cursor-pointer"
          maxDate={new Date()}
          calendarClassName="custom-calendar"
        />
      </div>
    </div>
  );
}

export default DatePickerComponent;
