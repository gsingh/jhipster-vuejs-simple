import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';
import AlertService from '@/shared/alert/alert.service';

import HeavyPlateFinishedService from './heavy-plate-finished.service';

@Component
export default class HeavyPlateFinished extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('heavyPlateFinishedService') private heavyPlateFinishedService: () => HeavyPlateFinishedService;
  private removeId: string = null;
  public heavyPlateFinisheds: IHeavyPlateFinished[] = [];

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
    this.retrieveAllHeavyPlateFinisheds();
  }

  public clear(): void {
    this.retrieveAllHeavyPlateFinisheds();
  }

  public retrieveAllHeavyPlateFinisheds(): void {
    this.heavyPlateFinishedService()
      .retrieve()
      .then(res => {
        this.heavyPlateFinisheds = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeHeavyPlateFinished(): void {
    this.heavyPlateFinishedService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('platemillApp.heavyPlateFinished.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllHeavyPlateFinisheds();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
