const postgres = require('postgres')
const dotenv = require('dotenv')

dotenv.config()
const sql = postgres('')
async function average() {
    try {
        const avg = await sql`
            insert into test_mm (ticker, close_price, exchange, timestamp) 
            select ticker, avg(close_price), exchange, now() from public.instrument_bars 
            where ticker = 'BTCUSD' and exchange = 'BitFinex' and timestamp >= date_trunc('day', now()) - interval '1 day' 
            group by ticker, exchange, date_trunc('day', timestamp)
        `
        const test_mm = await sql`select * from test_mm`
        console.log(test_mm);
        process.exit(1)
    } catch (err) {
        console.log(err);
    }
}


average()

