import { axiosInstance } from "./index";


const getCardApi = async(data) => {
    return await axiosInstance.get("/api/event/limited-events", data)
}

const getAllEvents = async(data) => {
    return await axiosInstance.get("/api/event", data)
}

const applyApi = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.post(
    `/api/event/book/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {withCredentials: true}
  );
};

const cardDetails = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.post(
    `/api/event/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getUserBookingAPi = async () => {
  const token = localStorage.getItem("token");
  return await axiosInstance.get(
    `/api/event/my-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {withCredentials: true}
  );
};


const getBookingId = async (id) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.get(
    `/api/event/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {withCredentials: true}
  );
};






export { getCardApi, getAllEvents, applyApi, cardDetails, getUserBookingAPi, getBookingId }