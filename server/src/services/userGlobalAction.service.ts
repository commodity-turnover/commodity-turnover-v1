import { Pool } from 'pg'

import { config } from '../config/db-config'

const pool = new Pool(config)

export default class UserGlobalActionService {
  async getNews(): Promise<any> {
    const db = await pool.connect()

    try {
      const query =
        'SELECT * FROM news ORDER BY creationtimestamp DESC'

      const result = await db.query(query)

      const newsData = result.rows
      return newsData
    } catch (error) {
      console.log('Error: Get news data', error)
    }
  }
}
