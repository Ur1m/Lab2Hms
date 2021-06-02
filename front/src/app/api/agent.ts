import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IDoktori } from '../models/Doktori';
import { IDepartment } from '../models/IDepartment';

import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response =>  {

        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
const request={
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body :{})=> axios.post(url,body).then(responseBody),
    put:(url:string,body :{})=> axios.put(url,body).then(responseBody),
    del:(url:string)=>axios.delete(url).then(responseBody)
    

}
const doktoret={
    list:() :Promise<IDoktori[]>=>request.get('/Mjeket'),
    details:(id:string):Promise<IDoktori>=> request.get(`/Mjeket/${id}`),
    create:(doktori :IDoktori)=>request.post('/Mjeket/',doktori),
    update:(doktori:IDoktori)=>request.put(`/Mjeket/${doktori.mjeku_Id}`,doktori),
    delete:(id:string)=>request.del(`/Mjeket/${id}`)
}

const agent = {
    Departmentet,
    doktoret
}

export default agent;