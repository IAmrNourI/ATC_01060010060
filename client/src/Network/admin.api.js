import { axiosInstance } from "./index";


const addCardapi = async (endpoint, dataToSend) => {
  const token = localStorage.getItem('token');

  return await axiosInstance.post(
    `/api/event/`,
    JSON.stringify(dataToSend), 
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
    }
  );
};

const editCardapi = async (id, dataToSend) => {
  const token = localStorage.getItem('token');

  return await axiosInstance.put(
    `/api/event/${id}`,
    JSON.stringify(dataToSend), 
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
    }
  );
};


const deleteEventApi = async (id) => {
  const token = localStorage.getItem('token'); // جلب التوكين من localStorage

  return await axiosInstance.delete(
    `/api/event/${id}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}` // التوكين في الهيدر
      }
    }
  );
};


const uploadImageApi = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return await axiosInstance.post(`/api/event/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });
};


export { addCardapi, uploadImageApi, deleteEventApi, editCardapi}