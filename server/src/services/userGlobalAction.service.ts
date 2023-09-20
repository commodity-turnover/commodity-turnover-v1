import { Pool, QueryResult } from 'pg'

import { config } from '../config/db-config'
import { INewsData, IServerResponseSuccess, IServerResponseError, IUserData } from '../interfaces/interfaces'

const pool = new Pool(config)

export default class UserGlobalActionService {
  async getNews(): Promise<INewsData[]> {
    const db = await pool.connect()

    try {
      const query = 'SELECT * FROM news ORDER BY creationtimestamp DESC'

      const result = await db.query(query)

      const newsData = result.rows

      return newsData
    } catch (error) {
      console.log('Error: Get news data', error)
      return []
    }
  }

  async searchPartners(userId: string | undefined): Promise<IUserData[]> {
    const db = await pool.connect()

    try {
      let query = `SELECT * FROM users WHERE user_id != $1 AND is_active = true`

      const result = await db.query(query, [userId])

      const partnersData = result.rows

      return partnersData
    } catch (error) {
      console.log('Error: Get news data', error)
      return []
    }
  }

  async activateUser(userId: string | undefined, isActiveData: boolean): Promise<IServerResponseSuccess | IServerResponseError> {
    const db = await pool.connect()

    try {
      const query = 'UPDATE users SET is_active = $1 WHERE user_id = $2'
      await db.query(query, [isActiveData, userId])

      return {
        message: isActiveData
          ? 'User activated successfully!'
          : 'User deactivated successfully!',
      }
    } catch (error) {
      console.log('Error: Get news data', error);

      const castedError = error as Error;

      return {
        message: 'Error occurred while activating/deactivating user.',
        error: castedError.message,
      };
    }
  }
  
  
  async deleteAccount(userId: string | undefined): Promise<IServerResponseSuccess | IServerResponseError> {
    const db = await pool.connect()
    
    try {
      const query = 'DELETE FROM users WHERE user_id = $1'
      await db.query(query, [userId])

      return {message: "Account deleted successfully!"}
    } catch (error) {
      console.log('Error: Deleting account!', error);

      const castedError = error as Error;

      return {
        message: 'Error occurred while Deleting account.',
        error: castedError.message,
      };
    }
  }
}
