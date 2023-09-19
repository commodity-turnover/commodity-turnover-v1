import { Pool } from 'pg'

import { config } from '../config/db-config'

const pool = new Pool(config)

export default class UserGlobalActionService {
  async getNews(): Promise<any> {
    const db = await pool.connect()

    try {
      const query = 'SELECT * FROM news ORDER BY creationtimestamp DESC'

      const result = await db.query(query)

      const newsData = result.rows
      return newsData
    } catch (error) {
      console.log('Error: Get news data', error)
    }
  }

  async searchPartners(userId: string, category: string): Promise<any> {
    const db = await pool.connect()

    try {
      let query = `SELECT * FROM users WHERE user_id != $1 AND is_active = true`
      // let query = `SELECT * FROM users WHERE user_id != $1 AND is_active = true AND category = 'factory'`
      // if (category === 'shop') {
      //   query = `SELECT * FROM users WHERE user_id != $1 AND is_active = true AND category = 'shop'`
      // }

      const result = await db.query(query, [userId])

      const newsData = result.rows
      return newsData
    } catch (error) {
      console.log('Error: Get news data', error)
    }
  }

  async activateUser(userId: string, isActiveData: any): Promise<any> {
    const db = await pool.connect()

    try {
      const query = 'UPDATE users SET is_active = $1 WHERE user_id = $2'
      const result = await db.query(query, [isActiveData, userId])

      return result
    } catch (error) {
      console.log('Error: Get news data', error)
    }
  }
}
