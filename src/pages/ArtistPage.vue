<template>
 <q-layout view="hHh lpR fFf">
  <Header/>


<div class="row">

    <q-card v-for="artist in artists" :key=artist.id class="my-card col-3">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6">{{ artist.name }}</div>

      </q-card-section>

      <q-card-actions vertical align="right">
        <q-btn @click="goToAlbums(artist.id)" flat>albums</q-btn>

      </q-card-actions>
    </q-card>



    </div>

 </q-layout>



</template>

<script setup>
import Header from 'src/components/Main_header.vue';
import { useMusicStore } from 'src/stores/useMusicStore';
import {  useRouter } from 'vue-router';
const artists = useMusicStore().artists

const router = useRouter()

const goToAlbums = (id) => {
  router.push({ name: 'albums', params: { id: id } });
  console.log(typeof id)
};

</script>
<style lang="css" scoped>

.row{
  width: 90%;
  margin: 5% auto;



  justify-content: center;
}
.row > div {
  padding: 10px 15px;
  background:rgba(156, 39, 176);
  border: 1px solid rgba(86, 61, 124, .2);
  margin: 1%;

}

.row + .row {
  margin-top: 1rem;
}

</style>