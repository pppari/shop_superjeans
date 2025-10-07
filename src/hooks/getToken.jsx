// lib/auth/getToken.js
export default function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") || null;
    }
    return null;
}
