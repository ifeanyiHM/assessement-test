"use client";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { formattedItem } from "../../../utils/FormatString";
import { cardRequestData } from "../CardRequests";

const Styles = {
  container: "max-full xl:max-w-[28rem] flex flex-col gap-1.5",
  label: "text-[#344054] font-medium text-sm",
  input:
    "w-full px-3.5 py-2.5 text-[#101828] border border-[#D0D5DD] rounded-md bg-[#F5F5F7] box-shadow: 0px 1px 2px 0px #1018280D",
  button:
    "text-white font-medium text-[12px] w-fit xl:text-sm px-2 xl:px-3.5 py-1.5 lg:py-[9px] rounded flex items-center justify-between gap-1 xl:gap-2",
  image: "w-4 h-4 xl:w-5 xl:w-4",
};

function CardRequestDetails() {
  const [status, setStatus] = useState<string>("Pending");
  const [isDownloaded, setIsDownLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const params = useParams();

  const cardRequestDetails = cardRequestData.find(
    (post) => (params?.id as string) === formattedItem(post.branch)
  );

  const sectionRef = useRef(null);

  const handleDownload = async () => {
    if (sectionRef.current) {
      setLoading(true);
      const canvas = await html2canvas(sectionRef.current, {
        ignoreElements: (element) => element.classList.contains("no-capture"),
      });
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "request-details.png";
      link.click();
      setIsDownLoaded(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-5 py-2.5">
      <div className="flex flex-col gap-1 pb-2.5">
        <h2 className="text-lg font-bold text-[#101828]">Request Details</h2>
        <p className="text-sm text-[#475467]">
          Perform predetermined actions on card requests here.
        </p>
      </div>

      <div
        ref={sectionRef}
        className="border border-[#E2E2E2] bg-white p-4 rounded-xl"
      >
        <h3 className="pb-[26px] text-lg font-medium">Card Request Details</h3>
        <div className="grid md:grid-cols-2 gap-y-5 gap-x-8 xl:gap-x-0 mb-5">
          <div className={Styles.container}>
            <label className={Styles.label}>Branch Name</label>
            <input
              type="text"
              value={cardRequestDetails?.branch}
              className={Styles.input}
              disabled
            />
          </div>
          <div className={Styles.container}>
            <label className={Styles.label}>Initiator</label>
            <input
              type="text"
              value={cardRequestDetails?.initiator}
              className={Styles.input}
              disabled
            />
          </div>
          <div className={Styles.container}>
            <label className={Styles.label}>Card Type</label>
            <input
              type="text"
              value={cardRequestDetails?.cardType}
              className={Styles.input}
              disabled
            />
          </div>
          <div className={Styles.container}>
            <label className={Styles.label}>Card Charges</label>
            <input
              type="text"
              value={cardRequestDetails?.charges}
              className={Styles.input}
              disabled
            />
          </div>
          <div className={Styles.container}>
            <label className={Styles.label}>Quantity</label>
            <input
              type="text"
              value={cardRequestDetails?.quantity}
              className={Styles.input}
              disabled
            />
          </div>
          <div className={Styles.container}>
            <label className={Styles.label}>Batch</label>
            <input
              type="text"
              value={cardRequestDetails?.batch}
              className={Styles.input}
              disabled
            />
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <label className={Styles.label}>Date Required</label>
            <span className="text-[#101828]">11/14/2024 10:27:43</span>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <label className={Styles.label}>Status</label>
            <span className="font-medium text-[#344054] px-5 py-[5px] bg-[#F9FAFB] border border-[#EAECF0] rounded-3xl inline w-fit">
              {status}
            </span>
          </div>
          <div className="md:hidden flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <label className={Styles.label}>Date Required</label>
              <span className="text-[#101828]">11/14/2024 10:27:43</span>
            </div>
            <div className="flex flex-col gap-3">
              <label className={Styles.label}>Status</label>
              <span className="font-medium text-[#344054] px-5 py-[5px] bg-[#F9FAFB] border border-[#EAECF0] rounded-3xl inline w-fit">
                {status}
              </span>
            </div>
          </div>
        </div>
        <div className="no-capture flex flex-col md:flex-row justify-center xl:justify-start gap-2 xl:gap-5 min-[13950px]-gap-11: flex-wrap">
          <button
            onClick={handleDownload}
            className={`${Styles.button} bg-[#344054]`}
          >
            {loading ? (
              <span className="spinner-mini"></span>
            ) : (
              <Image
                className={Styles.image}
                src={`/icons/download.svg`}
                alt="download"
                width={20}
                height={20}
              />
            )}
            {loading ? "Downloading..." : "Download for Production"}
          </button>
          <button
            onClick={() => handleStatusChange("In Progress")}
            className={`${Styles.button} bg-[#B54708]`}
          >
            <Image
              className={Styles.image}
              src={`/icons/progress.svg`}
              alt="progress"
              width={20}
              height={20}
            />
            Mark as In Progress
          </button>
          <button
            onClick={() => handleStatusChange("Ready")}
            className={`${Styles.button} bg-[#067647]`}
          >
            <Image
              className={Styles.image}
              src={`/icons/ready.svg`}
              alt="ready"
              width={20}
              height={20}
            />
            Mark as Ready
          </button>
          <button className={`${Styles.button} bg-[#8020E7]`}>
            <Image
              className={Styles.image}
              src={`/icons/dispatch.svg`}
              alt="dispatch"
              width={20}
              height={20}
            />
            Send to Dispatch
          </button>
          <button
            onClick={() => handleStatusChange("Acknowledged")}
            className={`${Styles.button} bg-[#014DAF]`}
          >
            <Image
              className={Styles.image}
              src={`/icons/acknowledge.svg`}
              alt="acknowledge"
              width={20}
              height={20}
            />
            Mark as Acknowledged
          </button>
        </div>
      </div>

      {isDownloaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#101828] bg-opacity-70 z-10 backdrop-blur-md">
          <div className="w-[300px] md:w-[400px] rounded-2xl bg-white p-6">
            <div className="border border-[#EAECF0] p-3 rounded-xl w-fit">
              <Image
                src={`/icons/check-circle.svg`}
                alt="successfully downloaded"
                width={24}
                height={24}
              />{" "}
            </div>
            <p className="mt-4 mb-1 text-lg font-medium text-[#101828]">
              Successful
            </p>
            <p className="text-sm text-[#475467]">
              Production file has been downloaded.
            </p>
            <button
              onClick={() => setIsDownLoaded(false)}
              className="mt-[2rem] md:mt-[3.25rem] text-sm font-medium bg-[#014DAF] py-1.5 px-[18px] text-white rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardRequestDetails;
