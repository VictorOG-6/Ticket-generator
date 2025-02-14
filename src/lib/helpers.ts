export const formatTicketPrice = (price: number): string => {
  return price === 0 ? "Free" : `$${price}`;
};
