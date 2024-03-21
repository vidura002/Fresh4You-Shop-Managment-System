import { useCallback, useEffect, useState } from "react";
import { addCartItem } from "../redux/productSlice";
import { setDataProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";

export function ShopTest() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/stock");
      const json = await response.json();

      if (response.ok) {
        setData(json);
        dispatch(setDataProduct(json));
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (data) => {
    dispatch(addCartItem(data));
  };

  return (
    <>
      {data?.map((m) => (
        <p className="m-2" key={m?._id}>
          {m?.FruitID} - {m?.FruitName} - Rs.{m?.price}
          <button
            onClick={() => {
              handleAddToCart(m);
            }}
            className="mx-4 bg-indigo-600 hover:bg-indigo-500 rounded text-sm text-white p-2"
          >
            Add to Cart
          </button>
        </p>
      ))}
    </>
  );
}
