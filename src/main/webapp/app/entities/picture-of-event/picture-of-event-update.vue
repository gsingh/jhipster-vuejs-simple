<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillApp.pictureOfEvent.home.createOrEditLabel" v-text="$t('platemillApp.pictureOfEvent.home.createOrEditLabel')">Create or edit a PictureOfEvent</h2>
                <div>
                    <div class="form-group" v-if="pictureOfEvent.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="pictureOfEvent.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.pictureOfEvent.picDate')" for="picture-of-event-picDate">Pic Date</label>
                        <div class="input-group">
                            <input id="picture-of-event-picDate" type="date" class="form-control" name="picDate"  :class="{'valid': !$v.pictureOfEvent.picDate.$invalid, 'invalid': $v.pictureOfEvent.picDate.$invalid }"
                            v-model="$v.pictureOfEvent.picDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.pictureOfEvent.imgFile')" for="picture-of-event-imgFile">Img File</label>
                        <input type="text" class="form-control" name="imgFile" id="picture-of-event-imgFile"
                            :class="{'valid': !$v.pictureOfEvent.imgFile.$invalid, 'invalid': $v.pictureOfEvent.imgFile.$invalid }" v-model="$v.pictureOfEvent.imgFile.$model"  required/>
                        <div v-if="$v.pictureOfEvent.imgFile.$anyDirty && $v.pictureOfEvent.imgFile.$invalid">
                            <small class="form-text text-danger" v-if="!$v.pictureOfEvent.imgFile.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('platemillApp.pictureOfEvent.eventPM')" for="picture-of-event-eventPM">Event PM</label>
                        <select class="form-control" id="picture-of-event-eventPM" name="eventPM" v-model="pictureOfEvent.eventPM" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="pictureOfEvent.eventPM && eventOfPlateMillOption.id === pictureOfEvent.eventPM.id ? pictureOfEvent.eventPM : eventOfPlateMillOption" v-for="eventOfPlateMillOption in eventOfPlateMills" :key="eventOfPlateMillOption.id">{{eventOfPlateMillOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.pictureOfEvent.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./picture-of-event-update.component.ts">
</script>
