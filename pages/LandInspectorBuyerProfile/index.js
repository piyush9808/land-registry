import React, { useEffect, useState } from "react";
import Layout from "../../components/LayoutLandInspector";
import { useContractRead } from "wagmi";
import { abi } from "../../constants/ABIcontract";
import { ContractAddress } from "../../constants/ContractAddress";
import Link from "next/link";
import { prepareWriteContract, writeContract } from "@wagmi/core";

const BuyerProfile = () => {



  const [mounted, setMounted] = useState(false);

    const data = useContractRead({
        address:ContractAddress,
        abi: abi,
        functionName: "getBuyer",
    })

    // console.log('data',data.data[0]);

    const {data: data1} = useContractRead({
        address:ContractAddress,
        abi: abi,
        functionName: "getBuyerDetails",
        args: [data?.data?.[0]],
        
    })
    
    const verifyBuyer = useContractRead({
        address:ContractAddress,
        abi: abi,
        functionName: "isVerified",
        args: [data?.data?.[0]],
    })


    const verify = async () => {
        const {request} = await prepareWriteContract({
            address: ContractAddress,
            abi: abi,
            functionName: "verifyBuyer",
            args: [data?.data?.[0]],
        })

        const {hash} = await writeContract(request);
    }

    const reject  = async () => {
        const {request} = await prepareWriteContract({
            address: ContractAddress,
            abi:abi,
            functionName: "rejectBuyer",
            args: [data?.data?.[0]],
        })

        const {hash} = await writeContract(request);
    }



    useEffect(() => {
      setMounted(true);
    },[])

  return (
    <Layout>
      <table className="table-auto">
        <thead className="">
          <tr className="text-left">
            <th>Account Address</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>City</th>
            <th>Aadhar Number</th>
            <th>Pan Number</th>
            <th>Aadhar Card Document</th>
            <th>Verification Status</th>
            <th>Verify Buyer</th>
            <th>Reject Buyer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              mounted && (<>
              <td>{data.data?.[0]}</td>
            <td>{data1?.[0]}</td>
            <td>{Number(data1?.[5])}</td>
            <td>{data1?.[4]}</td>
            <td>{data1?.[1]}</td>
            <td>{data1?.[2]}</td>
            <td>{data1?.[6]}</td>
            <td><Link href={data1?.[3]  || ""  } target="_black" className="text-sky-600">Click Here</Link></td>
            <td>{(verifyBuyer?.data)?.toString()}</td></>)
            }
            <td><button onClick={() => verify()} className="bg-blue-600 text-white px-5 py-2 rounded-lg">verify</button></td>
            <td><button onClick={() => reject()} className="bg-red-500 text-white px-5 py-2 rounded-lg">Reject</button></td>
          </tr>
          
         
        </tbody>
      </table>
    </Layout>
  );
};

export default BuyerProfile;
