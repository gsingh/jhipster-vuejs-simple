<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('platemillApp.production.home.title')" id="production-heading">Productions</span>
            <router-link :to="{name: 'ProductionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-production">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('platemillApp.production.home.createLabel')">
                    Create new Production
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
        <div class="table-responsive" v-if="productions">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('platemillApp.production.prodDate')">Prod Date</span></th>
                    <th><span v-text="$t('platemillApp.production.shift')">Shift</span></th>
                    <th><span v-text="$t('platemillApp.production.noOfPlates')">No Of Plates</span></th>
                    <th><span v-text="$t('platemillApp.production.prodTonnage')">Prod Tonnage</span></th>
                    <th><span v-text="$t('platemillApp.production.manager')">Manager</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="production in productions"
                    :key="production.id">
                    <td>
                        <router-link :to="{name: 'ProductionView', params: {productionId: production.id}}">{{production.id}}</router-link>
                    </td>
                    <td>{{production.prodDate}}</td>
                    <td v-text="$t('platemillApp.Shift.' + production.shift)">{{production.shift}}</td>
                    <td>{{production.noOfPlates}}</td>
                    <td>{{production.prodTonnage}}</td>
                    <td>
                        <div v-if="production.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: production.manager.id}}">{{production.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ProductionView', params: {productionId: production.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProductionEdit', params: {productionId: production.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(production)"
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
            <span slot="modal-title"><span id="platemillApp.production.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-production-heading" v-bind:title="$t('platemillApp.production.delete.question')">Are you sure you want to delete this Production?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-production" v-text="$t('entity.action.delete')" v-on:click="removeProduction()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./production.component.ts">
</script>
