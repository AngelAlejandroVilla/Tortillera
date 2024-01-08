<template>
  <div>
    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-auto"
    >
      <button
        @click="exportExcel()"
        class="flex bg-slate-200 p-2 mx-2 my-1 text-gray-500 rounded-md"
      >
        <div class="mr-2">
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
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
        </div>
        <span> Descargar </span>
      </button>
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th
              class="px-6 py-2"
              v-for="(header, index) in headers"
              :key="index"
            >
              <a class="cursor-pointer flex">{{ header }} </a>
            </th>
          </tr>
        </thead>
        <tbody v-if="values.Valor != '-1'">
          <tr
            v-for="(value, index) in displayedPosts"
            :key="index"
            class="bg-white border-b"
          >
            <td v-if="tipo == '6' || tipo == '7'" class="px-6 py-1">
              {{ value.MovementType }}
            </td>
            <td v-if="tipo == '6'" class="px-6 py-1">
              {{ value.ProviderName }}
            </td>
            <td v-if="tipo == '6' || tipo == '7'" class="px-6 py-1">
              ${{ value.total }}
            </td>
            <td v-if="tipo == '5'" class="px-6 py-1">{{ value.Customer }}</td>
            <td v-if="tipo == '4'" class="px-6 py-1">
              {{ value.DeliveryMan }}
            </td>
            <td v-if="tipo == '5'" class="px-6 py-1">
              {{ value.DeliveryMan }}
            </td>
            <td v-if="tipo == '3'" class="px-6 py-1">
              {{ value.DeliveryMan }}
            </td>
            <td v-if="tipo != '4'" class="px-6 py-1">{{ value.Product }}</td>
            <td v-if="tipo != '4'" class="px-6 py-1">{{ value.Quantity }}</td>
            <td v-if="tipo != '4' && tipo != '5'" class="px-6 py-1">
              {{ value.Unit }}
            </td>
            <td v-if="tipo == '5'" class="px-6 py-1">{{ value.UnitType }}</td>
            <td
              v-if="tipo != '5' && tipo != '6' && tipo != '7'"
              class="px-6 py-1"
            >
              ${{ value.Total }}
            </td>
            <td v-if="tipo == '5'" class="px-6 py-1">
              ${{ value.TotalReturned }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between mx-12 mt-2">
        <div class="order-firt px-6 py-1">
          <span class="text-gray-400">Movimientos:</span
          ><span class="text-center font-bold text-cyan-400">
            {{ movimientos }}</span
          >
        </div>
        <div v-if="tipo != 4 && tipo != '6'" class="px-6 py-1 col-start-2">
          <span class="text-gray-400">Cantidad:</span
          ><span class="text-center font-bold text-cyan-400">
            {{ cantidad }}</span
          >
        </div>
        <div class="order-last px-6 py-1 col-start-5">
          <span class="text-gray-400">Total:</span
          ><span class="text-center font-bold text-cyan-400">
            ${{ formatPrice(Total) }}</span
          >
        </div>
      </div>
      <!-- <div>
        {{ pages.length }}
      </div> -->
      <div
        v-if="pages.length > 1"
        class="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4"
      >
        <div
          class="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200 dark:border-gray-700"
        >
          <div
            class="flex items-center pt-3 text-gray-600 dark:text-gray-200 hover:text-cyan-500 cursor-pointer"
          >
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p
              @click="page--"
              v-if="page != 1"
              class="text-sm ml-3 font-medium leading-none"
            >
              Anterior
            </p>
          </div>
          <div class="sm:flex hidden">
            <p
              v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
              :key="index"
              @click="page = pageNumber"
              class="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-indigo-400 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
            >
              {{ pageNumber }}
            </p>
          </div>
          <div
            class="flex items-center pt-3 text-gray-600 dark:text-gray-200 hover:text-cyan-500 cursor-pointer"
          >
            <p
              @click="page++"
              v-if="page < pages.length"
              class="text-sm font-medium leading-none mr-3"
            >
              Siguiente
            </p>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";

export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    values: {
      type: Object,
      required: false,
    },
    tipo: {
      type: String,
      required: true,
    },
    date: {
      type: Array,
      required: true,
    },
  },
  data() {
    const ProductsTotales = [];
    const ProductsName = [];
    const Products = [];

    return {
      ProductsTotales,
      ProductsName,
      Products,
      info: null,
      Total: 0,
      cantidad: 0,
      movimientos: 0,
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(",", ",");

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    exportExcel() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/ShiftReport/" +
            this.$store.state.Company +
            "/'" +
            this.date[0] +
            "'/'" +
            this.date[1] +
            "'/CompanyId=" +
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
          if (result.data[0].Valor != "-1") {
            var vd = XLSX.utils.json_to_sheet(result.data[0]);
          }
          if (result.data[1].Valor != "-1") {
            var eg = XLSX.utils.json_to_sheet(result.data[1]);
          }
          if (result.data[2].Valor != "-1") {
            var or = XLSX.utils.json_to_sheet(result.data[2]);
          }
          if (result.data[3].Valor != "-1") {
            var pg = XLSX.utils.json_to_sheet(result.data[3]);
          }
          if (result.data[4].Valor != "-1") {
            var dv = XLSX.utils.json_to_sheet(result.data[4]);
          }
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, vd, "VentasDirectas");
          XLSX.utils.book_append_sheet(wb, eg, "Entregas");
          XLSX.utils.book_append_sheet(wb, or, "Ordenes");
          XLSX.utils.book_append_sheet(wb, pg, "Pagos");
          XLSX.utils.book_append_sheet(wb, dv, "Devoluciones");
          XLSX.writeFile(wb, "CorteDeCaja.xlsx");
        });
    },
    getTotales() {
      this.Total = 0;
      this.cantidad = 0;
      for (let i = 0; i < this.values.length; i++) {
        if (this.tipo == "6" || this.tipo == "7") {
          this.Total += parseInt(this.values[i].total);
          console.log(this.values[i].total);
        } else {
          this.Total += parseInt(this.values[i].Total);
          this.cantidad += parseInt(this.values[i].Quantity);
          this.movimientos = i + 1;
        }
      }
    },
    getProducts(Value) {
      this.ProductsName = [];
      if (Value == "1") {
        if (this.ProductsName.length == 0) {
          axios
            .get(
              //Orders
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" +
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
              this.Products = result.data;
              for (let i = 0; i < this.Products.length; i++) {
                this.ProductsName.push(this.Products[i].Name);
              }
            });
        }
      } else {
        if (Value == "4") {
          axios
            .get(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
                this.$store.state.Company +
                "/" +
                "Status='1' and ProfileId='1'}",
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
              this.Products = result.data;
              this.ProductsName = [];
              for (let i = 0; i < this.Products.length; i++) {
                this.ProductsName.push(this.Products[i].Name);
              }
              console.log(this.ProductsName + "Prueba 1");
            });
        }
      }
    },
    renderChart(Value, totales) {
      console.log(totales);
      this.Total = [];
      var num = 0;
      for (let i = 0; i < totales.length; i++) {
        num += totales[i];
      }
      this.Total = num;
      this.getProducts(Value);
      console.log(this.ProductsName);
      this.info = {
        chartData: {
          labels: this.ProductsName,
          datasets: [
            {
              label: "Total",
              backgroundColor: "#06b6d4",
              data: totales,
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            rectangle: {
              borderWidth: 1,
              borderSkipped: "bottom",
            },
          },
        },
      };
    },
    setPages() {
      this.pages = [];
      let numberOfPages = Math.ceil((this.values.length - 1) / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(post) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return post.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.values);
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  watch: {
    values() {
      this.setPages();
      this.getTotales();
    },
  },
};
</script>
