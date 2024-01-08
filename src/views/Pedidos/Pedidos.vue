<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-auto flex flex-row gap-12 p-4 ml-[18rem] mr-[1rem]">
    <div class="w-full h-auto">
      <div class="flex flex-row gap-3 relative">
        <div class="mt-6 w-full">
          <button
            @click="isOpenPedido = true"
            class="hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
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
        <div class="w-full">
          <label
            for="status"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Status</label
          >
          <select
            id="status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected value="todos">Todos</option>
            <option value="1">Pedido</option>
            <option value="2">Surtido Parcialmente</option>
            <option value="3">Surtido</option>
            <option value="4">Pagado Parcialmente</option>
            <option value="5">Pagado</option>
            <option value="6">Cancelado</option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="cliente"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Repartidor</label
          >
          <select
            id="custumner"
            v-if="Repartidores != null"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="todos">Ninguno</option>
            <option
              v-for="(repartidor, index) in Repartidores"
              :key="index"
              v-bind:value="repartidor.UserId"
            >
              {{ repartidor.Name }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Rango De fecha</label
          >
          <Datepicker
            required
            v-model="date"
            modelType="dd-MM-yyyy"
            locale="MX"
            cancelText="Cancelar"
            selectText="Selecciónar"
            range
            class="w-full"
          ></Datepicker>
        </div>
        <div class="mt-6 w-full">
          <button
            @click="filtrarDatos()"
            class="mb-3 hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Filtrar
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </span>
          </button>
        </div>
        <div
          class="mt-6 w-full flex justify-end font-bold text-cyan-500 text-2xl mr-12"
        >
          Total: ${{ formatPrice(total) }}
        </div>
      </div>
      <div v-if="Orders === null">
        <div
          class="flex bg-gray-200 w-full items-center justify-center h-[12rem] rounded-md text-gray-400"
        >
          <div class="flex-col text-center">
            <div>
              <span class="text-2xl">Administracion de Pedidos</span>
            </div>
            <div>
              <span class="text-md"
                >(Filtra La Informacion Para Mostrar Los Pedidos)</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Orders != null"
        class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[36rem]"
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
              <th scope="col" class="px-6 py-3">Cancelar</th>
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
                  @click="openDetails(order.OrderId)"
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
              <td>
                <div
                  @click="cancelOrder(order.OrderId)"
                  class="flex flex-row cursor-pointer hover:text-cyan-500"
                >
                  <svg
                    class="mx-auto w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <cliente-info-modal v-model:is-open="isOpenClientInfo"> </cliente-info-modal>
  <EditOrder
    v-if="isOpenDetalle"
    v-model:is-open="isOpenDetalle"
    :OrderId="OrderId"
    :refresh-info="this.refreshInfo"
  >
  </EditOrder>
  <levantar-pedido
    v-model:is-open="isOpenPedido"
    :refreshInfo="this.refreshInfo"
  >
  </levantar-pedido>
</template>
<script>
import ClienteInfoModal from "./Modals/ClienteInfoModal.vue";
import EditOrder from "./Modals/EditOrder.vue";
import LevantarPedido from "./Modals/LevantarPedido.vue";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import axios from "axios";
import { ref } from "vue";

export default {
  components: {
    ClienteInfoModal,
    LevantarPedido,
    Datepicker,
    EditOrder,
  },
  setup() {
    const date = ref(new Date());
    const check = false;

    return {
      date,
      check,
    };
  },
  data() {
    const OrderId = null;
    const fecha = false;

    const Orders = null;
    const Repartidores = null;
    const Totales = null;

    const status = "";
    const detail = [];

    return {
      detail,
      Orders,
      OrderId,
      Repartidores,
      Totales,
      fecha,
      status,
      total: 0,

      pedidos: false,
      isOpenClientInfo: false,
      isOpenDetalle: false,
      isOpenPedido: false,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(",", ",");

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getTotalProducts() {
      for (let i = 0; i < this.Orders.length; i++) {
        this.total += parseInt(this.Orders[i].Total);
      }
    },
    openDetails(id) {
      this.OrderId = id;
      this.isOpenDetalle = true;
    },

    refreshInfo() {
      //Para Administradores y Cajeros
      if (
        this.$store.state.ProfileId === "4" ||
        this.$store.state.ProfileId === "2"
      ) {
        if (this.$store.state.filterOrders === "") {
          this.pedidos = false;
          axios //ORDERS
            .get(
              //Orders
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
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
              this.Orders = result.data;
              this.getTotalProducts();
            });
        } else {
          this.pedidos = true;
          axios //ORDERS
            .get(
              //Orders
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
                this.$store.state.Company +
                "/" +
                this.$store.state.filterOrders,
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
              this.Orders = result.data;
              this.getTotalProducts();
            });
        }
        axios
          .get(
            //UserFilter
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
            this.Repartidores = result.data;
          });

        //PARA REPARTIODORES
      } else {
        if (this.$store.state.ProfileId === "1") {
          if (this.$store.state.filterOrders === "") {
            axios
              .get(
                //Orders
                "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
                  this.$store.state.Company +
                  "/UserId=" +
                  this.$store.state.UserId,
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
                this.Orders = result.data;
                this.getTotalProducts();
              });
          } else {
            axios
              .get(
                //Orders
                "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
                  this.$store.state.Company +
                  "/UserId =" +
                  this.$store.state.UserId +
                  " and " +
                  this.$store.state.filterOrders,
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
                this.Orders = result.data;
                this.getTotalProducts();
              });
          }
        }
      }
    },

    cancelOrder(id) {
      console.log(id);
      axios
        .delete(
          //Orders
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/" +
            this.$store.state.Company +
            "/" +
            id +
            "/" +
            0,
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
          this.refreshInfo();
        });
    },

    clearDate() {
      this.fecha = false;
      this.filtrarDatos();
    },
    filterDate() {
      console.log(this.date);
      this.fecha = true;
      this.filtrarDatos();
    },

    filtrarDatos() {
      console.log(document.getElementById("status"));
      if (document.getElementById("status") != null) {
        if (document.getElementById("status").selectedIndex > 0) {
          //seleccionado status
          this.$store.state.filterOrders =
            "Status=" + document.getElementById("status").value;
        } else {
          if (this.$store.state.filterOrders != "") {
            //no esta seleccionado pero tiene un filtro
            if (document.getElementById("custumner").selectedIndex > 0) {
              this.$store.state.filterOrders =
                "UserId=" + document.getElementById("custumner").value;
              this.Totales = null;
            } else {
              this.$store.state.filterOrders = ""; //no esta seleccionado y no tiene filtro
              this.Totales = null;
            }
          }
        }
      }
      if (document.getElementById("custumner").selectedIndex > 0) {
        //esta seleccionado repartidor
        if (this.$store.state.filterOrders != "") {
          this.$store.state.filterOrders +=
            " and UserId=" + document.getElementById("custumner").value;
        } else {
          this.$store.state.filterOrders =
            "UserId=" + document.getElementById("custumner").value;
        }
      } else {
        //esta seleccionado pero tiene otro filtro
        if (this.$store.state.filterOrders != "") {
          if (document.getElementById("status").selectedIndex > 0) {
            this.$store.state.filterOrders =
              "Status=" + document.getElementById("status").value;
          } else {
            this.$store.state.filterOrders = ""; //no esta seleccionado y no tiene filtro
          }
        }
      }
      if (this.date[0]) {
        if (this.$store.state.filterOrders != "") {
          this.$store.state.filterOrders +=
            " and DateCreated " +
            "between " +
            this.date[0] +
            " AND " +
            this.date[1];
        } else {
          this.$store.state.filterOrders =
            "DateCreated " + "between " + this.date[0] + " AND " + this.date[1];
        }
      }

      console.log(this.$store.state.filterOrders);
      this.refreshInfo();
    },
  },
};
</script>
