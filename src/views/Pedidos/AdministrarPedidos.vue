<template>
  <div
    v-if="Pedidos != null"
    class="m-auto flex flex-col flex-grow p-4 lg:ml-64 ml-1 mr-1"
  >
    <div class="flex flex-row gap-4">
      <div class="mb-6">
        <select
          v-if="$store.state.ProfileId === '4'"
          @change="OrderByDeliverMan()"
          id="repartidor"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5"
        >
          <option selected>Selecciona Repartidor</option>
          <option
            v-for="(repartidor, index) in repartidores"
            :key="index"
            v-bind:value="repartidor.UserId"
          >
            {{ repartidor.Name }}
          </option>
        </select>
      </div>
      <div class="w-[40rem]">
        <button
          @click="isOpenPedido = true"
          class="mb-10 hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          type="button"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span class="text-center">Nuevo Pedido</span>
        </button>
      </div>
      <div class="mt-2">
        <span @click="refreshInfo()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-cyan-400 text-xs hover:text-cyan-600 hover:text-2xl hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </span>
      </div>
      <div class="w-full flex justify-center text-2xl mb-4">
        Administrar Pedidos
      </div>

      <div
        class="w-full flex justify-end mr-12 text-cyan-500 font-bold text-2xl"
      >
        Total: ${{ total }}
      </div>
    </div>
    <div
      v-if="Pedidos.Valor != -1"
      class="p-6 overflow-auto relative overflow-x-auto overflow-y-auto border-dashed border-2 border-cyan-500 sm:rounded-lg h-[75vh] sm:grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 grid xl:grid-cols-3 2xl:grid-cols-3"
    >
      <div
        v-for="(pedido, index) in Pedidos"
        :key="index"
        class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md h-80"
      >
        <div class="container mx-auto">
          <span
            v-if="pedido.Status === '1'"
            class="bg-green-100 text-green-800 font-semibold mr-2 px-2.5 py-0.5 rounded text-lg"
            >{{ pedido.NameStatus }}
          </span>
          <span
            v-if="pedido.Status === '2'"
            class="bg-yellow-100 text-yellow-800 font-semibold mr-2 px-2.5 py-0.5 rounded text-lg"
            >{{ pedido.NameStatus }}
          </span>
        </div>
        <div class="flex flex-row align-center w-full">
          <div><p class="font-bold text-cyan-600 mt-5">Cliente:</p></div>
          <div>
            <p class="mt-5 ml-3">{{ pedido.CustomerName }}</p>
          </div>
        </div>
        <div class="flex flex-row align-center w-full">
          <div>
            <p class="font-bold text-cyan-600 mt-3">Fecha De Entrega:</p>
          </div>
          <div>
            <p class="mt-3">{{ pedido.DateNeeded }}</p>
          </div>
        </div>
        <div class="flex flex-row align-center">
          <div><p class="font-bold text-cyan-600 mt-3">Total:</p></div>
          <div>
            <p class="mt-3 ml-3">${{ pedido.Total }}MXN</p>
          </div>
        </div>
        <div class="mt-3">
          <button
            @click="openOrderDetail(pedido.OrderId)"
            href="#"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border"
          >
            Ver Detalles
            <svg
              aria-hidden="true"
              class="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <button
            @click="openDeliverOrder(pedido.OrderId)"
            class="inline-flex items-center mt-4 py-2 px-3 text-lg font-medium bg-cyan-400 text-white hover:border-cyan-200 rounded border-cyan-500 border w-full"
          >
            <span class="flex flex-row mx-auto">Entregar</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="border-4 border-gray-400 border-dashed h-[34rem]">
      <span class="mt-[15rem] flex m-auto justify-center text-2xl text-gray-400"
        >"No Tienes Pedidos Pendientes"</span
      >
    </div>
  </div>
  <edit-order
    v-if="isOpenDetallePedido"
    v-model:isOpen="isOpenDetallePedido"
    :OrderId="OrderId"
    :refresh-info="this.refreshInfo"
  >
  </edit-order>
  <deliver-order
    v-if="isOpenDeliverOrder"
    v-model:isOpen="isOpenDeliverOrder"
    :orderId="OrderId"
    :refresh-info="this.refreshInfo"
  ></deliver-order>
  <levantar-pedido
    v-model:is-open="isOpenPedido"
    :refreshInfo="this.refreshInfo"
  >
  </levantar-pedido>
</template>
<script>
import EditOrder from "./Modals/EditOrder.vue";
import DeliverOrder from "./Modals/DeliverOrder.vue";
import LevantarPedido from "./Modals/LevantarPedido.vue";

import axios from "axios";

export default {
  components: {
    DeliverOrder,
    LevantarPedido,
    EditOrder,
  },
  data() {
    const repartidores = null;
    const Pedidos = null;
    const OrderId = null;

    return {
      repartidores,
      Pedidos,
      OrderId,
      total: 0,
      isOpenPedido: false,
      isOpenDetallePedido: false,
      isOpenDeliverOrder: false,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    getTotalProducts() {
      this.total = 0;
      for (let i = 0; i < this.Pedidos.length; i++) {
        this.total += parseInt(this.Pedidos[i].Total);
      }
    },
    adminEntry() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
            this.$store.state.Company +
            "/(Status=1 or Status=2)",
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
          this.Pedidos = result.data;
          this.getTotalProducts();
        });
    },
    refreshInfo() {
      if (this.$store.state.ProfileId === "1") {
        this.OrderByDeliverMan();
      } else {
        if (this.$store.state.ProfileId === "4") {
          this.adminEntry();
        }
      }
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
            this.$store.state.Company +
            "/" +
            "Status='1' and ProfileId='1' and CompanyId=" +
            this.$store.state.Company,
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
          this.repartidores = result.data;
        });
    },
    OrderByDeliverMan() {
      if (this.$store.state.ProfileId === "4") {
        axios
          .get(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
              this.$store.state.Company +
              "/status in (2,1) and UserId=" +
              document.getElementById("repartidor").value +
              "",
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
            this.Pedidos = result.data;
            console.log(this.Pedidos);
            this.getTotalProducts();
            // this.refreshInfo();
          });
      } else {
        if (this.$store.state.ProfileId === "1") {
          axios
            .get(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
                this.$store.state.Company +
                "/(Status=1 or Status=2) and UserId=" +
                this.$store.state.UserId +
                "",
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
              this.Pedidos = result.data;
              this.refreshInfo();
            });
        }
      }
    },
    openOrderDetail(id) {
      this.OrderId = id;
      this.isOpenDetallePedido = true;
    },
    openDeliverOrder(id) {
      this.OrderId = id;
      this.isOpenDeliverOrder = true;
    },
  },
};
</script>
