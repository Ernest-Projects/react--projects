// type for track
export interface Track {
  id: number;
  audio: string;
  image: string;
  title: {
    name: string;
    subtitle: string;
  };
  liked: boolean;
  setted: boolean;
  playable: boolean;
}