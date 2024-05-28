export type Story = {
  id: number;
  image: string;
};

export type User = {
  id: number;
  user_name: string;
  profile_image: string;
  stories: Story[];
};
