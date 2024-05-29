import { faker } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/types/types";

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomImage = (w: number, h: number): string => {
  return `https://picsum.photos/${w}/${h}?random=${generateRandomNumber(1, 1000)}`;
};

// Generates a random recent date
const generateRandomTime = (): Date => {
  return faker.date.recent();
};

const generateUserData = (): User => {
  const numberOfStories = generateRandomNumber(1, 5); // Generate a random number of stories between 1 and 5
  const stories = Array.from({ length: numberOfStories }, () => ({
    id: generateRandomNumber(1, 1000),
    image: generateRandomImage(400, 800),
    posted_on: generateRandomTime(),
    data_type: "image",
  }));

  return {
    id: generateRandomNumber(1, 1000),
    user_name: faker.internet.userName(),
    profile_image: faker.image.avatar(),
    stories,
  };
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const feed = Array.from({ length: 10 }, generateUserData); // Generate an array of 10 users
  res.status(200).json({ feed });
};

export default handler;
