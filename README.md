# Etherscan.io Scraper
Unofficial Etherscan.io scraper. Written in Javascript and based on Phantom.js.

## CLI usage::
```
.\phantomjs.exe .\scrape.js 0x5c5304571465eeedc53437618a4fbeef20591ea6c9cc4dfe986aa91df7984b52
```

## Response::
```
{
  "status": 200,
  "body": {
    "txHash": "0x5c5304571465eeedc53437618a4fbeef20591ea6c9cc4dfe986aa91df7984b52",
    "status": "Success",
    "blockNumber": 12971689,
    "blockConfirmation": "108 Block Confirmations",
    "confirmedIn": "1min",
    "timestamp": "Aug-06-2021 01:30:43 PM +UTC",
    "from": {
      "address": "0x1611c227725c5e420ef058275ae772b41775e261"
    },
    "to": {
      "type": "Contract ",
      "address": "0x11111112542d85b3ef69ae05771c2dccff4faa26",
      "contract_name": "1inch V3",
      "contract_execution": false,
      "contract_error": "Although one or more Error Occurred [Reverted] Contract Execution Completed",
      "tokens_transffered": [
        {
          "currentPrice": "$1.00/USDT",
          "exchangeRate": {
            "current": "$11,988.74",
            "onThatDay": ""
          },
          "for": "12,000",
          "from": "0x1611c227725c5e420ef058275ae772b41775e261",
          "to": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "tokenName": "Tether USD (USDT)"
        },
        {
          "currentPrice": "$1.00/USDT",
          "exchangeRate": {
            "current": "$5,994.37",
            "onThatDay": ""
          },
          "for": "6,000",
          "from": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "to": "0x40bbde0ec6f177c4a67360d0f0969cfc464b0bb4",
          "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "tokenName": "Tether USD (USDT)"
        },
        {
          "currentPrice": "$1.00/USDC",
          "exchangeRate": {
            "current": "$5,999.42",
            "onThatDay": ""
          },
          "for": "5,999.420063",
          "from": "0x40bbde0ec6f177c4a67360d0f0969cfc464b0bb4",
          "to": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "tokenName": "USD Coin (USDC)"
        },
        {
          "currentPrice": "$40.05/FTXTo..",
          "exchangeRate": {
            "current": "$6,079.14",
            "onThatDay": ""
          },
          "for": "151.788827379916974477",
          "from": "0x15a7e01386fe8be69e486edbc55baac10629830c",
          "to": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "tokenAddress": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
          "tokenName": "FTX TokenFTX To..."
        },
        {
          "currentPrice": "$1.00/USDC",
          "exchangeRate": {
            "current": "$5,999.42",
            "onThatDay": ""
          },
          "for": "5,999.420063",
          "from": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "to": "0x15a7e01386fe8be69e486edbc55baac10629830c",
          "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "tokenName": "USD Coin (USDC)"
        },
        {
          "currentPrice": "$1.00/USDT",
          "exchangeRate": {
            "current": "$5,994.37",
            "onThatDay": ""
          },
          "for": "6,000",
          "from": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "to": "0x1611c227725c5e420ef058275ae772b41775e261",
          "tokenAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
          "tokenName": "Tether USD (USDT)"
        },
        {
          "currentPrice": "$40.05/FTXTo..",
          "exchangeRate": {
            "current": "$6,079.14",
            "onThatDay": ""
          },
          "for": "151.788827379916974477",
          "from": "0xc176761d388caf2f56cf03329d82e1e7c48ae09c",
          "to": "0x1611c227725c5e420ef058275ae772b41775e261",
          "tokenAddress": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
          "tokenName": "FTX TokenFTX To..."
        }
      ]
    },
    "value": {
      "ether": "0",
      "inUSD": {
        "current": null,
        "onThatDay": " "
      }
    },
    "txFees": {
      "ether": "0.022799601 ($63.24)",
      "inUSD": {
        "current": null,
        "onThatDay": " "
      }
    },
    "gasPrice": {
      "ether": "0.0000000495",
      "gwei": "49.5"
    },
    "etherPrice": null,
    "gasLimit": "623,459",
    "gasUsed": "460,598 (73.88%)",
    "nonce": "15379",
    "txPositionInBlock": "366",
    "inputData": {
      "function": ""
    }
  }
}
```
