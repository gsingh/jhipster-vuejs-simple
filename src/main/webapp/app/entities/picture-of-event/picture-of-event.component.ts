import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';
import AlertService from '@/shared/alert/alert.service';

import PictureOfEventService from './picture-of-event.service';

@Component
export default class PictureOfEvent extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('pictureOfEventService') private pictureOfEventService: () => PictureOfEventService;
  private removeId: string = null;
  public pictureOfEvents: IPictureOfEvent[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllPictureOfEvents();
  }

  public clear(): void {
    this.retrieveAllPictureOfEvents();
  }

  public retrieveAllPictureOfEvents(): void {
    this.pictureOfEventService()
      .retrieve()
      .then(res => {
        this.pictureOfEvents = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removePictureOfEvent(): void {
    this.pictureOfEventService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('platemillApp.pictureOfEvent.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPictureOfEvents();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
