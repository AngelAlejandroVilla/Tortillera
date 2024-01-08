<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="ml-[18rem] mr-[1rem]">
    <div>
      <div class="flex w-full justify-center text-2xl">
        Administrar Inventario
      </div>
    </div>
    <div class="flex flex-row">
      <div>
        <button
          @click="isOpenAddSumary = true"
          class="mb-10 bg-gray-300 shadow-lg hover:bg-gray-400 hover:shadow-xl text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-52"
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
          <span>Agregar Suministro</span>
        </button>
      </div>
      <div class="ml-4">
        <button
          @click="isOpenAddEntry = true"
          class="mb-10 bg-cyan-400 shadow-lg hover:bg-cyan-500 hover:shadow-xl text-white font-bold py-2 px-4 rounded inline-flex items-center w-52"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <span>Agregar Entrada</span>
        </button>
      </div>
    </div>
    <div
      v-if="products"
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[35rem]"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Code</th>
            <th scope="col" class="px-6 py-3">Suministro</th>
            <th scope="col" class="px-6 py-3">Precio Promedio</th>
            <th scope="col" class="px-6 py-3">Ultimo Precio</th>
            <th scope="col" class="px-6 py-3">Cantidad</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="products.Valor != '-1'">
          <tr
            v-for="(producto, index) in products"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ producto.code }}</td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ producto.Supplie }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              ${{ producto.AveragePrice }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              ${{ producto.LastPrice }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ producto.Quantity }}
            </td>
            <td>
              <div class="flex justify-left">
                <div @click="EditProduct(producto.SupplieId)" class="ml-5">
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
                <div @click="deleteProduct(producto.SupplieId)" class="ml-5">
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
  <AgregarSuministroVue
    v-model:isOpen="isOpenAddSumary"
    :refresh="refreshInfo"
  ></AgregarSuministroVue>
  <EditSuministros
    v-if="isOpenEdit"
    v-model:isOpen="isOpenEdit"
    :refresh="refreshInfo"
    :IdSupplie="SupplieId"
  ></EditSuministros>
  <addEntry
    v-if="isOpenAddEntry"
    v-model:isOpen="isOpenAddEntry"
    :refresh-info="refreshInfo"
  ></addEntry>
</template>

<script>
import axios from "axios";
import AgregarSuministroVue from "./Modals/AgregarSuministro.vue";
import EditSuministros from "./Modals/EditSuministro.vue";
import addEntry from "./Modals/addEntry.vue";
export default {
  components: {
    AgregarSuministroVue,
    EditSuministros,
    addEntry,
  },
  data() {
    return {
      products: null,
      isOpenAddSumary: false,
      isOpenEdit: false,
      isOpenAddEntry: false,
      SupplieId: 0,
    };
  },

  created() {
    this.refreshInfo();
  },

  methods: {
    refreshInfo() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Inventory/" +
            this.$store.state.Company +
            "/inventariable=1",
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
          this.products = result.data;
          console.log(result.data);
        });
    },
    EditProduct(id) {
      this.SupplieId = id;
      this.isOpenEdit = true;
    },
    deleteProduct(id) {
      axios
        .delete(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Product/" +
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
