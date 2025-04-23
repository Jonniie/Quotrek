import { useReducer } from "react";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return {
        city_name: "",
        country: "",
        emoji: "",
        date: "",
        notes: "",
        lat: "",
        lng: "",
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Form() {
  const navigate = useNavigate();
  const [mapLat, mapLong] = useUrlPosition();
  const [state, dispatch] = useReducer(formReducer, {
    city_name: "",
    country: "",
    emoji: "",
    date: "",
    notes: "",
    lat: "",
    lng: "",
  });
  const { addLocation } = useCities();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!state.city_name || !state.country || !state.date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create the location object
    const newLocation = {
      city_name: state.city_name,
      country: state.country,
      emoji: state.emoji || "🌍",
      date: new Date(state.date).toISOString(),
      notes: state.notes,
      lat: parseFloat(mapLat),
      lng: parseFloat(mapLong),
    };
    addLocation(newLocation);

    navigate("/app/cities");
    dispatch({ type: "RESET" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="city_name">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "city_name",
              value: e.target.value,
            })
          }
          value={state.city_name}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "country",
              value: e.target.value,
            })
          }
          value={state.country}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="emoji">Country Emoji (optional)</label>
        <input
          id="emoji"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "emoji",
              value: e.target.value,
            })
          }
          value={state.emoji}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {state.city_name}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "date",
              value: e.target.value,
            })
          }
          value={state.date}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {state.city_name}
        </label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "notes",
              value: e.target.value,
            })
          }
          value={state.notes}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="latitude">Latitude</label>
        <input
          id="latitude"
          type="number"
          onChange={() =>
            dispatch({
              type: "SET_FIELD",
              field: "lat",
              value: mapLat,
            })
          }
          value={mapLat}
          required
          disabled
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="longitude">Longitude</label>
        <input
          id="longitude"
          type="number"
          onChange={() =>
            dispatch({
              type: "SET_FIELD",
              field: "lng",
              value: mapLong,
            })
          }
          value={mapLong}
          required
          disabled
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
