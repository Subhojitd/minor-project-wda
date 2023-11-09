import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const bisleri = products?.filter(
    (item) => item.product_category === "bisleri"
  );
  const aquafina = products?.filter(
    (item) => item.product_category === "aquafina"
  );
  const kinley = products?.filter((item) => item.product_category === "kinley");
  const tata = products?.filter((item) => item.product_category === "tata");
  const evian = products?.filter((item) => item.product_category === "evian");
  const sparkling = products?.filter(
    (item) => item.product_category === "sparkling"
  );

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        console.log(data);
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center text-white">
          <div className="w-340 md:w-508 ">
            <CChart
              type="bar"
              data={{
                labels: [
                  "bisleri",
                  "aquafina",
                  "kinley",
                  "tata",
                  "evian",
                  "sparkling",
                ],
                datasets: [
                  {
                    label: "Category Count",
                    backgroundColor: "#dc2626",
                    data: [
                      bisleri?.length,
                      aquafina?.length,
                      kinley?.length,
                      tata?.length,
                      evian?.length,
                      sparkling?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Cancelled",
                  "Delivered",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00b6ff",
                      "#008bff",
                      "#ffd100",
                      "#ff00f8",
                    ],
                    data: [40, 20, 80, 10, 74],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
