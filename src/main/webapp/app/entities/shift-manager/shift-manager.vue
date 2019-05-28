<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('platemillApp.shiftManager.home.title')" id="shift-manager-heading">Shift Managers</span>
            <router-link :to="{name: 'ShiftManagerCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-shift-manager">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('platemillApp.shiftManager.home.createLabel')">
                    Create new ShiftManager
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
        <div class="table-responsive" v-if="shiftManagers">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('platemillApp.shiftManager.name')">Name</span></th>
                    <th><span v-text="$t('platemillApp.shiftManager.designation')">Designation</span></th>
                    <th><span v-text="$t('platemillApp.shiftManager.mobileNumber')">Mobile Number</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="shiftManager in shiftManagers"
                    :key="shiftManager.id">
                    <td>
                        <router-link :to="{name: 'ShiftManagerView', params: {shiftManagerId: shiftManager.id}}">{{shiftManager.id}}</router-link>
                    </td>
                    <td>{{shiftManager.name}}</td>
                    <td>{{shiftManager.designation}}</td>
                    <td>{{shiftManager.mobileNumber}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ShiftManagerView', params: {shiftManagerId: shiftManager.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ShiftManagerEdit', params: {shiftManagerId: shiftManager.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(shiftManager)"
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
            <span slot="modal-title"><span id="platemillApp.shiftManager.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-shiftManager-heading" v-bind:title="$t('platemillApp.shiftManager.delete.question')">Are you sure you want to delete this Shift Manager?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-shiftManager" v-text="$t('entity.action.delete')" v-on:click="removeShiftManager()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./shift-manager.component.ts">
</script>
