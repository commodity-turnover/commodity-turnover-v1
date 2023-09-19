/** UserService **/
/* [UserService] - After login, server send response */
export interface ILoginUserResponse {
  login: boolean
  token: string
}

/* [UserService] - Get login data from Client */
export interface ILoginUser {
  login: string
  password: string
}

/* [UserService] - Get user data from Client, when user send request for registration */
export interface IUserRegistrationData {
  orgName: string
  username: string
  category: 'shop' | 'factory'
  email: string
  phone: string
  address: string
  password: string
  description?: string
}

/* [UserService] - DB data about user */
export interface IUserData extends IUserRegistrationData {
  user_id: string
  creationtimestamp: Date
  is_active: boolean
}

/* [UserService] - Sending data to Client */
export interface ISignupUser {
  login: boolean
  userData: IUserData
}

/** Product Service  **/
export interface IProductData {
  name: string
  description?: string
  price: string
  product_count: number
}

export interface IProductDataDB extends IProductData {
  product_id: number
  user_id: string
  creationtimestamp: Date
  last_update_timestamp: Date
}

/** Product Service  **/
export interface INewsData {
  news_id: string
  news_title: string
  news_content: string
  category: string
  creationtimestamp: Date
}

/* Send response to Client, when occured error */
export interface IServerResponseSuccess {
  message: string
}

export interface IServerResponseError {
  message: string,
  error: string
}