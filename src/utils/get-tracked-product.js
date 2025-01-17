import axios from "axios";

const getTrackedProducts = async () => {
  const controller = new AbortController();
  const url = process.env.REACT_APP_BASE_URL;
  const response = await axios.get(`${url}/tracked-product`, {
    signal: controller.signal,
    withCredentials: true,
  });
  const product = response.data.products
  product.reverse()
  return product;
};

export default getTrackedProducts