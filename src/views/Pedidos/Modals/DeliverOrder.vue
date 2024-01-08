<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="sm:max-w-2xl w-80 sm:w-96 md:w-[480px] lg:w-[600px] xl:w-[900px] 2xl:w-[1200px] p-6 bg-white rounded-md shadow-xl"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Entregar Pedido</h3>
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
      <div v-if="isLoading" class="h-[12rem]">
        <div
          class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2"
        >
          <div
            class="border-t-transparent border-solid animate-spin rounded-full border-cyan-400 border-8 h-24 w-24"
          ></div>
        </div>
      </div>
      <div v-if="!isLoading" class="mt-4">
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
                <th scope="col" class="px-6 py-3">Entregado</th>
              </tr>
            </thead>
            <tbody v-if="Order != null">
              <tr
                v-for="(order, index) in Order.Detail"
                :key="index"
                class="bg-white border-b"
              >
                <td class="px-6 py-4">
                  {{ order.ProductName }}
                </td>
                <td class="px-6 py-4">
                  {{ order.UnitName }}
                </td>
                <td class="px-6 py-4">
                  {{ order.Quantity }}
                </td>
                <td class="px-6 py-4">${{ order.Price }}</td>
                <td v-if="Order != null" class="px-6 py-4">
                  <div class="flex flex-row">
                    <input
                      @click="toggleSelect(order)"
                      class="mx-auto form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                      :checked="selected.includes(Order.DetailId)"
                      type="checkbox"
                      id="Entregado"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-row mb-5 mx-6">
          <div class="">
            <label for="pago" class="block mb-2 text-md text-cyan-500 font-bold"
              >Ingresar Pago</label
            >
            <input
              type="number"
              id="pago"
              v-model="Payment"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5"
            />
          </div>
          <div class="grow h-21"></div>
          <div class="mt-8 mb-4 text-center">
            <div class="flex flex-row-reverse">
              <div>
                <span v-if="Order != null" class="text-xl ml-3 text-cyan-400"
                  >${{ Order.Total }}</span
                >
              </div>
              <div>
                <span class="text-xl font-bold">Total:</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-4 justify-center">
          <div>
            <button
              @click="DeliverOrder()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Guardar
            </button>
          </div>
          <div>
            <button
              @click="$emit('update:is-open', false)"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
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
import axios from "axios";

export default {
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    refreshInfo: {
      type: Function,
      required: true,
    },
  },
  data() {
    const Order = null;
    const isLoading = false;

    return {
      Order,
      isLoading,
      Payment: 0,
      selected: [],
      entrega: [],
    };
  },
  created() {
    axios
      .get(
        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/" +
          this.$store.state.Company +
          "/" +
          this.orderId +
          "/ Status=1",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
            "Access-Control-Max-Age": "86400",
          },
        }
      )
      .then((result) => {
        this.Order = result.data;
        console.log(result.data);
      });
  },
  methods: {
    toggleSelect(order) {
      if (this.selected.includes(order.OrderDetailId)) {
        //Deseleccionado
        this.selected.splice(
          this.selected.findIndex((v) => v === order.OrderDetailId),
          1
        );
        this.entrega.splice(
          this.entrega.findIndex((v) => v === order.OrderDetailId),
          1
        );
      } else {
        //Seleccionado
        this.selected.push(order.OrderDetailId);
        let param = {
          OrderDetailId: order.OrderDetailId,
          Quantity: order.Quantity,
          Price: order.Price,
          Status: 3,
        };
        this.entrega.push(param);
        console.log(this.entrega);
      }
    },
    DeliverOrder() {
      this.isLoading = true;
      if (this.entrega != []) {
        let params = {
          CompanyId: this.$store.state.Company,
          UserId: this.$store.state.UserId,
          UserDelivered: this.Order.UserId,
          Detail: this.entrega,
        };
        axios
          .put(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Delivery/",
            params,
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
            let params = {
              amount: this.Payment,
              CustomerId: this.Order.CustomerId,
              UserId: this.Order.UserId,
            };
            console.log(params);
            axios
              .put(
                "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TPayment/Payment",
                params,
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
              });
          })
          .finally(() => {
            this.isLoading = false;
            this.$notify({
              title: "Entrega Completa",
              text: "Se realizo la entrega exitosamente",
              type: "success",
            });
            this.$emit("update:is-open", false);
            this.refreshInfo();
          });
      }
    },
  },
};
</script>
