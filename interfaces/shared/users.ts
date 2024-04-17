export interface UserInfo {
  address: string;
  city: string;
  country: string;
  id: number;
  name: string;
  phone_number: string;
  region: string | null;
  surname: string;
}
export interface UserAPI {
  email: string;
  id: number;
  is_active: boolean;
  password: string;
  user_group: string | null;
  user_info: UserInfo | null;
  user_info_id: number;
  username: string;
}
