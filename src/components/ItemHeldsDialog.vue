<script setup>
import { computed } from 'vue'
const props = defineProps(['data', 'title', 'isshow'])

// dataTemporary.value.id = response.data.id
// dataTemporary.value.name = response.data.name
// dataTemporary.value.image = response.data.sprites.default
// dataTemporary.value.cost = response.data.cost
// dataTemporary.value.fling_effect = response.data.fling_effect
// dataTemporary.value.fling_power = response.data.fling_power
// dataTemporary.value.effect = response.data.effect_entries[0].effect
// dataTemporary.value.short_effect = response.data.effect_entries[0].short_effect

const name = computed(() => {
  return props.data.name
})

const id = computed(() => {
  return props.data.id
})

console.log(props.data)

const image = computed(() => {
  return props.data.image
})

const cost = computed(() => {
  return props.data.cost
})

const fling_effect = computed(() => {
  return props.data.fling_effect
})

const fling_power = computed(() => {
  return props.data.fling_power
})

const effect = computed(() => {
  return props.data.effect
})

const short_effect = computed(() => {
  return props.data.short_effect
})

</script>

<template>
  <teleport to="body">
    <div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="itemheldmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">{{ props.title }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" v-if="isshow">
              <div class="text-center">
                <div
                  class="spinner-border mt-4 mb-4 text-secondary"
                  style="width: 5rem; height: 5rem"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="modal-body" v-if="!isshow">
                <div class="card my-3">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Item General Info</h5>
                        <div class="mb-3 row">
                            <label for="id" class="col-sm-4 col-form-label">ID</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="id" v-model="id">
                            </div>
                        </div>    
                        <div class="mb-3 row">
                            <label for="name" class="col-sm-4 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="name" v-model="name">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="cost" class="col-sm-4 col-form-label">Cost</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="cost" v-model="cost" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="fling_effect" class="col-sm-4 col-form-label">Fling Effect</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="fling_effect" v-model="fling_effect" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="fling_power" class="col-sm-4 col-form-label">Fling Power</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="fling_power" v-model="fling_power" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="short_effect" class="col-sm-4 col-form-label">Short Effect</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" id="short_effect" rows="3" v-model="short_effect"></textarea>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="effect" class="col-sm-4 col-form-label">Effect</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="effect"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card my-3">
                    <div class="card-body">
                        <h5 class="card-title">Item Image</h5>
                        <img :src="image" id="imgItem" alt="Image Not Found" />
                    </div>
                </div>
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
<style scoped>

#imgItem {
  height: 70px;
  width: 70px;
  position: relative;
}

</style>