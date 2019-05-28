import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { INormalising } from '@/shared/model/normalising.model';
import AlertService from '@/shared/alert/alert.service';

import NormalisingService from './normalising.service';

@Component
export default class Normalising extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('normalisingService') private normalisingService: () => NormalisingService;
  private removeId: string = null;
  public normalisings: INormalising[] = [];

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
    this.retrieveAllNormalisings();
  }

  public clear(): void {
    this.retrieveAllNormalisings();
  }

  public retrieveAllNormalisings(): void {
    this.normalisingService()
      .retrieve()
      .then(res => {
        this.normalisings = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeNormalising(): void {
    this.normalisingService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('platemillApp.normalising.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllNormalisings();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
