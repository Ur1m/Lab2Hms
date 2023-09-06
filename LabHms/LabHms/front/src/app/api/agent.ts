import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { ICaktoShtratin } from "../models/ICaktoShtratin";
import { IDepartment } from "../models/IDepartment";
import { IFatura } from "../models/IFatura";
import { ITerminet } from "../models/Terminet";
import { Infermierja } from "../models/Infermierja";
import { store } from "../stores/store";
import { IPaisjet } from "../models/IPaisjet";
import { IDhoma } from "../models/IDhoma";
import { IShtreteritNeDhoma } from "../models/IShtreteritNeDhoma";
import { Barna } from "../models/barna";
import { User, UserFormValues } from "../models/user";
import { ITherapy } from "../models/ITherapy";
import { IRaport } from "../models/IRaport";
import { ILaboratori } from "../models/ILaboratori";
import { IAmbulanca } from "../models/IAmbulanca";
import { IDoktori } from "../models/Doktori";
import { IShtrat } from "../models/IShtrat";
import { ILlojiShtratit } from "../models/ILlojiShtratit";
import { IPacienti } from "../models/IPacienti";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Departmentet = {
  list: () => requests.get<IDepartment[]>("/departmentet"),
  details: (department_id: string) =>
    requests.get<IDepartment>(`/departmentet/${department_id}`),
  create: (Department: IDepartment) =>
    axios.post<void>("/departmentet", Department),
  update: (Department: IDepartment) =>
    axios.put<void>(`/departmentet/${Department.department_id}`, Department),
  delete: (department_id: string) =>
    axios.delete<void>(`/departmentet/${department_id}`),
};
const Laboratort = {
  list: () => requests.get<ILaboratori[]>("/laboratort"),
  details: (lab_Id: string) =>
    requests.get<ILaboratori>(`/laboratort/${lab_Id}`),
  create: (Laboratori: ILaboratori) =>
    axios.post<void>("/laboratort", Laboratori),
  update: (Laboratori: ILaboratori) =>
    axios.put<void>(`/laboratort/${Laboratori.lab_Id}`, Laboratori),
  delete: (lab_Id: string) => axios.delete<void>(`/laboratort/${lab_Id}`),
};
const Ambulancat = {
  list: () => requests.get<IAmbulanca[]>("/ambulancat"),
  details: (amb_Id: string) =>
    requests.get<IAmbulanca>(`/ambulancat/${amb_Id}`),
  create: (Ambulanca: IAmbulanca) => axios.post<void>("/ambulancat", Ambulanca),
  update: (Ambulanca: IAmbulanca) =>
    axios.put<void>(`/ambulancat/${Ambulanca.amb_Id}`, Ambulanca),
  delete: (amb_Id: string) => axios.delete<void>(`/ambulancat/${amb_Id}`),
};
const Faturat = {
  list: () => requests.get<IFatura[]>("/faturat"),
  details: (fatura_id: string) =>
    requests.get<IFatura>(`/faturat/${fatura_id}`),
  create: (Fatura: IFatura) => axios.post<void>("/faturat", Fatura),
  update: (Fatura: IFatura) =>
    axios.put<void>(`/faturat/${Fatura.fatura_Id}`, Fatura),
  delete: (fatura_id: string) => axios.delete<void>(`/faturat/${fatura_id}`),
};
const Shtreter = {
  list: () => requests.get<IShtrat[]>("/shtreter"),
  details: (shtrat_id: string) =>
    requests.get<IShtrat>(`/shtreter/${shtrat_id}`),
  create: (Shtrat: IShtrat) => axios.post<void>("/shtreter", Shtrat),
  update: (Shtrat: IShtrat) =>
    axios.put<void>(`/shtreter/${Shtrat.shtrat_id}`, Shtrat),
  delete: (shtrat_id: string) => axios.delete<void>(`/shtreter/${shtrat_id}`),
};
const llojiShtreterve = {
  list: () => requests.get<ILlojiShtratit[]>("/llojiShtratit"),
  details: (llojiShtreterve_id: string) =>
    requests.get<ILlojiShtratit>(`/llojiShtratit/${llojiShtreterve_id}`),
  create: (llojiShtreterve: ILlojiShtratit) =>
    axios.post<void>("/llojiShtratit", llojiShtreterve),
  update: (llojiShtreterve: ILlojiShtratit) =>
    axios.put<void>(
      `/llojiShtratit/${llojiShtreterve.llojiShtratit_id}`,
      llojiShtreterve
    ),
  delete: (llojiShtreterve_id: string) =>
    axios.delete<void>(`/llojiShtratit/${llojiShtreterve_id}`),
};
const caktoShtreterit = {
  list: () => requests.get<ICaktoShtratin[]>("/caktoShtreterit"),
  details: (caktoShtreterit_id: string) =>
    requests.get<ICaktoShtratin>(`/caktoShtreterit/${caktoShtreterit_id}`),
  create: (caktoShtreterit: ICaktoShtratin) =>
    axios.post<void>("/caktoShtreterit", caktoShtreterit),
  update: (caktoShtreterit: ICaktoShtratin) =>
    axios.put<void>(
      `/caktoShtreterit/${caktoShtreterit.caktoShtratin_id}`,
      caktoShtreterit
    ),
  delete: (caktoShtreterit_id: string) =>
    axios.delete<void>(`/caktoShtreterit/${caktoShtreterit_id}`),
};
const Pacientat = {
  list: () => requests.get<IPacienti[]>("/Pacientat"),
  details: (pacient_Id: string) =>
    requests.get<IPacienti>(`/Pacientat/${pacient_Id}`),
  create: (Pacienti: IPacienti) => axios.post<void>("/Pacientat", Pacienti),
  update: (Pacienti: IPacienti) =>
    axios.put<void>(`/Pacientat/${Pacienti.pacient_Id}`, Pacienti),
  delete: (pacient_Id: string) =>
    axios.delete<void>(`/Pacientat/${pacient_Id}`),
};
const Terminet = {
  list: () => requests.get<ITerminet[]>("/Terminet"),
  details: (termini_Id: string) =>
    requests.get<ITerminet>(`/Terminet/${termini_Id}`),
  create: (Termini: ITerminet) => axios.post<void>("/Terminet", Termini),
  update: (Termini: ITerminet) =>
    axios.put<void>(`/Terminet/${Termini.termini_ID}`, Termini),
  delete: (id: string) => axios.delete<void>(`/Terminet/${id}`),
};
const Paisjet = {
  list: () => requests.get<IPaisjet[]>("/Paisjet"),
  details: (paisja_Id: string) =>
    requests.get<IPaisjet>(`/Paisjet/${paisja_Id}`),
  create: (Paisja: IPaisjet) => axios.post<void>("/Paisjet", Paisja),
  update: (Paisja: IPaisjet) =>
    axios.put<void>(`/Paisjet/${Paisja.paisja_Id}`, Paisja),
  delete: (id: string) => axios.delete<void>(`/Paisjet/${id}`),
};
const Therapy = {
  list: () => requests.get<ITherapy[]>("/Therapies"),
  details: (therapy_Id: string) =>
    requests.get<ITherapy>(`/Therapies/${therapy_Id}`),
  create: (Therapy: ITherapy) => axios.post<void>("/Therapies", Therapy),
  update: (Therapy: ITherapy) =>
    axios.put<void>(`/Therapies/${Therapy.therapy_Id}`, Therapy),
  delete: (id: string) => axios.delete<void>(`/Therapies/${id}`),
};
const Raport = {
  list: () => requests.get<IRaport[]>("/Raportet"),
  details: (raport_Id: string) =>
    requests.get<IRaport>(`/Raportet/${raport_Id}`),
  create: (Raport: IRaport) => axios.post<void>("/Raportet", Raport),
  update: (Raport: IRaport) =>
    axios.put<void>(`/Raportet/${Raport.raport_Id}`, Raport),
  delete: (id: string) => axios.delete<void>(`/Raportet/${id}`),
};

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};
const doktoret = {
  list: (): Promise<IDoktori[]> => request.get("/Mjeket"),
  details: (id: string): Promise<IDoktori> => request.get(`/Mjeket/${id}`),
  create: (doktori: IDoktori) => request.post("/Mjeket/", doktori),
  update: (doktori: IDoktori) =>
    request.put(`/Mjeket/${doktori.mjeku_Id}`, doktori),
  delete: (id: string) => request.del(`/Mjeket/${id}`),
};

