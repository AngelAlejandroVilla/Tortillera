<template>
  <div class="m-auto flex flex-row gap-12 p-4 ml-[18rem] mr-[1rem]">
    <div class="w-full h-auto">
      <div class="flex flex-row gap-3">
        <div class="mt-4">
          <select
            @change="refreshInfo()"
            id="type"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 border-cyan-500 focus:border-blue-500 block w-full p-2.5 px-4"
          >
            <option value="1">Ventas Directas</option>
            <option value="2">Entregas</option>
            <option value="3">Ordenes</option>
            <option value="4">Pagos</option>
            <option value="5">Devoluciones</option>
            <option value="6">Entradas</option>
            <option value="7">Salidas</option>
          </select>
        </div>
        <div class="ml-3 items-end my-4 flex">
          <Datepicker
            required
            v-model="date"
            modelType="dd-MM-yyyy"
            locale="MX"
            cancelText="Cancelar"
            selectText="Selecciónar"
            range
          ></Datepicker>
        </div>
        <div>
          <button
            @click="refreshInfo()"
            class="bg-cyan-400 text-white rounded-lg px-4 py-2 mt-4"
          >
            Obtener
          </button>
        </div>
        <div>
          <button
            @click="IsOpenSalidas = true"
            class="bg-cyan-400 text-white rounded-lg px-4 py-2 mt-4"
          >
            Agregar Salidas
          </button>
        </div>
      </div>
      <div class="mt-[3rem]">
        <dataTable
          ref="dataTable"
          :tipo="tipo"
          :headers="headers"
          :values="values"
          :date="date"
        />
      </div>
    </div>
  </div>
  <AgregarSalidas v-model:isOpen="IsOpenSalidas"></AgregarSalidas>
</template>
<script>
import dataTable from "./components/dataTable.vue";
import AgregarSalidas from "./Modals/AgregarSalidas.vue";
import axios from "axios";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    dataTable,
    Datepicker,
    AgregarSalidas,
  },
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
  data() {
    return {
      totales: [],
      tipo: "0",
      headers: ["Producto", "Cantidad", "Unidad", "Total"],
      values: [],
      IsOpenSalidas: false,
    };
  },
  async mounted() {
    this.refreshInfo();
  },
  methods: {
    refreshInfo() {
      console.log(this.date.length);
      if (this.date.length != 2) {
        const fechaHoy = new Date();

        const dia = fechaHoy.getDate().toString().padStart(2, "0");
        const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, "0");
        const anio = fechaHoy.getFullYear().toString();

        const date = `${dia}-${mes}-${anio}`;

        const fechaSiguiente = new Date(fechaHoy);

        fechaSiguiente.setDate(fechaHoy.getDate() + 1);

        const dia1 = fechaSiguiente.getDate().toString().padStart(2, "0");
        const mes1 = (fechaSiguiente.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const anio1 = fechaSiguiente.getFullYear().toString();

        const date1 = `${dia1}-${mes1}-${anio1}`;

        this.date = [];
        this.date.push(date);
        this.date.push(date1);
        console.log(this.date);
      }

      console.log(this.date);

      if (document.getElementById("type") != null) {
        this.tipo = document.getElementById("type").value;
      }
      if (this.tipo == 1) {
        axios
          .get(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/DirectSales/" +
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
            this.values = result.data;
            console.log(this.values);
            this.headers = ["Producto", "Cantidad", "Unidad", "Total"];
            this.totales = [];
            for (let i = 0; i < this.values.length; i++) {
              this.totales.push(parseInt(this.values[i].Total));
            }
          });
      } else {
        if (this.tipo == 2) {
          axios
            .get(
              "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/Deliverys/" +
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
              this.values = result.data;
              console.log(this.values);
              this.headers = ["Producto", "Cantidad", "Unidad", "Total"];
              this.totales = [];
              for (let i = 0; i < this.values.length; i++) {
                this.totales.push(parseInt(this.values[i].Total));
              }
            });
        } else {
          if (this.tipo == 3) {
            axios
              .get(
                "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/Orders/" +
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
                this.values = result.data;
                console.log(this.values);
                this.headers = [
                  "Repartidor",
                  "Producto",
                  "Cantidad",
                  "Unidad",
                  "Total",
                ];
                this.totales = [];
                for (let i = 0; i < this.values.length; i++) {
                  this.totales.push(parseInt(this.values[i].Total));
                }
              });
          } else {
            if (this.tipo == 4) {
              axios
                .get(
                  "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/Payments/" +
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
                  this.values = result.data;
                  console.log(this.values);
                  this.headers = ["Repartidor", "Total"];
                  this.totales = [];
                  for (let i = 0; i < this.values.length; i++) {
                    this.totales.push(parseInt(this.values[i].Total));
                  }
                  console.log(this.totales);
                });
            } else {
              if (this.tipo == 5) {
                axios
                  .get(
                    "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TShiftReport/Returns/" +
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
                    this.values = result.data;
                    console.log(this.values);
                    this.headers = [
                      "Cliente",
                      "Repartidor",
                      "Producto",
                      "Cantidad",
                      "Unidad",
                      "Total",
                    ];
                    this.totales = [];
                    for (let i = 0; i < this.values.length; i++) {
                      this.totales.push(parseInt(this.values[i].TotalReturned));
                    }
                  });
              } else {
                if (this.tipo == 6) {
                  axios
                    .get(
                      "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Entries/" +
                        this.$store.state.Company +
                        "/Date BETWEEN '" +
                        this.date[0] +
                        "' AND '" +
                        this.date[1] +
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
                      this.values = result.data;
                      console.log(this.values);
                      this.headers = [
                        "Tipo De Movimiento",
                        "Provedor",
                        "Total",
                      ];
                      this.totales = [];
                      for (let i = 0; i < this.values.length; i++) {
                        this.totales.push(parseInt(this.values[i].total));
                      }
                    });
                } else {
                  if (this.tipo == 7) {
                    axios
                      .get(
                        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Outputs/" +
                          this.$store.state.Company +
                          "/Date BETWEEN '" +
                          this.date[0] +
                          "' AND '" +
                          this.date[1] +
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
                        this.values = result.data;
                        console.log(this.values);
                        this.headers = ["Tipo De Movimiento", "Total"];
                        this.totales = [];
                        for (let i = 0; i < this.values.length; i++) {
                          this.totales.push(parseInt(this.values[i].total));
                        }
                      });
                  }
                }
              }
            }
          }
        }
      }
    },
  },
};
</script>
