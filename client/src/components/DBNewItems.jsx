import React, { useState } from "react";
import { motion } from "framer-motion";
import { quantities, statuses } from "../utils/styles";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../context/actions/alertActions";
import { buttonClick } from "../animations";
import { MdDelete } from "react-icons/md";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

const DBNewItems = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 2000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded successfully !"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadUrl);

    deleteObject(deleteRef).then(() => {
      setImageDownloadUrl(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image deleted successfully !"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      product_quantity: quantity,
      imageURL: imageDownloadUrl,
    };
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("Product added successfully !"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
      setItemName("");
      setPrice("");
      setImageDownloadUrl(null);
      setCategory(null);
      setQuantity(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };
  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full ">
      <div className="border bg-blue-400 border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4  ">
        <InputValueField
          type="text"
          placeholder={"Item Name Here"}
          statFunc={setItemName}
          statevalue={itemName}
        />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3  rounded-md text-xl text-white font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category ? "bg-blue-600" : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValueField
          type="number"
          placeholder={"Item Price Here"}
          statFunc={setPrice}
          statevalue={price}
        />

        <div className="w-full flex  items-center justify-around gap-3 flex-wrap">
          {quantities &&
            quantities.map((data) => (
              <p
                key={data.id}
                onClick={() => setQuantity(data.quantity)}
                className={`px-8 py-3 rounded-md text-xl text-white font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.quantity === quantity ? "bg-blue-600" : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-24">
              Loading
              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor ">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer ">
                      <div className="flex flex-col justify-center items-center cursor-pointer ">
                        <p className="font-bold text-4xl ">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-black">
                          Click to Upload Image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      src={imageDownloadUrl}
                      className="w-full h-full object-contain"
                    />

                    <motion.button
                      type="button"
                      {...buttonClick}
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadUrl)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-5/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeholder,
  statevalue,
  statFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={statevalue}
        onChange={(e) => statFunc(e.target.value)}
        className=" w-full px-4 py-3  text-black shadow-md outline-none rounded-md border-collapse border-gray-200 focus:border-red-400"
      />
    </>
  );
};

export default DBNewItems;
