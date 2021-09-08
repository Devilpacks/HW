const sql = require('./task_03')

// const avg = sql`
// select ticker, avg(close_price), exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex' group  by ticker, exchange
// `
// console.log(avg);


async function average() {
    try {
        const text = "select ticker, avg(close_price), exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex' group  by ticker, exchange "
        const res = await sql`${text}`
        console.log(res)
    } catch (err) {
        console.log(err);
    }
}


average()
