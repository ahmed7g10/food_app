export  const API_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:4000/api" 
    : "/api";
export const IMAGES_PATH=import.meta.env.MODE === "development" 
? "http://localhost:4000/" 
: "/api";