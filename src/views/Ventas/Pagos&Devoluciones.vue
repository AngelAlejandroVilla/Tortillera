<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
    <div class="flex justify-center text-2xl mb-12">Pagos y Devoluciones</div>
    <div class="w-full mb-3 flex flex-row gap-5">
      <div>
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-cyan-400 dark:text-gray-400"
          >Repartidor</label
        >
        <select
          id="producto"
          v-model="repartidorId"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5"
        >
          <option
            v-for="(repartidor, index) in repartidores"
            :key="index"
            v-bind:value="repartidor.UserId"
          >
            {{ repartidor.Name }}
          </option>
        </select>
      </div>
      <div class="my-7">
        <button
          @click="filtrarInfo()"
          class="hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Filtrar
        </button>
      </div>
    </div>
    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-96"
    >
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3">Cliente</th>
            <th scope="col" class="px-6 py-3">Saldo</th>
            <th scope="col" class="px-6 py-3">Ingresar Pago</th>
            <th scope="col" class="px-6 py-3">Devoluciones</th>
          </tr>
        </thead>
        <tbody v-if="Payments.Valor != '-1'">
          <tr
            v-for="(balance, index) in Payments"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ balance.Name }}
            </th>
            <td class="px-6 py-4">${{ balance.Saldo }}</td>
            <td class="px-6 py-4">
              <button
                @click="makePaid(balance.CustomerId)"
                class="px-6 py-2 text-green-500 hover:border-green-200 rounded border-green-500 border"
                type="button"
              >
                Ingresar
              </button>
            </td>
            <td class="px-6 py-4">
              <button
                @click="returnProduct(balance.CustomerId)"
                class="px-6 py-2 text-yellow-500 hover:border-yellow-200 rounded border-yellow-500 border"
                type="button"
              >
                Devolver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ingresar-pago
    v-model:is-open="isOpenPago"
    :CustomerId="CustomerId"
    :refreshInfo="refreshInfo"
  >
  </ingresar-pago>
  <devolver-modal
    v-if="isOpenDevolver"
    v-model:is-open="isOpenDevolver"
    :CustumerId="CustomerId"
    :refreshInfo="refreshInfo"
  >
  </devolver-modal>
</template>
<script>
import IngresarPago from "./Modals/IngresarPago.vue";
import DevolverModal from "./Modals/DevolverModal.vue";

import axios from "axios";

export default {
  components: {
    IngresarPago,
    DevolverModal,
  },
  data() {
    const CustomerId = "";
    const repartidores = null;
    const Payments = null;
    return {
      repartidores,
      Payments,
      CustomerId,
      isOpenPago: false,
      isOpenDevolver: false,
      repartidorId: 0,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    filtrarInfo() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Balance/" +
            this.$store.state.Company +
            "/src.UserId=" +
            this.repartidorId,
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
          this.Payments = result.data;
          console.log(result.data);
        });
    },
    returnProduct(id) {
      this.CustomerId = id;
      this.isOpenDevolver = true;
    },
    makePaid(id) {
      this.CustomerId = id;
      this.isOpenPago = true;
    },
    refreshInfo() {
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
          axios
            .get(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Balance/" +
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
              this.Payments = result.data;
              console.log(result);
            });
        });
    },
  },
};
</script>
