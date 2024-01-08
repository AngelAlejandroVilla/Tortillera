<template>
      <div
        v-show="isOpen"
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Vista de Precios</h3>
            <svg
              @click="$emit('update:is-open',false)"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <button
              @click="openAddPrice()"
              class="flex mt-4 px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
                Añadir Precio
            </button>
          </div>
          <div class="mt-4">
            <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-9 py-4 text-left">
                          Cliente
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-9 py-4 text-left">
                          Precio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        v-for="(price, index) in prices"
                        :key="index" 
                        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td class="text-sm text-gray-900 font-light px-9 py-4 whitespace-nowrap">
                          {{ price.CustomerName }}
                        </td>
                        <td>
                           <div class="flex flex-row">
                             <div class="mx-auto text-md font-bold text-green-400 px-3 py-4 whitespace-nowrap">
                                ${{ price.Price }}
                             </div>
                             <div @click="openEditPrice(price)" class="py-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="hover:text-cyan-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                             </div>
                           </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
            <button
              @click="$emit('update:is-open',false)"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
      <edit-precio
      v-if="open"
        v-model:isOpen="open"
        :activePrice="activePrice"
        :refreshInfo="this.refreshInfo"
      >
      </edit-precio>
      <add-price
        ref="price"
        v-model:isOpen="addPriceOpen"
        :refreshInfo="this.refreshInfo"
        :productsPrices="productsPrices"
        :productId="this.productId"
      >
      </add-price>
</template>

<script>
import axios from 'axios'
import editPrecio from './EditPrecio.vue'
import addPrice from './AddPrice.vue'

export default {
    components: {
        editPrecio,
        addPrice
    },
    props: {
        isOpen: {
          type: Boolean,
          required: true
        },
        productId: {
            type: String,
            required: true
        },
    },
    data() {
    const open = false
    const addPriceOpen = false

    const activePrice = {}
    const prices = null

    const productsPrices = []

    return {
      open,
      activePrice,
      prices,
      addPriceOpen,
      productsPrices
    };
  },
  created() {
   this.refreshInfo()
  },
  methods: {
    openAddPrice() {
        this.addPriceOpen = true
        this.$refs.price.refreshData()
    },
    openEditPrice(price){
        this.activePrice = price
        this.open = true
    },
    refreshInfo(){
      axios.get("http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceListProduct/"+ this.productId +"/All",{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
            'Access-Control-Max-Age': '86400',
        }
        }).then((result) => {
            console.log(result.data)
            this.prices = result.data
            for (const i of this.prices) {
              this.productsPrices.push(i.CustomerId)
            }
            console.log(this.productsPrices)
        })
    }
  }
}
</script>