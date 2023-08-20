import { getUser, getAccessToken } from './AuthService'; 


export const getSubscription= async () => {
    try {

      const user = getUser();
      console.log(user);
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}`, {
        method: 'GET',
        headers: headers
        // Optionally pass any necessary headers or authentication tokens
      });

      if (response.ok) {
        const subObject = await response.json();
        console.log(subObject);
        return subObject;
       
      } else {
        console.log("No subscription")
        // Handle the error case if the request fails
      }
    } catch (error) {
      console.log("error ", error)
      // Handle any network or other errors
    }
    return undefined;
};


export const SubStatus = async (setSubscriptionActive) => {
    try {

      const user = getUser();
      console.log(user);
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}`, {
        method: 'GET',
        headers: headers
        // Optionally pass any necessary headers or authentication tokens
      });

      if (response.ok) {
        const { status } = await response.json();
        if (status && status === "active") {
            setSubscriptionActive(true);
        } else {
            setSubscriptionActive(false);
        }
      } else {
        console.log("No subscription")
        // Handle the error case if the request fails
      }
    } catch (error) {
      console.log("error ", error)
      // Handle any network or other errors
    }
  };