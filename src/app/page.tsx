import ZiarahTime from "@/components/ZiaraTime";
import { trending_data } from "@/data/trending";

export default function Home() {
  return (
    <div className="bg-blue-800">
      <main className="bg-blue-800 ">
        <section className="max-w-7xl mx-auto p-6">
          <h2 className="text-white  text-5xl">Find Your Next Destination</h2>
          <p className="text-white text-xl  py-5">
            Search your Hotels at low cost...
          </p>
        </section>

        <section className="m-4 mt-0 -mb-14 px-2 lg:px-4 flex justify-center pag-4">
          {/* searchForm */}
          {/* <SearchForm /> */}
          {/* <DatePicker /> */}
          {/* <CustomDatePicker /> */}
          {/* <FinalDatePicker /> */}
          {/* <ZiarahDate /> */}
          <ZiarahTime />
        </section>

        <section className="mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg">
          <div className="pt-5">
            <h3 className="text-xl font-bold">Trending Destinations</h3>
            <p className="font-light">
              Lorem consectetur adipisicing elit. Voluptas temporibus, quas
              officiis sed earum repellendus maiores sunt ipsum distinctio fugit
              inventore repellat veritatis omnis? Sapiente consequatur labore
              est vero dolorum?
            </p>
          </div>

          <div className="flex space-x-4 py-5 overflow-x-scroll">
            {trending_data.map((item) => (
              <div key={item.id} className="space-y-1 shrink-0 cursor-pointer">
                <img
                  src={item.src}
                  className="w-80 h-72 object-cover rounded-lg pb-2"
                  alt=""
                />
                <p className="font-bold">{item.title}</p>
                <p>{item.location}</p>
                <p className="font-light text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
