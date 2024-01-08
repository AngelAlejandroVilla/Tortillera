<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Agregar Entrada</h3>
        <svg
          @click="CancelarPedido()"
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
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Provedor</label
                    >
                    <ModelSelect
                      :options="options"
                      v-model="ProviderId"
                    ></ModelSelect>
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Fecha</label
                    >
                    <Datepicker
                      required
                      v-model="date"
                      modelType="dd/MM/yyyy hh:mm:ss"
                      locale="MX"
                      cancelText="Cancelar"
                      selectText="Selecciónar"
                    ></Datepicker>
                  </div>
                </div>

                <div class="flex justify-center">
                  <span class="text-xl font-bold mt-10"> Entradas </span>
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Suministro</label
                    >
                    <select
                      v-model="supplieId"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option
                        v-for="(supplie, index) in supplies"
                        :key="index"
                        :value="supplie.SupplieId"
                      >
                        {{ supplie.Description }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Cantidad</label
                    >
                    <input
                      v-model="cantidad"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Cantidad"
                    />
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Precio Unitario</label
                    >
                    <input
                      v-model="price"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Precio"
                    />
                  </div>
                  <div class="mt-7">
                    <button
                      @click="addSupplie()"
                      class="h-10 w-full text-blue-800 border border-blue-600 rounded"
                    >
                      <div class="flex flex-row mx-auto justify-center">
                        <span>Agregar</span>
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
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <table class="mt-10 w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3">Sumnistro</th>
                        <th scope="col" class="px-6 py-3">Cantidad</th>
                        <th scope="col" class="px-6 py-3">Precio</th>
                        <th scope="col" class="px-6 py-3">Total</th>
                        <th scope="col" class="px-6 py-3">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(items, index) in entries"
                        :key="index"
                        class="bg-white border-b"
                      >
                        <td
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {{ items.ProductName }}
                        </td>
                        <td class="px-6 py-4">
                          {{ items.Quantity }}
                        </td>
                        <td class="px-6 py-4">${{ items.Price }}</td>
                        <td class="px-6 py-4">
                          ${{ items.Quantity * items.Price }}
                        </td>
                        <td>
                          <div
                            @click="DelateProduct(index)"
                            class="flex flex-row"
                          >
                            <div
                              class="text-center mx-auto cursor-pointer hover:text-cyan-500"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="mt-8 flex flex-row-reverse">
                    <div>
                      <span class="text-xl ml-3 text-cyan-400"
                        >${{ total }}</span
                      >
                    </div>
                    <div>
                      <span class="text-xl font-bold">Total:</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-3 justify-center">
          <div>
            <button
              @click="NewEntry()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Guardar
            </button>
          </div>
          <div>
            <button
              @click="CancelarPedido()"
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
import { ModelSelect } from "vue-search-select";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import axios from "axios";
import { ref } from "vue";

export default {
  components: { ModelSelect, Datepicker },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    refreshInfo: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
  data() {
    const providers = null;
    const entries = [];

    const total = 0;

    return {
      providers,
      entries,
      OrderId: 0,
      supplieId: 0,
      isOpenDeliver: false,
      ProviderId: {
        value: "",
        text: "",
      },
      total,
      options: [],
      cantidad: null,
      price: null,
    };
  },
  created() {
    axios
      .get(
        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Providers/" +
          this.$store.state.Company,
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
        this.providers = result.data;
        console.log(this.providers);

        for (let i = 0; i < this.providers.length; i++) {
          var valor = {
            value: this.providers[i].ProviderId,
            text: this.providers[i].Name,
          };
          this.options.push(valor);
        }

        axios
          .get(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Products/" +
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
            console.log(result.data);
            this.supplies = result.data;
          });
      });
  },
  methods: {
    addSupplie() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Products/" +
            this.$store.state.Company +
            "/SupplieId=" +
            this.supplieId,
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
          var nombre = result.data[0].Description;
          const index = this.entries.findIndex(
            (product) => product.SupplieId === this.supplieId
          );

          if (index >= 0) {
            this.entries[index].Quantity =
              parseInt(this.entries[index].Quantity) + parseInt(this.cantidad);
          } else {
            let data = {
              ProductName: nombre,
              SupplieId: this.supplieId,
              Quantity: this.cantidad,
              Price: this.price,
            };
            this.productName = "";
            console.log(data);
            this.entries.push(data);
          }

          this.total = 0;

          for (const i of this.entries) {
            this.total += i.Price * i.Quantity;
          }
          this.cantidad = null;
          this.price = null;
        });
    },
    DelateProduct(index) {
      this.entries.splice(index, 1);
      this.total = 0;

      for (const i of this.entries) {
        this.total += i.Price * i.Quantity;
      }
    },
    NewEntry() {
      let params = {
        CompanyId: this.$store.state.Company,
        Date: this.date,
        UserId: this.$store.state.UserId,
        ProviderId: this.ProviderId.value,
        Notes: "",
        Detail: this.entries,
      };
      console.log(params);
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Entry",
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
          console.log(result.data);
          this.refreshInfo();
          this.CancelarPedido();
        });
    },
    CancelarPedido() {
      this.ProviderId.value = "";
      this.ProviderId.text = "";
      this.supplieId = null;
      this.cantidad = null;
      this.price = null;
      this.entries = [];
      this.total = 0;
      this.$emit("update:is-open", false);
    },
  },
};
</script>
