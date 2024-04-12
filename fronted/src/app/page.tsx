async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  try { 
    const response = await fetch(baseUrl + path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  } 
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData);

  const { Title, Description } = strapiData.data.attributes;

  return (
   <main className="container mx-auto py-6">
    <h1 className="text-4xl font-bold text-center">{Title}</h1>
    <p className="text-xl mt-4 text-center">{Description}</p>
   </main>
  );
}
