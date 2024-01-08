<template>
  <div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
    <div class="flex flex-row">
      <button
        @click="addClienteOpen = true"
        class="mb-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-48"
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
        <span>Agregar Cliente</span>
      </button>

      <div class="ml-96 text-2xl mb-12">Administrar Clientes</div>
    </div>

    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[35rem]"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Code</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Direccion</th>
            <th scope="col" class="px-6 py-3">Telefono</th>
            <th scope="col" class="px-6 py-3">Repartidor</th>
            <th scope="col" class="px-6 py-3">Precios</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="clientes.Valor != '-1'">
          <tr
            v-for="(cliente, index) in clientes"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ cliente.Code }}</td>
            <td class="px-6 py-4">
              <p>{{ cliente.Name }}</p>
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              <p>{{ cliente.Address1 }} {{ cliente.Address2 }}</p>
            </th>
            <td class="px-6 py-4">
              {{ cliente.Phone }}
            </td>
            <td class="px-6 py-4 text-right">
              <div v-if="cliente.UserId != 0" class="flex">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <p
                  @click="deliverInfo(cliente.UserId)"
                  class="text-cyan-400 hover:underline cursor-pointer"
                >
                  {{ $store.getters.getDeliver(cliente.UserId).Name }}
                </p>
              </div>
              <div class="flex" v-else>
                <button
                  @click="isOpenClient = true"
                  class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border-2"
                  type="button"
                >
                  Asignar
                </button>
              </div>
            </td>
            <td>
              <div>
                <button
                  @click="openPrizes(cliente.CustomerId)"
                  class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border-2"
                  type="button"
                >
                  Ver Precios
                </button>
              </div>
            </td>
            <td>
              <div class="flex justify-left">
                <div @click="editCustomer(cliente.CustomerId)" class="ml-5">
                  <svg
                    class="w-6 h-6 hover:text-cyan-400 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>
                <div @click="deleteCustomer(cliente.CustomerId)" class="ml-5">
                  <svg
                    class="w-6 h-6 hover:text-cyan-400 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <info-repartidor v-if="isOpen" v-model:is-open="isOpen" :deliver="deliverId">
    >
  </info-repartidor>
  <admin-cliente
    ref="editCliente"
    v-model:is-open="adminCliente"
    :refresh="refreshInfo"
  >
  </admin-cliente>
  <add-cliente v-model:is-open="addClienteOpen" :refresh="refreshInfo">
  </add-cliente>
  <precios-cliente
    v-if="preciosClienteOpen"
    v-model:isOpen="preciosClienteOpen"
    :custumerId="custumerId"
  >
  </precios-cliente>
</template>
<script>
import AddCliente from "./Modals/Add/AddCliente.vue";
import InfoRepartidor from "./Modals/InfoRepartidor.vue";
import AdminCliente from "./Modals/EditCliente.vue";
import preciosCliente from "./Modals/PreciosCliente.vue";

import axios from "axios";

export default {
  components: {
    InfoRepartidor,
    AdminCliente,
    AddCliente,
    preciosCliente,
  },
  data() {
    const clientes = null;
    const deliverId = null;

    return {
      deliverId,
      clientes,
      isOpen: false,
      adminCliente: false,
      addClienteOpen: false,
      preciosClienteOpen: false,
      custumerId: 0,
    };
  },
  created() {
    this.refreshInfo();
    this.$store.dispatch("getDelivers");
  },
  methods: {
    refreshInfo() {
      axios
        .get(
          " http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customers/" +
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
          this.clientes = result.data;
          console.log(result.data);
        });
    },
    editCustomer(id) {
      this.$refs.editCliente.getCustomer(id);
      this.adminCliente = true;
    },
    deliverInfo(id) {
      this.deliverId = id;
      this.isOpen = true;
    },
    deleteCustomer(id) {
      axios
        .delete(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customer/" +
            this.$store.state.Company +
            "/" +
            id +
            "/" +
            2,
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
    openPrizes(id) {
      this.custumerId = id;
      this.preciosClienteOpen = true;
    },
  },
};
</script>
