import React, { useContext } from "react";
import { useContractRead } from "wagmi";
import { ContractAddress } from "../constants/ContractAddress";
import { abi } from "../constants/ABIcontract";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { RoleContext } from "../context/RoleContext";
import { prepareWriteContract, writeContract } from "@wagmi/core";

const LandInfoTable = () => {

    const {role } = useContext(RoleContext)

    const router = useRouter();
  const { address } = useAccount();

  const state = useContractRead({
    address: ContractAddress,
    functionName: "getState",
    args: [1],
    abi: abi,
  });

  const Area = useContractRead({
    address: ContractAddress,
    functionName: "getArea",
    args: [1],
    abi: abi,
  });

  const City = useContractRead({
    address: ContractAddress,
    functionName: "getCity",
    args: [1],
    abi: abi,
  });

  const Price = useContractRead({
    address: ContractAddress,
    functionName: "getPrice",
    args: [1],
    abi: abi,
  });

  const PID  = useContractRead({
    address: ContractAddress,
    functionName: "getPID",
    args: [1],
    abi: abi,
  });

  const SurveyNumber = useContractRead({
    address: ContractAddress,
    functionName: "getSurveyNumber",
    args: [1],
    abi: abi,
  });


  const sellerId = useContractRead({
    address: ContractAddress,
    functionName: "getSeller",
    abi: abi,
  });


  const requestLand = async () => {
    const { request } = await prepareWriteContract({
      address: ContractAddress,
      abi: abi,
      functionName: "requestLand",
      args: [sellerId.data[0],1],
    });

    const { hash } = await writeContract(request);
  }

  if(!state.data){
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }


  

  return (
    <>
    <div className="border divide-y my-3">
      <h1>Land Info</h1>
      <table className="w-full divide-y ">
        <thead className="text-left">
          <th>#</th>
          <th>Area</th>
          <th>City</th>
          <th>State</th>
          <th>Price</th>
          <th>Property PID</th>
          <th>Survey Number</th>
            {role === 'Buyer' && (<><th>Request Land </th></>)}
          
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{Area.data.toString()}</td>
            <td>{City.data}</td>
            <td>{state.data}</td>
            <td>{(Price.data).toString()}</td>
            <td>{(PID.data).toString()}</td>
            <td>{(SurveyNumber.data).toString()}</td>
            {role === 'Buyer' && (<><td><button onClick={() => requestLand()} className="bg-blue-600 w-32 px-3 py-3 text-white rounded-xl">Request Land</button></td></>)}
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex flex-col gap-6 mt-10 border w-60 rounded-lg p-3 bg-slate-50">
        <h1>View Images of all Lands!</h1>
        <button onClick={() => router.push("/AllImages")} className="bg-blue-600 w-32 px-3 py-3 text-white rounded-xl">View Images</button>
    </div>
    </>
  );
};

export default LandInfoTable;
