import axios from "axios";
const loginUser = async (loginInput) => {
    const controller = new AbortController();
    const url =  process.env.REACT_APP_BASE_URL
  
    const response = await axios.post(
      `${url}/login-user`,
      loginInput,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        withCredentials: true
      },
    );
  
    return response.data;
  };

  export default loginUser