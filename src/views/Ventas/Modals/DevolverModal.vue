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
        <div class="sm:max-w-2xl p-6 bg-white rounded-md shadow-xl w-96">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Devolución</h3>
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
          <div class="mt-4">
            <div class="flex flex-row align-center gap-3">
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Producto</label>
                <select v-if="productos != null" id="producto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option 
                  v-for="(product, index) in productos"
                  :key="index"
                  v-bind:value="product.ProductId"
                   >{{ product.Name }}</option>
                </select>
              </div>
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Cantidad</label>
                <input 
                  id="cantidad"
                    type="number" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="devolver"
                    placeholder="0" 
                    required
                >
              </div>
            </div>
            <div class="mb-3 pt-0 mt-4">
              <textarea id="nota" placeholder="'Nota' (Opcional)" class="px-3 py-4 placeholder-slate-400  relative bg-yellow-100 rounded border-gray-300 text-base border-0 shadow outline-none h-24 focus:outline-none focus:ring w-full"/>
                </div>
                <div v-if="result != null || result === '-1'" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                  <p class="font-bold">Devolucion Fallida</p>
                  <p>{{ result.Message }}</p>
                </div>
                <div class="flex px-4 py-3">
                  <div class="flex-1">
                    <button
                      @click="returnProduct()"
                      class="px-6 py-2 text-blue-800 border border-blue-600 hover:border-red-200 rounded-md w-36"
                    >
                    Devolver
                    </button>
                  </div>
                  <div class="flex-1">
                    <button
                    @click="$emit('update:is-open',false)"
                    class="px-6 py-2 text-red-800 border border-red-600 hover:border-red-200 rounded-md w-36"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
          </div>
        </div>
      </div>
</template>
 
<script>
import axios from 'axios'

export default {
    props: {
        isOpen: {
          type: Boolean,
          required: true
        },
        CustumerId: {
          type: String,
          required: true
        },
        refreshInfo: {
          type: Function,
          required: true
        }
    },
    data(){
      const productos = null
      const result = null

      return {
        productos,
        result
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      getProducts(){
        axios.get("http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" + this.$store.state.Company , {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
            'Access-Control-Max-Age': '86400',
        }
    }).then((result) => {
        this.productos = result.data
        console.log(this.productos)
    })
      },
      returnProduct(){
        const param = {
          CustomerId: this.CustumerId,
          Quantity: document.getElementById('cantidad').value,
          ProductId: document.getElementById('producto').value,
          UserId: this.$store.state.UserId,
          Notes: document.getElementById('nota').value

        }
        console.log(param)
        axios.put('http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TReturn/Return', param ).then((result) => {
          console.log(result)
          this.result = result.data
          if(this.result.Valor != '-1'){
            this.refreshInfo()
            this.$emit('update:is-open',false)
          }
        })
      }
    }
}
</script>