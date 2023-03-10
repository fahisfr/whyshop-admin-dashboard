import { Option } from "./interface";
export const roles: Option[] = [
  { label: "SuperAdmin", value: "superAdmin" },
  { label: "Admin", value: "admin" },
  { label: "employee", value: "employee" },
  { label: "User", value: "user" },
];

export const productsCatgeory: Option[] = [
  { value: "all", label: "All Category" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "sweets", label: "Sweets" },
];

export const paymentTypes: Option[] = [
  { value: "all", label: "All Payment Types" },
  { value: "cod", label: "Cash on Delivery" },
  { value: "online", label: "Online Payment" },
];
export const ordersDateRangeOptions: Option[] = [
  {
    value: 7,
    label: "Last week",
  },
  {
    value: 30,
    label: "Last 30 days",
  },
  {
    value: 90,
    label: "Last 3 months",
  },
  {
    value: 182,
    label: "Last 6 months",
  },
  {
    value: 270,
    label: "Last 9 months",
  },
  {
    value: 365,
    label: "Last year",
  },
];
