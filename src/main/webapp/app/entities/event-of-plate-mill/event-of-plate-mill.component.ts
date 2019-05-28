import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';
import AlertService from '@/shared/alert/alert.service';

import EventOfPlateMillService from './event-of-plate-mill.service';

@Component
export default class EventOfPlateMill extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('eventOfPlateMillService') private eventOfPlateMillService: () => EventOfPlateMillService;
  private removeId: string = null;
  public eventOfPlateMills: IEventOfPlateMill[] = [];

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
    this.retrieveAllEventOfPlateMills();
  }

  public clear(): void {
    this.retrieveAllEventOfPlateMills();
  }

  public retrieveAllEventOfPlateMills(): void {
    this.eventOfPlateMillService()
      .retrieve()
      .then(res => {
        this.eventOfPlateMills = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeEventOfPlateMill(): void {
    this.eventOfPlateMillService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('platemillApp.eventOfPlateMill.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllEventOfPlateMills();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
