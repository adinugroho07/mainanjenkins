import { ref , computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useKataAPIStore = defineStore('kataapi', () => {
    const url = ref('https://candaan-api.vercel.app/api/text/random')
    const datakata = ref({})

    const katakatamutiara = computed(() => {
        return 'Quotes Hari Ini : ' +  datakata.value.data
    });
    const getKata = async () => {
        datakata.value = {}
        try {
            const response = await axios.get(url.value)
            datakata.value.data = response.data.data
            
        } catch (error) {
            let errorMessage = 'Error Search With Message : '+error.message + ' , status code : ' + error.response.status
            alert(errorMessage)
        }
    }

    return {url,datakata,katakatamutiara,getKata}
})