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
  async getPartners(userId: string, category: string): Promise<any> {
    const db = await pool.connect()



    // ADD CATEGORY



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
}
