import {get0xLimitOrder} from "./orders"

async function exec() {
    const signedOrder = await get0xLimitOrder('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // DAI
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
        1000000000000000000,
        10000000,
        '0xF4c24E94083342E493C31F2f58cf4eBB248C7aF4',
        '<real pvt key>')

    console.log(signedOrder)

    const resp = fetch("https://polygon.api.0x.org/orderbook/v1/order", {
        method: "POST",
        body: JSON.stringify(signedOrder),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log("Successfully posted order to SRA");
        } else {
            console.log("response code: " + response.status)
            response.text().then((result) => console.log(result))
        }
    }).catch((err) => {
        console.log(err)
    });

    console.log('resp: ' + resp)
}

exec()
