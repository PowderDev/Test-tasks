export interface Card {
  uuid: string;
  account_id: string;
  number: string;
  status: "active" | "blocked";
  holder?: string | null;
  phone?: string | null;
  birthdate?: string | null;
  sales: string;
  created_date?: string;
  created_user?: string;
  balance: string;
}

export interface Receipt {
  uuid: string;
  user_uid: string;
  card_uuid: string;
  type: "SELL" | "PAYBACK";
  number: number;
  period: number;
  total: string;
  totalWithDiscount: number;
  bonus: number;
  payment: number;
}

export interface Transaction {
  uuid: string;
  card_uuid: string;
  delta: number;
  state: "prepared" | "commited";
  period: number;
  period_activate: number;
  user_uid: string;
  comment?: string;
}
