var page = require('webpage').create();
var system = require('system');
var args = system.args;
var txHash = args[1];
if (txHash === undefined) {
    console.log("Transaction hash missing!");
    phantom.exit();
}
page.viewportSize = { width: 1920, height: 1080 };
page.onError = function (msg, trace) { // disable all errors
    return;
}
page.open('https://etherscan.io/tx/'+txHash, function() {
    setTimeout(function() {
        var is404 = page.evaluate(function(s) { return document.querySelector(s).innerText.search("Sorry, We are unable to locate this TxnHas") >= 0 ; }, '#myTabContent');
        if (is404) {
            console.log(JSON.stringify({status:404, body:'Transaction not found'}));
            phantom.exit();
        }
        var isInvalid = page.evaluate(function(s) { return document.querySelector(s).innerText.search("An invalid Txn hash has been entered") >= 0; }, '#myTabContent');
        if (isInvalid) {
            console.log(JSON.stringify({status:500, body:'Invalid transaction hash'}));
            phantom.exit();
        }
        var response = {
            txHash: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#spanTxHash'),
            status: page.evaluate(function(s) { return document.querySelector(s).innerText; }, 'span.u-label:first-child'),
            blockNumber: page.evaluate(function(s) { return parseInt(document.querySelectorAll(s)[1].parentElement.querySelector('a').innerText) }, 'span.u-label'),
            blockConfirmation: page.evaluate(function(s) { return document.querySelectorAll(s)[1].innerText }, 'span.u-label'),
            confirmedIn: page.evaluate(function(s) { return document.querySelector(s).parentElement.querySelectorAll('span')[1].innerText.replace(/ /g,'').replace("|Confirmedwithin", "") }, '#clock'),
            timestamp: page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[3].textContent.match(/\(([^)]+)\)/)[1] }, '#clock'),
            from: {
                address: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#spanFromAdd'),
            },
            to: {
                type: page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[0].textContent.replace('\n', '') || 'Wallet'; }, '#spanToAdd'),
                address: page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[2].innerText; }, '#spanToAdd'),
                properties: page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes.length; }, '#spanToAdd'),
            },
            value: {
                ether: page.evaluate(function(s) { return document.querySelector(s).innerText.replace(" Ether", ""); }, '#ContentPlaceHolder1_spanValue > span'),
                inUSD: {
                    current: page.evaluate(function(s) { return document.querySelector(s).innerText.match(/\(([^)]+)\)/)[1]; }, '#ContentPlaceHolder1_spanValue > button'),
                    onThatDay: page.evaluate(function() { return LitOldPrice.match(/\(([^)]+)\)/)[1] }),
                }
            },
            txFees: {
                ether: page.evaluate(function(s) { return document.querySelector(s).innerText.replace(" Ether", ""); }, '#ContentPlaceHolder1_spanTxFee > span'),
                inUSD: {
                    current: page.evaluate(function(s) { return document.querySelector(s).innerText.match(/\(([^)]+)\)/)[1]; }, '#ContentPlaceHolder1_spanTxFee > button'),
                    onThatDay: page.evaluate(function() { return LitOldTxCost.match(/\(([^)]+)\)/)[1]; }),
                }
            },
            gasPrice: {
                ether: page.evaluate(function(s) { return document.querySelector(s).innerText.replace( /\s*(?:\[[^\]]*\]|\([^)]*\))\s*/g, "" ).replace(" Ether", ""); }, '#ContentPlaceHolder1_spanGasPrice'),
                gwei: page.evaluate(function(s) { return document.querySelector(s).innerText.match(/\(([^)]+)\)/)[1].replace(" Gwei", ""); }, '#ContentPlaceHolder1_spanGasPrice'),
            },
            etherPrice: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#ContentPlaceHolder1_spanClosingPrice'),
            gasLimit: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#ContentPlaceHolder1_spanGasLimit'),
            gasUsed: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#ContentPlaceHolder1_spanGasUsedByTxn'),
            nonce: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#ContentPlaceHolder1_collapseContent > div.row.mn-3 > div.col-md-9 > span:nth-child(1)'),
            txPositionInBlock: page.evaluate(function(s) { return document.querySelector(s).innerText; }, '#ContentPlaceHolder1_collapseContent > div.row.mn-3 > div.col-md-9 > span.u-label.u-label--xs.u-label--badge-out.u-label--secondary.ml-1.mr-3'),
            inputData:  {
                function: page.evaluate(function() { return LitFunctionName; }),
            },
        }

        if (response.to.properties > 5) { //contract
            response.to.contract_name = page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[4].innerText.match(/\(([^)]+)\)/)[1] }, '#spanToAdd');
            response.to.contract_execution = page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[5].className.indexOf("success") > 0 }, '#spanToAdd');
        }

        if (response.to.contract_execution === false) // get contract error if there's any
            response.to.contract_error = page.evaluate(function(s) { return document.querySelector(s).parentElement.childNodes[10].innerText }, '#spanToAdd');

        if (response.to.contract_execution === true) { // tokens transferred... logs
            response.to.tokens_transffered = {};
            response.to.tokens_transffered = page.evaluate(function() {
                var elements = document.querySelectorAll('ul#wrapperContent > li div');
                var logs = [];
                for (var i = 0; i < elements.length; ++i) {
                    var l = elements[i];
                    var from = l.childNodes[1].querySelector("span").getAttribute('data-original-title') || l.childNodes[1].querySelector("span").getAttribute('title');
                    var to = l.childNodes[3].querySelector("span").getAttribute('data-original-title') || l.childNodes[3].querySelector("span").getAttribute('title');
                    var tokenNameIsLong = l.childNodes[9].firstElementChild !== null;
                    var tokenName = tokenNameIsLong ? ( l.childNodes[9].firstElementChild.getAttribute('data-original-title') || l.childNodes[9].firstElementChild.getAttribute('title') ) + l.childNodes[9].childNodes[1].textContent : l.childNodes[9].innerText;
                    var log = {
                        from: from.match(/\(([^)]+)\)/) ? from.match(/\(([^)]+)\)/)[1] : from,
                        to: to.match(/\(([^)]+)\)/) ? to.match(/\(([^)]+)\)/)[1] : to,
                        for: l.childNodes[5].querySelector('span').innerText,
                        currentPrice: l.childNodes[5].querySelector('span').getAttribute('data-original-title').replace(/ /g,'').replace("CurrentPrice:", ""),
                        exchangeRate: {
                            current: l.childNodes[6].innerText.match(/\(([^)]+)\)/)[1],
                            onThatDay: l.childNodes[6].getAttribute('value').match(/\(([^)]+)\)/)[1],
                        },
                        tokenName: tokenName,
                        tokenAddress: l.childNodes[9].getAttribute('href').replace('/token/', '')
                    };
                    logs.push(log);
                }
                return logs;
            });
        }
        delete response.to.properties;

        console.log(JSON.stringify({status:200, body:response}));
        phantom.exit();
    }, 200);
});