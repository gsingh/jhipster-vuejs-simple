<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('platemillApp.shipping.home.title')" id="shipping-heading">Shippings</span>
            <router-link :to="{name: 'ShippingCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-shipping">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('platemillApp.shipping.home.createLabel')">
                    Create new Shipping
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
        <div class="table-responsive" v-if="shippings">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('platemillApp.shipping.shippingDate')">Shipping Date</span></th>
                    <th><span v-text="$t('platemillApp.shipping.shift')">Shift</span></th>
                    <th><span v-text="$t('platemillApp.shipping.noOfWagons')">No Of Wagons</span></th>
                    <th><span v-text="$t('platemillApp.shipping.noOfTrailers')">No Of Trailers</span></th>
                    <th><span v-text="$t('platemillApp.shipping.shippedTonnage')">Shipped Tonnage</span></th>
                    <th><span v-text="$t('platemillApp.shipping.manager')">Manager</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="shipping in shippings"
                    :key="shipping.id">
                    <td>
                        <router-link :to="{name: 'ShippingView', params: {shippingId: shipping.id}}">{{shipping.id}}</router-link>
                    </td>
                    <td>{{shipping.shippingDate}}</td>
                    <td v-text="$t('platemillApp.Shift.' + shipping.shift)">{{shipping.shift}}</td>
                    <td>{{shipping.noOfWagons}}</td>
                    <td>{{shipping.noOfTrailers}}</td>
                    <td>{{shipping.shippedTonnage}}</td>
                    <td>
                        <div v-if="shipping.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: shipping.manager.id}}">{{shipping.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ShippingView', params: {shippingId: shipping.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ShippingEdit', params: {shippingId: shipping.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(shipping)"
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
            <span slot="modal-title"><span id="platemillApp.shipping.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-shipping-heading" v-bind:title="$t('platemillApp.shipping.delete.question')">Are you sure you want to delete this Shipping?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-shipping" v-text="$t('entity.action.delete')" v-on:click="removeShipping()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./shipping.component.ts">
</script>
