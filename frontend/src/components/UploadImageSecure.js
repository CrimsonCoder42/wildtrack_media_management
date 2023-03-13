import axios from "axios";

const uploadFileToS3 = async (file, handleMetadataFromUpload) => {
  // Config to retrieve upload URL
  const url =
    "https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/get-upload-url";
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "" + file.type,
    },
  };

  //Retrieve upload URL
  fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
      const result = data;
      console.log("Res: ", result);
      handleMetadataFromUpload(result.data.fields.key, result.url);

      const headerInfo = {
        headers: {
          "x-amz-acl": "public-read",
          "Content-Type": "" + file.type,
        },
      };

      // Put the file in S3 url
      axios
        .put(data.url, file, headerInfo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default uploadFileToS3;
