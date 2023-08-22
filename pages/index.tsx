import Link  from 'next/link'
import Page  from 'components/Page'
import Card  from 'components/Card'
import Tile  from 'components/Tile'
import Image from 'next/image'
//import Button from '../components/Button'

export default function Home() {
  return (
    <>
      <Page toolbarTitle="Give Credit" className="w-11/12 md:w-1/2 2xl:w-1/3 md:mt-20 bg-green-900 shadow-3xl backdrop-blur m-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl">Be the change!</h1>
          Donate to causes you believe in with XLM, save the
          world retiring carbon credits, get limited edition NFTs, and reduce tax liability
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Tile 
            text="Donate"
            icon="volunteer_activism"
            href="/organizations"
          />
          <Link href="/organizations/123456">
            <Card className="h-full p-4">
              <div className="h-full w-full flex flex-col justify-between items-center">
                <Image
                  src="/media/publicnode.png"
                  alt="[Test] Environmental Non-Profit"
                  width={200}
                  height={120}
                  className="mt-4"
                />
                <h4 className="self-center font-bold uppercase">Featured</h4>
              </div>
            </Card>
          </Link>
          <Tile text="Receipts" icon="receipt_long" href="/receipts" />
          <Tile text="My NFTS" icon="collections" href="/nfts" />
        </div>
        <div className="mt-5">
          <div className="text-center">
            {/*<button id="login" onClick={onLogin}>Login with Lobstr wallet</button>*/}
            {/*<button id="logout" onClick={onLogout} className="hidden mx-auto">Logout</button>*/}
          </div>
          <div className="text-center ">
            <Link href={'https://lobstr.co'} target="_blank">Download Lobstr wallet</Link>
          </div>
        </div>
      </Page>
    </>
  );
}