import React from 'react'
import Layout from '../../components/LayoutLandInspector'
import { useContractRead } from 'wagmi'
import { ContractAddress } from '../../constants/ContractAddress'
import { abi } from '../../constants/ABIcontract'
import Link from 'next/link'
import { prepareWriteContract, writeContract } from '@wagmi/core'

const VerifyLand = () => {


    const Area = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getArea",
        args: [1],
    })


    const City = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getCity",
        args: [1],
    })

    const State = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getState",
        args: [1],
    })

    const Price = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getPrice",
        args: [1],
    })

    const PID = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getPID",
        args: [1],
    })


    const SurveyNumber = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getSurveyNumber",
        args: [1],
    })


    const OwnerID  = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getLandOwner",
        args: [1],
    })


    const LandImage = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getImage",
        args: [1],
    })

    const Document = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getDocument",
        args: [1],
    })


    const verify = async () => {
        const {request} = await prepareWriteContract({
            address: ContractAddress,
            abi: abi,
            functionName: "verifyLand",
            args: [1],
        })

        await writeContract(request);


    }


    const alreadyVerified = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "isLandVerified",
        args: [1],
    })

    console.log('alreadyVerified',alreadyVerified.data)

    if(alreadyVerified.data){
        return (
            <div>
                <Layout>
                    <h1 className='text-2xl text-center'>No New Land To Verified</h1>
                </Layout>
            </div>
        )
    }
    
  return (
    <div>
       <Layout>
       <table className='w-full divide-y ' >
            <thead className='text-left'>
                <th>#</th>
                <th>Area</th>
                <th>City</th>
                <th>State</th>
                <th>Price</th>
                <th>Property PID</th>
                <th>Survey Number</th>
                <th>Owner ID</th>
                <th>land Image</th>
                <th>Document </th>
                <th>Verify</th>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>{(Area?.data)?.toString()}</td>
                    <td>{(City?.data)?.toString()}</td>
                    <td>{(State?.data)?.toString()}</td>
                    <td>{(Price?.data)?.toString()}</td>
                    <td>{(PID?.data)?.toString()}</td>
                    <td>{(SurveyNumber?.data)?.toString()}</td>
                    <td >{(OwnerID?.data)?.toString()}</td>
                    <td><Link className='text-sky-400' target='_blank' href={`https://ipfs.io/ipfs/${LandImage.data}`}>Click hare</Link></td>
                    <td><Link className='text-sky-400' target='_blank' href={`https://ipfs.io/ipfs/${Document.data}`}>Click hare</Link></td>
                    <button onClick={() => verify()} className='bg-blue-600 p-4 py-3 rounded-xl text-white'>Verify It</button>
                </tr>
            </tbody>
        </table>
       </Layout>
    </div>
  )
}

export default VerifyLand