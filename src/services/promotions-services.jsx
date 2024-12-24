export async function getPromotions() {
  const url = process.env.BASE_API_URL + `/promotions`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Promotions : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
 