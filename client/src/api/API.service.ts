import axios from 'axios'

import { BASE_URL } from '../constants/const'

export const getUser = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    const response = await axios.get(`${BASE_URL}/home`, {
      headers: {
        'access-token': token,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error - Get user data!', error)
  }
}

export const createProduct = async (productData: any) => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Token not found')
  }

  try {
    const response = await axios.post(`${BASE_URL}/products`, productData, {
      headers: {
        'access-token': token,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error - Create product', error)
    throw error
  }
}

export const getProduct = async (product_id: any) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    const response = await axios.get(`${BASE_URL}/products/${product_id}`, {
      headers: {
        'access-token': token,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error - GET product ', error)
  }
}

export const getAllProducts = async (searchQuery: string, sortType: string) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    let queryString = `${BASE_URL}/products?productName=${searchQuery}`

    if (sortType) {
      queryString += `&sortType=${sortType}`
    }

    const response = await axios.get(queryString, {
      headers: {
        'access-token': token,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

export const updateProduct = async (productData: any) => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Token not found')
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/products/${productData.product_id}`,
      productData,
      {
        headers: {
          'access-token': token,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error - Create product', error)
    throw error
  }
}

export const deleteProduct = async (product_id: any) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return
  }

  try {
    await axios.delete(`${BASE_URL}/products/${product_id}`, {
      headers: {
        'access-token': token,
      },
    })
  } catch (error) {
    console.log('Error product delete ', error)
  }
}


export const getNewsData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news`)
    return response.data
  } catch (error) {
    console.error('Error - GET news ', error)
  }
}