import http from "../http-common";
import IUser from "../types/user.type";

const getAll = () => {
  return http.get("/users");
};

const get = (id: string) => {
  return http.get(`/users/${id}`);
};

const create = (data: IUser) => {
  return http.post("/users", data);
};

const update = (id: string, data: IUser) => {
  return http.put(`/users/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/users/${id}`);
};

const findByName = (name:string) => {
  return http.get(`/users?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};