<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ModalDialog from '../components/ModalDialog.vue'
import PokemonLocationDialog from '../components/PokemonLocationDialog.vue';
import ItemHeldsDialog from '../components/ItemHeldsDialog.vue'
import {usePokemonAPIStore} from '../stores/pokemonAPI'

const pokemonStore = usePokemonAPIStore()
const page = ref(0)
const url = ref('')
const urlLocation = ref('')
const name = ref('')
const height = ref(0)
const weight = ref(0)
const id = ref(0)
const is_default = ref(true)
const moves = ref([])
const sprites = ref({})
const types = ref([])
const image = ref([])
const heldItems = ref([])
const dataTemporary = ref({})
const stats = ref([])
const locationPokemon = ref([])
const isShow = ref(false)
const isShowMoves = ref(false)
const dataTempItem = ref({})

const heightCom = computed(() => {
  return height.value + ' dm/decimetres'
})

const weightCom = computed(() => {
  return weight.value + ' hg/hectogram'
})

// const type = computed(() => {
//   return types.value.name
// })

const isactive = (index) => {
  if(index == page.value){
    return 'page-item active'
  } else {
    return 'page-item'
  }
}

const isdisableprev = () => {
  if(page.value == 0){
    return 'page-item disabled'
  }

  return 'page-item'
}

const isdisablenext = () => {
  if(page.value == (moves.value.length - 1)){
    return 'page-item disabled'
  }

  return 'page-item'
}

const changePage = (currentpage) => {
  page.value = currentpage
}

const nextprevpage = (mode) => {
  if(mode == 'next' && page.value < (moves.value.length - 1)) {
    page.value = page.value + 1
  }

  if(mode == 'prev' && page.value != 0){
    page.value = page.value - 1
  }
}

const submitPokemon = async () => {
  isShow.value = true
  pokemonStore.changeURl(url.value)
  await executeAxios()
  isShow.value = false
}

const executeAxios = async () => {
  //pokemonStore.changeURl(url.value)
  isShow.value = true
  await pokemonStore.getDataAPI()
  image.value = []
  name.value = capitalize(pokemonStore.dataTemporary.name)
  height.value = pokemonStore.dataTemporary.height
  weight.value = pokemonStore.dataTemporary.weight
  id.value = pokemonStore.dataTemporary.id
  is_default.value = pokemonStore.dataTemporary.is_default
  moves.value = pagination(pokemonStore.dataTemporary.moves)
  sprites.value = pokemonStore.dataTemporary.sprites
  types.value = capitalize(pokemonStore.dataTemporary.types.name)
  heldItems.value = pokemonStore.dataTemporary.heldItems
  stats.value = pokemonStore.dataTemporary.stats
  urlLocation.value = pokemonStore.dataTemporary.urlLocation
  image.value = pokemonStore.dataTemporary.images
  isShow.value = false

}

const capitalize = (stringname) => {
  const arrayString = stringname.split(" ")
  let capitalString = ''
  arrayString.forEach((element,index) => {
    const capitalStringTemp = element.charAt(0).toUpperCase() + element.slice(1)
    if(index > 0){
      capitalString = capitalString + " " + capitalStringTemp
    } else {
      capitalString = capitalStringTemp 
    }
  })

  return capitalString
}

const pagination = (data) => {
  let dataReturn = []
  let dataTemp = []
  let indexberjalan = 0
  const threshold = 10
  if(data.length > 0){
    data.forEach((element) => {
      if(indexberjalan == threshold){
        dataReturn.push(dataTemp)
        dataTemp = []
        indexberjalan = 0
      }

      if(data.length < threshold && (data.length - 1) == indexberjalan){
        dataReturn.push(dataTemp)
      }

      dataTemp.push(element)
      indexberjalan = indexberjalan + 1
    })
  }
  console.log(dataReturn)
  return dataReturn;
}

const pokemonLocationModal = async (url) => {
  isShowMoves.value = true
  if(url != ''){
    await axios.get(url)
      .then((response) => {
          //dataTemporary.value = response.data    
          locationPokemon.value = response.data
          isShowMoves.value = false
      })
      .catch((error) => {
      //console.log(error)
      let errorMessage = 'Error Search With Message : '+error.message + ' , status code : ' + error.response.status
      alert(errorMessage)
      isShowMoves.value = true
      })
  }
}

const modalToggle = async (url) => {
  isShowMoves.value = true
  if(url != ''){
    try {
      const response = await axios.get(url)

      dataTemporary.value.id = response.data.id
      dataTemporary.value.accuracy = response.data.accuracy
      dataTemporary.value.damage_class = capitalize(response.data.damage_class.name)
      dataTemporary.value.name = capitalize(response.data.name)
      dataTemporary.value.power = response.data.power
      dataTemporary.value.pp = response.data.pp
      dataTemporary.value.category = capitalize(response.data.meta.category.name)
      dataTemporary.value.crit_rate = response.data.meta.crit_rate
      dataTemporary.value.drain = response.data.meta.drain
      dataTemporary.value.ailment = response.data.meta.ailment.name
      dataTemporary.value.ailment_chance = response.data.meta.ailment_chance
      dataTemporary.value.flinch_chance = response.data.meta.flinch_chance
      dataTemporary.value.healing = response.data.meta.healing
      dataTemporary.value.effect = response.data.effect_entries[0].short_effect
      isShowMoves.value = false
    } catch (error) {
      let errorMessage = 'Error Search With Message : '+error.message + ' , status code : ' + error.response.status
      alert(errorMessage)
      isShowMoves.value = true
    }
  }
                
}

