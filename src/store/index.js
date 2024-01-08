import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //security
    IsLogged: false,
    ProfileId: 0,
    UserId: 0,
    Company: 1,
    UserName: "None",
    Email: "None",

    units: [],
    delivers: [],
    customers: [],
    products: [],
  },
  mutations: {
    GET_UNITS(state, units) {
      state.units = units;
    },
    GET_DELIVERS(state, deliver) {
      state.delivers = deliver;
    },
    GET_PRODUCTS(state, product) {
      state.products = product;
    },
  },
  actions: {
    getUnits({ commit }) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUnitType/UnitTypes"
        )
        .then((data) => {
          commit("GET_UNITS", data.data);
        });
    },
    getDelivers({ commit }) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
            this.state.Company +
            "/" +
            "Status='1' and ProfileId='1' and CompanyId=" +
            this.state.Company
        )
        .then((data) => {
          commit("GET_DELIVERS", data.data);
        });
    },
    getProducts({ commit }) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" +
            this.state.Company
        )
        .then((data) => {
          commit("GET_PRODUCTS", data.data);
        });
    },
  },
  getters: {
    getUnit: (state) => (id) => {
      return state.units.find((unit) => unit.UnitId === id);
    },
    getDeliver: (state) => (id) => {
      return state.delivers.find((deliver) => deliver.UserId === id);
    },
    getProduct: (state) => (id) => {
      return state.products.find((product) => product.ProductId === id);
    },
    getProfileId: (state) => {
      return state.ProfileId;
    },
    getUserId: (state) => {
      return state.UserId;
    },
  },
  modules: {},
});
