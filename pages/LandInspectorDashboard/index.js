import React, { useEffect, useState } from "react";
import Layout from "../../components/LayoutLandInspector";
import { AiOutlineBank } from "react-icons/ai";
import {  FaUsers } from "react-icons/fa";
import { useContractRead } from "wagmi";
import { ContractAddress } from "../../constants/ContractAddress";
import { abi } from "../../constants/ABIcontract";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  const { data } = useContractRead({
    address: ContractAddress,
    functionName: "getSellersCount",
    abi: abi,
  });

  const { data: data1 } = useContractRead({
    address: ContractAddress,
    functionName: "getBuyersCount",
    abi: abi,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      {mounted && (
        <>
          <div className="border z-50">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="flex flex-col items-center pb-3 z-50 gap-4 relative">
                  <div className="absolute border -top-4  z-50  text-xl">
                    <FaUsers size={50} className="z-50" />
                  </div>
                  <div className="mt-14">
                    <h1>Total Sellers</h1>
                    <p>{Number(data) || 0}</p>
                  </div>
                </div>

                <div>
                  <h2>Profile</h2>

                  <button className="border p-2 rounded-lg bg-blue-500 text-white">
                    View Profile
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <AiOutlineBank size={50} />
                  <h1>Total Requests</h1>
                  <p>number</p>
                </div>
                <div>
                  <h1>Land Transfer Requests</h1>
                  <button className="border p-2 rounded-lg bg-blue-500 text-white ">
                    Approve Land Transactions
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <FaUsers size={50} />
                  <h1>Total Buyer</h1>
                  <p>{Number(data1)}</p>
                </div>
                <div>
                  <h1> Request</h1>
                  <button className="border p-2 rounded-lg bg-blue-500 text-white ">
                    View at Requested Land
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
