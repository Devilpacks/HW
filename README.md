# Задания
1) Подключиться к БД postgres
Найти среднюю цену по полю close_price за все время по тикерам EOSUSD, ETHUSD и XRPUSD
для биржы BitFinex(таблицы instruments и instrument_bars)
Изменить структуру таблицы(используя ALTER) TEST_MM подходящим образом(она должна содержать поле timstamp c текущим временем расчета) и записать туда результаты для каждого тикера.

2) На сайте расширения postgres https://docs.timescale.com:
Найдите как называются родные таблицы для этого расширения
Поддерживается ли этим расширением конструкция ON CONFLICT ON CONSTRAINT?

3) Используя пакет https://github.com/porsager/postgres для Node.js написать сам скрипт и команды для запуска через крон этого скрипта раз в полночь, который рассчитывает среднюю цену по полю close_price для тикера BTCUSD биржы BitFinex для прошедшего дня и вставкой результата в уже созданную и измененную таблицу TEST_MM

## Задание №1
* SQL запрос высчитывающий среднюю цену закрытия торгов по валютной паре EOSUSD(соответственно меняем валюту на ETHUSD, XRPUSD) на бирже BitFinex
```
select ticker, avg(close_price), exchange from public.instrument_bars where ticker = 'EOSUSD' and exchange = 'BitFinex' group  by ticker, exchange
```
* Изменяем структуру таблицы test_mm
```
alter  table test_mm
	add column ticker varchar(30),
	add column close_price float(8),
	add column exchange varchar(30),
	add column timestamp timestamp;
```

## Задание №2
Поддерживается ли этим расширением конструкция ON CONFLICT ON CONSTRAINT?

## Задание №3

* Запрос на изменение в таблице

```
const avg = await sql`
    insert into test_mm (ticker, close_price, exchange, timestamp) 
    select ticker, avg(close_price), exchange, now() 
    from public.instrument_bars 
    where ticker = 'BTCUSD' and exchange = 'BitFinex' 
    group  by ticker, exchange`) 
```
* Скрипт запуска функции

```
SHELL=/bin/bash
node /home/barrel/App/HW/task_03.js
```
* Cron, вызывем для изменения расписания
```
crontab -e
```
* Делаем запуск скрипта в 23:59 каждый день

```
SHELL=/bin/bash
59 23 * * * ~/App/HW/script.sh
```