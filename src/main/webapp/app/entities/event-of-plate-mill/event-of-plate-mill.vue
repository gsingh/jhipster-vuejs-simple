<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('platemillApp.eventOfPlateMill.home.title')" id="event-of-plate-mill-heading">Event Of Plate Mills</span>
            <router-link :to="{name: 'EventOfPlateMillCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-event-of-plate-mill">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('platemillApp.eventOfPlateMill.home.createLabel')">
                    Create new EventOfPlateMill
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
        <div class="table-responsive" v-if="eventOfPlateMills">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('platemillApp.eventOfPlateMill.eventDate')">Event Date</span></th>
                    <th><span v-text="$t('platemillApp.eventOfPlateMill.eventName')">Event Name</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="eventOfPlateMill in eventOfPlateMills"
                    :key="eventOfPlateMill.id">
                    <td>
                        <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}">{{eventOfPlateMill.id}}</router-link>
                    </td>
                    <td>{{eventOfPlateMill.eventDate}}</td>
                    <td>{{eventOfPlateMill.eventName}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EventOfPlateMillEdit', params: {eventOfPlateMillId: eventOfPlateMill.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(eventOfPlateMill)"
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
            <span slot="modal-title"><span id="platemillApp.eventOfPlateMill.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-eventOfPlateMill-heading" v-bind:title="$t('platemillApp.eventOfPlateMill.delete.question')">Are you sure you want to delete this Event Of Plate Mill?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-eventOfPlateMill" v-text="$t('entity.action.delete')" v-on:click="removeEventOfPlateMill()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./event-of-plate-mill.component.ts">
</script>
