import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IProduction } from '@/shared/model/production.model';
import AlertService from '@/shared/alert/alert.service';

import ProductionService from './production.service';

@Component
export default class Production extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productionService') private productionService: () => ProductionService;
  private removeId: string = null;
  public productions: IProduction[] = [];

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
    this.retrieveAllProductions();
  }

  public clear(): void {
    this.retrieveAllProductions();
  }

  public retrieveAllProductions(): void {
    this.productionService()
      .retrieve()
      .then(res => {
        this.productions = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeProduction(): void {
    this.productionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('platemillApp.production.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllProductions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
