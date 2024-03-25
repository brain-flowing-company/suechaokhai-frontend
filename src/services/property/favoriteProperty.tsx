export default async function favoriteProperty(property_id:string) {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/properties/favorites/${property_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        
      });
      if (!response.ok) {
        throw new Error("Failed to fav a property");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  