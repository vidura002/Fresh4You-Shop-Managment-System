import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const OfferImageAdd = ({ onImageUrlChange }) => {
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
    const storageRef = ref(storage, `Offerimages/${image.name}`);

    try {
      setUploading(true);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      console.log("File uploaded: ", url);
      onImageUrlChange(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" grid grid-cols-4 gap-5">
      <div className="col-span-3 ">
        <label htmlFor="variant" className="block text-gray-700 font-bold ">
          Image upload
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-4 bg-white border border-gray-300  rounded-xl  py-2 px-4 w-full inline-block focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex ">
        <button
          onClick={handleUpload}
          className={
            "p-2 bg-yellow-200 rounded-xl cursor-pointer w-64 mt-10 focus:outline-none focus:bg-orange-400 "
          }
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default OfferImageAdd;
