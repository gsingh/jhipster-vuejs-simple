<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="production">
                <h2 class="jh-entity-heading"><span v-text="$t('platemillApp.production.detail.title')">Production</span> {{production.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('platemillApp.production.prodDate')">Prod Date</span>
                    </dt>
                    <dd>
                        <span>{{production.prodDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.production.shift')">Shift</span>
                    </dt>
                    <dd>
                        <span v-text="$t('platemillApp.Shift.' + production.shift)">{{production.shift}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.production.noOfPlates')">No Of Plates</span>
                    </dt>
                    <dd>
                        <span>{{production.noOfPlates}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.production.prodTonnage')">Prod Tonnage</span>
                    </dt>
                    <dd>
                        <span>{{production.prodTonnage}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('platemillApp.production.manager')">Manager</span>
                    </dt>
                    <dd>
                        <div v-if="production.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: production.manager.id}}">{{production.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="production.id" :to="{name: 'ProductionEdit', params: {productionId: production.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./production-details.component.ts">
</script>
