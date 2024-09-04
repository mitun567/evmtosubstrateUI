from web3 import Web3

from substrateinterface import SubstrateInterface, Keypair

from substrateinterface.exceptions import SubstrateRequestException

import json

import time

import logging




# logging.basicConfig(level=logging.DEBUG)




infura_url = f'https://polygon-mainnet.infura.io/v3/a03b29e9e3b745b4a1a314357a721c0a'

web3 = Web3(Web3.HTTPProvider(infura_url))




from web3.middleware import geth_poa_middleware



web3.middleware_onion.inject(geth_poa_middleware, layer=0)




agc_bridge_abi = json.loads('''[

    {

        "inputs": [

            {

                "internalType": "contract IERC20",

                "name": "_agcToken",

                "type": "address"

            },

            {

                "internalType": "address",

                "name": "initialOwner",

                "type": "address"

            }

        ],

        "stateMutability": "nonpayable",

        "type": "constructor"

    },

    {

        "inputs": [

            {

                "internalType": "address",

                "name": "owner",

                "type": "address"

            }

        ],

        "name": "OwnableInvalidOwner",

        "type": "error"

    },

    {

        "inputs": [

            {

                "internalType": "address",

                "name": "account",

                "type": "address"

            }

        ],

        "name": "OwnableUnauthorizedAccount",

        "type": "error"

    },

    {

        "anonymous": false,

        "inputs": [

            {

                "indexed": true,

                "internalType": "address",

                "name": "previousOwner",

                "type": "address"

            },

            {

                "indexed": true,

                "internalType": "address",

                "name": "newOwner",

                "type": "address"

            }

        ],

        "name": "OwnershipTransferred",

        "type": "event"

    },

    {

        "anonymous": false,

        "inputs": [

            {

                "indexed": true,

                "internalType": "address",

                "name": "account",

                "type": "address"

            },

            {

                "indexed": false,

                "internalType": "uint256",

                "name": "amount",

                "type": "uint256"

            },

            {

                "indexed": false,

                "internalType": "string",

                "name": "substrateAddress",

                "type": "string"

            }

        ],

        "name": "TokensLocked",

        "type": "event"

    },

    {

        "anonymous": false,

        "inputs": [

            {

                "indexed": true,

                "internalType": "address",

                "name": "account",

                "type": "address"

            },

            {

                "indexed": false,

                "internalType": "uint256",

                "name": "amount",

                "type": "uint256"

            }

        ],

        "name": "TokensUnlocked",

        "type": "event"

    },

    {

        "inputs": [],

        "name": "agcToken",

        "outputs": [

            {

                "internalType": "contract IERC20",

                "name": "",

                "type": "address"

            }

        ],

        "stateMutability": "view",

        "type": "function"

    },

    {

        "inputs": [

            {

                "internalType": "address",

                "name": "account",

                "type": "address"

            }

        ],

        "name": "getLockedBalance",

        "outputs": [

            {

                "internalType": "uint256",

                "name": "",

                "type": "uint256"

            }

        ],

        "stateMutability": "view",

        "type": "function"

    },

    {

        "inputs": [

            {

                "internalType": "address",

                "name": "account",

                "type": "address"

            }

        ],

        "name": "getSubstrateAddress",

        "outputs": [

            {

                "internalType": "string",

                "name": "",

                "type": "string"

            }

        ],

        "stateMutability": "view",

        "type": "function"

    },

    {

        "inputs": [

            {

                "internalType": "uint256",

                "name": "amount",

                "type": "uint256"

            },

            {

                "internalType": "string",

                "name": "substrateAddress",

                "type": "string"

            }

        ],

        "name": "lockTokens",

        "outputs": [],

        "stateMutability": "nonpayable",

        "type": "function"

    },

    {

        "inputs": [],

        "name": "owner",

        "outputs": [

            {

                "internalType": "address",

                "name": "",

                "type": "address"

            }

        ],

        "stateMutability": "view",

        "type": "function"

    },

    {

        "inputs": [],

        "name": "renounceOwnership",

        "outputs": [],

        "stateMutability": "nonpayable",

        "type": "function"

    },

    {

        "inputs": [

            {

                "internalType": "address",

                "name": "newOwner",

                "type": "address"

            }

        ],

        "name": "transferOwnership",

        "outputs": [],

        "stateMutability": "nonpayable",

        "type": "function"

    },

    {

        "inputs": [

            {

                "internalType": "uint256",

                "name": "amount",

                "type": "uint256"

            }

        ],

        "name": "unlockTokens",

        "outputs": [],

        "stateMutability": "nonpayable",

        "type": "function"

    }

]''')




