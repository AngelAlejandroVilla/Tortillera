<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="w-auto p-6 bg-white rounded-md shadow-xl">
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
          v-if="Orders != null"
          class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[28rem]"
        >
          <div v-if="Orders.valor === -1">
            <h1 class="text-2xl text-gray-400 text-center">
              No Existen Registros.
            </h1>
          </div>
          <table
            v-if="Orders.Valor != -1"
            class="w-full text-sm text-left text-gray-500"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">Detalle de la orden</th>
                <th scope="col" class="px-6 py-3">Fecha de entrega</th>
                <th scope="col" class="px-6 py-3">Total</th>
                <th scope="col" class="px-6 py-3">Cliente</th>
                <th scope="col" class="px-6 py-3">Estatus</th>
              </tr>
            </thead>
            <tbody v-if="Orders != null || Orders.Valor != '-1'">
              <tr
                v-for="(order, index) in Orders"
                :key="index"
                class="bg-white border-b"
              >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                  <button
                    @click="openDetalle(order.OrderId)"
                    class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border"
                    type="button"
                  >
                    Ver Detalles
                  </button>
                </th>
                <td class="px-6 py-4">
                  {{ order.DateNeeded }}
                </td>
                <td class="px-6 py-4">${{ order.Total }}</td>
                <td class="px-6 py-4">
                  <button
                    @click="isOpenClientInfo = true"
                    class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border"
                    type="button"
                  >
                    <svg
                      class="w-6 h-6 inline text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>{{ order.CustomerName }}</span>
                  </button>
                </td>
                <td class="px-6 py-4 flex justify-center">
                  <div class="container mx-auto">
                    <span
                      v-if="order.Status === '1'"
                      class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                    <span
                      v-if="order.Status === '2'"
                      class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                    <span
                      v-if="order.Status === '3'"
                      class="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                    <span
                      v-if="order.Status === '4'"
                      class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                    <span
                      v-if="order.Status === '5'"
                      class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                    <span
                      v-if="order.Status === '6'"
                      class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      >{{ order.NameStatus }}</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="w-full flex justify-end mr-12 text-cyan-500 font-bold mt-3 text-2xl"
        >
          <span>Total: ${{ formatPrice(total) }}</span>
        </div>

        <button
          @click="$emit('update:is-open', false)"
          class="mt-5 flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Listo
        </button>
      </div>
    </div>
  </div>
  <DetallePedidos
    v-if="isOpenDetalle"
    v-model:isOpen="isOpenDetalle"
    :OrderId="orderId"
    ref="detalles"
  ></DetallePedidos>
</template>

<script>
import DetallePedidos from "./DetallePedidos.vue";
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    Orders: {
      type: Object,
      required: true,
    },
  },
  components: {
    DetallePedidos,
  },
  data() {
    return {
      isOpenDetalle: false,
      orderId: 0,
      total: 0,
    };
  },
  created() {
    for (let i = 0; i < this.Orders.length; i++) {
      this.total += parseInt(this.Orders[i].Total);
    }
  },
  methods: {
    openDetalle(id) {
      this.orderId = id;
      this.isOpenDetalle = true;
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(",", ",");

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
