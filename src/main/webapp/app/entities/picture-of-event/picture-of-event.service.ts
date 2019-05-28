import axios from 'axios';

import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';

const baseApiUrl = 'api/picture-of-events';

export default class PictureOfEventService {
  public find(id): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
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

  public create(entity): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
