import axios from "axios";

const handleBasicPayment = async () => {
  const url = process.env.REACT_APP_BASE_URL;
  const controller = new AbortController();
  const response = await axios.post(
    `${url}/subscription`,
    {
      amount: "500000",
      plan_code: "PLN_5prmibl32upqhg4",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      signal: controller.signal,
    }
  );
  return response.data;
};

export default handleBasicPayment;