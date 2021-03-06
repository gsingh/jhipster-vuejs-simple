/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import PictureOfEventDetailComponent from '@/entities/picture-of-event/picture-of-event-details.vue';
import PictureOfEventClass from '@/entities/picture-of-event/picture-of-event-details.component';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('PictureOfEvent Management Detail Component', () => {
    let wrapper: Wrapper<PictureOfEventClass>;
    let comp: PictureOfEventClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<PictureOfEventClass>(PictureOfEventDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { pictureOfEventService: () => new PictureOfEventService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrievePictureOfEvent(123);
        await comp.$nextTick();

        // THEN
        expect(comp.pictureOfEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
