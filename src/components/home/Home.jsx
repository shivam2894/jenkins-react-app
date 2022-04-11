import HomeCards from "./HomeCards";

const Home = () => {
  return (
    <>
      <main className="flex-1">
        <div className="shadow-lg m-4 rounded-md border">
          <div className="w-full justify-between p-2">
            <h1 className="text-3xl font-light text-gray-700 font-sans mx-3 mb-2">
              Welcome, Gulshan
            </h1>
            <span className="text-gray-700 font-sans mx-3">
              Walk Through the Features We have to offer
            </span>
          </div>
        </div>
        <div className="py-2">
          <div className="max-w-8xl mx-16 px-4 sm:px-6 md:px-8 flex items-center">
            {/* Replace with your content */}
            {/* <LandingCarousal /> */}
            <HomeCards />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;