import { useState,  useEffect } from "react";
import { useRouter } from "next/router";
import  { abi } from '../../constants/ABIcontract'
import {ContractAddress}  from '../../constants/ContractAddress'
import {  useContractRead } from "wagmi";
import { useContractWrite , useAccount} from 'wagmi'
import RegisterToBlockchain from "../../components/SellerRegisterBlockchain";
import Header from "../../components/Header";
const RegisterSeller = () => {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  
  const {address, isConnected}  = useAccount();

  const [SellerData, setSellerData] = useState({
    name: "",
    age: "",
    AadharCardNo: "",
    PanNo: "",
    OwanedLands: "",
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
    if(SellerData.name && SellerData.age && SellerData.AadharCardNo && SellerData.PanNo && SellerData.OwanedLands && cid){
    try{

      const isempty = Object.values(SellerData).some((item) => item === "");
      if (!isempty) {
        RegisterToBlockchain(SellerData);
      }

        
       
   
    }
    catch(e){
        console.log(e)
    }
        console.log('handleSubmit3')
    }
  };


  const getSellerCount  = useContractRead({   
    address: ContractAddress,
    functionName: 'getSellersCount',
    abi: abi,
    watch: true,
  })


  useEffect(() => {
    setMounted(true);
    if(getSellerCount.data > 0){
      router.push('/Dashboard');
    }
  },[getSellerCount.data, router])

  return (
    <>
    <Header />
     <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="border p-2 rounded-lg bg-gray-50 text-start w-5/12 sm:w-96 px-10">
        <h1 className="text-2xl font-semibold font-serif">
          {" "}
          Seller Registration
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
          <div>
            <label htmlFor="OwanedLands">Enter Owned Lands</label>
            <input
              type="number"
              name="OwanedLands"
              value={SellerData.OwanedLands}
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
         <button
         className="button border my-2 rounded-lg w-full disabled:bg-gray-400 p-3 bg-blue-400 text-white"
         onClick={(e) => handleSubmit(e)}>
          Register
         </button>
         { uploading ? <>wait document is uploading </> :  <p>document is uploaded!</p>}
        </form>
      </div>
    </div>
    </>
    
    // </Layout>
  );
};


export default RegisterSeller;