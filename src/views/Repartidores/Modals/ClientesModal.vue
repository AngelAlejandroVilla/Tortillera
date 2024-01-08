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
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl w-96">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Vista de Clientes</h3>
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
            <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-center">
                    <thead class="bg-white border-b">
                      <tr>
                        <th scope="col" class="text-center text-sm font-medium text-gray-900 px-9 py-4">
                          Clientes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cliente, index) in clientes" :key="index" class="bg-white border-b transition duration-300 ease-in-out">
                        <td
                         class="text-sm text-gray-900 font-light px-9 py-4 whitespace-nowrap">
                           <button
                                @click="isOpenClientInfo = true"
                                class="px-6 py-2 text-cyan-500 hover:text-cyan-300 rounded"
                                type="button"
                            >
                            <svg class="w-6 h-6 inline text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                            </svg>
                            <span>{{ cliente.Name }}</span>
                        </button>
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
      <cliente-info-modal 
      v-model:is-open="isOpenClientInfo">
      </cliente-info-modal>
</template>

<script>
import ClienteInfoModal from './ClienteInfoModal.vue'
import axios from 'axios'

export default {
    components: {
        ClienteInfoModal,
    },
    props: {
        isOpen: {
          type: Boolean,
          required: true
        },
    },
    data() {
      const clientes = null
    return {
      clientes,
      isOpenClientInfo: false
    };
  },
  methods: {
    getClientes(id) {
       axios.get("http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/CustomersFilter/" + this.$store.state.Company  + '/' + 'Status=1 and UserId='+ id , {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
            'Access-Control-Max-Age': '86400',
        }
    }).then((result) => {
        this.clientes = result.data
        console.log(this.clientes)
    })
    }
  }
}
</script>