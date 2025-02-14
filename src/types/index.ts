export type Ticket = {
  id: number;
  price: number;
  ticketType: string;
  date: string;
  quantity: number;
};

export type FormData = {
  ticketType: string;
  noOfTickets: number;
  attendeeName: string;
  email: string;
  specialRequest?: string;
  photoUrl?: string;
};

export type FormStore = {
  formData: FormData;
};
