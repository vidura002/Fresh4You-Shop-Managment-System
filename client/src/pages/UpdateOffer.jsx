import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateOffer() {
  const inputFields = {
    id: "",
    name: "",
    price: "",
    variant: "",
    quantity: "",
    category: "",
    description: "",
    image: null,
  };

  const [formData, setFormData] = useState(inputFields);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      const subjectArray = [...formData.subjects];

      if (checked) {
        subjectArray.push(value);
      } else {
        const index = subjectArray.indexOf(value);
        if (index !== -1) {
          subjectArray.splice(index, 1);
        }
      }

      setFormData({ ...formData, subjects: subjectArray });
    } else if (type === "file") {
      const file = files[0];

      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const submitForm = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex justify-center items-center ">
      <form className="  bg-orange-300 h-fit grid grid-cols-1 box-border  p-4 border-4" onSubmit={submitForm}>
        <h1 className="">
          <b>Update Offer</b>
        </h1>
        <br />
        <span>Offer ID</span>
        <label className="">
          <input
            className="w-64 h-8 hover:rounded-lg rounded-xl"
            type="text"
            name="id"
            onChange={handleChange}
            value={formData.id}
            placeholder="   Enter offer id"
          />
        </label>
        <span>Offer Name</span>
        <label className="">
          <input
            className="w-64 h-8 hover:rounded-lg rounded-xl"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="   Enter offer name"
          />
        </label>
        <span>Price</span>
        <label className="">
          <input
            className="w-64 h-8 hover:rounded-lg rounded-xl"
            type="text"
            name="price"
            onChange={handleChange}
            value={formData.price}
            placeholder="   Enter offer price"
          />
        </label>
        <span>Variant</span>
        <label className="">
          <select
            className="w-64 h-8 hover:rounded-lg rounded-xl"
            name="variant "
            onChange={handleChange}
          >
            <option value="Variant ">Variant</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Small">Small</option>
          </select>
        </label>
        <span>Quantity</span>
        <label className="">
          <input
            className="w-64 h-8 hover:rounded-lg rounded-xl"
            type="text"
            name="quantity"
            onChange={handleChange}
            value={formData.quantity}
            placeholder="   Enter offer quantity"
          />
        </label>
        <span className="">Category</span>
        <label className="">
          <input
            className="w-10 h-5 rounded-xl"
            type="radio"
            name="category"
            onChange={handleChange}
            checked={formData.category === "import"}
            value="import"
          />
          Import
          <input
            className="w-10 h-5 rounded-xl"
            type="radio"
            name="category"
            onChange={handleChange}
            checked={formData.category === "local"}
            value="local"
          />
          Local
        </label>
        <span className="">Description</span>
        <label className="">
          <input
            className="w-64 h-32 rounded-xl"
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="   Enter offer description"
          />
        </label>
        <span>Upload Image</span>
        <label className="">
          <input
            className="cursor-pointer"
            type="file"
            name="image"
            onChange={handleChange}
          />
        </label>
        <br />
        <div className="grid grid-cols-2 ">
          <button
            className="addBTN  p-2 bg-red-200  rounded-xl cursor-pointer w-32"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            className="cancelBTN  p-2 bg-red-200 w-32 rounded-xl cursor-pointer"
            onClick={handleSubmit}
          >
            <Link to={"/AdminOffer"}> Cancel </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
