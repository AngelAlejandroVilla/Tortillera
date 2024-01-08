<template>
  <div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
    <div class="flex flex-row">
      <button
        @click="isOpenNewRepartidor = true"
        class="mb-10 hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-52"
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
        <span>Agregar Repartidor</span>
      </button>
      <div class="flex justify-center text-2xl mb-12 mx-auto">
        Administrar Repartidores
      </div>
    </div>

    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-96"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Domicilio</th>
            <th scope="col" class="px-6 py-3">Correo</th>
            <th scope="col" class="px-6 py-3">Usuario</th>
            <th scope="col" class="px-6 py-3">Contraseña</th>
            <th scope="col" class="px-6 py-3">Teléfono</th>
            <th scope="col" class="px-6 py-3">Clientes</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="repartidores.Valor != '-1'">
          <tr
            v-for="(repartidor, index) in repartidores"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ repartidor.Name }}
            </th>
            <td class="px-6 py-4">
              {{ repartidor.Address }}
            </td>
            <td class="px-6 py-4">
              {{ repartidor.email }}
            </td>
            <td class="px-6 py-4">
              {{ repartidor.Nickname }}
            </td>
            <td class="px-6 py-4">
              {{ repartidor.Password }}
            </td>
            <td class="px-6 py-4">
              {{ repartidor.Telefono }}
            </td>
            <td class="px-6 py-4 text-right">
              <div class="container mx-auto">
                <div class="flex">
                  <button
                    @click="openCustumers(repartidor.UserId)"
                    class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border-2"
                    type="button"
                  >
                    Ver Clientes
                  </button>
                </div>
              </div>
            </td>
            <td>
              <div class="flex justify-left">
                <div @click="editDeliver(repartidor.UserId)" class="ml-5">
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
                <div @click="deleteDeliver(repartidor.UserId)" class="ml-5">
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
  <clientes-modal ref="clienteModal" v-model:is-open="isOpenClient">
  </clientes-modal>
  <add-repartidor v-model:is-open="isOpenNewRepartidor" :refresh="refreshInfo">
  </add-repartidor>
  <edit-repartidor
    v-if="EditRepartidorOpen"
    ref="editRepartidorRef"
    v-model:is-open="EditRepartidorOpen"
    :refresh="refreshInfo"
    :id-user="id"
  >
  </edit-repartidor>
</template>
<script>
import ClientesModal from "./Modals/ClientesModal.vue";
import addRepartidor from "./Modals/addRepartidor.vue";
import EditRepartidor from "./Modals/EditRepartidor.vue";

import axios from "axios";

export default {
  components: {
    ClientesModal,
    addRepartidor,
    EditRepartidor,
  },
  data() {
    const repartidores = null;

    return {
      repartidores,
      isOpenClient: false,
      isOpenNewRepartidor: false,
      EditRepartidorOpen: false,
      id: null,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    editDeliver(id) {
      this.id = id;
      this.EditRepartidorOpen = true;
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
          console.log(this.repartidores);
        });
    },
    deleteDeliver(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/CustomersFilter/" +
            this.$store.state.Company +
            "/" +
            "{Status:1, UserId:" +
            id +
            "}"
        )
        .then((resultado) => {
          console.log(resultado.data);
          for (const customer of resultado.data) {
            let params = {
              Status: customer.Status,
              CustomerId: customer.CustomerId,
              CompanyId: this.$store.state.Company,
              Name: customer.Name,
              Address1: customer.Address1,
              Address2: customer.Address2,
              Phone: customer.Phone,
              Mobile: customer.Mobile,
              Active: 1,
              UserId: 0,
            };
            console.log(params);
            axios.post(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customer",
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
            );
            axios
              .delete(
                "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/User/" +
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
          }
        });
    },
    openCustumers(id) {
      this.isOpenClient = true;
      this.$refs.clienteModal.getClientes(id);
    },
  },
};
</script>
