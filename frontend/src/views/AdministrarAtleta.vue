<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import axios from 'axios';

const ciudades = ref([]);
const atletas = ref([]);

const newAtleta = reactive({
  nombre: '',
  dni: '',
  tiempo: '',
  posicion: '',
  ciudad: '',
});

onMounted(async () => {
  try{
    const [resAtleta, resCiudades] = await Promise.all([
    axios.get('http://localhost:3000/atleta'),
    axios.get('http://localhost:3000/ciudad')
    ])

    atletas.value = resAtleta.data;
    ciudades.value = resCiudades.data;
  }catch(error){
    console.error('Erros al cargar los datos...', error)
  }
})

const AgregarAtleta = async() => {
  try{
    await axios.post('http://localhost:3000/atleta', newAtleta)
    alert('Atleta agregado con exito!');
    LimpiarFormAtleta();
  }catch(error){
    console.error('Error al agregar atleta', error)
  }
}

const atletaToModify = reactive({
  nombre: '',
  dni: '',
  tiempo: '',
  posicion: null,
  ciudad: ''
});

const ModificarAtleta = async() => {
  try{
    const dataToUpdate = {
      nombre: atletaToModify.nombre,
      tiempo: atletaToModify.tiempo,
      posicion: atletaToModify.posicion,
      ciudad: atletaToModify.ciudad
    };

    await axios.patch(`http://localhost:3000/atleta/${atletaToModify.dni}`, dataToUpdate)
    alert('Atleta modificado con exito!')
  }catch(error){
    console.error('Error al modificar atleta', error);
    alert('Error al modificar atleta')
  }
}

const LimpiarFormAtleta = () => {
  newAtleta.nombre = '',
  newAtleta.dni = null,
  newAtleta.tiempo = '',
  newAtleta.posicion = null,
  newAtleta.ciudad = ''
}
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <form @submit.prevent="AgregarAtleta">
          <h2>Agregar un atleta</h2>
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="nombre" v-model="newAtleta.nombre" required />
          </div>
          <div class="mb-3">
            <label for="dni" class="form-label">DNI:</label>
            <input type="number" class="form-control" id="dni" v-model="newAtleta.dni" required />
          </div>
          <div class="mb-3">
            <label for="tiempo" class="form-label">Tiempo:</label>
            <input type="text" class="form-control" id="tiempo" v-model="newAtleta.tiempo" placeholder="Ej: 1h 1m 1s" required />
          </div>
          <div class="mb-3">
            <label for="posicion" class="form-label">Posición:</label>
            <input type="number" class="form-control" id="posicion" v-model="newAtleta.posicion" required />
          </div>
          <div class="mb-3">
            <label for="ciudad" class="form-label">Ciudad:</label>
            <select class="form-select" id="ciudad" v-model="newAtleta.ciudad" required>
              <option value="" disabled>Seleccione una ciudad</option>
              <option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad.nombre">{{ ciudad.nombre }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Agregar Atleta</button>
        </form>
      </div>

      <div class="col-md-5">
        <form @submit.prevent="ModificarAtleta">
          <h2>Modificar un atleta</h2>
          <div class="mb-3">
            <label for="atleta_a_modificar" class="form-label">Seleccionar Atleta (por DNI):</label>
            <select class="form-select" id="atleta_a_modificar" v-model="atletaToModify.dni" >
              <option value="" disabled>Seleccione un atleta</option>
              <option v-for="atleta in atletas" :key="atleta.dni" :value="atleta.dni" > {{ atleta.nombre }} - ({{ atleta.dni }})</option>
            </select>
          </div>
          <div>
            <div class="mb-3">
              <label for="nombre_modificar" class="form-label">Nombre:</label>
              <input type="text" class="form-control" id="nombre_modificar" v-model="atletaToModify.nombre" required />
            </div>
            <div class="mb-3">
              <label for="tiempo_modificar" class="form-label">Tiempo:</label>
              <input type="text" class="form-control" id="tiempo_modificar" v-model="atletaToModify.tiempo" placeholder="Ej: 1h 1m 1s" required />
            </div>
            <div class="mb-3">
              <label for="posicion_modificar" class="form-label">Posición:</label>
              <input type="number" class="form-control" id="posicion_modificar" v-model="atletaToModify.posicion" required />
            </div>
            <div class="mb-3">
              <label for="ciudad_modificar" class="form-label">Ciudad:</label>
              <select class="form-select" id="ciudad_modificar" v-model="atletaToModify.ciudad" required>
                <option value="" disabled>Seleccione una ciudad</option>
                <option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad.nombre">{{ ciudad.nombre }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-warning">Modificar Atleta</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
