import React from "react";
import { useSelector } from "react-redux";
import CartProducts from "../components/CartProducts";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ShoppingCart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold bg-lime-300	">
          - My Cart -
        </h2>
        <div
          id="searchContainer"
          class="flex items-center justify-center w-full"
        >
          <div class="flex items-center justify-between max-w-screen-sm border rounded-full">
            <input
              type="text"
              placeholder="search fruits here .."
              class="w-full pl-2"
            />
            <div class="text-lg min-w-[50px] h-8 bg-green-600 flex items-center justify-center rounded-r-full text-white">
              <FaSearch />
            </div>
          </div>
        </div>

        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}

            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProducts
                    key={el._id}
                    id={el._id}
                    FruitName={el.FruitName}
                    image={el.image}
                    qty={el.qty}
                    price={el.price}
                    total={el.total}
                  />
                );
              })}
            </div>

            {/* total cart item  */}

            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-lime-200 bg-lime-400 p-2 text-lg font-bold">
                Summary
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price : </p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">Rs.</span> {totalPrice}
                </p>
              </div>
              <Link to="/orderpayment">
                <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src="" className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
