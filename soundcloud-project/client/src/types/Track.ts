// type for track
export interface TrackProps {
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