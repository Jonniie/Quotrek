import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentLocation, deleteLocation, setCurrentLocation } = useCities();
  const { city_name, emoji, date, id, lat, lng } = city;

  function handleDeleteClick(e) {
    e.preventDefault();
    deleteLocation(city.id);
  }

  const handleCityClick = () => {
    setCurrentLocation(city);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentLocation?.id ? styles["cityItem--active"] : ""
        }`}
        onClick={handleCityClick}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{city_name}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDeleteClick(e)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
