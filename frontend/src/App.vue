<template>
  <div id="app-container">
    <header class="app-header">
      <h1>Maratón App</h1>
      <nav>
        <router-link to="/">Lista de Atletas</router-link>
        <router-link to="/atletas">Administrar Atletas</router-link>
        <router-link to="/listciudades">Lista de Ciudades</router-link>
        <router-link to="/ciudades">Administrar Ciudades</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
#app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f0f8f0;
  min-height: 100vh;
}

.app-header {
  background-color: #34495e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1.1rem;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
}

nav a.router-link-exact-active {
  border-bottom-color: #42b983;
}

.app-main {
  padding: 1rem 2rem;
}
</style>
