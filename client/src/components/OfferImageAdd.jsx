import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from "react-router-dom";


const OfferImageAdd = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storage = getStorage();
    const storageRef = ref(storage, `<offerImage /> ${image.name}`);
    
    try {
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  

  return (
    <div>
      <input type="file" onChange={handleImageChange} className='bg-red-300'/>
      <br /><br/>
      <div className='grid grid-cols-2 '>
      <button onClick={handleUpload} className='p-2 bg-yellow-200  rounded-xl cursor-pointer w-32 '>Upload</button>
      <button  className='p-2 bg-orange-300  rounded-xl cursor-pointer w-32 '>
        <Link to={"/AdminOffer"}> Cancel </Link>
      </button>
      </div>
      <br/>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px'  }} />}   
    </div>
  );
};


export default OfferImageAdd;