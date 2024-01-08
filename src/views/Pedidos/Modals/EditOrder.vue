<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Editar Pedido</h3>
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
      <div v-if="Order" class="mt-4">
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
                    <span class="font-bold">{{ Order.DateNeeded }}</span>
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >Cliente</label
                    >
                    <select
                      @change="getProducts()"
                      :disabled="customerDisabled == 1"
                      id="cliente"
                      :value="Order.CustomerId"
                      :v-model="custumerId"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option v-if="custumerId === 0" selected>
                        Select Customer
                      </option>
                      <option
                        v-for="(customer, index) in Customers"
                        :key="index"
                        v-bind:value="customer.CustomerId"
                      >
                        {{ customer.Name }}
                      </option>
                    </select>
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
                      :v-model="PrductId"
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
                      :v-model="cantidad"
                      id="cantidad"
                      type="number"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0 peer"
                      placeholder="Cantidad"
                    />
                  </div>
                  <div class="mt-7">
                    <button
                      v-if="!EditProductEnabled"
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
                    <button
                      v-else
                      @click="EditarProducto()"
                      class="h-10 w-full text-blue-800 border border-blue-600 rounded"
                    >
                      <div class="flex flex-row mx-auto justify-center">
                        <span>Confirmar</span>
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
                        <th
                          v-if="Order.Status == '1'"
                          scope="col"
                          class="px-6 py-3"
                        >
                          Editar
                        </th>
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
                        <td v-if="Order.Status == '1'">
                          <div
                            @click="EditProductMode(index)"
                            class="flex flex-row"
                          >
                            <div
                              class="text-center mx-auto cursor-pointer hover:text-cyan-500"
                            >
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
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
        <button
          @click="guardarOrden()"
          class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Guardar
        </button>
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
    refreshInfo: {
      type: Function,
      required: true,
    },
    OrderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Order: null,
      Customers: null,
      products: null,
      precioProducto: null,
      custumerId: 0,
      productName: "",
      customerDisabled: 1,
      total: 0,
      pedido: [],
      EditProductEnabled: false,
      EditIndex: 0,
      PrductId: 0,
      cantidad: 0,
    };
  },
  created() {
    console.log(this.OrderId);
    axios
      .get(
        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Order/" +
          this.$store.state.Company +
          "/" +
          this.OrderId,
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
        this.Order = result.data;
        this.total = this.Order.Total;
        this.pedido = this.Order.Detail;
        console.log(result);
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
            this.Customers = result.data;
            this.custumerId = this.Order.CustomerId;
            this.getProducts();
          });
      });
  },
  methods: {
    getProducts() {
      //GET PRODUCTS INFO

      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceList/" +
            this.custumerId +
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
              parseInt(this.pedido[index].Quantity) +
              parseInt(document.getElementById("cantidad").value);
          } else {
            let data = {
              ProductName: this.productName,
              ProductId: document.getElementById("producto").value,
              Quantity: document.getElementById("cantidad").value,
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
          document.getElementById("cantidad").value = 0;
        });
    },

    verifyIfCustomerDisbled() {
      if (this.pedido === []) {
        this.customerDisabled = 1;
      } else {
        this.customerDisabled = 1;
      }
    },

    DelateProduct(index) {
      this.pedido.splice(index, 1);
    },
    EditProductMode(index) {
      this.EditProductEnabled = true;
      this.EditIndex = index;
      document.getElementById("producto").value =
        this.pedido[this.EditIndex].ProductId;
      document.getElementById("cantidad").value =
        this.pedido[this.EditIndex].Quantity;
    },
    EditarProducto() {
      var productId = document.getElementById("producto").value;
      console.log(productId);
      var customerId = document.getElementById("cliente").value;
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
        .then((result1) => {
          let Producto = result1.data.Name;
          console.log(Producto);
          axios
            .get(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceList/" +
                customerId +
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
              console.log(result);
              this.precioProducto = result.data[0].Price;
              this.pedido[this.EditIndex].ProductName = Producto;
              this.pedido[this.EditIndex].ProductId = productId;
              this.pedido[this.EditIndex].Quantity =
                document.getElementById("cantidad").value;

              this.total = 0;

              for (const i of this.pedido) {
                this.total += i.Price * i.Quantity;
              }

              document.getElementById("cantidad").value = 0;
              this.EditProductEnabled = false;
            });
        });
    },
    guardarOrden() {
      let detail = [];
      for (let i = 0; i < this.pedido.length; i++) {
        let elemento = {
          OrderId: this.pedido[i].OrderId,
          ProductId: this.pedido[i].ProductId,
          Status: this.pedido[i].Status,
          Quantity: this.pedido[i].Quantity,
          Price: this.pedido[i].Price,
          Delivered: "1",
          ProductName: this.pedido[i].ProductName,
          UnitName: this.pedido[i].UnitName,
        };
        detail.push(elemento);
      }
      let params = {
        CompanyId: this.$store.state.Company,
        DateNeeded: this.Order.DateNeeded,
        Total: this.total,
        CustomerId: this.Order.CustomerId,
        OrderId: this.Order.OrderId,
        UserId: this.Order.UserId,
        Detail: detail,
      };
      console.log(params);
      axios
        .post(
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
          this.custumerId = 0;
          this.customerDisabled = 0;
          this.products = null;
          document.getElementById("cantidad").value = 0;
          this.total = 0;
          this.pedido = [];

          this.$emit("update:is-open", false);

          this.$notify({
            title: "Operacion Exitosa",
            text: "Se Edito Exitosamente",
            type: "success",
          });
        });
    },
    addProduct() {
      this.getPrice(
        document.getElementById("cliente").value,
        document.getElementById("producto").value
      );
    },
    CancelarPedido() {
      this.custumerId = 0;
      this.customerDisabled = 0;
      this.products = null;
      document.getElementById("cantidad").value = 0;
      this.total = 0;
      this.pedido = [];
      this.$emit("update:is-open", false);
    },
  },
};
</script>
