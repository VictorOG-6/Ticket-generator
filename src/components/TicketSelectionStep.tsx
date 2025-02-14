import { TicketSelector } from "./";

const TicketSelectionStep = () => {
  return (
    <div>
      <div className="flex h-full w-full flex-col items-center space-y-2 rounded-3xl border-x-2 border-b-2 border-[#07373F] bg-radial-(--color-card-gradient) px-4 py-[25px]">
        <h2 className="font-road-rage text-center !text-[52px] leading-[1] text-[#FAFAFA] md:!text-[62px]">
          Techember Fest "25
        </h2>
        <p className="text-center">
          Join us for an unforgettable experience at <br /> [Event Name]! Secure
          your spot now.
        </p>
        <p className="inline items-center gap-4 text-center md:flex">
          <span>📍 [Event Location]</span> <span>| |</span>{" "}
          <span>March 15, 2025 | 7:00 PM</span>
        </p>
      </div>
      <hr className="my-8 border-2 border-[#07373F]" />
      <TicketSelector />
    </div>
  );
};

export default TicketSelectionStep;
