export async function fetchData(apiRoute) {
    const url = `https://newsapi.org/v2/${apiRoute}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
