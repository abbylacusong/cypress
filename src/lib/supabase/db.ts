import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv  from 'dotenv'
import * as schema from '../../../migrations/schema';
import { Console } from 'console'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
dotenv.config({ path: ".env" })

if (!process.env.DATABASE_URL) {
    console.log('🔴 Cannot find database url');
}

const client = postgres(process.env.DATABASE_URL as string)
const db = drizzle( client , {schema} )

const migrateDb = async () => {
    try{
        console.log('🟠 Migrating Client');
        await migrate( db , {migrationsFolder:'migrations'})
        console.log('🟢 Successfully Migrated')
    }
    catch(error){
        console.log('🔴 Migrating Error')
    }


}
migrateDb()
export default db;