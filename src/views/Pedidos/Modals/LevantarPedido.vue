<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Nuevo Pedido</h3>
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
      <div v-if="isLoading" class="h-[18rem]">
        <div
          class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2"
        >
          <div
            class="border-t-transparent border-solid animate-spin rounded-full border-cyan-400 border-8 h-24 w-24"
          ></div>
        </div>
      </div>
      <div v-if="!isLoading" class="mt-4">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <div class="grid grid-cols-2 gap-4">
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
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Cliente</label
                    >
                    <ModelSelect
                      :options="options"
                      v-model="custumerId"
                      :isDisabled="customerDisabled == 1"
                    ></ModelSelect>
                  </div>
                </div>

                <div class="flex justify-center">
                  <span class="text-xl font-bold mt-10"> Pedido </span>
                </div>

                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Producto</label
                    >
                    <select
                      id="producto"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option
                        v-for="(product, index) in products"
                        :key="index"
                        v-bind:value="product.ProductId"
                      >
                        {{ product.name }}
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
                      id="cantidad"
                      v-model="cantidad"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Cantidad"
                    />
                  </div>
                  <div class="mt-7">
                    <button
                      @click="addProduct()"
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
                        <th scope="col" class="px-6 py-3">Producto</th>
                        <th scope="col" class="px-6 py-3">Cantidad</th>
                        <th scope="col" class="px-6 py-3">Precio</th>
                        <th scope="col" class="px-6 py-3">Total</th>
                        <th scope="col" class="px-6 py-3">Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(items, index) in pedido"
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
                        <td class="px-6 py-4">
                          {{ items.Price }}
                        </td>
                        <td class="px-6 py-4">
                          {{ items.Quantity * items.Price }}
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
          <div v-if="!PrimerPedido">
            <button
              @click="NewOrder()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Guardar
            </button>
          </div>
          <div v-if="PrimerPedido">
            <button
              @click="EntregarOrden()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Entregar
            </button>
          </div>
          <div v-if="PrimerPedido">
            <button
              @click="NewOrder()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeliverOrder
    v-if="isOpenDeliver"
    v-model:is-open="isOpenDeliver"
    :order-id="OrderId"
    :refresh-info="refreshInfo"
  />
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ModelSelect } from "vue-search-select";

import DeliverOrder from "./DeliverOrder.vue";

import { ref } from "vue";
import axios from "axios";

export default {
  components: { Datepicker, ModelSelect, DeliverOrder },
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
    const Customers = null;
    const products = null;

    const pedido = [];

    const precioProducto = null;

    const productName = "";

    const customerDisabled = 0;

    const total = 0;

    const deliver = 0;

    const isLoading = false;

    return {
      deliver,
      productName,
      Customers,
      products,
      pedido,
      isLoading,
      precioProducto,
      customerDisabled,
      cantidad: null,
      PrimerPedido: false,
      OrderId: 0,
      isOpenDeliver: false,
      custumerId: {
        value: "",
        text: "",
      },
      total,
      options: [],
    };
  },
  created() {
    //GET CUSTOMERS
    if (
      this.$store.state.ProfileId === "4" ||
      this.$store.state.ProfileId == "2"
    ) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customers/" +
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
          this.Customers = result.data;
          for (let i = 0; i < this.Customers.length; i++) {
            var valor = {
              value: this.Customers[i].CustomerId,
              text: this.Customers[i].Code + "-" + this.Customers[i].Name,
            };
            this.options.push(valor);
          }
          console.log(this.options);
        });
    } else {
      if (this.$store.state.ProfileId === "1") {
        axios
          .get(
            " http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/CustomersFilter/" +
              this.$store.state.Company +
              "/" +
              "Status=1 and UserId=" +
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
            this.Customers = result.data;
          });
      }
    }
  },
  methods: {
    getProducts() {
      //GET PRODUCTS INFO
      console.log(this.custumerId.value);
      console.log("Hola");

      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceList/" +
            this.custumerId.value +
            "/All",
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
        });
    },
    getPrice(custumerId, productId) {
      //GET PRODUCT NAME
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Product/" +
            this.$store.state.Company +
            "/" +
            productId,
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
          let Producto = result.data.Name;
          this.productName = Producto;
        });

      //GET PRICES
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceList/" +
            custumerId +
            "/ ProductId =" +
            productId +
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
          this.precioProducto = result.data[0].Price;

          const index = this.pedido.findIndex(
            (product) =>
              product.ProductId === document.getElementById("producto").value
          );

          if (index >= 0) {
            this.pedido[index].Quantity =
              parseInt(this.pedido[index].Quantity) + parseInt(this.cantidad);
          } else {
            let data = {
              ProductName: this.productName,
              ProductId: document.getElementById("producto").value,
              Quantity: this.cantidad,
              Price: this.precioProducto,
            };
            this.productName = "";
            this.pedido.push(data);
          }

          this.verifyIfCustomerDisbled();

          this.total = 0;

          for (const i of this.pedido) {
            this.total += i.Price * i.Quantity;
          }
          this.cantidad = null;
        });
    },
    verifyIfCustomerDisbled() {
      if (this.pedido === []) {
        this.customerDisabled = 0;
      } else {
        this.customerDisabled = 1;
      }
    },
    addProduct() {
      this.getPrice(
        this.custumerId.value,
        document.getElementById("producto").value
      );
    },
    DelateProduct(index) {
      this.pedido.splice(index, 1);
    },
    NewOrder() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customer/" +
            this.$store.state.Company +
            "/" +
            this.custumerId.value,
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
          console.log(result.data.UserId);
          this.deliver = result.data.UserId;
          let params = {
            CompanyId: this.$store.state.Company,
            DateNeeded: this.date,
            Total: this.total,
            CustomerId: this.custumerId.value,
            UserId: this.deliver,
            Detail: this.pedido,
          };
          console.log(params);
          this.isLoading = true;
          axios
            .put(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/",
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
              console.log(result);
              this.OrderId = result.data.Valor;
            })
            .finally(() => {
              this.$notify({
                title: "Nuevo Pedido Registrado",
                text: "El pedido fue registrado exitosamente",
                type: "success",
              });
              this.custumerId.value = 0;
              this.customerDisabled = 0;
              this.products = null;
              this.cantidad = null;
              this.total = 0;
              this.pedido = [];
              this.PrimerPedido = true;
              this.isLoading = false;
              this.refreshInfo();
            });
        });
    },
    EntregarOrden() {
      this.isOpenDeliver = true;
      this.PrimerPedido = false;
      this.$emit("update:is-open", false);
    },
    CancelarPedido() {
      this.custumerId.value = 0;
      this.customerDisabled = 0;
      this.products = null;
      this.cantidad = null;
      this.total = 0;
      this.pedido = [];
      this.PrimerPedido = false;
      this.$emit("update:is-open", false);
    },
  },
  watch: {
    custumerId() {
      this.getProducts();
    },
  },
};
</script>
