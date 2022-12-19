export interface product {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  color: string;
}

export interface summary{
  amount: number;
  tax: number;
  promocode: number;
  finalAmount: number;
}