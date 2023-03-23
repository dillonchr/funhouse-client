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
    bankrupt: {
        balance: (id, onResponse) => makeApiCall(`/paycheck/${id}`, onResponse),
        spend: (id, amount, description, onResponse) => makeApiCall(`/paycheck/${id}`, {amount, description}, onResponse),
        reset: (id, balance, onResponse) => makeApiCall(`/paycheck/${id}`, {reset: true, balance}, onResponse)
    },
    cryptonics: {
        encrypt: (offset, body, onResponse) => makeApiCall('/cryptonics/encrypt', {offset, body}, onResponse),
        decrypt: (offset, body, onResponse) => makeApiCall('/cryptonics/decrypt', {offset, body}, onResponse)
    },
    dailytext: onResponse => makeApiCall('/dailytext', onResponse),
    gdq: onResponse => makeApiCall('/gdq', onResponse),
    inflation: (dollars, year, onResponse) => makeApiCall(`/inflation/${year}/${dollars}`, onResponse),
};

