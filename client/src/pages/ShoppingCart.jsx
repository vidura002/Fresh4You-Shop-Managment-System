import React from "react";
import { useSelector } from "react-redux";
import CartProducts from "../components/CartProducts";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <Header />
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url(src/images/A4.jpg)" }}>
        <div className="p-2 md:p-4">
          <h2 className="text-lg md:text-2xl font-bold bg-lime-300">- My Cart -</h2>

          {productCartItem.length > 0 ? (
            <div className="my-4 flex gap-3">
              {/* display cart items  */}
              <div className="w-full max-w-3xl">
                {productCartItem.map((el) => (
                  <CartProducts
                    key={el._id}
                    id={el._id}
                    FruitName={el.FruitName}
                    image={el.image}
                    qty={el.qty}
                    price={el.price}
                    total={el.total}
                  />
                ))}
              </div>

              {/* total cart item  */}
              <div className="w-full max-w-md ml-auto">
                <h2 className="bg-lime-200 bg-lime-400 p-2 text-lg font-bold">Summary</h2>
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
            <div className="flex justify-center items-center flex-col">
              <img src="empty-cart-image.jpg" className="w-full max-w-sm" alt="Empty Cart" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
