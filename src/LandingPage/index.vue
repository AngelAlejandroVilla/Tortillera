<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="relative flex w-full flex-wrap items-center justify-between bg-neutral-900 py-3 text-neutral-200 shadow-lg lg:flex-wrap lg:justify-start"
    data-te-navbar-ref
  >
    <div class="flex w-full flex-wrap items-center justify-between px-6">
      <button
        class="block border-0 bg-transparent py-2 px-2.5 text-neutral-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
        type="button"
        data-te-collapse-init
        data-te-target="#navbarSupportedContent4"
        aria-controls="navbarSupportedContent4"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-7 w-7"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div
        class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
        id="navbarSupportedContent4"
        data-te-collapse-item
      >
        <a class="pr-2 text-xl font-semibold text-white" href="#">Villasol.</a>
        <!-- Left links -->
        <ul
          class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
          data-te-navbar-nav-ref
        >
          <li class="p-2" data-te-nav-item-ref>
            <a
              class="text-white disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="#"
              data-te-nav-link-ref
              >Iniciar Sesion</a
            >
          </li>
          <li class="p-2" data-te-nav-item-ref>
            <a
              class="p-0 text-white opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="#"
              data-te-nav-link-ref
              >Sobre Nosotros</a
            >
          </li>
          <li class="p-2" data-te-nav-item-ref>
            <a
              class="p-0 text-white opacity-60 hover:opacity-80 focus:opacity-80 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              href="#"
              data-te-nav-link-ref
              >Servicios</a
            >
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->
    </div>
  </nav>
  <section class="banner" id="banner">
    <div class="content">
      <h2>Organiza Tus Tortillas</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        architecto natus debitis, quidem totam odit nam a odio, rerum similique
        perspiciatis itaque voluptatibus
      </p>
      <a class="btn mr-4"
        ><router-link :to="{ name: 'register' }"
          >Registrate ahora!</router-link
        ></a
      >
      <a class="btn"
        ><router-link :to="{ name: 'login' }">Iniciar Sesion</router-link></a
      >
    </div>
  </section>
  <section class="about" id="about">
    <div class="row">
      <div class="col50">
        <h2 class="titleText"><span>S</span>obre Nosotros</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quo itaque
          quisquam optio et numquam repellat sit sed quibusdam, cumque mollitia
          tenetur eligendi enim adipisci voluptas ullam debitis. Maxime
          obcaecati consequatur at ex autem expedita optio esse nostrum
          exercitationem corrupti reprehenderit voluptas libero, commodi sequi
          veniam facilis alias. Excepturi, blanditiis. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Possimus qui nam perspiciatis, ex
          nostrum, cum ratione, voluptatem recusandae eveniet ipsum eum nulla
          impedit ut iusto consequuntur laboriosam culpa cumque eius.
        </p>
      </div>
      <div class="col50">
        <div class="imgBx">
          <img src="./imagenes/interfaz.jpg" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col50">
        <div class="imgBx">
          <img src="./imagenes//undraw_Slider_re_ch7w.png" />
        </div>
      </div>
      <div class="col50">
        <h2 class="titleText">¿<span>Q</span>uienes somos?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quo itaque
          quisquam optio et numquam repellat sit sed quibusdam, cumque mollitia
          tenetur eligendi enim adipisci voluptas ullam debitis. Maxime
          obcaecati consequatur at ex autem expedita optio esse nostrum
          exercitationem corrupti reprehenderit voluptas libero, commodi sequi
          veniam facilis alias. Excepturi, blanditiis. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Possimus qui nam perspiciatis, ex
          nostrum, cum ratione, voluptatem recusandae eveniet ipsum eum nulla
          impedit ut iusto consequuntur laboriosam culpa cumque eius.
        </p>
      </div>
    </div>
  </section>
  <section class="servicio" id="servicio">
    <div class="title">
      <h2 class="titleText">Nuestro <span>S</span>ervicio</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="content">
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/software2.jpg" />
        </div>
        <div class="text">
          <h3>Perfil de ususario</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/software3.jpg" />
        </div>
        <div class="text">
          <h3>Detalles de clientes</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/software4.jpg" />
        </div>
        <div class="text">
          <h3>Sistema de pedidos</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/software5.jpg" />
        </div>
        <div class="text">
          <h3>Pedidos</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/software6.jpg" />
        </div>
        <div class="text">
          <h3>Saldo</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/manocel.png" />
        </div>
        <div class="text">
          <h3>Tratos</h3>
        </div>
      </div>
    </div>
    <div class="title">
      <a href="#" class="btn">Más Información</a>
    </div>
  </section>
  <section class="info">
    <div class="contenedor">
      <h2 class="titulo left">¡Ya no te preocupes!</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing el</p>
    </div>
  </section>
  <section class="expertos" id="expertos">
    <div class="title">
      <h2 class="titleText">Nuestros Puestos de <span>T</span>rabajo</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="content">
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/expert1.jpg" />
        </div>
        <div class="text">
          <h3>Lorem</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/cajero1.jpg" />
        </div>
        <div class="text">
          <h3>Lorem</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/repartidor1.jpg" />
        </div>
        <div class="text">
          <h3>Lorem</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/expert4.jpg" />
        </div>
        <div class="text">
          <h3>Lorem</h3>
        </div>
      </div>
    </div>
  </section>
  <section class="planes" id="planes">
    <div class="title white">
      <h2 class="titleText">Nuestros <span>P</span>lanes</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="content">
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/testi1.jpg" />
        </div>
        <div class="text">
          <h3>Noob</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
            veniam magni, odio quasi adipisci ea? Dolore aspernatur voluptatibus
            tempora fuga quasi vel quam provident explicabo praesentium minus,
            assumenda blanditiis saepe perferendis? Cum molestiae labore
            possimus odit vitae atque eius vel!
          </p>
          <h3>$50 MXN / Mes</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/testi2.jpg" />
        </div>
        <div class="text">
          <h3>Pro</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
            veniam magni, odio quasi adipisci ea? Dolore aspernatur voluptatibus
            tempora fuga quasi vel quam provident explicabo praesentium minus,
            assumenda blanditiis saepe perferendis? Cum molestiae labore
            possimus odit vitae atque eius vel!
          </p>
          <h3>$50 MXN / Mes</h3>
        </div>
      </div>
      <div class="box">
        <div class="imgBx">
          <img src="./imagenes/testi3.jpg" />
        </div>
        <div class="text">
          <h3>Admin</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
            veniam magni, odio quasi adipisci ea? Dolore aspernatur voluptatibus
            tempora fuga quasi vel quam provident explicabo praesentium minus,
            assumenda blanditiis saepe perferendis? Cum molestiae labore
            possimus odit vitae atque eius vel!
          </p>
          <h3>$50 MXN / Mes</h3>
        </div>
      </div>
    </div>
  </section>
  <section class="contacto" id="contacto">
    <div class="title">
      <h2 class="titleText"><span>C</span>ontáctanos</h2>
    </div>
    <div class="contactForm">
      <h3>Envía Un Mensaje</h3>
      <div class="inputBox">
        <input type="text" placeholder="Name" />
      </div>
      <div class="inputBox">
        <input type="text" placeholder="Email" />
      </div>
      <div class="inputBox">
        <textarea type="text" placeholder="Name"></textarea>
      </div>
      <div class="inputBox">
        <input type="submit" value="Enviar" />
      </div>
    </div>
  </section>
</template>

<style>
@import url("./styles.css");
</style>
