export interface ComicProps {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: [
      {
        name: string;
        role: string;
      }
    ]
  }
}