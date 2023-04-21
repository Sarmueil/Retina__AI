import Card from "./Card";

interface Post {
  name: string;
  photo: string;
  prompt: string;
  _id: string;
}

interface RenderImageProps {
  posts: Post[];
  searchResults: Post[];
}

interface ImageCardsProps {
  data: Post[];
  title: string;
}

const ImageCards: React.FC<ImageCardsProps> = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      <>
        {data?.map((post, index) => (
          <Card key={post.prompt} {...post} index={index} />
        ))}
      </>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#FCA311] text-xl uppercase">{title}</h2>
  );
};

const MainSection: React.FC<RenderImageProps> = ({ posts, searchResults }) => {
  return (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-0 md:gap-3 max-w-[95%] md:max-w-[90%] mx-auto my-7">
      {searchResults.length > 0 ? (
        <ImageCards data={searchResults} title="No Search Results Found" /> 
      ) : (
        <ImageCards data={posts} title="No Image found" />
      )}
    </div>
  );
};

export default MainSection;