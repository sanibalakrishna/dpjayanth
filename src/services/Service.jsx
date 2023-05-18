import axios from "axios";

const url = "http://localhost:8081/topic/";

export const getNotesData = async (id) => {
    id = id || "";
    return await axios.get(`${url}/${id}`);
};

export const postNotesData = async (user) => {
    return await axios.post(url, user);
};