// ref: https://github.com/opynfinance/perp-vault-templates/blob/master/test/utils/orders.ts
import {BigNumber, constants} from "ethers";

const v4orderUtils = require("@0x/protocol-utils");
// const contractAddresses = require("@0x/contract-addresses");

export const get0xLimitOrder = async (
    makerToken: string,
    takerToken: string,
    makerAmount: number,
    takerAmount: number,
    maker: string,
    privateKey: string
) => {
    const takerTokenFeeAmount = 0;
    const salt = BigNumber.from(Date.now().toFixed(0));
    const order = new v4orderUtils.LimitOrder({
        chainId: 137,
        makerToken,
        takerToken,
        makerAmount,
        takerAmount,
        maker,
        salt,
        takerTokenFeeAmount,
        expiry: (parseInt((Date.now() / 1000).toString(10)) + 600).toString(10),
    });
    // Maker's 32-byte private key, in hex.
    const signature = await order.getSignatureWithKey(privateKey, v4orderUtils.SignatureType.EIP712);
    const newOrder = {
        ...order,
        makerAmount: BigNumber.from(order.makerAmount.toString()).toString(), //.toString(),
        takerAmount: BigNumber.from(order.takerAmount.toString()).toString(), //.toString(),
        salt: BigNumber.from(order.salt).toString(),
        takerTokenFeeAmount: BigNumber.from(takerTokenFeeAmount).toString(),
        signature,
    };
    return newOrder;
};

export const get0xRFQOrder = async (
    makerToken: string,
    takerToken: string,
    makerAmount: number,
    takerAmount: number,
    maker: string,
    txOrigin: string,
    privateKey: string
) => {
    const salt = BigNumber.from(Date.now().toFixed(0));
    const order = new v4orderUtils.RfqOrder({
        chainId: 137,
        makerToken,
        takerToken,
        makerAmount,
        takerAmount,
        maker,
        salt,
        expiry: (parseInt((Date.now() / 1000).toString(10)) + 300).toString(10),
        txOrigin,
    });
    console.log(JSON.stringify(order))
    // Maker's 32-byte private key, in hex.
    const signature = await order.getSignatureWithKey(privateKey, v4orderUtils.SignatureType.EIP712);
    const newOrder = {
        ...order,
        makerAmount: order.makerAmount.toString(),
        takerAmount: order.takerAmount.toString(),
        salt: order.salt.toString(),
        signature,
    };
    return newOrder;
};
