import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { RoleContext } from "../context/RoleContext";
import dynamic from "next/dynamic";
import { ContractAddress } from "../constants/ContractAddress";
import { abi } from "../constants/ABIcontract";

const ConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});

export default function Home() {
  const { address, isConnected } = useAccount();
  const { role, setRole } = useContext(RoleContext);

  const router = useRouter();

  const isLandInspector = useContractRead({
    abi: abi,
    address: ContractAddress,
    functionName: "isLandInspector",
    args: [address],
  });

  
  // const isLandInspector = useContractRead({
  //   address: ContractAddress,
  //   abi:abi,
  //   functionName: 'isLandInspector',

  // })

  useEffect(() => {
    if(isLandInspector.data){
      router.push('/LandInspectorDashboard');
    }
  },[address, isLandInspector, router])




  // useEffect(() => {
  //   if (window !== undefined) {
  //     if (!isConnected ) {
  //       return (
  //         <div className="flex min-h-screen flex-col items-center justify-between p-24">
  //           <ConnectButton />
  //         </div>
  //       );
  //     }

  //     if (data.data) {
  //       router.push("/LandInspectorDashboard");
  //     }
  //   }
  // },[]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border rounded-lg p-3 w-96 bg-neutral-100">
        <h1 className="text-2xl ">Welcome to Era of Blockchain</h1>
        <h2 className="text-lg my-2">Making the most of Digital ERA!</h2>

        <label htmlFor="roleSelect" className="w-full">
          Select Role
        </label>
        <select
          name="roleSelect"
          id=""
          className="block w-full my-4 p-3 border"
          onChange={(e) => {
            setRole(e.target.value);
            localStorage.setItem("role", e.target.value);
          }}
        >
          <option value="">Select Role</option>
          <option value="Seller">Seller</option>
          <option value="Buyer">Buyer</option>
        </select>
        <button
          onClick={() => {
            if (role) {
              router.push(`/Register${role}`);
            }
          }}
          className="border my-2 rounded-lg w-full p-3 bg-blue-400 text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
}
