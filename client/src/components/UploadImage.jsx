import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadImage = ({ onImageUrlChange}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      setUploading(true); 
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      onImageUrlChange(url);
      console.log("File uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-3 ">
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-4 bg-white border border-gray-300 rounded-md py-2 px-4 w-full inline-block focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          className={`bg-${uploading ? 'orange-900' : 'orange-500'} text-white py-2 px-4 font-medium rounded-md hover:bg-${uploading ? 'orange-900' : 'orange-600'} focus:outline-none focus:bg-${uploading ? 'orange-900' : 'orange-600'} mt-4`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
