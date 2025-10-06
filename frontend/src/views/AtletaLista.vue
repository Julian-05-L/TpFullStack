<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const atletas = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/atleta');
    atletas.value = response.data;
  } catch (err) {
    console.error('Error fetching atletas:', err);
    error.value = 'No se pudo cargar la lista de atletas';
  }
});

const deleteAtleta = async (dni) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este atleta?')) {
    return;
  }
  try {
    await axios.delete(`http://localhost:3000/atleta/${dni}`);
    atletas.value = atletas.value.filter(atleta => atleta.dni !== dni);
    alert('Atleta eliminado con éxito');
  } catch (err) {
    console.error('Error al eliminar atleta:', err);
    alert('Error al eliminar el atleta.');
  }
};
</script>

<template>
  <main class="container mt-4">
    <h1>Lista de Atletas</h1>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div v-else-if="atletas.length > 0" class="list-group">
      <div v-for="atleta in atletas" :key="atleta.dni" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ atleta.nombre }}</h5>
          <small>Posición: #{{ atleta.posicion }}</small>
        </div>
        <p class="mb-1">
          <strong>DNI:</strong> {{ atleta.dni }} |
          <strong>Tiempo:</strong> {{ atleta.tiempo }}
        </p>
        <div class="d-flex w-100 justify-content-between align-items-center">
            <small><strong>Ciudad:</strong> {{ atleta.ciudad.nombre }}</small>
            <button @click="deleteAtleta(atleta.dni)" class="btn btn-danger btn-sm">Borrar</button>
        </div>
      </div>
    </div>
    <p v-else class="text-center">
      Cargando atletas...
    </p>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
.list-group-item {
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
