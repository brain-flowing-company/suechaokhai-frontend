export default async function getCurrentUser() {
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/user/me/personal-information",
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}