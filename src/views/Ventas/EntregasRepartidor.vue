<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-auto flex flex-row gap-12 p-4 ml-[18rem] mr-[1rem]">
    <div class="w-full h-auto">
      <div class="flex flex-row gap-3 relative">
        <div>
          <label
            for="cliente"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Repartidor</label
          >
          <select
            @change="refreshInfo()"
            id="custumner"
            v-if="Repartidores != null"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] p-2.5"
          >
            <option selected value="todos">Ninguno</option>
            <option
              v-for="(repartidor, index) in Repartidores"
              :key="index"
              v-bind:value="repartidor.UserId"
            >
              {{ repartidor.Name }}
            </option>
          </select>
        </div>
        <div>
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Rango De fecha</label
          >
          <Datepicker
            @update:model-value="filterDate()"
            @cleared="clearDate()"
            required
            v-model="date"
            modelType="dd-MM-yyyy"
            locale="MX"
            cancelText="Cancelar"
            selectText="Selecciónar"
            range
          ></Datepicker>
        </div>
      </div>
      <div class="flex flex-row gap-3 relative">
        <div class="w-full h-auto mt-4">
          <div v-if="Totales === null">
            <div
              class="flex bg-gray-200 items-center justify-center h-[12rem] rounded-md text-gray-400"
            >
              <div class="flex-col text-center">
                <div>
                  <span class="text-2xl">Entrega de producto</span>
                </div>
                <div>
                  <span class="text-md">(Selecciona un repartidor)</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="Totales != null">
            <table
              v-if="Totales.Valor != -1"
              class="h-auto w-full text-sm text-left rounded-lg text-gray-500"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3">Producto</th>
                  <th scope="col" class="px-6 py-3">Unidad</th>
                  <th scope="col" class="px-6 py-3">Cantidad</th>
                  <th scope="col" class="px-6 py-3">Cantidad Entregada</th>
                  <th scope="col" class="px-6 py-3">Cliente</th>
                  <th scope="col" class="px-6 py-3">Fecha Entrega</th>
                  <th scope="col" class="px-6 py-3">Confirmar</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(total, index) in Totales"
                  :key="index"
                  class="bg-white border-b"
                >
                  <td class="px-6 py-4">{{ total.ProductName }}</td>
                  <td class="px-6 py-4">{{ total.UnitType }}</td>
                  <td class="px-6 py-4 text-cyan-500 font-bold text-lg">
                    {{ total.Quantity }}
                  </td>
                  <td class="px-6 py-4">
                    <div>
                      <input
                        id="cantidad"
                        type="number"
                        min="1"
                        :max="total.Quantity"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-auto text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 focus:outline-none focus:ring-0 peer"
                        :value="total.Quantity"
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ total.CustomerName }}</td>
                  <td class="px-6 py-4">{{ total.DateNeeded }}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-left ml-12">
                      <input
                        @change="
                          Confirmar(
                            total.Productid,
                            total.Quantity,
                            total.Orderid
                          )
                        "
                        id="confirmar"
                        type="checkbox"
                        v-model="check"
                        class="w-5 h-5 text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <div
                class="flex bg-gray-200 w-[54rem] items-center justify-center h-[12rem] rounded-md text-gray-400"
              >
                <span>No ahi productos por entregar</span>
              </div>
            </div>
          </div>
          <div class="mt-2 flex mx-auto justify-center">
            <div>
              <button
                @click="entregar()"
                class="flex px-6 py-2 text-blue-800 border hover:bg-blue-800 hover:text-white border-blue-600 rounded"
              >
                Entregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import axios from "axios";
import { ref } from "vue";

export default {
  components: {
    Datepicker,
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
    const OrderId = 0;
    const fecha = false;
    const filtro = "";

    const Repartidores = null;
    const Totales = null;

    const status = "";
    const detail = [];

    return {
      total: 0,
      filtro,
      detail,
      OrderId,
      Repartidores,
      Totales,
      fecha,
      status,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    refreshInfo() {
      console.log(document.getElementById("custumner"));
      if (document.getElementById("custumner") != null) {
        if (document.getElementById("custumner").value != "todos") {
          console.log("hola");
          axios
            .get(
              //UserFilter
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/OrderbyProduct/" +
                this.$store.state.Company +
                "/1/" +
                document.getElementById("custumner").value,
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
              this.Totales = result.data;
            });
        }
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

    Confirmar(id, cant, orderId) {
      this.OrderId = orderId;
      if (this.check) {
        let param = {
          ProductId: id,
          Status: 1,
          Quantity: cant,
        };
        this.detail.push(param);
      } else {
        let index = this.detail.findIndex(
          (product) => product.ProductId === id
        );
        this.detail.splice(index, 1);
      }
      console.log(this.detail);
    },
    entregar() {
      console.log(this.OrderId);
      let params = {
        CompanyId: this.$store.state.Company,
        UserId: document.getElementById("custumner").value,
        UserDelivered: this.$store.state.UserId,
        Detail: this.detail,
        OrderId: this.OrderId,
      };
      console.log(params);
      axios
        .put(
          // Put ProductDeliver
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/ProductDeliver/",
          params,
          {
            headers: {
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
              "Access-Control-Max-Age": "86400",
            },
          }
        )
        .then((result) => {
          console.log(result.data);
        });
    },
  },
};
</script>
