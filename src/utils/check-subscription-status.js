import axios from "axios";

const checkSubscriptionStatus = async () => {
    const url =  process.env.REACT_APP_BASE_URL
    try {
        const res = await axios.get(`${url}/check_subscription_status`, { withCredentials: true });
        return res.data.subscribed
    } catch (error) {
        console.error("Error checking login status", error);
    }
}

export default checkSubscriptionStatus