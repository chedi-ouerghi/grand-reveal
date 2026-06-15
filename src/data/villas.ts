import villaPalm from "@/assets/villa-palm-crescent.jpg";
import villaMonolith from "@/assets/villa-emirates-monolith.jpg";
import villaMarina from "@/assets/villa-marina-sky.jpg";
import villaJumeirah from "@/assets/villa-jumeirah-bay.jpg";
import interiorBrutalist from "@/assets/interior-brutalist.jpg";
import textureStone from "@/assets/texture-stone.jpg";

export type Villa = {
  slug: string;
  volume: string;
  name: string;
  location: string;
  year: string;
  area: string;
  bedrooms: number;
  price: string;
  status: "Reserved" | "Available" | "By Invitation";
  cover: string;
  gallery: string[];
  tagline: string;
  excerpt: string;
  story: string[];
  quote: string;
};

export const villas: Villa[] = [
  {
    slug: "dhermi-crescent",
    volume: "Volume I",
    name: "Crescent House",
    location: "Dhërmi, Albanian Riviera",
    year: "2024",
    area: "2 240 m²",
    bedrooms: 7,
    price: "€18,500,000",
    status: "By Invitation",
    cover: villaPalm,
    gallery: [villaPalm, interiorBrutalist, textureStone],
    tagline: "A 60-metre infinity edge suspended above the Ionian Sea.",
    excerpt:
      "A contemporary coastal residence overlooking the Albanian Riviera, where architecture dissolves into the horizon.",
    story: [
      "Crescent House occupies one of the most privileged cliffside locations in Dhërmi. Designed around uninterrupted sea views, every room opens toward the changing blues of the Ionian coastline.",
      "The residence is composed of a series of limestone volumes wrapped in bronze detailing and floor-to-ceiling glazing. From a distance, the structure appears to float above the landscape.",
      "A sequence of private gardens and terraces follows the movement of the sun throughout the day, creating distinct atmospheres from sunrise to sunset.",
    ],
    quote:
      "Built so that the horizon remains the true centerpiece of the experience.",
  },

  {
    slug: "palase-monolith",
    volume: "Volume II",
    name: "The Limestone Monolith",
    location: "Palasë, Albanian Riviera",
    year: "2023",
    area: "1 680 m²",
    bedrooms: 6,
    price: "€12,900,000",
    status: "Available",
    cover: villaMonolith,
    gallery: [villaMonolith, interiorBrutalist, textureStone],
    tagline: "Carved from stone and positioned above the Mediterranean.",
    excerpt:
      "Three sculptural limestone volumes emerging directly from the hillside overlooking the Albanian coast.",
    story: [
      "Positioned above the crystal waters of Palasë, this residence was conceived as an extension of the landscape rather than an object placed upon it.",
      "Locally sourced limestone forms the home's architectural language, creating a timeless material palette that ages gracefully under the Mediterranean sun.",
      "At the heart of the property lies a sheltered courtyard filled with olive trees and reflecting pools, creating a private sanctuary protected from coastal winds.",
    ],
    quote:
      "A residence shaped by the landscape rather than imposed upon it.",
  },

  {
    slug: "vlore-sky",
    volume: "Volume III",
    name: "Skyline Penthouse",
    location: "Vlorë, Albania",
    year: "2022",
    area: "1 120 m²",
    bedrooms: 5,
    price: "€9,800,000",
    status: "Reserved",
    cover: villaMarina,
    gallery: [villaMarina, interiorBrutalist, textureStone],
    tagline: "An entire floor dedicated to sea, sky and privacy.",
    excerpt:
      "A duplex penthouse overlooking the Bay of Vlorë with uninterrupted panoramic views.",
    story: [
      "Designed for an international art collector, the penthouse occupies an entire upper floor and offers complete privacy above the city skyline.",
      "The interiors combine Italian stone, handcrafted walnut detailing, and custom lighting installations tailored specifically for the residence.",
      "A private rooftop terrace features an infinity pool aligned visually with the Adriatic horizon, creating the illusion of water extending endlessly into the sea.",
    ],
    quote:
      "Above the city. Beyond distraction.",
  },

  {
    slug: "ksamil-bay",
    volume: "Volume IV",
    name: "Villa Ksamil Bay",
    location: "Ksamil, Albania",
    year: "2024",
    area: "1 840 m²",
    bedrooms: 6,
    price: "€21,500,000",
    status: "Available",
    cover: villaJumeirah,
    gallery: [villaJumeirah, interiorBrutalist, textureStone],
    tagline: "A sculptural residence facing the turquoise waters of Ksamil.",
    excerpt:
      "One of the most exclusive waterfront estates on the Albanian Riviera.",
    story: [
      "Perched above the famous bays of Ksamil, the residence unfolds through a series of cascading terraces that follow the natural contours of the coastline.",
      "Natural limestone, handcrafted oak, and custom marble elements create a refined atmosphere inspired by Mediterranean living.",
      "Every principal room opens toward the sea, while a private beach platform provides direct access to the crystal-clear waters below.",
    ],
    quote:
      "Where architecture meets the Mediterranean.",
  },
];

export const getVilla = (slug: string) =>
  villas.find((v) => v.slug === slug);