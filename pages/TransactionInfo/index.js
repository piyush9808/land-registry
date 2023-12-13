import React from 'react'
import Layout from '../../components/layout'
import { useContractRead } from 'wagmi'
import { ContractAddress } from '../../constants/ContractAddress'
import { abi } from '../../constants/ABIcontract'
import {prepareWriteContract, writeContract} from '@wagmi/core'

const TransactionInfo = () => {

    const LandOwner = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getLandOwner",
        args:[1]
    })

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



    const buyerId = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getBuyer",
    })

    const verify = async () => {
        const {request} = await prepareWriteContract({
            address: ContractAddress,
            abi: abi,
            functionName: "LandOwnershipTransfer",
            args: [1, buyerId.data[0]],
        })

        const {hash} = await writeContract(request);
    }

  return (
    <Layout>
        <div>
            <table className='w-full'>
                <thead className='text-left'>
                    <th>
                        #
                    </th>
                    <th>Owner ID</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Price</th>
                    <th>Property PID </th>
                    <th>Survey No.</th>
                    <th>Verify Land Tranfer</th>
                </thead>
                <tbody>
                    <td>1</td>
                    <td>{(LandOwner?.data)?.toString()}</td>
                    <td>{(Area?.data)?.toString()}</td>
                    <td>{(City?.data)?.toString()}</td>
                    <td>{(State?.data)?.toString()}</td>
                    <td>{(Price?.data)?.toString()}</td>
                    <td>{(PID?.data)?.toString()}</td>
                    <td>{(SurveyNumber?.data)?.toString()}</td>
                    <td><button onClick={() => verify()} className='bg-blue-600 text-white p-4 rounded-lg'>Verify Transaction</button></td>
                </tbody>
            </table>

        </div>
    </Layout>
  )
}

export default TransactionInfo