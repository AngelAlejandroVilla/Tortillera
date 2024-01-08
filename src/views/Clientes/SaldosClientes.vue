<template>
  <div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
    <div class="flex justify-center text-2xl mb-4">Saldos Clientes</div>
    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[36rem]"
    >
      <div class="flex flex-row gap-3">
        <div class="ml-[2rem] mb-6 w-[12rem]">
          <label
            for="cliente"
            class="block mb-2 text-sm font-medium text-cyan-600"
            >Repartidor</label
          >
          <select
            v-model="Repartidor"
            id="filtro"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option
              v-for="(repartidor, index) in repartidores"
              :key="index"
              :value="repartidor.UserId"
            >
              {{ repartidor.Name }}
            </option>
          </select>
        </div>
        <div class="ml-3 items-end my-6 flex">
          <Datepicker
            v-model="date"
            modelType="dd-MM-yyyy"
            locale="MX"
            cancelText="Cancelar"
            selectText="Selecciónar"
            s
            class="w-[18rem]"
          ></Datepicker>
        </div>
        <div class="ml-3 mt-7">
          <button
            @click="refreshInfo()"
            class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
          >
            Obtener
          </button>
        </div>
      </div>
      <table
        class="h-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Codigo</th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Cliente</div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Cantidad</div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Pedido</div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Pagado</div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">Saldo</div>
            </th>
          </tr>
        </thead>
        <tbody class="h-full" v-if="info">
          <tr
            v-for="(balance, index) in info"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">
              <p>{{ balance.Code }}</p>
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <p>
                {{ balance.Cliente }}
              </p>
            </th>
            <td class="px-6 py-4">
              <span>{{ balance.cantidad }}</span>
            </td>
            <td class="px-6 py-4">
              <span
                @click="ObtenerPedidos(balance.Customerid)"
                class="text-cyan-500 cursor-pointer hover:underline"
                >${{ balance.pedido }}</span
              >
            </td>
            <td class="px-6 py-4">
              <span>${{ balance.pagado }}</span>
            </td>
            <td class="px-6 py-4">
              <span>${{ balance.saldo }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-row gap-3 w-full text-lg mx-6 justify-center mt-4">
      <div class="w-full text-center">
        <h1 class="text-gray-400">
          Cantidad: <span class="text-cyan-500">${{ cantidadTot }}</span>
        </h1>
      </div>
      <div class="w-full text-center">
        <h1 class="text-gray-400">
          Pedido: <span class="text-cyan-500">${{ pedidoTot }}</span>
        </h1>
      </div>
      <div class="w-full text-center">
        <h1 class="text-gray-400">
          Pagado: <span class="text-cyan-500">${{ pagadoTot }}</span>
        </h1>
      </div>
      <div class="w-full text-center">
        <h1 class="text-gray-400">
          saldo: <span class="text-cyan-500">${{ saldoTot }}</span>
        </h1>
      </div>
    </div>
  </div>
  <PedidosCliente
    v-if="isOpen"
    v-model:isOpen="isOpen"
    :Orders="Orders"
  ></PedidosCliente>
</template>

<script>
import PedidosCliente from "./Modals/PedidosClientes.vue";

import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  components: {
    Datepicker,
    PedidosCliente,
  },
  setup() {
    const date = ref(new Date());
    var dia = date.value.getDate();
    var mes = date.value.getMonth() + 1;
    var anio = date.value.getFullYear();
    var fecha = dia + "-" + mes + "-" + anio;
    date.value = fecha;

    return {
      date,
    };
  },
  data() {
    const info = null;
    const repartidores = null;
    const Orders = null;
    const Pagos = null;
    const OrderId = "";
    const Repartidor = "";

    return {
      repartidores,
      Repartidor,
      info,

      Orders,
      Pagos,
      OrderId,
      DetallesPagos: false,
      isOpen: false,
      cantidadTot: 0,
      pedidoTot: 0,
      pagadoTot: 0,
      saldoTot: 0,
    };
  },
  methods: {
    refreshInfo() {
      console.log(this.date);

      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/DailyBalance/" +
            this.$store.state.Company +
            "/" +
            this.date +
            "/UserId=" +
            this.Repartidor,
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
          this.info = result.data;
          for (let i = 0; i < this.info.length; i++) {
            this.cantidadTot += parseFloat(this.info[i].cantidad);
            this.pedidoTot += parseFloat(this.info[i].pedido);
            this.pagadoTot += parseFloat(this.info[i].pagado);
            this.saldoTot += parseFloat(this.info[i].saldo);
          }
        });
    },
    ObtenerPedidos(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TOrders/Orders/" +
            this.$store.state.Company +
            "/CustomerId=" +
            id +
            " AND cast(dateCreated as date)='" +
            this.date +
            "'",
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
          this.Orders = result.data;
          console.log(this.Orders);
          this.isOpen = true;
        });
    },
    MostrarDetalle() {
      this.TableDetalleProduct = true;
      this.DetallesPagos = false;
    },
  },
  created() {
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
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
};
</script>
