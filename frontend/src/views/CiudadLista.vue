<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const atletas = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/atleta');
    atletas.value = response.data;
  } catch (err) {
    console.error('Error fetching atletas:', err);
    error.value = 'No se pudo cargar la lista de atletas.';
  }
});

const ciudadesConAtletas = computed(() => {
  if (!atletas.value.length) return {};

  return atletas.value.reduce((acc, atleta) => {
    if (atleta.ciudad && atleta.ciudad.nombre) {
      const ciudadNombre = atleta.ciudad.nombre;
      if (!acc[ciudadNombre]) {
        acc[ciudadNombre] = [];
      }
      acc[ciudadNombre].push(atleta);
    }
    return acc;
  }, {});
});
</script>

<template>
  <main class="container mt-4">
    <h1>Lista de Ciudades y sus Atletas</h1>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div v-else-if="Object.keys(ciudadesConAtletas).length > 0">
      <div v-for="(atletasEnCiudad, ciudadNombre) in ciudadesConAtletas" :key="ciudadNombre" class="mb-4">
        <h2 class="border-bottom pb-2 mb-3">{{ ciudadNombre }}</h2>
        <ul class="list-group">
          <li v-for="atleta in atletasEnCiudad" :key="atleta.dni" class="list-group-item">
            <strong>{{ atleta.nombre }}</strong> (DNI: {{ atleta.dni }}) - Tiempo: {{ atleta.tiempo }} - Posición: #{{ atleta.posicion }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else class="text-center">
      Cargando datos...
    </p>
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
h2 {
    color: #34495e;
}
</style>
