import http from "../http-common";
import IUserData from "../types/user.type";

const getAll = () => {
  return http.get("/users");
};

const get = (id: string) => {
  return http.get(`/users/${id}`);
};

const create = (data: IUserData) => {
  return http.post("/users", data);
};

const update = (id: string, data: IUserData) => {
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