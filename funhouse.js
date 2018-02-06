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
    budget: {
        balance(id, onResponse) {
            makeApiCall(`/budget/${id}`, onResponse);
        },
        bought(id, amount, description, onResponse) {
            makeApiCall(`/budget/${id}`, {amount, description}, onResponse);
        }
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