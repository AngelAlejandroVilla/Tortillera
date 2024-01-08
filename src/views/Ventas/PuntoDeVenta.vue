<template>
  <div class="flex flex-col p-4">
    <div class="flex justify-center text-2xl mb-4">Punto de venta</div>
    <div class="ml-auto flex flex-col lg:flex-row xl:flex-row">
      <!--Productos-->
      <div
        class="flex-1 h-[73vh] lg:w-[68rem] overflow-auto border-4 border-gray-400 border-dashed bg-white rounded mt-4"
      >
        <div
          v-if="products.Valor != '-1'"
          class="m-5 container-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 grid-rows-3 gap-5"
        >
          <!--Producto-->
          <div
            v-for="(producto, index) in products"
            :key="index"
            @click="addProduct(producto)"
            class="shadow hover:shadow-lg transition-shadow rounded-2xl bg-white cursor-pointer"
          >
            <div class="flex justify-center">
              <img class="w-24 h-24" v-bind:src="producto.img" alt="" />
            </div>
            <div class="mt-7 flex pb-3 px-3 text-sm">
              <p class="mr-1 text-md font-bold">{{ producto.Name }}</p>
              <p class="ml-8 text-md text-cyan-600 font-semibold">
                ${{ producto.basePrice }}
              </p>
            </div>
            <div>
              <span class="text-gray-400 ml-2 mt-2"
                >Tecla: {{ getShortCut(producto.ShortCut) }}</span
              >
            </div>
          </div>
        </div>
        <!--No Hay Productos-->
        <router-link :to="{ name: 'AdministrarProductos' }">
          <div
            v-if="products.Valor == '-1'"
            class="flex justify-center items-center h-[72vh] bg-gray-200 hover:bg-gray-300"
          >
            <div class="text-center">
              <span class="flex-col text-gray-400 text-2xl"
                >Añadir Productos</span
              >
              <svg
                class="w-12 h-12 ml-auto mr-auto mt-4 flex-col text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <!--TICKET-->
      <div class="shadow rounded-3xl flex-none w-[20rem] bg-white mt-4 mx-10">
        <div class="text-center text-2xl font-bold mt-5"><h1>Cajero</h1></div>
        <div class="mt-10 px-2 container-xl">
          <div class="flex-1 h-[60rem] w-full px-4 overflow-auto max-h-96">
            <!--Producto-->
            <div v-if="this.venta != []">
              <div
                v-for="(pedido, index) in venta"
                :key="index"
                class="h-43 mb-3 bg-gray-100 rounded-lg w-full text-gray-700 py-2 px-2 flex justify-center"
              >
                <div class="my-auto">
                  <h5 class="text-sm mr-2 font-bold">
                    {{ pedido.ProductName }}
                  </h5>
                </div>
                <p class="my-auto mr-1 text-sm text-cyan-500 block">
                  ${{ pedido.Price }}
                </p>

                <div class="py-1">
                  <div class="w-28 grid grid-cols-3 gap-2 ml-2">
                    <button
                      @click="increment(pedido.ProductId)"
                      class="rounded-lg h-8 w-8 text-center py-1 text-white bg-gray-600 hover:bg-gray-400"
                    >
                      <svg
                        class="mx-auto w-4 h-4"
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
                    </button>
                    <input
                      @change="changeQuantity(pedido.ProductId)"
                      type="text"
                      id="cantidadtxt"
                      class="bg-white rounded-lg h-8 w-10 text-center shadow focus:outline-none focus:shadow-lg text-sm"
                      :value="pedido.Quantity"
                    />
                    <button
                      @click="decrement(pedido.ProductId)"
                      class="rounded-lg h-8 w-8 text-center py-1 text-white bg-gray-600 hover:bg-gray-400 ml-2"
                    >
                      <svg
                        class="mx-auto w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--Producto Finish-->

            <!-- Sin Productos -->
            <div
              v-if="venta == [] || venta.Valor == '-1'"
              class="flex justify-center items-center h-24 bg-cyan-50 rounded-lg border-2 border-dashed"
            >
              <div class="flex flex-col">
                <div class="text-gray-500">Agrega Productos</div>
                <div>
                  <svg
                    class="w-6 h-6 mx-auto mt-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!--Cashier-->
          <div class="flex-col flex h-auto w-full text-center pt-3 pb-4 px-4">
            <div class="flex mb-3 text-lg font-semibold text-blue-gray-700">
              <div>TOTAL</div>
              <div class="text-right w-full">
                <span class="text-cyan-500 font-bold text-xl">
                  ${{ total }}
                </span>
              </div>
            </div>
            <button
              class="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl text-lg w-full py-3 focus:outline-none"
              @click="MakeNewSale()"
            >
              Pagar
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
  name: "PuntoDeVenta",

  data() {
    const products = null;
    const venta = [];
    const producto = true;
    const casher = true;
    const total = 0;
    const i = "";

    return {
      i,
      products,
      venta,
      total,
      producto,
      casher,
    };
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" +
            this.$store.state.Company +
            "/" +
            "ShortCut=" +
            event.keyCode,
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
          var params = {
            Name: result.data[0].Name,
            ProductId: result.data[0].ProductId,
            basePrice: result.data[0].basePrice,
          };
          this.addProduct(params);
        });
    });
  },

  created() {
    axios
      .get(
        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" +
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
        this.products = result.data;
      });
  },
  unmounted() {
    window.removeEventListener("keyup", (evt) => {
      this.handleClickEvent(evt);
    });
  },
  methods: {
    handleClickEvent(evt) {
      console.log(evt.currentTarget);
    },
    getShortCut(cut) {
      switch (cut) {
        case "49":
          return "1";
        case "50":
          return "2";
        case "51":
          return "3";
        case "52":
          return "4";
        case "53":
          return "5";
        case "54":
          return "6";
        case "55":
          return "7";
        case "56":
          return "8";
        case "57":
          return "9";
        case "65":
          return "A";
        case "66":
          return "B";
        case "67":
          return "C";
        case "68":
          return "D";
        case "69":
          return "E";
        case "70":
          return "F";
        case "71":
          return "G";
        case "72":
          return "H";
        case "73":
          return "I";
        case "74":
          return "J";
        case "75":
          return "K";
        case "76":
          return "L";
        case "77":
          return "M";
        case "78":
          return "N";
        case "79":
          return "O";
        case "80":
          return "P";
        case "81":
          return "Q";
        case "82":
          return "R";
        case "83":
          return "S";
        case "84":
          return "T";
        case "85":
          return "U";
        case "86":
          return "V";
        case "87":
          return "W";
        case "88":
          return "Z";
        case "89":
          return "Y";
        case "90":
          return "Z";
      }
    },
    addProduct(info) {
      const index = this.venta.findIndex(
        (product) => product.ProductId === info.ProductId
      );

      if (index >= 0) {
        this.venta[index].Quantity = parseInt(this.venta[index].Quantity) + 1;
      } else {
        let data = {
          ProductName: info.Name,
          ProductId: info.ProductId,
          Quantity: 1,
          Price: info.basePrice,
        };
        this.venta.push(data);
      }
      this.total = 0;

      for (const i of this.venta) {
        this.total += i.Price * i.Quantity;
      }
    },
    increment(id) {
      const index = this.venta.findIndex((product) => product.ProductId === id);

      this.venta[index].Quantity += 1;

      this.total = 0;

      for (const i of this.venta) {
        this.total += i.Price * i.Quantity;
      }
    },
    decrement(id) {
      const index = this.venta.findIndex((product) => product.ProductId === id);

      if (this.venta[index].Quantity != 1) {
        this.venta[index].Quantity -= 1;

        this.total = 0;

        for (const i of this.venta) {
          this.total += i.Price * i.Quantity;
        }
      } else {
        this.venta.splice(index, 1);

        this.total = 0;

        for (const i of this.venta) {
          this.total += i.Price * i.Quantity;
        }
      }
    },
    changeQuantity(id) {
      const index = this.venta.findIndex((product) => product.ProductId === id);
      const newValue = document.getElementById("cantidadtxt").value;
      if (newValue > 1) {
        this.venta[index].Quantity = newValue;

        this.total = 0;

        for (const i of this.venta) {
          this.total += i.Price * i.Quantity;
        }
      } else {
        if (newValue <= 0) {
          this.venta.splice(index, 1);

          this.total = 0;

          for (const i of this.venta) {
            this.total += i.Price * i.Quantity;
          }
        }
      }
    },
    MakeNewSale() {
      var fecha = new Date();
      var fechaHoy = fecha.toLocaleDateString();
      let params = {
        UserId: this.$store.state.UserId,
        Date: fechaHoy,
        Status: 1,
        Sale: this.venta,
      };
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TSale/Sale",
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
        .then(() => {
          this.venta = [];
          this.total = 0;
          this.$notify({
            title: "Transaccion Completa",
            text: "La transaccion se realizo exitosamente",
            type: "success",
          });
        });
    },
  },
};
</script>
