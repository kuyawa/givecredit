// Mints NFT and returns tokenId
//   metauri: uri to metadata

import * as StellarSdk from 'stellar-sdk'

interface MintResponse {
  success?: boolean;
  error?:string|boolean;
  id?:string;
}

export default async function mintNFT(account:string, metauri: string):Promise<MintResponse>{
  console.log('Minting...', account, metauri)
  const server  = new StellarSdk.Server(process.env.STELLAR_RPC_URI)
  const minter  = StellarSdk.Keypair.fromSecret(process.env.CFCE_MINTER_WALLET_SEED) // GDXMQPQAPJ2UYPTNC53ZQ756TIIGFWVDRAP2QEWK6KVBRHXE3DJMLDEG
  const issuer  = minter.publicKey()
  const source  = await server.loadAccount(issuer)
  const myNFT   = new StellarSdk.Asset('GIVEXLM', issuer)
  const phrase  = process.env.STELLAR_NETWORK=='mainnet' ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET
  const timeout = 7200 // one minute

  var mintTx = new StellarSdk.TransactionBuilder(source, {
    networkPassphrase: phrase,
    fee: StellarSdk.BASE_FEE
  })

  let mintOp = StellarSdk.Operation.payment({
    source: issuer,
    destination: account,
    asset: myNFT,
    amount: '1'
  })

  let mint = mintTx
    .addOperation(mintOp)
    //.addMemo(StellarSdk.Memo.text(metauri))
    .setTimeout(timeout)
    .build()
  
  //console.log('Minting...')
  try {
    mint.sign(minter)
    let minted = await server.submitTransaction(mint)
    console.log('Minted', minted)
    if(minted?.successful){
      // StellarSDK interface from server.submitTransaction response without paging_token
      // Clone the result and get the paging_token from there
      const cloned = JSON.parse(JSON.stringify(minted))
      const opid = (BigInt(cloned?.paging_token || '0') + BigInt(1)).toString() // eslint-disable-line
      console.log('Txid', opid)
      return {success:true, id:opid}
    } else {
      //console.log('Error', minted.response?.data?.extras?.result_codes)
      //return {success:false, error:'Error minting '+minted?.response?.data?.extras?.result_codes}
      //console.log('Error?', minted?.response?.data)
      console.log('Error?', minted)
      return {success:false, error:'Error minting NFT'}
    }
  } catch(ex) {
    console.error(ex)
    return {success:false, error:ex.message}
  }
}

// END