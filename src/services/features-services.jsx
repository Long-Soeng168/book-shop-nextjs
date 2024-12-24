export async function getFeatures() {
  const url = process.env.BASE_API_URL + `/features`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Features : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
 