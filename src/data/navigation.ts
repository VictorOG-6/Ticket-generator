export interface NavLink {
  path: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { path: "/", label: "Events" },
  { path: "/my-tickets", label: "My Tickets" },
  { path: "/about", label: "About Project" },
];
