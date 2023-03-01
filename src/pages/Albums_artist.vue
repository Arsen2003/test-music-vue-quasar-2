<template>
  <q-layout view="hHh lpR fFf">
    <q-form @reset="onReset()" class="q-gutter-md">
      <q-input filled v-model="title" label="Album title *" />
      <q-input filled v-model="year" label="Album year *" />
      <div>
        <q-btn
        @click="musicStore.addAlbum(Number(idd), title, year)"
          label="Add new album"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>

    <div class="row">
        <q-card v-for="album in albums" :key="album.id" class="my-card col-3">
          <q-card-section class="bg-teal text-white">
            <div class="text-h6">{{ album.title }}</div>
          </q-card-section>

          <q-card-actions vertical align="right">
            <q-btn flat @click="showSongForm(album)">add songs</q-btn>
          </q-card-actions>
          <q-list>
            <q-item v-for="song in album.songs" :key="song.id">
            <strong> name: {{ song.title }}</strong>
              <span>  №  {{ song.songNumber }}</span>

            </q-item>
          </q-list>
        </q-card>

      <q-dialog v-model="songFormVisible">
      <q-card>
        <q-card-section>
          <q-form >
            <q-input filled v-model="songTitle" label="Song title *" />
            <q-input filled v-model="songNumber" label="Song number *" type="number" />
            <q-btn  @click="musicStore.addSong(songAlbumId, songTitle, songNumber)" type="submit" label="Add song" color="primary" />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" color="primary" @click="songFormVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </div>
  </q-layout>
</template>

<script setup>
import { useMusicStore } from 'src/stores/useMusicStore';
import { computed, } from 'vue';

import { useRoute } from 'vue-router';
import { ref } from 'vue';

const  route = useRoute()
const musicStore = useMusicStore();





const idd = route.params.id







const showModal = ref(false)

const title = ref('');
const year = ref('');

const songTitle = ref('');
const songNumber = ref(1);
const songAlbumId = ref(null);
const songFormVisible = ref(false);


const onReset = () => {
  title.value = '';
  year.value = '';
};


const albums = computed(() => {
  const artist = ref(musicStore.findArtistById(Number(idd)))
  if (artist.value) {

    return artist.value.albums;
  } else {
    console.error(`err ${idd} `);
    return [];
  }
});


const showSongForm = (album) => {
  songAlbumId.value = album.id;
  songFormVisible.value = true;
};

</script>

<style>
.q-form {
  max-width: 400px;
  margin: 5% auto;
}


.my-card {

  margin-bottom: 20px;
}
.row{
  display: flex;
  justify-content: center;
}
.q-card{
  margin: 20px;
}
.q-item{
  display: flex;
  flex-direction: column;
  border: 2px solid black;
}

</style>