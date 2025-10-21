import { useEffect, useState } from "react";
import api from "./httpService";

export interface User {
  username: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const userMock: User = {
    username: "testuser",
    name: "Test User",
  };

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(userMock))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
