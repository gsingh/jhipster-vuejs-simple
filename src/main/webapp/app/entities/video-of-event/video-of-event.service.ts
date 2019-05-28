import axios from 'axios';

import { IVideoOfEvent } from '@/shared/model/video-of-event.model';

const baseApiUrl = 'api/video-of-events';

export default class VideoOfEventService {
  public find(id): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IVideoOfEvent> {
    return new Promise<IVideoOfEvent>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
