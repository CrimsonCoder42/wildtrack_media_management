import axios from "axios";

const deleteFileFromS3 = (key, url) => {
  console.log(key);
  console.log(url);
  const dataInfo = {
    key: key,
  };

  axios
    .delete(url, { data: dataInfo })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export default deleteFileFromS3;
