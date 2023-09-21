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

export interface ILoginUser {
  login: string
  password: string
}

export interface IRegistrationData {
  orgName: string,
  username: string,
  category: string,
  email: string,
  phone: string,
  address: string,
  password: string,
  description: string,
}