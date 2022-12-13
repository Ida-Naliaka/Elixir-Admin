import { Link, useLocation } from "react-router-dom";
import "./Product.css";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Chart from "../../Components/chart/chart";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../FireBase";
import { useDispatch } from "react-redux";
import { UpdateProduct } from "../../Redux/apiCalls";
import axios from "axios";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState(productData);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState([]);
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const updatedProduct = { title, desc, size, price, inStock, image, cat };
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(`orders/income?pid=${productId}`, config);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
    // eslint-disable-next-line
  }, [productId, MONTHS]);

  const handlePic = async (file) => {
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
  const handleUpdate = () => {
    UpdateProduct(productId, updatedProduct, dispatch);
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleUpdate}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={title}
              placeholder={product.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Product Description</label>
            <input
              type="text"
              value={desc}
              placeholder={product.desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label>Price</label>
            <input
              type="text"
              value={price}
              placeholder={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              onChange={(e) => setInStock(e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label>Brand</label>
            <input
              value={brand}
              type="text"
              placeholder={product.brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <label>Price</label>
            <input
              value={price}
              type="number"
              placeholder={product.price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>size</label>
            <input
              value={size}
              type="text"
              placeholder={product.size}
              onChange={(e) => setSize([e.target.value])}
            />
            <label>Category</label>
            <div className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  value="Men"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span>Men</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Women"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span>Women</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Unisex"
                  name="Categories"
                  onChange={(e) => {
                    setCat([...cat, e.target.value]);
                  }}
                />
                <span>Unisex</span>
              </label>
            </div>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handlePic}
              />
            </div>
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
