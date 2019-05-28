<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="shipping">
                <h2 class="jh-entity-heading"><span v-text="$t('platemillApp.shipping.detail.title')">Shipping</span> {{shipping.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('platemillApp.shipping.shippingDate')">Shipping Date</span>
                    </dt>
                    <dd>
                        <span>{{shipping.shippingDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.shipping.shift')">Shift</span>
                    </dt>
                    <dd>
                        <span v-text="$t('platemillApp.Shift.' + shipping.shift)">{{shipping.shift}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.shipping.noOfWagons')">No Of Wagons</span>
                    </dt>
                    <dd>
                        <span>{{shipping.noOfWagons}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.shipping.noOfTrailers')">No Of Trailers</span>
                    </dt>
                    <dd>
                        <span>{{shipping.noOfTrailers}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.shipping.shippedTonnage')">Shipped Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{shipping.shippedTonnage}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.shipping.manager')">Manager</span>
                    </dt>
                    <dd>
                        <div v-if="shipping.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: shipping.manager.id}}">{{shipping.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="shipping.id" :to="{name: 'ShippingEdit', params: {shippingId: shipping.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./shipping-details.component.ts">
</script>
