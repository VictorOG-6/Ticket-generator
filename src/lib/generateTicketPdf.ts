import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FormData } from "@/types";
import { TicketIllustration } from "@/assets";

export const generateTicketPDF = async (formData: FormData) => {
  const generateTicketField = (label: string, value: string) => `
    <div style="
      border-bottom: 1px solid #12464E;
      padding: 4px 0;
      width: 100%;
    ">
      <p style="
        color: rgba(255,255,255,0.33);
        font-size: 10px;
        margin: 0;
        font-family: Arial, sans-serif;
      ">${label}</p>
      <p style="
        font-size: 11px;
        font-weight: ${label.includes("type") || label.includes("for") ? "400" : "bold"};
        margin: 4px 0 0;
        word-break: break-word;
        font-family: Arial, sans-serif;
        color: white;
      ">${value}</p>
    </div>
  `;

  const ticketElement = document.createElement("div");
  ticketElement.style.width = "260px";
  ticketElement.style.height = "550px";
  ticketElement.style.padding = "15px 14px";
  ticketElement.style.background =
    "linear-gradient(180deg, #031E21 0%, #08252B 100%)";
  ticketElement.style.borderRadius = "16px";
  ticketElement.style.border = "1px solid #24A0B5";
  ticketElement.style.position = "relative";
  ticketElement.style.overflow = "hidden";
  ticketElement.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";

  ticketElement.innerHTML = `
    <div style="
      position: relative;
      height: 100%;
      width: 100%;
    ">
      <img 
        src="${TicketIllustration}" 
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.1;
          z-index: 1;
        "
        alt="ticket-bg"
      />
      <div style="position: relative; z-index: 2">
        <h2 style="
          color: white;
          font-family: 'Road Rage', cursive;
          font-size: 34px;
          margin: 0;
          text-align: center;
          line-height: 1;
        ">
          Techember Fest "25
        </h2>
        <p style="
          font-size: 10px;
          margin: 8px 0;
          text-align: center;
          color: white;
          font-family: Arial, sans-serif;
        ">
          📍 04 Rumens road, Ikoyi, Lagos
        </p>
        <p style="
          font-size: 10px;
          margin: 8px 0;
          text-align: center;
          color: white;
          font-family: Arial, sans-serif;
        ">
          📅 March 15, 2025 | 7:00 PM
        </p>
        <div style="
          margin: 20px auto;
          position: relative;
          width: 140px;
          height: 140px;
        ">
          <div style="
            background: ${formData.photoUrl ? `url('${formData.photoUrl}')` : "#0E464F"};
            background-size: cover;
            background-position: center;
            border: 4px solid #249fb577;
            border-radius: 16px;
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
          "></div>
        </div>
        <div style="
          background: #08343C;
          border: 1px solid #133D44;
          border-radius: 8px;
          margin-top: 20px;
          padding: 8px;
          position: relative;
          z-index: 2;
        ">
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            position: relative;
          ">
            ${generateTicketField("Name:", formData.attendeeName)}
            ${generateTicketField("Email:", formData.email)}
            ${generateTicketField("Ticket Type:", formData.ticketType)}
            ${generateTicketField("Tickets:", formData.noOfTickets.toString())}
          </div>
          <div style="margin-top: 8px; padding: 0 8px">
            ${generateTicketField("Special Request:", formData.specialRequest || "None")}
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(ticketElement);

  // Add delay to ensure image loading
  await new Promise((resolve) => setTimeout(resolve, 500));

  const canvas = await html2canvas(ticketElement, {
    scale: 2, // Double resolution for better quality
    useCORS: true, // Allow cross-origin images
    logging: true,
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [105, 148], // A6 size: 105mm x 148mm
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add image to fill page
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  pdf.save("techember-ticket.pdf");

  document.body.removeChild(ticketElement);
};
