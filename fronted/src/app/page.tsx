import qs from "qs";
import { flattenAttributes } from "@/lib/utils"
import { HeroSection } from "@/components/ui/custom/HeroSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"]          
        },
        link: {
          populate: true
        }
      }
    }
  }
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;
  try { 
    const response = await fetch(url.href, {cache: 'no-store'} );

    // console.log(url)
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    // console.dir(flattenedData, { depth: null });
    return flattenedData;
  } catch (error) {
    console.error(error);
  } 
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData);

  const { title, description, blocks } = strapiData;

  return (
   <main>
    <HeroSection  data={blocks[0]} />
   </main>
  );
}
