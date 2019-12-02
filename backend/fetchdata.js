const fetchMovies = async (title, page) => {
  const API_KEY = "568d8e5b";
  try {
    title = title.replace(/\s/, "+");
    let response = await fetch(
      `https://omdbapi.com/?s=${title}&page=${page}&apikey=${API_KEY}`
    );
    let data = await response.json();
    return data;
  } catch (err) {
    return { error: err };
  }
};

export default fetchMovies;
