import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'

import { config } from '../db/db-config'

const pool = new Pool(config)




export default class ProductService {
  async getAllProducts(userId: string): Promise<any> {
    const db = await pool.connect()

    try {
      const query = `SELECT * FROM user_products WHERE user_id = $1`
      const data = await db.query(query, [userId])

      const { rows } = data

      return rows
      
    } catch (err) {
      throw err
    } finally {
      db.release()
    }
  }

//   async createUser(newUserData: any): Promise<void> {
//     const client = await pool.connect()
//     const query =
//       'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'

//     bcrypt.hash(newUserData.password, saltRounds, async (err, hash) => {
//       if (err) {
//         console.log(err)
//       }

//       await client.query(query, [
//         uuidv4(),
//         newUserData.orgName,
//         newUserData.username,
//         newUserData.category,
//         newUserData.email,
//         newUserData.phone,
//         hash,
//         newUserData.description,
//         new Date().toISOString(),
//         newUserData.address,
//       ])
//     })
//   }
}