const Infermieret = {
  list: () => requests.get<Infermierja[]>("/infermieret"),
  details: (infermierja_id: string) =>
    requests.get<Infermierja>(`/infermieret/${infermierja_id}`),
  create: (infermierja: Infermierja) =>
    axios.post<void>("/infermieret", infermierja),
  update: (infermierja: Infermierja) =>
    axios.put<void>(`/infermieret/${infermierja.infermierja_id}`, infermierja),
  delete: (infermierja_id: string) =>
    axios.delete<void>(`/infermieret/${infermierja_id}`),
};

const Dhomat = {
  list: () => requests.get<IDhoma[]>("/dhomat"),
  details: (dhoma_id: string) => requests.get<IDhoma>(`/dhomat/${dhoma_id}`),
  create: (Dhoma: IDhoma) => axios.post<void>("/dhomat", Dhoma),
  update: (Dhoma: IDhoma) =>
    axios.put<void>(`/dhomat/${Dhoma.dhoma_Id}`, Dhoma),
  delete: (dhoma_id: string) => axios.delete<void>(`/dhomat/${dhoma_id}`),
};

const ShtreteritNeDhoma = {
  list: () => requests.get<IShtreteritNeDhoma[]>("/shtreteritnedhoma"),
  details: (shtreteritnedhome_id: string) =>
    requests.get<IDhoma>(`/shtreteritnedhoma/${shtreteritnedhome_id}`),
  create: (ShtreteritNeDhome: IShtreteritNeDhoma) =>
    axios.post<void>("/dhomat", ShtreteritNeDhome),
  update: (ShtreteritNeDhome: IShtreteritNeDhoma) =>
    axios.put<void>(
      `/dhomat/${ShtreteritNeDhome.shtreteritnedhome_id}`,
      ShtreteritNeDhome
    ),
  delete: (shtreteritnedhome_id: string) =>
    axios.delete<void>(`/dhomat/${shtreteritnedhome_id}`),
};
const Barnat = {
  list: () => requests.get<Barna[]>("/Barnat"),
  details: (id: string) => requests.get<Barna>(`/Barnat/${id}`),
  create: (Barna: Barna) => axios.post<void>("/Barnat", Barna),
  update: (Barna: Barna) =>
    axios.put<void>(`/Barnat/${Barna.barnat_Id}`, Barna),
  delete: (id: string) => axios.delete<void>(`/Barnat/${id}`),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const agent = {
  Departmentet,
  Infermieret,
  doktoret,
  Pacientat,
  Faturat,
  Terminet,
  Shtreter,
  llojiShtreterve,
  caktoShtreterit,
  Paisjet,
  Dhomat,
  ShtreteritNeDhoma,
  Barnat,
  Account,
  Therapy,
  Raport,
  Laboratort,
  Ambulancat,
};

export default agent;
