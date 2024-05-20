import React from "react";
import Layout from "../../components/layout";
import { useContractRead } from "wagmi";
import { ContractAddress } from "../../constants/ContractAddress";
import { abi } from "../../constants/ABIcontract";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { parseEther, parseGwei } from "viem";

const Payment = () => {
  const LandOwner = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "getLandOwner",
    args: [1],
  });


  console.log('adsf',LandOwner.data);
  const IsLandVerified = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "LandVerification",
    args: [1],
  });

  const Price = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "getPrice",
    args: [1],
  });


  const isPaid = useContractRead({
    address: ContractAddress,
    abi: abi,
    functionName: "isPaid",
    args: [1],
  });
  const value = Number(Price.data) * (0.0000052);

  const payment = async () => {
    const { request } = await prepareWriteContract({
      address: ContractAddress,
      abi: abi,
      functionName: "payment",
      args: [LandOwner?.data, 1],
      value: parseEther(value.toString()),
    });

    const { hash } = await writeContract(request);
  };



  return (
    <Layout>
      <div>
        <h1 className="font-bold">Payment for Lands</h1>
      </div>
      <table className="w-full">
        <thead className="text-left">
          <tr>

          <th>#</th>
          <th>Land Owner</th>
          <th>Price</th>
          <th>Make Payment</th>
          </tr>
        </thead>
        <tbody>
          <td>1</td>
          <td>{LandOwner?.data?.toString()}</td>
          <td>{Price.data?.toString()}</td>
          <td>
            <button
              disabled={!IsLandVerified.data || isPaid.data}
              onClick={() => payment()}
              className="disabled:bg-gray-400 bg-blue-600 min-w-[120px]  p-3 rounded-lg text-white"
            >
              {isPaid.data ?  "Paid" : (IsLandVerified.data ? "Make Payment" : "Land Not Verified")}
            </button>
          </td>
        </tbody>
      </table>
    </Layout>
  );
};

export default Payment;
