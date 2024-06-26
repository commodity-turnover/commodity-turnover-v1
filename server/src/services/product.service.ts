import { Pool } from 'pg'
import { config } from '../config/db-config'
import {
  IProductData,
  IProductDataDB,
  IServerResponseError,
  IServerResponseSuccess,
} from '../interfaces/interfaces'

const pool = new Pool(config)

export default class ProductService {
  async getAllProducts(
    userId: string,
    productName: string,
    sortType: string,
  ): Promise<IProductData[]> {
    const db = await pool.connect()

    try {
      let query = `SELECT * FROM user_products WHERE user_id = $1`
      const queryParams = [userId]

      if (productName) {
        const searchTerm = `%${productName}%`
        query += ` AND name LIKE $2`
        queryParams.push(searchTerm)
      }

      if (sortType) {
        switch (sortType) {
          case 'lastDateAsc':
            query += ` ORDER BY creationtimestamp ASC`
            break
          case 'lastDateDesc':
            query += ` ORDER BY creationtimestamp DESC`
            break
          case 'nameAsc':
            query += ` ORDER BY name ASC`
            break
          case 'nameDesc':
            query += ` ORDER BY name DESC`
            break
          case 'priceAsc':
            query += ` ORDER BY price ASC`
            break
          case 'priceDesc':
            query += ` ORDER BY price DESC`
            break
          default:
            query += ` ORDER BY creationtimestamp ASC`
            break
        }
      }
      const data = await db.query(query, queryParams)

      const { rows } = data

      return rows
    } catch (err) {
      throw err
    } finally {
      db.release()
    }
  }

  async getProductById(
    userId: string,
    productId: number,
  ): Promise<IProductDataDB | undefined> {
    const db = await pool.connect()

    try {
      const query =
        'SELECT * FROM user_products WHERE product_id = $1 AND user_id = $2'

      const result = await db.query(query, [productId, userId])

      const productData = result.rows

      return productData[0]
    } catch (error) {
      console.log('Error: Get product data', error)
    }
  }

  async addProduct(
    userId: string,
    productData: IProductData,
  ): Promise<IServerResponseSuccess> {
    const db = await pool.connect()

    try {
      const query =
        'INSERT INTO user_products (user_id, name, description, price, product_count, creationtimestamp) VALUES ($1, $2, $3, $4, $5, $6)'

      await db.query(query, [
        userId,
        productData.name,
        productData.description,
        productData.price,
        productData.product_count,
        new Date().toISOString(),
      ])

      return { message: 'Product added successfully.' }
    } catch (err) {
      throw err
    } finally {
      db.release()
    }
  }

  async updateProductById(
    userId: string,
    productData: IProductDataDB,
  ): Promise<IServerResponseSuccess> {
    const db = await pool.connect()

    try {
      const query =
        'UPDATE user_products SET name = $1, description = $2, price = $3, product_count = $4, last_update_timestamp = $5 WHERE product_id = $6'

      await db.query(query, [
        productData.name,
        productData.description,
        productData.price,
        productData.product_count,
        new Date().toISOString(),
        productData.product_id,
      ])

      return { message: 'Product updated successfully.' }
    } catch (err) {
      throw err
    } finally {
      db.release()
    }
  }

  async deleteProductById(
    userId: string,
    productId: number,
  ): Promise<IServerResponseSuccess | IServerResponseError> {
    const db = await pool.connect()
    try {
      const query = 'DELETE FROM user_products WHERE product_id = $1'

      await db.query(query, [productId])

      return { message: 'Product deleted successfully.' }
    } catch (error) {
      console.error('Error: Delete product data', error)

      const castedError = error as Error
      return {
        message: 'Error occured while deleting product!',
        error: castedError.message,
      }
    }
  }
}
