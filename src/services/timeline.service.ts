import http from "../http-common";
import ITimelineData from "../types/timeline.type"

class TimelineService {
  getAll() {
    return http.get("/timeline");
  }

  get(id: string) {
    return http.get(`/timeline/${id}`);
  }

  create(data: ITimelineData) {
    return http.post("/timeline", data);
  }

  update(data: ITimelineData, id: any) {
    return http.put(`/timeline/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/timeline/${id}`);
  }

  deleteAll() {
    return http.delete(`/timeline`);
  }
}

export default new TimelineService();