agc_bridge_address = '0x7e41b691f750238bF5a7A8b00f33EEbC3C23c739'

agc_bridge_contract = web3.eth.contract(address=agc_bridge_address, abi=agc_bridge_abi)


custom_type_registry = {

    "types": {

        "Address": "MultiAddress",

        "LookupSource": "MultiAddress"

    }

}




try:

    substrate = SubstrateInterface(

        url="ws://127.0.0.1:9944",

        ss58_format=42,

        type_registry_preset='polkadot',

        type_registry=custom_type_registry

    )

    print("Connected to Substrate node")

except Exception as e:

    print(f"Failed to connect to Substrate node: {e}")

    exit(1)




sudo_mnemonic = 'trap dolphin orient merge survey develop cigar unique bulk bargain raw below'

sudo_keypair = Keypair.create_from_mnemonic(sudo_mnemonic)




def handle_tokens_locked(event):

    eth_account = event['args']['account']

    amount = event['args']['amount']

    substrate_address = event['args']['substrateAddress']  # Substrate address from the UI

    print(f"TokensLocked event detected: account={eth_account}, amount={amount}, substrate_address={substrate_address}")




    mint_tokens_on_substrate(substrate_address, amount)




def handle_tokens_unlocked(event):

    eth_account = event['args']['account']

    amount = event['args']['amount']

    substrate_address = event['args']['substrateAddress']

    print(f"TokensUnlocked event detected: account={eth_account}, amount={amount}, substrate_address={substrate_address}")




    burn_tokens_on_substrate(substrate_address, amount)




def mint_tokens_on_substrate(account, amount):


    mint_call = substrate.compose_call(

        call_module='PalletCounter',

        call_function='mint',

        call_params={

            'account': account,

            'amount': amount

        }

    )




    sudo_call = substrate.compose_call(

        call_module='Sudo',

        call_function='sudo',

        call_params={

            'call': mint_call

        }

    )




    extrinsic = substrate.create_signed_extrinsic(call=sudo_call, keypair=sudo_keypair)



    try:


        receipt = substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)

        print(f"Minted tokens on Substrate: Extrinsic sent and included in block '{receipt['block_hash']}'")

    except SubstrateRequestException as e:

        print(f"Failed to mint tokens: {e}")




def burn_tokens_on_substrate(account, amount):


    burn_call = substrate.compose_call(

        call_module='PalletCounter',

        call_function='burn',

        call_params={

            'account': account,

            'amount': amount

        }

    )




    sudo_call = substrate.compose_call(

        call_module='Sudo',

        call_function='sudo',

        call_params={

            'call': burn_call

        }

    )




    extrinsic = substrate.create_signed_extrinsic(call=sudo_call, keypair=sudo_keypair)



    try:


        receipt = substrate.submit_extrinsic(extrinsic, wait_for_inclusion=True)

        print(f"Burned tokens on Substrate: Extrinsic sent and included in block '{receipt['block_hash']}'")

    except SubstrateRequestException as e:

        print(f"Failed to burn tokens: {e}")




def main():

    latest_block = web3.eth.get_block('latest')['number']

    processed_blocks = set()



    while True:

        new_block = web3.eth.get_block('latest')['number']



        if new_block > latest_block:

            for block_number in range(latest_block + 1, new_block + 1):

                if block_number not in processed_blocks:

                    print(f"Processing block {block_number}")

                    try:

                        locked_events = agc_bridge_contract.events.TokensLocked().get_logs(fromBlock=block_number, toBlock=block_number)

                        unlocked_events = agc_bridge_contract.events.TokensUnlocked().get_logs(fromBlock=block_number, toBlock=block_number)



                        for event in locked_events:

                            handle_tokens_locked(event)



                        for event in unlocked_events:

                            handle_tokens_unlocked(event)



                        processed_blocks.add(block_number)

                    except Exception as e:

                        print(f"Error processing block {block_number}: {e}")



            latest_block = new_block



        time.sleep(5)



if __name__ == "__main__":

    main()