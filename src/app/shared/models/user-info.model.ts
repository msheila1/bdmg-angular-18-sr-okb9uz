export interface UserInfo {
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  email?: string | null | undefined;
  phone?: string | null | undefined;
  address?: {
    street: string | null | undefined;
    city: string | null | undefined;
    state: string | null | undefined;
    zip: string | null | undefined;
  };
}
