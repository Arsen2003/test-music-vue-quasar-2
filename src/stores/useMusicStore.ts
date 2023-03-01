import { defineStore } from 'pinia';
import { ref } from 'vue';

type Song = {
  id: number
  title: string
  songNumber: number
}

type Album = {
  id: number
  title: string
  artist: string
  year: number
  songs: Song[]
}

type Artist = {
  id: number
  name: string
  albums: Album[]
}

export const useMusicStore = defineStore('musicState', () => {
  const artists = ref<Artist[]>([])

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('artistState')
    if (data) {
      artists.value = JSON.parse(data)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('artistState', JSON.stringify(artists.value))
  }

  const addSinger = (name: string) => {
    const newSinger: Artist = {
      id: Date.now(),
      name: name,
      albums: []
    }
    artists.value.push(newSinger)
    saveToLocalStorage()
  }

  const addAlbum = (singerId: number, title: string, year: number) => {
    const singer: Artist | undefined = artists.value.find(a => a.id === singerId)
    if (singer) {
      const newAlbum: Album = {
        id: Date.now(),
        title,
        artist: singer.name,
        year,
        songs: []
      }
      singer.albums.push(newAlbum)
      saveToLocalStorage()
    } else {
      console.error(` err ${singerId} `)
    }
  }

  const addSong = (albumId: number, title: string, songNumber: number): void => {
    const album = artists.value.flatMap((a) => a.albums).find((b) => b.id === albumId);
    if (album) {
      const newSong: Song = {
        id: Date.now(),
        title: title,
        songNumber: songNumber,
      };
      album.songs.push(newSong);
      saveToLocalStorage()
    } else {
      console.error(`err${albumId} `);
    }
  };

  const findArtistById = (id: number) => {
    return artists.value.find((artist) => artist.id === id);
  }

  const getArtistById = (id: number) => {
    const data = localStorage.getItem('artistState')
    if (data) {
      const artistsFromLocalStorage: Artist[] = JSON.parse(data)
      return artistsFromLocalStorage.find((artist) => artist.id === id);
    }
    return undefined;
  }





  loadFromLocalStorage()

  return { artists, addAlbum, addSinger, addSong, findArtistById,getArtistById };
});
