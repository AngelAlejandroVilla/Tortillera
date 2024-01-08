<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Administrar Salidas</h3>
        <svg
          @click="cancelarProceso()"
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
                <div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Tipo De Suministro</label
                    >
                    <select
                      v-model="tipo"
                      id="producto"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5"
                    >
                      <option value="1">Inventariable</option>
                      <option value="0">No Inventariable</option>
                    </select>
                  </div>
                </div>
                <div class="mt-3 grid grid-cols-3 gap-4">
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Suministro</label
                    >
                    <select
                      v-model="SupplieId"
                      id="producto"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option
                        v-for="(product, index) in products"
                        :key="index"
                        v-bind:value="product.SupplieId"
                      >
                        {{ product.Description }}
                      </option>
                    </select>
                  </div>
                  <div v-if="tipo == 0">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Precio</label
                    >
                    <input
                      v-model="Precio"
                      id="cantidad"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Precio"
                    />
                  </div>
                  <div v-if="tipo == 1">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Cantidad</label
                    >
                    <input
                      v-model="Cantidad"
                      id="cantidad"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Cantidad"
                    />
                  </div>
                  <div class="mt-7">
                    <button
                      @click="addOutputs()"
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
                        <th scope="col" class="px-6 py-3">Suministro</th>
                        <th scope="col" class="px-6 py-3">Cantidad</th>
                        <th scope="col" class="px-6 py-3">Precio</th>
                        <th scope="col" class="px-6 py-3">Total</th>
                        <th scope="col" class="px-6 py-3">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(items, index) in salidas"
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
        <div class="mt-5 flex flex-row gap-3 justify-center">
          <div>
            <button
              @click="NewOutputs()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Guardar
            </button>
          </div>
          <div>
            <button
              @click="cancelarProceso()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Cerrar
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
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      products: null,
      salidas: [],
      tipo: 1,
      SupplieId: 0,
      Cantidad: null,
      total: 0,
      Precio: null,
    };
  },
  created() {
    this.refreshInfo();
  },
  methods: {
    refreshInfo() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Products/" +
            this.$store.state.Company +
            "/inventariable=" +
            this.tipo,
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
    addOutputs() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Inventory/" +
            this.$store.state.Company +
            "/SupplieId=" +
            this.SupplieId,
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
          let supplie = result.data[0];

          const index = this.salidas.findIndex(
            (product) => product.SupplieId === this.SupplieId
          );

          if (this.tipo == 0) {
            if (index >= 0) {
              this.salidas[index].Price =
                parseInt(this.salidas[index].Price) + parseInt(this.Precio);
            } else {
              let data = {
                ProductName: supplie.Supplie,
                SupplieId: this.SupplieId,
                Quantity: 1,
                Price: this.Precio,
              };
              console.log(data);
              this.salidas.push(data);
            }
          } else {
            if (this.tipo == 1) {
              if (index >= 0) {
                this.salidas[index].Quantity =
                  parseInt(this.salidas[index].Quantity) +
                  parseInt(this.Cantidad);
              } else {
                let data = {
                  ProductName: supplie.Supplie,
                  SupplieId: this.SupplieId,
                  Quantity: this.Cantidad,
                  Price: supplie.AveragePrice,
                };
                console.log(data);
                this.salidas.push(data);
              }
            }
          }

          this.total = 0;

          for (const i of this.salidas) {
            this.total += i.Price * i.Quantity;
          }

          this.Cantidad = null;
          this.SupplieId = 0;
          this.Precio = null;
        });
    },
    DelateProduct(index) {
      this.salidas.splice(index, 1);
      this.total = 0;

      for (const i of this.entries) {
        this.total += i.Price * i.Quantity;
      }
    },
    NewOutputs() {
      const fechaHoy = new Date();

      const dia = fechaHoy.getDate().toString().padStart(2, "0");
      const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, "0");
      const anio = fechaHoy.getFullYear().toString();

      const date = `${dia}/${mes}/${anio}`;

      if (this.tipo == 0) {
        let params = {
          CompanyId: this.$store.state.Company,
          Date: date,
          UserId: this.$store.state.UserId,
          ProviderId: 0,
          Notes: "",
          Detail: this.salidas,
        };
        console.log(params);
        axios
          .put(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Expense",
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
            this.cancelarProceso();
          });
      } else {
        if (this.tipo == 1) {
          let params = {
            CompanyId: this.$store.state.Company,
            Date: date,
            UserId: this.$store.state.UserId,
            ProviderId: 0,
            Notes: "",
            Detail: this.salidas,
          };
          console.log(params);
          axios
            .put(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Output",
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
              this.cancelarProceso();
            });
        }
      }
    },
    cancelarProceso() {
      this.tipo = 1;
      this.SupplieId = 0;
      this.Precio = null;
      this.Cantidad = null;
      this.salidas = [];
      this.total = 0;
      this.$emit("update:is-open", false);
    },
  },
  watch: {
    tipo() {
      this.refreshInfo();
    },
  },
};
</script>
