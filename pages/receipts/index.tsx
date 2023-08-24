import { useRouter } from 'next/router';
//import { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';

import Page from 'components/Page';
import Card from 'components/Card';
import Divider from 'components/Divider';
//import Spinner from 'components/Spinner';
import TextRow from 'components/TextRow';
import BackButton from 'components/BackButton';
import { getNFTsByAccount } from 'utils/registry';
import moment from 'moment';
import Session from 'utils/session';

export async function getServerSideProps({ req, query }){
  const { wallet } = query;
  console.log({ wallet });
  const session = Session(req)
  const NFTs = await getNFTsByAccount(wallet);
  NFTs.sort((n1, n2) => (n1.created < n2.created ? 1 : -1));

  //const NFTs = await getNFTArray(wallet)
  //const NFTs = [
  //  {
  //    NFTokenID:'123345',
  //    transactionMeta:{
  //      time:'2023-01-01T08:30:50',
  //      organization:'United Nations',
  //      amount:{
  //        value:'123',
  //        currency:'XLM'
  //      }
  //    }
  //  }]
  //console.log('Session:', session)
  return { props: {session, NFTs} }
}

function showNfts(NFTs, router){
  return NFTs.map(
    ({
      NFTokenID,
      transactionMeta: {
        time,
        organization,
        amount: { value, currency }
      }
    }) => (
      <Card
        key={time}
        onClick={() => router.push(`/xapp/nfts/receipts/${NFTokenID}`)}
      >
        <>
          <span className="text-slate-50 text-2xl p-6">
            {moment(time).format('dddd, MMMM DD YYYY')}
          </span>
          <Divider />
          <div className="flex flex-col w-full items-start">
            <TextRow
              text={organization}
              label={'Recipient'}
              className="px-6 py-3"
            />
            <TextRow
              text={`${value} ${currency}`}
              label={'Donation Value'}
              className="px-6 py-3 mb-3"
            />
          </div>
        </>
      </Card>
    )
  )
}

export default function Receipts(props) {
  //console.log({props})
  const { ...router } = useRouter()
  const {session:{wallet}, NFTs} = props
  console.log(wallet, NFTs)
  const qty = NFTs.length ?? 0
  return (
    <>
      <Page>
        <BackButton />
        <div className="px-6">
          { qty<1 ? <h1 className="text-center">No Receipts</h1> : showNfts(NFTs, router) }
        </div>
      </Page>
    </>
  )
}
