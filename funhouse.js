const fetch = require('@dillonchr/fetch');

const makeApiCall = (url, body, onResponse) => {
    if (typeof body === 'function') {
        onResponse = body;
        body = undefined;
    }
    fetch({
        url: process.env.FUNHOUSE_URL + url,
        method: body ? 'POST' : 'GET',
        body,
        headers: {
            'X-API-Token': process.env.FUNHOUSE_TOKEN
        }
    }, (err, body) => {
        if (err) {
            onResponse(err);
        } else {
            onResponse(null, body);
        }
    });
};

module.exports = {
    bookmancy: (searchOptions, onResponse) => makeApiCall('/books', searchOptions, onResponse),
    budget: {
        balance: (id, onResponse) => makeApiCall(`/budget/${id}`, onResponse),
        bought: (id, transaction, onResponse) => {
            console.warn('funhouse.budget.bought is deprecated. Use funhouse.budget.spend instead.');
            makeApiCall(`/budget/${id}`, transaction, onResponse);
        },
        spend: (id, amount, description, onResponse) => makeApiCall(`/budget/${id}`, {amount, description}, onResponse)
    },
    cryptonics: {
        encrypt: (offset, body, onResponse) => makeApiCall('/cryptonics/encrypt', {offset, body}, onResponse),
        decrypt: (offset, body, onResponse) => makeApiCall('/cryptonics/decrypt', {offset, body}, onResponse)
    },
    dailytext: onResponse => makeApiCall('/dailytext', onResponse),
    fired: {
        list: onResponse => makeApiCall('/fired', onResponse),
        update: onResponse => makeApiCall('/fired/update', onResponse)
    },
    gdq: onResponse => makeApiCall('/gdq', onResponse),
    inflation: (dollars, year, onResponse) => makeApiCall(`/inflation/${year}/${dollars}`, onResponse),
    paycheck: {
        balance: onResponse => makeApiCall('/paycheck', onResponse),
        pay: (amount, onResponse) => {
            console.warn('funhouse.paycheck.pay is deprecated. Use funhouse.paycheck.spend instead.');
            makeApiCall('/paycheck', {amount}, onResponse);
        },
        spend: (amount, onResponse) => makeApiCall('/paycheck', {amount}, onResponse),
        reset: (balance, onResponse) => makeApiCall('/paycheck', {reset: true, balance}, onResponse)
    },
    wfh: onResponse => makeApiCall('/wfh', onResponse)
};

