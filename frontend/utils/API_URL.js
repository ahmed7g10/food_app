export default const API_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:4000/api" 
    : "/api";