import EXIF from "exif-js";

const divideCoordPair = (coordPair) => {
  return coordPair.numerator / coordPair.denominator;
};

const extractImageCoordinates = (file, handleSetCoordinates) => {
  if (file && file.name) {
    EXIF.getData(file, function () {
      var exifData = EXIF.getAllTags(this);
      let latCoord;
      let longCoord;
      if (exifData) {
        console.log(exifData);
        if (
          exifData.GPSLatitude &&
          exifData.GPSLatitudeRef &&
          exifData.GPSLongitudeRef
        ) {
          const latitude = exifData.GPSLatitude;
          const latDeg = divideCoordPair(latitude[0]);
          const latMin = divideCoordPair(latitude[1]);
          const latSec = divideCoordPair(latitude[2]);
          const latRef = exifData.GPSLatitudeRef;
          const longitude = exifData.GPSLongitude;
          const longDeg = divideCoordPair(longitude[0]);
          const longMin = divideCoordPair(longitude[1]);
          const longSec = divideCoordPair(longitude[2]);
          const longRef = exifData.GPSLongitudeRef;
          latCoord = latDeg + latMin / 60 + latSec / 3600;
          longCoord = longDeg + longMin / 60 + longSec / 3600;
          latRef === "S" && (latCoord = -latCoord);
          longRef === "W" && (longCoord = -longCoord);
        }
      } else {
        console.log("No EXIF data found in image '" + file.name + "'.");
      }
      handleSetCoordinates(latCoord, longCoord);
    });
  }
};

export default extractImageCoordinates;
