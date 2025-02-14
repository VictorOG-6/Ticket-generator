import { BarCodeIllustration, TicketIllustration } from "@/assets";
import { useFormStore } from "@/store/form-store";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const BookedTicketStep = () => {
  const { formData } = useFormStore();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center pb-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
          colors={["#24A0B5", "#0E464F", "#08252B"]}
          initialVelocityY={20}
          gravity={0.2}
        />
      )}
      <h2 className="font-alatsi text-center">Your Ticket is Booked</h2>
      <p className="mt-4 text-center">
        Check your email for a copy or you can download
      </p>
      <div className="relative mt-16 h-[600px] w-full md:w-[300px]">
        <img
          className="absolute top-0 left-0 h-full w-full object-contain"
          src={TicketIllustration}
          alt="ticket-bg"
        />
        <img
          className="absolute bottom-[12px] left-[50%] w-[80%] translate-x-[-50%] object-contain md:bottom-[22px] md:w-[236px]"
          src={BarCodeIllustration}
          alt="barcode"
        />
        <div className="xs:scale-100 xs:top-[20px] absolute top-0 left-[50%] h-[446px] w-[260px] translate-x-[-50%] scale-[0.9] rounded-2xl border border-[#24A0B5] bg-[#031E211A] backdrop-blur-xs">
          <div className="flex h-full w-full flex-col items-center px-[14px] py-[15px]">
            <h2 className="font-road-rage text-center !text-[34px] leading-[1] text-white">
              Techember Fest "25
            </h2>
            <p className="mt-1 text-center !text-[10px]">
              📍 04 Rumens road, Ikoyi, Lagos
            </p>
            <p className="mt-1 text-center !text-[10px]">
              📅 March 15, 2025 | 7:00 PM
            </p>
            <div className="relative mt-5 h-[140px] w-[140px]">
              <div
                className="group absolute top-0 left-[50%] flex h-full w-full translate-x-[-50%] flex-col items-center justify-center overflow-hidden rounded-4xl border-4 border-[#249fb577] bg-[#0E464F] p-6 transition-colors duration-300 hover:bg-[#2C545B]"
                style={{
                  backgroundImage: formData.photoUrl
                    ? `url('${formData.photoUrl}')`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="mt-5 w-full rounded-[8px] border border-[#133D44] bg-[#08343C] p-1">
              <div className="relative grid grid-cols-2">
                <div className="absolute bottom-0 left-[50%] h-[95%] w-[1px] translate-x-[-50%] bg-[#12464E]" />
                <div className="flex flex-col items-start border-b border-[#12464E] p-1 pr-[10px]">
                  <p className="!text-[10px] text-white opacity-[0.33]">
                    Enter your name
                  </p>
                  <p className="mt-1 w-full !text-[11px] font-bold break-words">
                    {formData?.attendeeName}
                  </p>
                </div>
                <div className="flex flex-col items-start border-b border-[#12464E] p-1 pl-[10px]">
                  <p className="!text-[10px] text-white opacity-[0.33]">
                    Enter your email*
                  </p>
                  <p className="mt-1 w-full !text-[11px] font-bold break-words">
                    {formData?.email}
                  </p>
                </div>
                <div className="flex flex-col items-start border-b border-[#12464E] p-1 pr-[10px]">
                  <p className="!text-[10px] text-white opacity-[0.33]">
                    Ticket type:
                  </p>
                  <p className="mt-1 w-full !text-[11px] break-words">
                    {formData?.ticketType}
                  </p>
                </div>
                <div className="flex flex-col items-start border-b border-[#12464E] p-1 pl-[10px]">
                  <p className="!text-[10px] text-white opacity-[0.33]">
                    Ticket for:
                  </p>
                  <p className="mt-1 w-full !text-[12px] break-words">
                    {formData?.noOfTickets}
                  </p>
                </div>
              </div>
              <div className="my-2 px-1">
                <div className="flex flex-col items-start">
                  <p className="!text-[10px] text-white opacity-[0.33]">
                    Special request?
                  </p>
                  <p className="mt-1 !text-[10px]">
                    {formData?.specialRequest || "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTicketStep;
