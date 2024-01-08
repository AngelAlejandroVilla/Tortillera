<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Vista de Detalles</h3>
        <svg
          @click="$emit('update:is-open', false)"
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
        <div
          class="overflow-auto relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-auto mb-10 mt-10"
        >
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Nombre</th>
                <th scope="col" class="px-6 py-3">Unidad</th>
                <th scope="col" class="px-6 py-3">Cantidad</th>
                <th scope="col" class="px-6 py-3">Precio</th>
                <th scope="col" class="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody v-if="detail != null">
              <tr
                v-for="(order, index) in detail.Detail"
                :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  v-if="detail != null"
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ order.ProductName }}
                </th>
                <td v-if="detail != null" class="px-6 py-4">
                  {{ order.UnitName }}
                </td>
                <td v-if="detail != null" class="px-6 py-4">
                  {{ order.Quantity }}
                </td>
                <td v-if="detail != null" class="px-6 py-4">
                  ${{ order.Price }}
                </td>
                <td v-if="detail != null" class="px-6 py-4">
                  ${{ order.Quantity * order.Price }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-8 mb-4 flex flex-row-reverse">
          <div>
            <span class="text-xl ml-3 text-cyan-400" v-if="detail != null"
              >${{ detail.Total }}</span
            >
          </div>
          <div>
            <span class="text-xl font-bold">Total:</span>
          </div>
        </div>
        <button
          @click="$emit('update:is-open', false)"
          class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Listo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    OrderId: {
      type: String,
      required: true,
    },
  },
  data() {
    const detail = null;

    return {
      detail,
    };
  },
  methods: {
    refreshInfo(id) {
      console.log(id);
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/" +
            this.$store.state.Company +
            "/" +
            id,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
              "Access-Control-Max-Age": "86400",
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.detail = result.data;
        });
    },
  },
  created() {
    this.refreshInfo(this.OrderId);
  },
};
</script>
