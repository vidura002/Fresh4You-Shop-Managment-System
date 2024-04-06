import React from 'react'
import UploadImage from '../components/UploadImage'

function AddStock() {
  return (
    <div>
        <div className="content-center ">
        <h1 className="text-3xl">Image Upload</h1><br />
        <label>Fruit ID : </label><br/>
        <input type="text" name="fruitID" placeholder=""  /><br/><br/>
        <input type="text" name="FruitName" placeholder="Fruit Name" /><br/><br/>
        <input type="text" name="Quantity" placeholder="Quantity"/><br/><br/>
        <input type="text" name="price" placeholder="Price"  /><br/><br/>
        <input type="file"  /><br/>
        <UploadImage/>
        <button >Upload</button>
        </div>
    </div>
  )
}

export default AddStock