const itemHeldModal = async (url) => {
  isShowMoves.value = true
  if(url != ''){
    try {
      const response = await axios.get(url)

      dataTempItem.value.id = response.data.id
      dataTempItem.value.name = response.data.name
      dataTempItem.value.image = response.data.sprites.default
      dataTempItem.value.cost = response.data.cost
      dataTempItem.value.fling_effect = response.data.fling_effect
      dataTempItem.value.fling_power = response.data.fling_power
      dataTempItem.value.effect = response.data.effect_entries[0].effect
      dataTempItem.value.short_effect = response.data.effect_entries[0].short_effect


      isShowMoves.value = false
    } catch (error) {
      let errorMessage = 'Error Search With Message : '+error.message + ' , status code : ' + error.response.status
      alert(errorMessage)
      isShowMoves.value = true
    }
  }
}

onMounted(() => {
  executeAxios()
  url.value = pokemonStore.url
})

//import axios from 'axios';
</script>

<template>
  <div class="card">
    <div class="card-header">
      Pokemon Apps
    </div>
    <div class="card-body">
      <h5 class="card-title">Pokemon Finding</h5>
      <h6 class="card-subtitle mb-2 text-muted">Please Input Pokemon Name Or ID Pokemon</h6>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          v-model="url"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="submitPokemon"
        >
          Hit ME !!
        </button>
        <button v-show="isShow" class="btn btn-primary" type="button" disabled>
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
      <div class="card my-3">
        <div class="text-center" v-show="isShow">
          <div class="spinner-border mt-4 mb-4 text-secondary" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="card-body" v-show="!isShow">
          <h5 class="card-title">Pokemon Image</h5>
          <img
          v-for="(item, index) in image"
          :key="index"
          :src="item"
          id="imgPokemon"
          alt="Image Not Found"
        />
        </div>
      </div>
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title mb-3">Pokemon General Info</h5>
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" id="colFormLabel" disabled v-model="name" />
            </div>
            <label for="colFormLabel" class="col-sm-2 col-form-label">Id</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" id="colFormLabel" disabled v-model="id" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Height</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" id="colFormLabel" disabled v-model="heightCom" />
            </div>
            <label for="colFormLabel" class="col-sm-2 col-form-label">Weight</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" id="colFormLabel" disabled v-model="weightCom" />
            </div>
          </div>
          
          <div class="row mb-3">
            <label for="colFormLabel" class="col-sm-3 col-form-label">Pokemon Type</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="colFormLabel" disabled v-model="types" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">Pokemon Statistic</h5>
          <table class="table table-striped table-hover table-bordered border-info rounded rounded-1 overflow-hidden">
            <thead class="table-info">
              <tr>
                <th scope="col">Stat Name</th>
                <th scope="col">Value</th>
                <th scope="col">Effort</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in stats" :key="index">
                <td>{{ capitalize(item.stat.name) }}</td>
                <td>{{ item.base_stat }}</td>
                <td>{{ item.effort }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">Item Can Be Held In Pokemon</h5>
          <table class="table table-striped table-hover table-bordered border-info rounded rounded-1 overflow-hidden">
            <thead class="table-info">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name Item</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in heldItems" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ capitalize(item.item.name) }}</td>
                <td><button @click="itemHeldModal(item.item.url)" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#itemheldmodal">Show</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Pokemon Location</h5>
          <p class="card-text">Location of pokemon can be found. This location is not spesific but you can search aroud this location to get this pokemon.</p>
          <button @click="pokemonLocationModal(urlLocation)" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#pokemonlocation">Show</button>
        </div>
      </div>
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">Pokemon Moves</h5>
          <table class="table table-striped table-hover table-bordered border-info rounded rounded-1 overflow-hidden ">
            <thead class="table-info">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name Moves</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in moves[page]" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ capitalize(item.move.name) }}</td>
                <td><button @click="modalToggle(item.move.url)" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">Detail</button></td>
              </tr>
              
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li :class="isdisableprev()"><button class="page-link" @click="nextprevpage('prev')">Previous</button></li>
              <li v-for="(item,index) in moves" :key="index" :class="isactive(index)"><buton class="page-link" @click="changePage(index)">{{ index + 1 }}</buton></li>
              <li :class="isdisablenext()"><button class="page-link" @click="nextprevpage('next')">Next</button></li>
            </ul>
          </nav>
        </div>
      </div>
      
    </div>
  </div>
  <ModalDialog :data="dataTemporary" title="Moves Detail" :isshow="isShowMoves"/>
  <PokemonLocationDialog :data="locationPokemon" title="Pokemon Location" :isshow="isShowMoves"/>
  <ItemHeldsDialog :data="dataTempItem" title="Item Helds Details" :isshow="isShowMoves"/>
</template>
<style scoped>

#imgPokemon {
  height: 150px;
  width: 150px;
  position: relative;
}

img:hover {
  transform: scale(4);
  transition: 0.4s;
  z-index: 5;
}
</style>
