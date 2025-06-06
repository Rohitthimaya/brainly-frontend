// useContent.js
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  const fetchContents = useCallback(() => {
    axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
      console.log(response)
      setContents(response.data.userContent);
    });
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  return { contents, refresh: fetchContents };
}
