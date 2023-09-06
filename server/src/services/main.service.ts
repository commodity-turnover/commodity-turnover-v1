import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'

import { config } from '../db/db-config'

const saltRounds = 10
const pool = new Pool(config)

export default class UserService {
  async getUser(loginData: any): Promise<any> {
    const db = await pool.connect()

    try {
      const query = `SELECT * FROM users WHERE username = $1`
      const data = await db.query(query, [loginData.login])

      const { rows } = data
      if (rows.length > 0) {
        const userData = rows[0]
        const passwordMatch = await bcrypt.compare(
          loginData.password,
          userData.user_password,
        )
        if (passwordMatch) {
          const { user_id } = userData
          const token = jwt.sign({ user_id }, 'jwtSecretKey', {
            expiresIn: 300,
          })

          return { login: true, token, userData }

          // return userData // Return user data if password matches
        } else {
          return 'Wrong password'
        }
      } else {
        return 'Wrong username'
      }
    } catch (err) {
      throw err // Handle database or bcrypt errors
    } finally {
      db.release() // Release the database connection
    }
  }

  async createUser(newUserData: any): Promise<void> {
    const client = await pool.connect()
    const query =
      'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'

    bcrypt.hash(newUserData.password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err)
      }

      await client.query(query, [
        uuidv4(),
        newUserData.orgName,
        newUserData.username,
        newUserData.category,
        newUserData.email,
        newUserData.phone,
        hash,
        newUserData.description,
        new Date().toISOString(),
        newUserData.address,
      ])
    })
  }
}
