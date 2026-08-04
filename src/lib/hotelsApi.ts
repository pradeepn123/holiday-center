import type { HotelSearchResult } from "@/types";
import { hotelSearchResults as fallbackHotels } from "./data";

const HOTELS_API_URL = "https://6a675ffb157beab892d35827.mockapi.io/api/v1/hotels";

const GALLERY_POOL = [
  "/assets/images/trending_img_1.png",
  "/assets/images/trending_img_2.png",
  "/assets/images/trending_img_3.png",
  "/assets/images/destination_image1.png",
  "/assets/images/destination_image2.png",
  "/assets/images/destination_image3.png",
  "/assets/images/destination_image4.png",
];

type ApiHotel = {
  id: number | string;
  name: string;
  countryType: string;
  city: string;
  country: string;
  address: string;
  price: number;
  currency: string;
  rating: number;
  stars: number;
  reviews: number;
  freeCancellation: boolean;
  amenities: string[];
  image: string;
  available: boolean;
};

function buildGallery(mainImage: string, seedIndex: number): string[] {
  const offset = seedIndex % GALLERY_POOL.length;
  const rotated = [...GALLERY_POOL.slice(offset), ...GALLERY_POOL.slice(0, offset)];
  return [mainImage, ...rotated.slice(0, 4)];
}

function mapApiHotel(hotel: ApiHotel, index: number): HotelSearchResult {
  return {
    id: String(hotel.id),
    name: hotel.name,
    address: `${hotel.address}, ${hotel.country}`,
    rating: hotel.rating,
    price: hotel.price,
    image: hotel.image,
    amenities: hotel.amenities,
    gallery: buildGallery(hotel.image, index),
    stars: hotel.stars,
    reviews: hotel.reviews,
    freeCancellation: hotel.freeCancellation,
  };
}

export async function fetchHotels(): Promise<HotelSearchResult[]> {
  try {
    const response = await fetch(HOTELS_API_URL, { next: { revalidate: 300 } });
    if (!response.ok) {
      throw new Error(`Hotels API responded with ${response.status}`);
    }
    const data: ApiHotel[] = await response.json();
    return data.map(mapApiHotel);
  } catch (error) {
    console.error("Could not reach hotels API, falling back to local data.", error);
    return fallbackHotels;
  }
}

export async function fetchHotelById(id: string): Promise<HotelSearchResult | undefined> {
  // The API's single-resource endpoint (`/hotels/:id`) returns 404 for every id,
  // even ones present in the collection response, so we fetch the full list instead.
  const hotels = await fetchHotels();
  return hotels.find((hotel) => hotel.id === id);
}
