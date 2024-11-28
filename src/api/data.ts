import axios from 'axios';
import {Character} from "../pages/View";
import { View } from '../pages/Home';

interface ViewData {
    viewName: string
    data: Character[]
}

export class BackendError {
    readonly statusCode: number;
    readonly error: string;
  
    constructor(statusCode: number, error: string) {
      this.statusCode = statusCode;
      this.error = error;
    }
  }

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}/api`, // Replace with your backend URL
})

export const fetchData: (id: string) => Promise<ViewData | BackendError> = async (id: string) => {
    try {
        const response = await api.get<ViewData>(`/views/${id}/data`, {
            headers: {Authorization: `Bearer ${process.env.REACT_APP_SERVICE_TOKEN}`}
        })
        return response.data;
    } catch(error: any) {
        return new BackendError (500, error.toString())
    }
}

export const fetchViews: () => Promise<View[] | BackendError> = async () => {
    try {
        const response = await api.get('views', {
            headers: {Authorization: `Bearer ${process.env.REACT_APP_SERVICE_TOKEN}`},
            params: {game: 'wow_hc' },
        });
        if (response.status >= 400) return new BackendError(404, response.data.toString())
        return response.data;
    } catch(error: any) {
        return new BackendError (500, error.toString())
    }
};