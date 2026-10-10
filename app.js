let categoriaActual = "todos";

const formatoPrecio = new Intl.NumberFormat("es-CL");

function crearProducto(producto) {
  return `
    <article class="producto">

      <div class="producto-imagen">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          loading="lazy"
        >
      </div>

      <div class="producto-info">

        <h3>${producto.nombre}</h3>

        <p class="descripcion">
          ${producto.descripcion}
        </p>

        <p class="precio">
          $${formatoPrecio.format(producto.precio)}
        </p>

        ${
          producto.promocion
            ? `<span class="promocion">🔥 ${producto.promocion}</span>`
            : ""
        }

      </div>

    </article>
  `;
}

function mostrarDestacados() {
  const contenedor = document.getElementById("destacados");

  const destacados = productos.filter(
    producto => producto.destacado
  );

  contenedor.innerHTML = destacados
    .map(crearProducto)
    .join("");
}

function mostrarProductos() {
  const catalogo = document.getElementById("catalogo");

  const busqueda = document
    .getElementById("buscador")
    .value
    .trim()
    .toLowerCase();

  const filtrados = productos.filter(producto => {

    const coincideCategoria =
      categoriaActual === "todos" ||
      producto.categoria === categoriaActual;

    const textoProducto =
      `${producto.nombre} ${producto.descripcion}`
        .toLowerCase();

    const coincideBusqueda =
      textoProducto.includes(busqueda);

    return coincideCategoria && coincideBusqueda;
  });

  if (filtrados.length === 0) {
    catalogo.innerHTML =
      `<p>No encontramos productos con esa búsqueda.</p>`;
    return;
  }

  catalogo.innerHTML = filtrados
    .map(crearProducto)
    .join("");
}

document
  .querySelectorAll(".categoria")
  .forEach(boton => {

    boton.addEventListener("click", () => {

      document
        .querySelectorAll(".categoria")
        .forEach(b => b.classList.remove("activa"));

      boton.classList.add("activa");

      categoriaActual =
        boton.dataset.categoria;

      mostrarProductos();
    });

  });

document
  .getElementById("buscador")
  .addEventListener("input", mostrarProductos);

mostrarDestacados();
mostrarProductos();
