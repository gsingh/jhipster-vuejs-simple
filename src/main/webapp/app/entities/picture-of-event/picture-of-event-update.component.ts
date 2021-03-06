import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EventOfPlateMillService from '../event-of-plate-mill/event-of-plate-mill.service';
import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

import AlertService from '@/shared/alert/alert.service';
import { IPictureOfEvent, PictureOfEvent } from '@/shared/model/picture-of-event.model';
import PictureOfEventService from './picture-of-event.service';

const validations: any = {
  pictureOfEvent: {
    picDate: {},
    imgFile: {
      required
    }
  }
};

@Component({
  validations
})
export default class PictureOfEventUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('pictureOfEventService') private pictureOfEventService: () => PictureOfEventService;
  public pictureOfEvent: IPictureOfEvent = new PictureOfEvent();

  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;

  public eventOfPlateMills: IEventOfPlateMill[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pictureOfEventId) {
        vm.retrievePictureOfEvent(to.params.pictureOfEventId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.pictureOfEvent.id) {
      this.pictureOfEventService()
        .update(this.pictureOfEvent)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('platemillApp.pictureOfEvent.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.pictureOfEventService()
        .create(this.pictureOfEvent)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('platemillApp.pictureOfEvent.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePictureOfEvent(pictureOfEventId): void {
    this.pictureOfEventService()
      .find(pictureOfEventId)
      .then(res => {
        this.pictureOfEvent = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.eventOfPlateMillService()
      .retrieve()
      .then(res => {
        this.eventOfPlateMills = res.data;
      });
  }
}
