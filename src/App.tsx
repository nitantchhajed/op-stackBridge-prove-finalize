import { useState } from 'react';
import styleoLogo from './assets/logo.png';
import './App.css';
import { abi } from "./L2OO_ABI";
import { useEffect } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract } from 'wagmi';

import { useWriteProveWithdrawalTransaction, useWriteFinalizeWithdrawalTransaction } from 'opstack-kit';

function App() {
  const [withdrawalTxHash, setWithdrawalTxHash] = useState(''); // State for amount
  const [withdrawalFinalizeTxHash, setWithdrawalFinalizeTxHash] = useState(''); // State for amount

  const { writeFinalizeWithdrawalTransaction } = useWriteFinalizeWithdrawalTransaction()

  const { writeProveWithdrawalTransaction } = useWriteProveWithdrawalTransaction()
  const { data: latestL2Block, isError, isLoading } = useReadContract({
    abi,
    address: '0xdc58E4b60DdeA49475a74447A2cFF0c89cc03633',
    functionName: 'latestBlockNumber',
  });


  useEffect(() => {
    if (!isLoading && !isError) {
      console.log({ latestL2Block });
    }
  }, [latestL2Block, isError, isLoading]);
  return (
    <>
      <div>
        <img src={styleoLogo} className="logo react" alt="Styleo logo" />
      </div>
      <h1>Styleo Coin withdrawal</h1>
      <br />
      <div>
        <h4>Latest L2 finalized block is: {latestL2Block?.toString() || 'Loading...'}.</h4>
        <h4> Make sure your L2 transaction block is finalized before proving the withdrawal.</h4>
      </div>

      <ConnectButton />

      <div className="card">
        <br />
        <p>Step 2: Prove Withdrawal</p>
        <input
          type="string"
          value={withdrawalTxHash}
          onChange={(e) => setWithdrawalTxHash(e.target.value)} // Update amount state on input change
          placeholder="Enter L2 Tansaction Hash"
        />
        <button
          onClick={() =>
            writeProveWithdrawalTransaction({
              args: {
                withdrawalTxHash: withdrawalTxHash as `0x${string}`,
              },
              l2ChainId: 4267,
            },
              {
                onSuccess: (data) => {
                  console.log('Prove successful', data);
                },
                onError: (error) => {
                  console.error('Error during Prove', error);
                },
                onSettled: (data, error) => {
                  console.log('Prove has been settled', { data, error });
                },
              }
            )
          }
        >
          Prove Withdrawal
        </button>
        <br />
        <br />
        <p>Step 3: Finalize Withdrawal</p>
        <input
          type="string"
          value={withdrawalFinalizeTxHash}
          onChange={(e) => setWithdrawalFinalizeTxHash(e.target.value)} // Update amount state on input change
          placeholder="Enter L2 Tansaction Hash"
        />
        <button
          onClick={() =>
            // It should be on the correct L1 network with l2ChainId to start the transaction.
            writeFinalizeWithdrawalTransaction({
              args: {
                withdrawalTxHash: withdrawalFinalizeTxHash as `0x${string}`,
              },
              l2ChainId: 4267, // Edit chainID "l2ChainId" select to L2 //
            },
              {
                onSuccess: (data) => {
                  console.log('Finalize successful', data);
                },
                onError: (error) => {
                  console.error('Error during Finalize', error);
                },
                onSettled: (data, error) => {
                  console.log('Finalize has been settled', { data, error });
                },
              }
            )
          }
        >
          Finalize Withdrawal
        </button>
      </div>
    </>
  );
}

export default App;
