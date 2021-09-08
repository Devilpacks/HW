const { Pool, Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config()
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  })
  client.connect()

//   // Запрос с подсчётом средней цены закрытия по тикеру и бирже
//   client.query("select ticker, avg(close_price), exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex' group  by ticker, exchange ", (err, res) => {
//     console.log(err, res.rows[0])
//     client.end()
//   })

async function average() {
    try {
        // const text = "select ticker, close_price, exchange from public.instrument_bars ib where ticker = $1 and exchange = $2"
        // const values = ['EOSUSD', 'BitFinex']
        const text = "select ticker, avg(close_price), exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex' group  by ticker, exchange "
        const res = await client.query(text)
        await client.end()
        console.log(res.rows[0].avg)
    } catch (err) {
        console.log(err);
    }
}


average()




// const pool = new Pool({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: process.env.PGPORT,
// })


// pool.query('SELECT * FROM public.instrument_bars', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })
  
// pool.query("select ticker from instrument_bars", (err, res) => {
//     if (err) {
//       console.log(err.stack)
//     } else {
//       console.log(res.rows[0])
//       pool.end(() => {
//           console.log('pool has ended');
//       })
//     }
// })

// async function average() {
//     try {
//         // const text = "select ticker, close_price, exchange from public.instrument_bars ib where ticker = $1 and exchange = $2"
//         // const values = ['EOSUSD', 'BitFinex']
//         const text = "select ticker, close_price, exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex'"
//         console.log(text);
//         const res = await pool.query(text)
//         console.log('end');
//         console.log(res)
//     } catch (err) {
//         console.log(err);
//     }
// }
