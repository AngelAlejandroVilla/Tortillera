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
        <div class="sm:max-w-2xl w-80 sm:w-96 md:w-[480px] lg:w-[600px] xl:w-[900px] 2xl:w-[1200px] p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Vista de Detalles</h3>
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
          <div class="pb-5">
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-5">Cliente:</p></div>
                            <div><p v-if="Order != null" class="mt-5 ml-3">{{ Order.CustomerName }}</p></div>
                        </div>
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-3">Fecha De Entrega:</p></div>
                            <div><p v-if="Order != null" class="mt-3 ml-3">{{ Order.DateNeeded }}</p></div>
                        </div>
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-3">Total:</p></div>
                            <div><p v-if="Order != null" class="mt-3 ml-3">${{ Order.Total }} MXN</p></div>
                        </div>
      </div>
          <div class="overflow-auto relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-auto mb-10 mt-10">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Unidad
                </th>
                <th scope="col" class="px-6 py-3">
                    Cantidad
                </th>
                <th scope="col" class="px-6 py-3">
                    Precio
                </th>
            </tr>
        </thead>
        <tbody v-if="Order != null">
            <tr 
              v-for="(order, index) in Order.Detail" 
              :key="index"
              class="bg-white border-b">
                <td class="px-6 py-4">
                    {{ order.ProductName }}
                </td>
                <td class="px-6 py-4">
                    {{ order.UnitName }}
                </td>
                <td class="px-6 py-4">
                    {{ order.Quantity }}
                </td>
                <td class="px-6 py-4">
                    ${{ order.Price }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
                    <div class="mt-8 mb-4 flex flex-row-reverse">
                        <div>
                            <span v-if="Order != null" class="text-xl ml-3 text-cyan-400">${{ Order.Total }}</span>
                        </div>
                        <div>
                            <span class="text-xl font-bold">Total:</span>
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
</template>
 
<script>
import axios from 'axios'

export default {
    components: {
    },
    props: {
        isOpen: {
          type: Boolean,
          required: true
        },
        OrderId: {
          type: String,
          required: true,
        }
    },
    data() {
      const Order = null

      return {
        Order
      };
  },
  created(){
    axios.get("http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/"+ this.$store.state.Company + '/' + this.OrderId +'/ Status=1', {
            headers: {  
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
            'Access-Control-Max-Age': '86400',
        }
        }).then((result) => {
            this.Order = result.data
            console.log(result.data)
        })
  }
}
</script>