import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: () => import("../LandingPage/index.vue"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("../views/Register/userRegister.vue"),
  },
  {
    path: "/PuntoDeVenta",
    name: "venta",
    component: () => import("../views/Ventas/PuntoDeVenta.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/Pagos&Devoluciones",
    name: "P&D",
    component: () => import("../views/Ventas/Pagos&Devoluciones.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarProductos",
    name: "AdministrarProductos",
    component: () => import("../views/Productos/AdminProducto.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarClientes",
    name: "administrarClientes",
    component: () => import("../views/Clientes/AdminClientes.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarInventario",
    name: "inventario",
    component: () => import("../views/Inventario/Inventario.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarProvedores",
    name: "Provedores",
    component: () => import("../views/Provedores/Provedores.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/PedidosClientes",
    name: "pedidoCliente",
    component: () => import("../views/Clientes/PedidosCliente.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/SaldosClientes",
    name: "saldosClientes",
    component: () => import("../views/Clientes/SaldosClientes.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarRepartidores",
    name: "admnistrarRepartidores",
    component: () => import("../views/Repartidores/AdminRepartidores.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarPedidos",
    name: "PedidosRepartidor",
    component: () => import("../views/Pedidos/AdministrarPedidos.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/AdministrarCajeros",
    name: "administrarCajeros",
    component: () => import("../views/Cajero/adminCasher.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/Pedidos",
    name: "pedidos",
    component: () => import("../views/Pedidos/Pedidos.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/EntregaDeProductos",
    name: "EDP",
    component: () => import("../views/Ventas/EntregasRepartidor.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
  {
    path: "/CorteDeCaja",
    name: "corteDeCaja",
    component: () => import("../views/CorteDeCaja/CorteDeCaja.vue"),
    meta: {
      layout: "LayoutContent",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.state.IsLogged) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
