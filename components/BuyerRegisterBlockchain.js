import React from 'react'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { ContractAddress } from '../constants/ContractAddress'
import { abi } from '../constants/ABIcontract'

const BuyerRegisterBlockchain = async (SellerData) => {



    const { request } = await prepareWriteContract({
        address: ContractAddress,
        abi: abi,
        functionName: 'registerBuyer',
        args: [SellerData.name, Number(SellerData.age), SellerData.city, SellerData.AadharCardNo, SellerData.PanNo,
          SellerData.AadharCardImage, SellerData.email],
      })
      const { hash } = await writeContract(request)

      return hash;
}

export default BuyerRegisterBlockchain