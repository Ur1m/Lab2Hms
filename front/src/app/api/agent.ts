import axios, { AxiosResponse } from 'axios';
import { IDepartment } from '../Models/IDepartment';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response =>  {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Departmentet = {
    list: () => requests.get<IDepartment[]>('/departmentet'),
    details: (department_id: string) => requests.get<IDepartment>(`/departmentet/${department_id}`),
    create: (Department: IDepartment) => axios.post<void>('/departmentet', Department),
    update: (Department: IDepartment) => axios.put<void>(`/departmentet/${Department.department_id}`, Department),
    delete: (department_id: string) => axios.delete<void>(`/departmentet/${department_id}`)
}

const agent = {
    Departmentet
}

export default agent;