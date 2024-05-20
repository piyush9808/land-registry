import React, { useContext, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { AiOutlineBank } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { RoleContext } from "../context/RoleContext";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "../constants/ABIcontract";
import { ContractAddress } from "../constants/ContractAddress";
import { useRouter } from "next/router";
import LandInfoTable from "./LandInfoTable";
const DashboardComponents = () => {
  const { role } = useContext(RoleContext);

  // const role = 'Buyer'

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const { address } = useAccount();

  const data = useContractRead({
    address: ContractAddress,
    functionName: "getSellersCount",
    abi: abi,
  });

  const data1 = useContractRead({
    address: ContractAddress,
    functionName: "getBuyersCount",
    abi: abi,
  });

  const landCount = useContractRead({
    address: ContractAddress,
    functionName: "getLandsCount",
    abi: abi,
  });

  const requestCount = useContractRead({
    address: ContractAddress,
    functionName: "getRequestsCount",
    abi: abi,
  });

  console.log(data);

  useEffect(() => {
    if (!data.data && !data1.data && !landCount.data && !requestCount.data) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    } else {
      setMounted(true);
    }
  }, [data.data, data1.data, landCount.data, requestCount.data]);

  return (
    <>
      {mounted && (
        <>
          <div className="border z-50">
            <div className="grid grid-cols-3 gap-2">
              <div>
                {role === "Buyer" ? (
                  <>
                    <div className="flex flex-col items-center pb-3 z-50 gap-4 relative">
                      <div className="absolute border -top-4  z-50  text-xl">
                        <FaUsers size={50} className="z-50" />
                      </div>
                      <div className="mt-14">
                        <h1>Total Sellers</h1>
                        <p>{Number(data.data)}</p>
                      </div>
                    </div>

                    <div>
                      <h2>Profile</h2>

                      <button className="border p-2 rounded-lg bg-blue-500 text-white">
                        View Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center pb-3 z-50 gap-4 relative">
                      <div className="absolute border   z-50  text-xl">
                        <FaUsers size={50} className="z-50" />
                      </div>
                      <div className="mt-14">
                        <h1>Total Buys</h1>
                        <p>{data1.data?.toString()}</p>
                      </div>
                    </div>
                    <div>
                      <h1>Wish to Add Land!</h1>
                      <button
                        onClick={() => router.push("/AddLand")}
                        className="border p-2 rounded-lg bg-blue-500 text-white "
                      >
                        Add Land
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-center">
                  <AiOutlineBank size={50} />
                  <h1>Register Lands Count</h1>
                  <p>{landCount.data?.toString()}</p>
                </div>
                <div>
                  <h1>Profile</h1>
                  <button className="border p-2 rounded-lg bg-blue-500 text-white ">
                    View Profile
                  </button>
                </div>
              </div>
              {role === "Buyer" ? (
                <>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                      <FaRegBell size={50} />
                      <h1>Total Request</h1>
                      <p>{requestCount.data?.toString()}</p>
                    </div>
                    <div>
                      <h1> Make Payment for Approved Land Request</h1>
                      <button className="border p-2 rounded-lg bg-blue-500 text-white ">
                        Make Payment
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                      <FaRegBell size={50} />
                      <h1>Total Request</h1>
                      <p>{requestCount.data?.toString()}</p>
                    </div>
                    <div>
                      <h1> Request</h1>
                      <button  onClick={() => router.push("/RequestLand")} className="border p-2 rounded-lg bg-blue-500 text-white ">
                        View at Requested Land
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <LandInfoTable />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardComponents;
