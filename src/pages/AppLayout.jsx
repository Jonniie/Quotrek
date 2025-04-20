("use client");
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession, useUser } from "@clerk/clerk-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function AppLayout() {
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
    <div className={styles.app}>
      <SideBar
        loading={loading}
        locations={locations}
        setLocations={setLocations}
      />
      <Map />
    </div>
  );
}
