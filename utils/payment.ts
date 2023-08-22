import * as StellarSdk from 'stellar-sdk'

export default async function PaymentXDR(source, destin, amount, currency, issuer, memo='') {
  const server = new StellarSdk.Server(process.env.NEXT_PUBLIC_STELLAR_RPC_URI)
  const account = await server.loadAccount(source)
  //const baseFee = await server.fetchBaseFee()
  //const network = StellarSdk.Networks.PUBLIC
  const network = (process.env.NEXT_PUBLIC_STELLAR_NETWORK=='mainnet' ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET)
  const operation = StellarSdk.Operation.payment({
    destination: destin,
    amount: amount,
    asset: StellarSdk.Asset.native()
  })
  const transaction = new StellarSdk.TransactionBuilder(account, {networkPassphrase: network, fee:StellarSdk.BASE_FEE})
  const tx = transaction.addOperation(operation)
  if(memo) { tx.addMemo(StellarSdk.Memo.text(memo)) }
  const built = tx.setTimeout(120).build()
  const txid  = built.hash().toString('hex')
  const xdr   = built.toXDR()
  //console.log('XDR:', xdr)
  //console.log('HASH:', txid)
  return {txid, xdr}
}