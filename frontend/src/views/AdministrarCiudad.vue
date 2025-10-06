<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

const ciudades = ref([]);
const error = ref(null);

const newCiudad = reactive({ nombre: '' });
const ciudadToModify = reactive({ originalNombre: '', nuevoNombre: '' });
const ciudadToDelete = reactive({ nombre: '' });

async function fetchCiudades() {
  try {
    const response = await axios.get('http://localhost:3000/ciudad');
    ciudades.value = response.data;
  } catch (err) {
    console.error('Error fetching ciudades:', err);
    error.value = 'No se pudo cargar la lista de ciudades.';
  }
}

onMounted(fetchCiudades);

const AgregarCiudad = async () => {
  if (!newCiudad.nombre.trim()) {
    alert('El nombre de la ciudad no puede estar vacío.');
    LimpiarAgregarCiudad();
    return;
  }
  try {
    await axios.post('http://localhost:3000/ciudad', newCiudad);
    alert('Ciudad agregada con éxito');
    newCiudad.nombre = '';
    await fetchCiudades();
  } catch (error) {
    console.error('Error adding ciudad:', error);
    alert('Error al agregar la ciudad. Puede que ya exista.');
  }
};

const ModificarCiudad = async () => {
  if (!ciudadToModify.originalNombre || !ciudadToModify.nuevoNombre.trim()) {
    alert('Debe seleccionar una ciudad y proporcionar un nuevo nombre.');
    return;
  }
  try {
    await axios.patch(`http://localhost:3000/ciudad/${ciudadToModify.originalNombre}`, { nombre: ciudadToModify.nuevoNombre });
    alert('Ciudad modificada con éxito');
    ciudadToModify.originalNombre = '';
    ciudadToModify.nuevoNombre = '';
    await fetchCiudades();
  } catch (error) {
    console.error('Error al modificar la ciudad:', error);
    alert('Error al modificar la ciudad.');
  }
};

const EliminarCiudad = async () => {
  if (!ciudadToDelete.nombre) {
    alert('Debe seleccionar una ciudad para eliminar.');
    return;
  }
  if (!confirm(`¿Estás seguro de que quieres eliminar la ciudad "${ciudadToDelete.nombre}"?`)) {
    return;
  }
  try {
    await axios.delete(`http://localhost:3000/ciudad/${ciudadToDelete.nombre}`);
    alert('Ciudad eliminada con éxito');
    ciudadToDelete.nombre = '';
    await fetchCiudades();
  } catch (err) {
    console.error('Error deleting ciudad:', err);
    alert('Error al eliminar la ciudad. Asegúrate de que no tenga atletas asociados.');
  }
};

const LimpiarAgregarCiudad = async () => {
  newCiudad.nombre = ''
}
</script>

<template>
  <main class="container mt-4">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="row mt-4">
      <div class="col-md-4">
        <h2>Agregar Ciudad</h2>
        <form @submit.prevent="AgregarCiudad">
          <div class="mb-3">
            <label for="new-ciudad-nombre" class="form-label">Nombre de la Ciudad:</label>
            <input type="text" id="new-ciudad-nombre" class="form-control" v-model="newCiudad.nombre" required>
          </div>
          <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
      </div>

      <div class="col-md-4">
        <h2>Modificar Ciudad</h2>
        <form @submit.prevent="ModificarCiudad">
          <div class="mb-3">
            <label for="modify-select-ciudad" class="form-label">Seleccionar Ciudad:</label>
            <select id="modify-select-ciudad" class="form-select" v-model="ciudadToModify.originalNombre" required>
              <option value="" disabled>Elija una ciudad</option>
              <option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad.nombre">{{ ciudad.nombre }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="modify-new-nombre" class="form-label">Nuevo Nombre:</label>
            <input type="text" id="modify-new-nombre" class="form-control" v-model="ciudadToModify.nuevoNombre" required>
          </div>
          <button type="submit" class="btn btn-warning">Modificar</button>
        </form>
      </div>

      <div class="col-md-4">
        <h2>Eliminar Ciudad</h2>
        <form @submit.prevent="EliminarCiudad">
          <div class="mb-3">
            <label for="delete-select-ciudad" class="form-label">Seleccionar Ciudad:</label>
            <select id="delete-select-ciudad" class="form-select" v-model="ciudadToDelete.nombre" required>
              <option value="" disabled>Elija una ciudad</option>
              <option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad.nombre">{{ ciudad.nombre }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-danger">Eliminar</button>
        </form>
      </div>
    </div>
  </main>
</template>

