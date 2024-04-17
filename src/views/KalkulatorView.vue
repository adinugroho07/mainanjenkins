
<script setup lang="ts">
import { ref } from 'vue';

const nilaiutama = ref(0);






</script>

<template>
    <div>
        <div class="card">
            <div class="card-header">
            Kalkulator
            </div>
            <div class="card-body">
                <div class="card">
                    <div class="mb-3">
                        <div class="kotak-kalkulator">
                            <input type="text" class="form-control" :value="nilaiutama" id="exampleFormControlInput1" readonly="true">
                            <div class="kotak-tombol">
                                <button v-for="(item , index) in 10" :key="index" class="btn btn-info btn-lg">{{ item }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.kotak-tombol {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
}

</style>
