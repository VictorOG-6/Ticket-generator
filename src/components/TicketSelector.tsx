import { availableTickets } from "@/data/constants";
import { formatTicketPrice } from "@/lib/helpers";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/form-store";

const TicketSelector = () => {
  const { formData, setFormData } = useFormStore();

  // Initialize from formData
  const [selectedTicketId, setSelectedTicketId] = useState<number>(() => {
    const ticket = availableTickets.find(
      (t) => t.ticketType === formData.ticketType
    );
    return ticket?.id ?? availableTickets[0]?.id;
  });

  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    formData.noOfTickets || 1
  );

  // Sync local state with formData changes
  useEffect(() => {
    const ticket = availableTickets.find(
      (t) => t.ticketType === formData.ticketType
    );
    setSelectedTicketId(ticket?.id ?? availableTickets[0]?.id);
  }, [formData.ticketType]);

  useEffect(() => {
    setSelectedQuantity(formData.noOfTickets || 1);
  }, [formData.noOfTickets]);

  const selectedTicket = availableTickets.find(
    (ticket) => ticket.id === selectedTicketId
  );

  useEffect(() => {
    setFormData({
      noOfTickets: selectedQuantity,
      ticketType: selectedTicket?.ticketType,
    });
  }, [selectedQuantity, selectedTicket?.ticketType, setFormData]);

  const getTicketClasses = (ticketId: number) => {
    const baseClasses =
      "flex cursor-pointer flex-col rounded-[12px] p-3 transition-colors duration-300";
    const isSelected = selectedTicketId === ticketId;

    return cn(
      baseClasses,
      isSelected
        ? "border-[#2ac7e6] border bg-[#12464E]"
        : "border-[#197686] border-2 hover:bg-[#2C545B]"
    );
  };

  const getTicketType = (ticketId: number) => {
    const selectedTicketType = availableTickets.find((t) => t.id === ticketId);
    setSelectedTicketId(ticketId);
    setFormData({
      ticketType: selectedTicketType?.ticketType,
    });
  };

  const handleQuantityChange = (value: number) => {
    setSelectedQuantity(value);
    setFormData({ noOfTickets: value });
  };

  return (
    <div className="flex flex-col">
      <div>
        <p>Select Ticket Type:</p>
        <div className="mt-2 rounded-3xl border border-[#07373F] bg-[#052228] p-4">
          <div className="grid gap-y-3 md:grid-cols-3 md:gap-x-[25px] md:gap-y-0">
            {availableTickets?.map((ticket) => {
              return (
                <button
                  onClick={() => getTicketType(ticket.id)}
                  key={ticket.id}
                  className={getTicketClasses(ticket.id)}
                >
                  <h3 className="font-semibold">
                    {formatTicketPrice(ticket.price)}
                  </h3>
                  <div className="mt-3">
                    <p className="text-left !text-[15px] uppercase">
                      {ticket.ticketType} Access
                    </p>
                    <p className="small-text text-left text-[#D9D9D9]">
                      {ticket.date}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-2">Number of Tickets</p>
        <Select
          value={selectedQuantity.toString()}
          onValueChange={(value) => handleQuantityChange(Number(value))}
        >
          <SelectTrigger className="h-12 w-full cursor-pointer border border-[#07373F] text-[16px] ring-0 focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent className="border-primary-border">
            {selectedTicket &&
              [...Array(selectedTicket.quantity)].map((_, index) => (
                <SelectItem
                  className="text-[15px]"
                  key={index + 1}
                  value={(index + 1).toString()}
                >
                  {index + 1}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TicketSelector;
