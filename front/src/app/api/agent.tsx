import axios, { AxiosResponse } from 'axios';
import { IDoktori } from '../models/Doktori';


axios.defaults.baseURL='http://localhost:5000/api';

const respanseBody= (respanse:AxiosResponse)=>respanse.data;

const request={
    get:(url:string)=>axios.get(url).then(respanseBody),
    post:(url:string,body :{})=> axios.post(url,body).then(respanseBody),
    put:(url:string,body :{})=> axios.put(url,body).then(respanseBody),
    del:(url:string)=>axios.delete(url).then(respanseBody)
    

}
const doktoret={
    list:() :Promise<IDoktori[]>=>request.get('/Mjeket'),
    details:(id:string):Promise<IDoktori>=> request.get(`/Mjeket/${id}`),
    create:(doktori :IDoktori)=>request.post('/Mjeket/',doktori),
    update:(doktori:IDoktori)=>request.put(`/Mjeket/${doktori.mjeku_Id}`,doktori),
    delete:(id:string)=>request.del(`/Mjeket/${id}`)
}
export default{
    doktoret
}

