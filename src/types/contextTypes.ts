import { IItem, IProduct } from "./types";

export interface ICartContext {
  cartItems: IItem[];
  incrementQuantity: (id: number, name: string) => void;
  decrementQuantity: (id: number, name: string) => void;
  removeItem: (id: number, name: string) => void;
  orderAccepted: boolean;
  orderedItems: IItem[];
  setCartItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  cartQuantity: number;
  counter: { minutes: number; seconds: number };
}

export interface IAppContext {
  cartContainer: boolean;
  setCartContainer: React.Dispatch<React.SetStateAction<boolean>>;
  orderContainer: boolean;
  setOrderContainer: React.Dispatch<React.SetStateAction<boolean>>;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  orderId: string;
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  tableNum: number;
  setTableNum: React.Dispatch<React.SetStateAction<number>>;
  onCookingItemsFetch: IItem[];
  setCookingItemsFetch: React.Dispatch<React.SetStateAction<IItem[]>>;
  completedItemsFetch: IItem[];
  setCompletedItemsFetch: React.Dispatch<React.SetStateAction<IItem[]>>;
  orderOnCookingTime: number;
  setOrderOnCookingTime: React.Dispatch<React.SetStateAction<number>>;
  openDemoModal: boolean;
  setOpenDemoModal: React.Dispatch<React.SetStateAction<boolean>>;
}
