<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ml-[18rem] mr-[1rem]">
    <div class="flex flex-row">
      <button
        @click="isOpenAddProvider = true"
        class="mb-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-52"
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
        <span>Agregar Provedor</span>
      </button>
      <div class="ml-96 text-2xl mb-12">Administrar Provedores</div>
    </div>
    <div
      v-if="providers"
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[35rem]"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Domicilio</th>
            <th scope="col" class="px-6 py-3">Ciudad</th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Numero Telefonico</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="providers.Valor != '-1'">
          <tr
            v-for="(provider, index) in providers"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ provider.Address }}</td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ provider.Ciudad }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ provider.Name }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ provider.PhoneNumber }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ provider.email }}
            </td>
            <td>
              <div class="flex justify-left">
                <div @click="EditProduct(provider.ProviderId)" class="ml-5">
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
                <div @click="deleteProduct(provider.ProviderId)" class="ml-5">
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
  <AgregarProvedor
    v-model:isOpen="isOpenAddProvider"
    :refresh="refreshInfo"
  ></AgregarProvedor>
  <EditarProvedores
    v-if="isOpenEdit"
    v-model:isOpen="isOpenEdit"
    :refresh="refreshInfo"
    :ProviderId="ProviderId"
  ></EditarProvedores>
</template>

<script>
import axios from "axios";
import AgregarProvedor from "./Modals/AgregarProvedor.vue";
import EditarProvedores from "./Modals/EditarProvedores.vue";

export default {
  components: {
    AgregarProvedor,
    EditarProvedores,
  },
  data() {
    return {
      providers: null,
      isOpenAddProvider: false,
      isOpenEdit: false,
      ProviderId: 0,
    };
  },

  created() {
    this.refreshInfo();
  },

  methods: {
    refreshInfo() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Providers/" +
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
          this.providers = result.data;
          console.log(result.data);
        });
    },
    EditProduct(id) {
      this.ProviderId = id;
      this.isOpenEdit = true;
    },
    deleteProduct(id) {
      axios
        .delete(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Provider/" +
            this.$store.state.Company +
            "/" +
            id +
            "/2",
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
  },
};
</script>
