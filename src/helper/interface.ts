export interface Product {
  name: string;
  price: number;
  quantity: number;
  category: string;
  imageName: string;
}

export interface Order {
  _id: string;
  paymentType: string;
  paymentStatus: string;
  products: Product[];
  address: {
    name: string;
    number: string;
    city: string;
    lademark: string;
  };
  totalPrice: number;
  paymentId: null | string;
  orderStatus: string;
  orderAt: string;
}

export interface Option {
  value: string;
  label: string;
}
