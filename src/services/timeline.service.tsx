import http from "../http-common";
import ITimelineData from "../types/timeline.type"

class TimelineService {
  getAll() {
    return http.get("/timelines");
  }

  get(id: string) {
    return http.get(`/timelines/${id}`);
  }

  create(data: ITimelineData) {
    return http.post("/timelines", data);
  }

  update(data: ITimelineData, id: any) {
    return http.put(`/timelines/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/timelines/${id}`);
  }

  deleteAll() {
    return http.delete(`/timelines`);
  }
}

export default new TimelineService();