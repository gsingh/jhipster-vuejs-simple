<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillApp.videoOfEvent.home.createOrEditLabel" v-text="$t('platemillApp.videoOfEvent.home.createOrEditLabel')">Create or edit a VideoOfEvent</h2>
                <div>
                    <div class="form-group" v-if="videoOfEvent.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="videoOfEvent.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.videoOfEvent.videoDate')" for="video-of-event-videoDate">Video Date</label>
                        <div class="input-group">
                            <input id="video-of-event-videoDate" type="date" class="form-control" name="videoDate"  :class="{'valid': !$v.videoOfEvent.videoDate.$invalid, 'invalid': $v.videoOfEvent.videoDate.$invalid }"
                            v-model="$v.videoOfEvent.videoDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('platemillApp.videoOfEvent.videoFile')" for="video-of-event-videoFile">Video File</label>
                        <input type="text" class="form-control" name="videoFile" id="video-of-event-videoFile"
                            :class="{'valid': !$v.videoOfEvent.videoFile.$invalid, 'invalid': $v.videoOfEvent.videoFile.$invalid }" v-model="$v.videoOfEvent.videoFile.$model"  required/>
                        <div v-if="$v.videoOfEvent.videoFile.$anyDirty && $v.videoOfEvent.videoFile.$invalid">
                            <small class="form-text text-danger" v-if="!$v.videoOfEvent.videoFile.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('platemillApp.videoOfEvent.eventPM')" for="video-of-event-eventPM">Event PM</label>
                        <select class="form-control" id="video-of-event-eventPM" name="eventPM" v-model="videoOfEvent.eventPM" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="videoOfEvent.eventPM && eventOfPlateMillOption.id === videoOfEvent.eventPM.id ? videoOfEvent.eventPM : eventOfPlateMillOption" v-for="eventOfPlateMillOption in eventOfPlateMills" :key="eventOfPlateMillOption.id">{{eventOfPlateMillOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.videoOfEvent.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./video-of-event-update.component.ts">
</script>
