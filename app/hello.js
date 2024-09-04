const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    // Connect to your Substrate node
    const wsProvider = new WsProvider('ws://127.0.0.1:9944'); // replace with your node's WebSocket endpoint
    const api = await ApiPromise.create({ provider: wsProvider });

    // Replace with the block hash you are interested in
    const blockHash = '0x8ad4960941190d155b22bf3c1c6aeacb4cdcfcc87b519a87106be7dfd342ae1d';
    
    // Get the block
    const { block } = await api.rpc.chain.getBlock(blockHash);
    
    // Extract the second extrinsic (index 1)
    const extrinsic = block.extrinsics[1];
    
    // Get the extrinsic details in human-readable format
    console.log('extrinsic:', JSON.stringify(extrinsic.toHuman(), null, 2));
    
    // Query fee details
    const queryFeeDetails = await api.rpc.payment.queryFeeDetails(extrinsic.toHex(), blockHash);
    console.log('queryFeeDetails:', JSON.stringify(queryFeeDetails.toHuman(), null, 2));
    
    // Query additional info about the fee
    const queryInfo = await api.rpc.payment.queryInfo(extrinsic.toHex(), blockHash);
    console.log('queryInfo:', JSON.stringify(queryInfo.toHuman(), null, 2));
}

main().catch(console.error);
