export interface User {
  _id: string;
  imageUrl: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  rePassword?: string;
}
