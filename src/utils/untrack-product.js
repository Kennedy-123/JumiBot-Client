import axios from "axios";

const untrackProduct = async (productName) => {
  const url = process.env.REACT_APP_BASE_URL;
  const response = await axios.delete(`${url}/remove_product`, {
    headers: { "Content-Type": "application/json" },
    data: { product_name: productName },
    withCredentials: true,
  });
  return response.data;
};

export default untrackProduct