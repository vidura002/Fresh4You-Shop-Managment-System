import React from "react";
import OfferImageAdd from "../components/OfferImageAdd";

function CreateOffer() {
  return (
    <div className="content-center">
      <div className="content-center  bg-green-400 w-fit h-fit grid grid-cols-1 box-border  p-4 border-4  ">
        <br />
        <form className="">
          <h1 className="text-3xl">Image Upload</h1>
          <br />
          <label>Offer ID : </label>
          <br />
          <input
            type="text"
            name="fruitID"
            placeholder=" Enter offer id"
            className="w-64 h-8 hover:rounded-lg rounded-xl"
          />
          <br />
          <br />
          <label>Offer Name : </label>
          <br />
          <input
            type="text"
            name="FruitName"
            placeholder="Fruit Name"
            className="w-64 h-8 hover:rounded-lg rounded-xl"
          />
          <br />
          <br />
          <label>Price : </label>
          <br />
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="w-64 h-8 hover:rounded-lg rounded-xl"
          />
          <br />
          <br />
          <span className="mb-2">Variant</span>
          <br />
          <label className="">
            <select
              className="w-64 h-8 hover:rounded-lg rounded-xl"
              name="variant "
            >
              <option value="Variant ">Variant</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Small">Small</option>
            </select>
          </label>
          <br />
          <br />
          <span className="mb-2">Quantity</span>
          <br />
          <label className="">
            <input
              className="w-64 h-8 hover:rounded-lg rounded-xl "
              type="text"
              name="quantity"
              placeholder="   Enter offer quantity"
            />
          </label>
          <br />
          <br />
          <span className="mb-2">Category :</span>
          <br />
          <label className="">
            <input
              className="w-10 h-5 rounded-xl"
              type="radio"
              name="category"
              //onChange={handleChange}
              value="import"
            />
            Import
            <input
              className="w-10 h-5 rounded-xl"
              type="radio"
              name="category"
              //onChange={handleChange}
              value="local"
            />
            Local
          </label>
          <br />
          <br />
          <span className="mb-2">Description</span>
          <br />
          <label>
            <input
              className="w-64 h-32 rounded-xl"
              type="text"
              name="description"
              placeholder="   Enter offer description"
            />
          </label>
        </form>
        <br />
        <div>
          <OfferImageAdd />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default CreateOffer;
