# Funhouse Client
> npm module for interacting with the funhouse API

## Installation
`npm i @dillonchr/funhouse`

## Available methods
`bookmancy({options}, callback)`
Related to usage of [bookmancy](https://github.com/dillonchr/bookmancy) but includes a `source` prop with a value of either `abe` or `ebay`.

`cryptonics.encrypt(offset, message, callback)`
`cryptonics.decrypt(offset, message, callback)`
Behave the same as [cryptonics](https://github.com/dillonchr/cryptonics).

`dailytext(callback)`
Fetches via the [dailytext](https://github.com/dillonchr/dailytext) module and gives you back the JSON outlined in the readme.

`gdq(callback)`
Gets list of upcoming runs from the GDQ schedule using [gdq](https://github.com/dillonchr/gdq).

`inflation(dollars, year, callback)`
Looks up inflation back to 1913 via [inflation](https://github.com/dillonchr/inflation).

`paycheck.balance(callback)`
`paycheck.spend(amount, callback)`
`paycheck.reset(checkAmount, callback)`
Pretty custom module [bankrupt](https://github.com/dillonchr/bankrupt) hooks into a MongoDB and keeps track of your paycheck in and expenditures out in the meantime. We've been using it to keep track of spending since middle of 2017.
