export interface IUserData {
  org_name: string
  username: string
  category: 'shop' | 'factory'
  email: string
  phone_number: string
  address: string
  password: string
  description?: string
}