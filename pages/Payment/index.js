import React from "react";
import Layout from "../../components/layout";
import { useContractRead } from "wagmi";
import { ContractAddress } from "../../constants/ContractAddress";
import { abi } from "../../constants/ABIcontract";
import {prepareWriteContract, writeContract} from '@wagmi/core'

const Payment = () => {


    const sellerId  = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getSeller",
        // args: [address],
      
    })


    const Price = useContractRead({
        address: ContractAddress,
        abi: abi,
        functionName: "getPrice",
        args: [1],
    })

    const value = Number(Price.data) * 0.000001;
    console.log('value', value)

    const payment  = async () => {
        const {request} = await prepareWriteContract({
            address: ContractAddress,
            abi:abi,
            functionName: "payment",
            args: [sellerId.data[0],1],
            value: value,
        })

        const {hash} = await writeContract(request);
    }

  return (
    <Layout>
        <div>
            <h1 className="font-bold">Payment for Lands</h1>
        </div>
      <table className="w-full">
        <thead className="text-left">
            <th>#</th>
            <th>Land Owner</th>
            <th>Price</th>
            <th>Make Payment</th>
        </thead>
        <tbody>
            <td>1</td>
            <td>{(sellerId?.data)?.toString()}</td>
            <td>{(Price.data)?.toString()}</td>
            <td>
                <button onClick={() => payment()} className="bg-blue-600 p-3 rounded-lg text-white">Make Payment</button>
            </td>
        </tbody>
      </table>
    </Layout>
  );
};

export default Payment;
