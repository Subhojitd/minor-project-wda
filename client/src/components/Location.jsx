import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ThreeDots } from "react-loader-spinner";
const Location = () => {
  const API_KEY = "84c7ca808258b0b898a4223c1c30c9ba";
  const [locationName, setLocationName] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getuserCoordinates = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

        fetch(REVERSE_GEOCODING_URL)
          .then((res) => res.json())
          .then((data) => {
            const { name } = data[0];
            setLocationName(name);
            setTimeout(() => {
              setLoading(false); // Set loading to false after 2 seconds
            }, 2000);
          })
          .catch(() => {
            alert("Unable to fetch location");
            setTimeout(() => {
              setLoading(false); // Set loading to false after 2 seconds on error
            }, 2000);
          });
      });
    };

    getuserCoordinates();
  }, []); // Empty dependency array to run this effect once on component mount

  return (
    <div>
      {isLoading ? ( // Display loading animation if isLoading is true
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#2dd4bf"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        locationName && (
          <p className="flex flex-col tracking-wide text-sm text-black">
            {locationName} <span className="text-xs font-extrabold">India</span>
          </p>
        )
      )}
    </div>
  );
};

export default Location;
