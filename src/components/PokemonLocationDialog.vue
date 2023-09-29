<script setup>
const props = defineProps(['data','title','isshow'])

</script>

<template>
    <teleport to='body' >
        <div>
            <!-- Modal -->
            <div class="modal fade" id="pokemonlocation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">{{ props.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="isshow">
                    <div class="text-center">
                        <div class="spinner-border mt-4 mb-4 text-secondary" style="width: 5rem; height: 5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <div class="modal-body" v-if="!isshow">
                    <table class="table table-striped table-hover table-bordered border-info rounded rounded-1 overflow-hidden">
                        <thead class="table-info">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in props.data" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.location_area.name }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </teleport>
</template>