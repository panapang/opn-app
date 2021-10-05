import http from "../http-common";
import IAreaData from "../types/area.type"

class AreaService {
  getAll() {
    return http.get("/areas");
  }

  get(id: string) {
    return http.get(`/areas/${id}`);
  }

  create(data: IAreaData) {
    return http.post("/areas", data);
  }

  update(data: IAreaData, id: any) {
    return http.put(`/areas/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/areas/${id}`);
  }

}

export default new AreaService();