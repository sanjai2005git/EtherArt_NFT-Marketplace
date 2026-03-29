import axios from "axios";
import * as dotenv from "dotenv";

// dotenv.config();

const key = "c1c9d87fb02d85bf0f80";
const secret = "e623e5b3f28a003e6cabab87725e63c696de7f6b5a2e271e24896fc88fa6f9d9";
// const key = process.env.NEXT_PUBLIC_PINATA_KEY;
// const secret = process.env.PINATA_SECRET_KEY;
export const uploadFileToIPFS = async (file)=>{
      console.log("key",key,secret);
    //   console.log(process.env);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    // const metadata = JSON.stringify({
    //     name: 'testname',
    //     keyvalues: {
    //         exampleKey: 'exampleValue'
    //     }
    // });
    // data.append('pinataMetadata', metadata);
    return axios.post(url,data,{
        maxBodyLength:99999999999,
        headers:{
            'Content-Type': `multipart/form-data;`,
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
    .then((response)=>{
        console.log("image uploaded", response.data.IpfsHash);
        return "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
    })
    .catch((err)=>{
        return err.message;
    })
}

export const uploadJSONToIPFS = async (jsonObj)=>{
  
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    console.log("jsonFile",jsonObj)

    return axios.post(url, jsonObj, {
        headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
        .then((response) => {
            console.log("file uploaded", response.data.IpfsHash);
            return "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        })
        .catch((err) => {
            return err.message;
        })
}