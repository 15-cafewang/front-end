import api from "./index";

const getSearchcafe = ({ keyword, withTag, sortBy }) => {
  return api.get(`/search/cafe?keyword=${keyword}&withTag=${withTag}&page=1&size=10&isAsc=true&sortBy=${sortBy}
`);
};

const getSearchBoard = ({ keyword, sortBy }) => {
  return api.get(`/search/boards?keyword=${keyword}&page=1&size=10&isAsc=false&sortBy=${sortBy}
`);
};

export { getSearchcafe, getSearchBoard };
