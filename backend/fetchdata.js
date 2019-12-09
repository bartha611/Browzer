export const fetchMovies = async (title, page) => {
  const API_KEY = "568d8e5b";
  try {
    const search = title.replace(/\s/g, "+");
    const response = await fetch(
      `https://omdbapi.com/?s=${search}&page=${page}&apikey=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    console.group();
    console.log(search);
    console.group();
    console.log(typeof data.Search);
    if (data.Error) {
      return { error: "Movies not found" };
    }
    return { data: data.Search };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const fetchTitle = async id => {
  const API_KEY = "568d8e5b";
  try {
    const response = await fetch(
      `https://omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );
    const data = await response.json();
    if (data.Error) {
      return { error: "Movie not found" };
    }
    return { data };
  } catch (err) {
    return { error: err };
  }
};
