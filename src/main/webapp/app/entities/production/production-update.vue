<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillApp.production.home.createOrEditLabel" v-text="$t('platemillApp.production.home.createOrEditLabel')">Create or edit a Production</h2>
                <div>
                    <div class="form-group" v-if="production.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="production.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.production.prodDate')" for="production-prodDate">Prod Date</label>
                        <div class="input-group">
                            <input id="production-prodDate" type="date" class="form-control" name="prodDate"  :class="{'valid': !$v.production.prodDate.$invalid, 'invalid': $v.production.prodDate.$invalid }"
                            v-model="$v.production.prodDate.$model"  required />
                        </div>
                        <div v-if="$v.production.prodDate.$anyDirty && $v.production.prodDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.production.prodDate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.production.shift')" for="production-shift">Shift</label>
                        <select class="form-control" name="shift" :class="{'valid': !$v.production.shift.$invalid, 'invalid': $v.production.shift.$invalid }" v-model="$v.production.shift.$model" id="production-shift"  required>
                            <option value="A" v-bind:label="$t('platemillApp.Shift.A')">A</option>
                            <option value="B" v-bind:label="$t('platemillApp.Shift.B')">B</option>
                            <option value="C" v-bind:label="$t('platemillApp.Shift.C')">C</option>
                        </select>
                        <div v-if="$v.production.shift.$anyDirty && $v.production.shift.$invalid">
                            <small class="form-text text-danger" v-if="!$v.production.shift.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.production.noOfPlates')" for="production-noOfPlates">No Of Plates</label>
                        <input type="number" class="form-control" name="noOfPlates" id="production-noOfPlates"
                            :class="{'valid': !$v.production.noOfPlates.$invalid, 'invalid': $v.production.noOfPlates.$invalid }" v-model.number="$v.production.noOfPlates.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.production.prodTonnage')" for="production-prodTonnage">Prod Tonnage</label>
                        <input type="number" class="form-control" name="prodTonnage" id="production-prodTonnage"
                            :class="{'valid': !$v.production.prodTonnage.$invalid, 'invalid': $v.production.prodTonnage.$invalid }" v-model.number="$v.production.prodTonnage.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('platemillApp.production.manager')" for="production-manager">Manager</label>
                        <select class="form-control" id="production-manager" name="manager" v-model="production.manager" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="production.manager && shiftManagerOption.id === production.manager.id ? production.manager : shiftManagerOption" v-for="shiftManagerOption in shiftManagers" :key="shiftManagerOption.id">{{shiftManagerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.production.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./production-update.component.ts">
</script>
