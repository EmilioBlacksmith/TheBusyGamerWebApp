export default function Header() {
  return (
    <>
      <div className="w-5/6 h-24 rounded-b-xl bg-app-secondary drop-shadow-md sticky top-0 flex flex-row items-center justify-between p-8">
        <div className="text-4xl font-bold">
          <a
            href="/"
            className="hover:text-app-complementary hover:cursor-pointer"
          >
            The Busy Gamer
          </a>
          <a className="text-sm font-thin text-app-grey pl-8">
            I can only play 2 hours... :(
          </a>
        </div>
        <div className="flex flex-row gap-3">
          <div className="bg-app-complementary h-10 w-10 rounded-md items-center justify-center flex text-xl drop-shadow-md hover:cursor-pointer hover:scale-105">
            
          </div>
          <div className="bg-app-complementary h-10 w-10 rounded-md items-center pl-3 flex text-lg drop-shadow-md hover:cursor-pointer hover:scale-105">
            
          </div>
        </div>
      </div>
    </>
  );
}
