import http from "../http-common";
import IAreaData from "../types/area.type"

class AreaService {
  getAll() {
    return http.get("/area");
  }

  get(id: string) {
    return http.get(`/area/${id}`);
  }

  create(data: IAreaData) {
    return http.post("/area", data);
  }

  update(data: IAreaData, id: any) {
    return http.put(`/area/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/area/${id}`);
  }

}

export default new AreaService();