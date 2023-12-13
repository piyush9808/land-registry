import React, {useState} from 'react'
import Layout from '../../components/layout'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { ContractAddress } from '../../constants/ContractAddress'
import { abi } from '../../constants/ABIcontract'

const AddLand = () => {


  const [landData, setLandData] = useState({
    area: "",
    city: "",
    state: "",
    price: "",
    propertyPID: "",
    physicalSurveyNo: "",
    landImage: "",
    adharCardImage: "",
  })


  const handleChange = (e) => {
    setLandData({ ...landData, [e.target.name]: e.target.value });
  }


  const uploadFile = async (fileToUpload, name) => {
    console.log('fileToUpload', fileToUpload);
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload, { filename: fileToUpload.name });
      const res = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });
      const ipfsHash = await res.text();
      console.log(ipfsHash);
      setLandData({ ...landData, [name]: ipfsHash });
    } catch (e) {
      console.log(e);
      alert("Trouble uploading file");
    }
  }










  const handleChangeFile = (e) => {
    uploadFile(e.target.files[0],e.target.name);
  }


  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('landData', landData);

    const isAnyFieldEmpty = Object.values(landData).some((item) => item === "");
    if (isAnyFieldEmpty) {
      alert("Please fill all the fields");
      return;
    }else {
      const { request } = await prepareWriteContract({
        address: ContractAddress,
        abi: abi,
        functionName: 'addLand',
        args: [landData.area, landData.city, landData.state, landData.price, landData.propertyPID, landData.physicalSurveyNo, landData.landImage, landData.adharCardImage],
      })

      console.log(request);

      const {hash} = await writeContract(request);
      console.log(hash);
      // return hash;
    }
  }


  return (
    <Layout>
      <div>
        <h1 className='font-bold  text-xl'>Add Land</h1>
        <div>
          <label htmlFor='Area'>Area (in sqm.)</label>
          <input type="number" placeholder='area'
          name='area'
          value={landData.area}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="City">City</label>
          <input type="text" placeholder='city'
          name='city'
          value={landData.city}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input type="text" placeholder='state'
          name='state'
          value={landData.state}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div>
          <label htmlFor="Price">Price</label>
          <input type="number"  placeholder='price'
          name='price' 
          value={landData.price}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div>
          <label htmlFor="Property PID Number">Property PID Number</label>
          <input type="number" placeholder='Property PID'
          name='propertyPID'
          value={landData.propertyPID}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div>
          <label htmlFor="Physical Survey Number">Physical Survey Number</label>
          <input type="number" placeholder='Survey Number'
          name='physicalSurveyNo'
          value={landData.physicalSurveyNo}
          onChange={handleChange}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div>
          <label htmlFor="insert Land image">insert Land image</label>
          <input type="file" 
          name='landImage'
          accept='application/png'
          // value={landData.landImage}
          onChange={handleChangeFile}
          required
             className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>

        <div>
          <label htmlFor="insert Adhar card document">insert Adhar card document</label>
          <input 
          type="file"
          name='adharCardImage'
          accept='application/pdf'
          // value={landData.adharCardImage}
          onChange={handleChangeFile}
          required
            //  className=" my-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
        </div>

        <button onClick={handleSubmit} type='submit' className='px-5 py-3 bg-blue-600 text-white rounded-lg'>Add land</button>

      </div>
    </Layout>
  )
}

export default AddLand