const postgres = require('postgres')
const dotenv = require('dotenv')

dotenv.config()
const sql = postgres('postgres://test_mm:test_mm@195.154.184.221:5432/reporter')
async function average() {
    try {
        const avg = await sql`
            insert into test_mm (ticker, close_price, exchange, timestamp) 
            select ticker, avg(close_price), exchange, now() from public.instrument_bars 
            where ticker = 'BTCUSD' and exchange = 'BitFinex' 
            group  by ticker, exchange
        `
        const test_mm = await sql`select * from test_mm`
        console.log(test_mm);
        process.exit(1)
    } catch (err) {
        console.log(err);
    }
}


average()

