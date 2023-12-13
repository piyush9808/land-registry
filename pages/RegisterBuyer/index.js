import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAccount, useContractRead, usePrepareContractWrite, useWalletClient } from 'wagmi';
import { abi } from '../../constants/ABIcontract';
import RegisterToBlockchain from '../../components/SellerRegisterBlockchain';
import { ContractAddress } from '../../constants/ContractAddress';
import Layout from '../../components/layout';
import Header from '../../components/Header';
import BuyerRegisterBlockchain from '../../components/BuyerRegisterBlockchain';

const Index = () => {
    const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  
  const {address, isConnected}  = useAccount();

  const [SellerData, setSellerData] = useState({
    name: "",
    age: "",
    city: "",
    email: "",
    AadharCardNo: "",
    PanNo: "",
    AadharCardImage: '' ||  cid,
  }); 


  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", fileToUpload, { filename: fileToUpload.name });
      const res = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });
      const ipfsHash = await res.text();
      console.log(ipfsHash);
      setCid(ipfsHash);
      setUploading(false);
      setSellerData({ ...SellerData, AadharCardImage: ipfsHash });
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };


  const handleChange = (e) => {
    setSellerData({ ...SellerData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('handleSubmit1')
    if(SellerData.name && SellerData.age && SellerData.AadharCardNo && SellerData.PanNo && SellerData.email && cid){
    try{
     
  const hash =    BuyerRegisterBlockchain(SellerData); 

  if(hash){
    router.push('/Dashboard');
  }

    }
    catch(e){
        console.log(e)
    }
        console.log('handleSubmit3')
    }
  };




  const getBuyersCount  = useContractRead({
       address: ContractAddress,
    functionName: 'isBuyer',
    abi: abi,
    args: [address],

  })

  console.log('address', address);
  console.log('getSellerCount', getBuyersCount);

  useEffect(() => {
    setMounted(true);
    if(getBuyersCount.data > 0){
      router.push('/Dashboard');
    }
  },[getBuyersCount.data, router])

  return (
    <div>
      <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
     <div className="border p-2 rounded-lg bg-gray-50 text-start w-5/12 px-10">
       <h1 className="text-2xl font-semibold font-serif">
         {" "}
         Buyer Registration
       </h1>
       <form action="" onSubmit={handleSubmit}>
         <div className="flex flex-col my-2">
           <label htmlFor="name">Enter Name</label>
           <input
             type="text"
             name="name"
             id="name"
             value={SellerData.name}
             onChange={handleChange}
             required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>

         <div>
           <label htmlFor="age">Enter Age</label>
           <input
             type="number"
             name="age"
             value={SellerData.age}
             onChange={handleChange}
             id="age"
             required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>
         <div>
           <label htmlFor="city">Enter City</label>
           <input
             type="text"
             name="city"
             value={SellerData.city}
             onChange={handleChange}
             id="city"
             required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>

         <div>
           <label htmlFor="AadharCardNo">Enter AdharCard No.</label>
           <input
             type="text"
             value={SellerData.AadharCardNo}
             onChange={handleChange}
             required
             name="AadharCardNo"
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>
         <div>
           <label htmlFor="PanNo">Enter Pan No</label>
           <input
             type="text"
             name="PanNo"
             value={SellerData.PanNo}
             onChange={handleChange}
             required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>

         <div className="my-2">
           <label htmlFor="AadharCardImage" className="my-1">
             Add your Aadhar card (Pdf format)
           </label>
           <input
             type="file"
             onChange={handleChangeFile}
             accept="application/pdf"
             name="AadharCardImage"
             required
           />
         </div>

         <div>
           <label htmlFor="email">Enter Email</label>
           <input
             type="email"
             name="email"
             value={SellerData.email}
             onChange={handleChange}
             required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           />
         </div>

        <button
        className="button border  my-2 rounded-lg w-full disabled:bg-gray-400 p-3 bg-blue-400 text-white"
        onClick={(e) => handleSubmit(e)}>
         Register
        </button>
        {
          cid && <p className="text-green-500">File uploaded successfully</p>
        }
       </form>
     </div>
   </div>
   </div>
  )
}

export default Index