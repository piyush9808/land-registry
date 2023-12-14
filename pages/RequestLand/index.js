import React from 'react'
import Layout from '../../components/layout'
import { useContractRead } from 'wagmi'
import { ContractAddress } from '../../constants/ContractAddress'
import { abi } from '../../constants/ABIcontract'
import {prepareWriteContract, writeContract} from '@wagmi/core'

const RequestLand = () => {

  const buyerId  = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "getBuyer",
    // args: [address],
  })


  const sellerId  = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "getSeller",
    // args: [address],
  })

  const approve  = async () => {
    const {request} = await prepareWriteContract({
        address: ContractAddress,
        abi:abi,
        functionName: "approveRequest",
        args: [1],
    })

    const {hash} = await writeContract(request);
  }


  const requestStatus = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "RequestStatus",
    args: [1],
  })

  console.log('requestStatus', requestStatus?.data);

  // console.log('buyerId', buyerId);

  return (
    <Layout>
      <table className='w-full'> 
        <thead className='text-left'>
          <th>#</th>
          <th>BuyerID</th>
          <th>Land ID</th>
          <th>Request Status</th>
          <th>Approve Request</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>{buyerId?.data}</td>
          <td>1</td>
          <td>{(requestStatus?.data)?.toString()}</td>
          <td>
            <button className='border bg-blue-600 text-white p-3 rounded-lg' onClick={() => approve()}>Approve 
            Request</button>
          </td>
        </tbody>
      </table>
    </Layout>
  )
}

export default RequestLand