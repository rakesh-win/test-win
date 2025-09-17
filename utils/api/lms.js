// utils/fetchSubjects.js
import axios from "axios";

export const fetchSubjects = async (ctx = null) => {
  try {
    let token = null;

    if (typeof window !== "undefined") {
      // Client-side: get token from localStorage
      token = localStorage.getItem("token");
    } else if (ctx) {
      // Server-side: optionally fallback to cookies
      const { token: cookieToken } = parseCookies(ctx);
      token = cookieToken;
    }

    if (!token) return { data: [] };

    // Get course ID
    const id = ctx?.query?.id || null;
    if (!id) return { data: [] };

    const payload = {
      headers: { Authorization: token },
    };

    const url = `https://winupskill.in/api/api/subjects?course_id=${id}&sort_by=sortorder`;
    const response = await axios.get(url, payload);

    return { data: response.data || [] };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return { data: [] };
  }
};
