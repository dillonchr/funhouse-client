const request = require('request');

const makeApiCall = (url, body, onResponse) => {
    if (typeof body === 'function') {
        onResponse = body;
        body = undefined;
    }
    request({
        url: process.env.FUNHOUSE_URL + url,
        json: true,
        body,
        method: body ? 'PUT' : 'GET',
        headers: {
            'X-API-Token': process.env.FUNHOUSE_TOKEN
        }
    }, (err, res, body) => {
        if (err || res.statusCode !== 200) {
            onResponse(err || {error: true, status: res.statusCode});
        } else {
            onResponse(null, body);
        }
    });
};

module.exports = {
    bookmancy(searchOptions, onResponse) {
        makeApiCall('/books', searchOptions, onResponse);
    },
    budget: {
        balance(id, onResponse) {
            makeApiCall(`/budget/${id}`, onResponse);
        },
        bought(id, transaction, onResponse) {
            makeApiCall(`/budget/${id}`, transaction, onResponse);
        }
    },
    cryptonics: {
        encrypt(offset, body, onResponse) {
            makeApiCall('/cryptonics/encrypt', {offset, body}, onResponse);
        },
        decrypt(offset, body, onResponse) {
            makeApiCall('/cryptonics/decrypt', {offset, body}, onResponse);
        }
    },
    dailytext(onResponse) {
        makeApiCall('/dailytext', onResponse);  
    },
    fired: {
        list(onResponse) {
            makeApiCall('/fired', onResponse);
        },
        update(onResponse) {
            makeApiCall('/fired/update', onResponse);
        }
    },
    gdq(onResponse) {
        makeApiCall('/gdq', onResponse);
    },
    inflation(dollars, year, onResponse) {
        makeApiCall(`/inflation/${year}/${dollars}`, onResponse);
    },
    paycheck: {
        balance(onResponse) {
            makeApiCall('/paycheck', onResponse);
        },
        pay(amount, onResponse) {
            makeApiCall('/paycheck', {amount}, onResponse);
        },
        reset(balance, onResponse) {
            makeApiCall('/paycheck', {reset: true, balance}, onResponse);
        }
    }
};