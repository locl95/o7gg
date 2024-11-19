import axios from 'axios';
import {Character} from "../pages/View";

interface ViewData {
    viewName: string
    data: Character[]
}

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`, // Replace with your backend URL
})

export const fetchData: (id: string) => Promise<ViewData> = async (id: string) => {
    const response = await api.get<ViewData>(`/views/${id}/data`, {
        headers: {Authorization: `Bearer ${process.env.REACT_APP_SERVICE_TOKEN}`}
    })
    return response.data;
}