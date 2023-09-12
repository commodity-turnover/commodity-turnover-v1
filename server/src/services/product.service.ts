// import { v4 as uuidv4 } from 'uuid'
// import bcrypt from 'bcrypt'
import { Pool } from 'pg'
// import jwt from 'jsonwebtoken'

import { config } from '../config/db-config'

const pool = new Pool(config)

export default class ProductService {
  async getAllProducts(
    userId: string,
    productName: string,
    sortType: string,
  ): Promise<any> {
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

  async getProduct(userId: string, productId: number): Promise<any> {
    const db = await pool.connect()

    try {
      const query =
        'SELECT * FROM user_products WHERE product_id = $1 AND user_id = $2'

      const result = await db.query(query, [productId, userId])

      const productData = result.rows
      return productData
    } catch (error) {
      console.log('Error: Get product data', error)
    }
  }

  async addProduct(userId: string, productData: any): Promise<any> {
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

  async updateProduct(userId: string, productData: any): Promise<any> {
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

  async deleteProduct(userId: string, productId: number): Promise<any> {
    const db = await pool.connect()
    try {
      const query = 'DELETE FROM user_products WHERE product_id = $1'

      await db.query(query, [productId])

      return { message: 'Product deleted successfully.' }
    } catch (error) {
      console.log('Error: Delete product data', error)
    }
  }
}
