
import { ref } from "vue"
import { defineStore } from "pinia"
import axios  from 'axios'

export const usePokemonAPIStore = defineStore('pokemonapi',() => {
    const url = ref('https://pokeapi.co/api/v2/pokemon/raikou')
    const dataTemporary= ref({})

    const changeURl = (payload) => {
        url.value = payload
    }

    const getDataAPI = async() => {
        dataTemporary.value = {}
        dataTemporary.value.images = []
        try {
            const response = await axios.get(url.value)
        
            //dataTemporary.value = response.data 
            dataTemporary.value.name = response.data.name
            dataTemporary.value.height = response.data.height
            dataTemporary.value.weight = response.data.weight
            dataTemporary.value.id = response.data.id
            dataTemporary.value.is_default = response.data.is_default
            dataTemporary.value.moves = response.data.moves
            dataTemporary.value.sprites = response.data.sprites
            dataTemporary.value.types = response.data.types[0].type
            dataTemporary.value.heldItems = response.data.held_items
            dataTemporary.value.stats = response.data.stats
            dataTemporary.value.urlLocation = response.data.location_area_encounters
            dataTemporary.value.images.push(response.data.sprites.other['official-artwork'].front_default)
            dataTemporary.value.images.push(response.data.sprites.other['home'].front_default)
            dataTemporary.value.images.push(response.data.sprites.other['dream_world'].front_default)
            dataTemporary.value.images.push(response.data.sprites.back_default)
            dataTemporary.value.images.push(response.data.sprites.back_shiny)
            dataTemporary.value.images.push(response.data.sprites.front_shiny)
        } catch (error) {
            let errorMessage = 'Error Search With Message : '+error.message + ' , status code : ' + error.response.status
            alert(errorMessage)
        }
        
    }

    return {url,dataTemporary,getDataAPI,changeURl}
})

