import { useState } from "react";
import "./NewProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../FireBase";
import { AddProduct } from "../../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState([]);
  // eslint-disable-next-line
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(true);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const product = {
    title,
    desc,
    brand,
    size,
    color,
    price,
    inStock,
    image,
    cat,
  };

  const handleImage = async (file) => {
    const fileName = new Date().getTime() + "newproduct";
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImage(downloadURL);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  const handleSubmit = () => {
    AddProduct(product, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => handleImage(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={title}
            placeholder="Apple Airpods"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            value={desc}
            type="text"
            placeholder="description..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Brand</label>
          <input
            name="brand"
            value={brand}
            type="text"
            placeholder="Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            value={price}
            type="number"
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>size</label>
          <input
            name="size"
            value={size}
            type="text"
            placeholder="100g,500g"
            onChange={(e) => setSize([e.target.value])}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <div className="checkbox-wrapper">
            <label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value="Men"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span style={{ marginLeft: "10px" }}>Men</span>
              </div>
            </label>
            <label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value="Women"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span style={{ marginLeft: "10px" }}>Women</span>
              </div>
            </label>
            <label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value="Unisex"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span style={{ marginLeft: "10px" }}>Unisex</span>
              </div>
            </label>
          </div>
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" onChange={(e) => setInStock(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={() => handleSubmit()} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
