<template>
    <teleport to='body' >
        <div>
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">{{ titleModal }}</h5>
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
                    <div class="mb-3 row">
                        <label for="name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <label for="ID" class="col-sm-2 col-form-label">ID</label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="ID" v-model="id">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="damageClass" class="col-sm-4 col-form-label">Damage Class</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="damageClass" v-model="damageClass">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="damageClass" class="col-sm-2 col-form-label">Category</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="damageClass" v-model="category">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="power" class="col-sm-2 col-form-label">Power</label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="power" v-model="power">
                        </div>
                        <label for="PP" class="col-sm-2 col-form-label">PP</label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="PP" v-model="pp">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="critRate" class="col-sm-4 col-form-label">Critical Chance</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="critRate" v-model="critRate">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="ailment" class="col-sm-2 col-form-label">Ailment</label>
                        <div class="col-sm-4">
                        <input type="text" class="form-control" id="ailment" v-model="ailment">
                        </div>
                        <label for="ailment_chance" class="col-sm-4 col-form-label">Ailment Chance</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" id="ailment_chance" v-model="ailmentChance">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="drain" class="col-sm-2 col-form-label">Drain</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" id="drain" v-model="drain">
                        </div>
                        <label for="flinchChance" class="col-sm-2 col-form-label">Flinch</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" id="flinchChance" v-model="flinchChance">
                        </div>
                        <label for="healing" class="col-sm-2 col-form-label">Healing</label>
                        <div class="col-sm-2">
                        <input type="text" class="form-control" id="healing" v-model="healing">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="effect" class="col-sm-2 col-form-label">Effect</label>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="effect"></textarea>
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

<script>
import { computed  } from 'vue';

export default {
    props: ['data','title','isshow'],
    setup(props){
      
        const titleModal = computed(() => {
            return props.title
        })

        const id = computed(() => {
            return props.data.id
        })

        const accuracy = computed(() => {
            return props.data.accuracy
        })

        const damageClass = computed(() => {
            return props.data.damage_class
        })

        const name = computed(() => {
            return props.data.name
        })

        const power = computed(() => {
            return props.data.power
        })

        const pp = computed(() => {
            return props.data.pp
        })

        const category = computed(() => {
            return props.data.category
        })

        const critRate = computed(() => {
            return props.data.crit_rate
        })

        const drain = computed(() => {
            return props.data.drain
        })

        const flinchChance = computed(() => {
            return props.data.flinch_chance
        })

        const healing = computed(() => {
            return props.data.healing
        })

        const effect = computed(() => {
            return props.data.effect
        })
        const ailment = computed(() => {
            return props.data.ailment
        })
        const ailmentChance = computed(() => {
            return props.data.ailment_chance
        })

        return {
            name,
            titleModal,
            id,
            accuracy,
            damageClass,
            power,
            pp,
            category,
            critRate,
            drain,
            flinchChance,
            healing,
            effect,
            ailment,
            ailmentChance
        }
    }
}
</script>