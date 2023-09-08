import axios from 'axios';

const KEY = '38365619-1621c1d79dbc4654c84d21e00';

// axios.defaults.baseURL = `https://pixabay.com/api`;

export async function fetchImagesWithQuery(searchQuery, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  //console.log(response.data.hits);
  return { newImages: response.data.hits, totalHits: response.data.totalHits };
}
