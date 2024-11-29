import { Product } from "./product.model";
import { UserInfo } from "./user-info.model";

export interface Order {
  userInfo: UserInfo;
  products: Product[];
  id: string;
}
