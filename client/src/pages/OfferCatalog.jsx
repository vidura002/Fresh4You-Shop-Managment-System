import React from "react";
import offerData from "./OfferData";
function OfferCatalog() {
    return (
        <>
            <div class="grid-cols-3  p-4 text-lg flex space-x-4 h-full bg-gray-500 ">
                <div className=" bg-green-400 w-2/3 mx-auto hover:bg-green-600  h-16 text-center flex-center shadow-lg">
                    box01
                </div>
                <div className=" bg-white w-2/3 mx-auto hover:bg-gray-300  h-16 text-center flex-center shadow-lg">
                    box02
                    <h1>{offerData.length}</h1>
                </div>
                <div className=" bg-green-400 w-2/3 mx-auto hover:bg-green-600  h-16 text-center flex-center shadow-lg">
                    box03
                </div>
            </div>
            <div>
                <h1>{offerData.length}</h1>
            </div>
            <div className="row">
                {offerData.map(offer=> {

                    return <div className="grid-cols-3">
                        <div>
                            <h1>{offer.name}</h1>
                        </div>
                    </div>

                })}
            </div>
        </>
    );
}

export default OfferCatalog;

