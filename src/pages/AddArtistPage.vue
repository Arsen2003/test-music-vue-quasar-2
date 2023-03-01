<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        
      />
      <div>
        <q-btn @click="addNewArtist" label="Add new artist" type="submit" color="primary" />
      </div>
    </q-form>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import Header from 'src/components/Main_header.vue';
import { useMusicStore } from 'src/stores/useMusicStore';

const musicStore = useMusicStore();

const name = ref('');

const addNewArtist = () => {
  musicStore.addSinger(name.value);
  name.value = '';
};
</script>

<style lang="css" scoped>
.q-form {
  max-width: 400px;
  margin: 15% auto;
}
</style>