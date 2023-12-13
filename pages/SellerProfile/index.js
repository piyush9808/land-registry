import React from "react";
import Layout from "../../components/layout";
import { useContractRead } from "wagmi";
import { ContractAddress } from "../../constants/ContractAddress";
import { useAccount } from "wagmi";
import { abi } from "../../constants/ABIcontract";

const SellerProfile = () => {


  const {address} = useAccount();

    const data = useContractRead({
      address: ContractAddress,
      functionName: "getSellerDetails",
      abi:abi,
      args: [address],
    })

    console.log('data', data);

    const isVerified = useContractRead({
      address: ContractAddress,
      functionName: "isVerified",
      abi:abi,
      args: [address],
    })

    console.log('data', isVerified);


    if(!data.data){
      return (
        <Layout>
          You are not seller
          </Layout>
      )
    }

  return (
    <div>
      <Layout>
        <div>
          Is Verified : <span className="text-red-600 font-bold"> {isVerified.data?.toString()}</span>
        </div>
        <div>
          <h1>Seller Profile</h1>
          <div>
            <h2>Name: {data.data?.[0]}</h2>
            <h2>Age: {(data.data?.[1])?.toString()}</h2>
            <h2>AadharCardNo: {data.data?.[2]}</h2>
            <h2>PanNo: {data.data?.[3]}</h2>
            <h2>OwanedLands: {data.data?.[4]}</h2>
            <h2>AadharCardImage: {data.data?.[5]}</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SellerProfile;
