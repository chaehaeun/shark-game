import axios from "axios";

const getWord = async (length: number) => {
  const response = await axios.get(
    `https://random-word-api.herokuapp.com/word?length=${length}`
  );

  return response.data;
};

export default getWord;
5;
