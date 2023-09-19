import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { Pool } from 'pg'

import { config } from '../config/db-config'
import { createToken } from '../helpers/functions'
import {
  ILoginUser,
  ILoginUserResponse,
  IServerResponseSuccess,
  IUserRegistrationData,
  ISignupUser,
} from '../interfaces/interfaces'

const saltRounds = 10
const pool = new Pool(config)

export default class UserService {
  async loginUser(
    loginCredentials: ILoginUser,
  ): Promise<ILoginUserResponse | IServerResponseSuccess> {
    const db = await pool.connect()

    try {
      const query = `SELECT * FROM users WHERE username = $1`
      const data = await db.query(query, [loginCredentials.login])

      const { rows } = data
      if (rows.length > 0) {
        const userData = rows[0]
        const passwordMatch = await bcrypt.compare(
          loginCredentials.password,
          userData.user_password,
        )
        if (passwordMatch) {
          const { user_id } = userData
          const token = createToken(user_id)

          return { login: true, token }
        } else {
          return { message: 'Wrong password!' }
        }
      } else {
        return { message: 'Wrong username!' }
      }
    } catch (err) {
      throw err
    } finally {
      db.release()
    }
  }

  async registerUser(
    userRegistrationData: IUserRegistrationData,
  ): Promise<{ token: string }> {
    return new Promise(async (resolve, reject) => {
      const client = await pool.connect()
      const query =
        'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'

      bcrypt.hash(
        userRegistrationData.password,
        saltRounds,
        async (err, hash) => {
          if (err) {
            console.log(err)
            reject(err)
            return
          }

          const userId = uuidv4()

          await client.query(query, [
            userId,
            userRegistrationData.orgName,
            userRegistrationData.username,
            userRegistrationData.category,
            userRegistrationData.email,
            userRegistrationData.phone,
            hash,
            userRegistrationData.description,
            new Date().toISOString(),
            userRegistrationData.address,
            true,
          ])

          const token = createToken(userId)

          resolve({ token })
        },
      )
    })
  }

  async getUser(userId: string): Promise<ISignupUser | undefined> {
    const db = await pool.connect()

    try {
      let query = 'SELECT * FROM users WHERE user_id = $1'
      const data = await db.query(query, [userId])
      const { rows } = data

      return { login: true, userData: rows[0] }
    } catch (error) {
      console.log(error)
    }
  }
}
