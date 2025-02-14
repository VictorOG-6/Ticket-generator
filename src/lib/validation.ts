import { z } from "zod";

export const ticketSelectionSchema = z.object({
  ticketType: z.string().min(1, "Please select a ticket type"),
  noOfTickets: z.number().min(1, "Quantity must be at least 1"),
});

export const attendeeDetailsSchema = z.object({
  attendeeName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  photoUrl: z.string().min(1, "Profile photo is required"),
  specialRequest: z.string().optional(),
});
