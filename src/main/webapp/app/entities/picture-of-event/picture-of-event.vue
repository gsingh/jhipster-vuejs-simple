<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('platemillApp.pictureOfEvent.home.title')" id="picture-of-event-heading">Picture Of Events</span>
            <router-link :to="{name: 'PictureOfEventCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-picture-of-event">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('platemillApp.pictureOfEvent.home.createLabel')">
                    Create new PictureOfEvent
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="pictureOfEvents">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('platemillApp.pictureOfEvent.picDate')">Pic Date</span></th>
                    <th><span v-text="$t('platemillApp.pictureOfEvent.imgFile')">Img File</span></th>
                    <th><span v-text="$t('platemillApp.pictureOfEvent.eventPM')">Event PM</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="pictureOfEvent in pictureOfEvents"
                    :key="pictureOfEvent.id">
                    <td>
                        <router-link :to="{name: 'PictureOfEventView', params: {pictureOfEventId: pictureOfEvent.id}}">{{pictureOfEvent.id}}</router-link>
                    </td>
                    <td>{{pictureOfEvent.picDate}}</td>
                    <td>{{pictureOfEvent.imgFile}}</td>
                    <td>
                        <div v-if="pictureOfEvent.eventPM">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventPMId: pictureOfEvent.eventPM.id}}">{{pictureOfEvent.eventPM.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'PictureOfEventView', params: {pictureOfEventId: pictureOfEvent.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PictureOfEventEdit', params: {pictureOfEventId: pictureOfEvent.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(pictureOfEvent)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="platemillApp.pictureOfEvent.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-pictureOfEvent-heading" v-bind:title="$t('platemillApp.pictureOfEvent.delete.question')">Are you sure you want to delete this Picture Of Event?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-pictureOfEvent" v-text="$t('entity.action.delete')" v-on:click="removePictureOfEvent()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./picture-of-event.component.ts">
</script>
