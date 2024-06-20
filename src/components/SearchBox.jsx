import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";


const SearchBox = ({updateInfo}) => {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false) ; 

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "a7613774b139405c82c6255d4e05cdcb";

  let getWheatherInfo = async () => {
    
        let response = await fetch(
          `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
          city: city,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
     
    
  };

  let handleChange = (e) => {
    setCity(e.target.value);
  };

  let handleSubmit = async (e) => {
    try {
        e.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWheatherInfo();
        updateInfo(newInfo);
    } catch (err) {
        setError(true);
    }
    
  };

  return (
    <div className="search-box text-center mb-[25px]">
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          value={city}
          id="city"
          label="City Name"
          variant="outlined"
          required
        />
        <br></br>
        <br></br>
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p className="text-red-600 font-medium text-lg mt-3" >No such Location in our API !!</p>}
      </form>
    </div>
  );
};

export default SearchBox
