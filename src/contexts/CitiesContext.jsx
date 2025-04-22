/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/clerk-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(supabaseUrl, supabaseAnonKey, {
      async accessToken() {
        return session?.getToken() ?? null;
      },
    });
  }

  const client = createClerkSupabaseClient();

  async function addLocation(location) {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      // Insert the new location into the Supabase database
      const { data, error } = await client.from("locations").insert([
        {
          ...location,
          user_id: user.id,
        },
      ]);

      if (error) {
        console.error("Error adding location:", error);
        return;
      }

      // Update the local state with the new location
      setLocations((prevLocations) => [...prevLocations, ...data]);
    } catch (err) {
      console.error("Unexpected error adding location:", err);
    }
  }

  useEffect(() => {
    if (!user) return;
    async function fetchLocations() {
      const { data, error } = await client
        .from("locations")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching locations:", error);
      } else {
        setLocations(data);
      }
      setLoading(false);
    }
    fetchLocations();
  }, [client, user]);

  return (
    <CitiesContext.Provider value={{ locations, loading, addLocation }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
