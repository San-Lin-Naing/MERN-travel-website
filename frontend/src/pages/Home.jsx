import { Link } from "react-router-dom";
import ReviewsSection from "../components/home/ReviewsSection.jsx";

const benefits = [
  {
    title: "Discover destinations",
    description: "Explore travel ideas and find your next destination.",
  },
  {
    title: "Simple booking",
    description: "Choose a package, select a date and submit a booking.",
  },
  {
    title: "Booking updates",
    description: "Track your booking status from your account.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[680px] overflow-hidden text-white">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
        </video>

        {/* <img
  src="/images/destinations/bagan.jpg"
  alt="Bagan"
  className="h-64 w-full object-cover"
/> */}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28">

          <span className="w-fit mt-7 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">
            Your next adventure starts here
          </span>

          <h1 className="mt-2 max-w-3xl text-shadow-black text-mist-300 text-4xl font-extrabold leading-tight sm:text-5xl">
            If you love nature and adventure, you're in the right place.
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-blue-200">
            Explore travel packages, plan your next journey and manage
            your bookings with UPK Jinghpaw.
          </p>

          <Link
            to="/posts"
            className="mt-5 w-fit rounded-lg bg-blue-800 px-6 py-3 font-bold text-mist-200 transition hover:bg-blue-900"
          >
            Explore Travel Packages ⇨
          </Link>

        </div>
      </section>

      <hr class="border-red-700 w-3/4 mt-12 mx-auto border-2" />
      <hr class="border-green-700 w-3/4  mx-auto border-2" />

      <div className="flex flex-wrap justify-center items-center gap-1 mx-auto text-center mt-9">
        <h1 className="text-3xl font-bold">Why should you explore to</h1>
        <h1 className="text-3xl font-bold text-white bg-blue-800 py-1 px-2">Upper Kachin State!</h1>
      </div>

      <p className="text-amber-950 font-serif font-bold mt-3 mb-5 text-center">
        Here are the some reasons to travel to upper kachin state. <br />
        It's will not have everything in there but I promise you will find a better connection.
      </p>


{/* ========================================================================================================================== */}



{/* 5 div */}
      <div class="max-w-7xl mx-auto px-4 py-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        
          <div class="flex flex-col gap-6 ">
            {/* <!-- Div 1 --> */}
            <div class="bg-slate-200 p-10 rounded-2xl shadow-sm text-center">
              <h3 class="text-xl font-bold mb-3 text-slate-900">Rich Biodiversity</h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                Upper Kachin State in northern Myanmar is a globally recognized part of the Indo-Burma biodiversity hotspot, featuring a dramatic transition from the eastern Himalayan snow-capped peaks to subtropical and tropical moist forests.
              </p>
            </div>

            {/* <!-- Div 2 --> */}
            <div class="bg-slate-200 p-10 rounded-2xl shadow-sm text-center">
              <h3 class="text-xl font-bold mb-3 text-slate-900">Cultures of Ethnic People</h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                Upper Kachin State (such as the northernmost areas around Putao, Sumprabon, and the Hukawng Valley) is home to several distinct ethnic and sub-ethnic groups, often broadly referred to as the Kachin people as well as other highland minorities.
              </p>
            </div>
          </div>

        
          <div class="w-full h-full">
            <img
              src="/images/f21.jpg"
              alt="Central Image"
              class="w-full h-[500px] object-cover rounded-3xl shadow-md transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
            />
          </div>

          
          <div class="flex flex-col gap-6">
            {/* <!-- Div 3 --> */}
            <div class="bg-slate-200 p-10 rounded-2xl shadow-sm text-center">
              <h3 class="text-xl font-bold mb-3 text-slate-900">Abundant Mineral Resources</h3>
              <p class="text-sm text-slate-700 leading-relaxed">

                Most resource-rich regions, containing valuable minerals, timber, and water reserves. Jade, Heavy Rare Earth(HREEs), Gold, Amber and other metals and minerals.Deposits include copper, lead, iron, tin, and precious/semi-precious stones like rubies.
              </p>
            </div>

            {/* <!-- Div 4 --> */}
            <div class="bg-slate-200 p-10 rounded-2xl shadow-sm text-center">
              <h3 class="text-xl font-bold mb-3 text-slate-900">Spending Time in Nature</h3>
              <p class="text-sm text-slate-700 leading-relaxed">
                Spending time in nature delivers proven physical, mental, and social benefits backed by scientific research from UCLA Health suggests aiming for at least two hours a week in nature (roughly 17 minutes) to experience these positive shifts.
              </p>
            </div>
          </div>

        </div>
      </div>


{/* ===================================================================================================================== */}


      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">

          <p className="text-xl font-bold uppercase tracking-wider text-white bg-amber-300 inline-block py-1 px-2">
            How UPKJinghpaw?
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Travel planning made simple
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {benefits.map((item, index) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-blue-50 p-6 shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                0{index + 1}
              </span>

              <h3 className="mt-4 text-lg font-bold">
                {item.title}
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>



{/* ================================================================================================================================ */}


      {/* 4 cards and 1 photo with Header */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white">

        {/* ================= Section Header (အလယ်တည့်တည့်သို့ ပို့ထားခြင်း) ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Small Top Badge */}
          <span className="inline-block bg-blue-50 text-blue-600 text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-sm border border-blue-100">
            Featured Destinations
          </span>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            TOP ICONIC PLACES
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-3 text-base md:text-lg text-slate-600 font-normal">
            Plan your trip and create your traveling story with us.
          </p>

          {/* Decorative Line */}
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* ================= Main Layout Grid (ဘယ်ဘက် ကတ် ၄ ခု၊ ညာဘက် ပုံတစ်ပုံ) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ဘယ်ဘက် အပိုင်း: ကတ် ၄ ခုပါသည့် Grid (၂ ကော်လံ) */}
          <div className="lg:col-span-2">

            {/* ကတ် ၄ ခုပါသော Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden">
                  <img src="/images/c1.jpg" alt="Card Image 1" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Tahaundam</span>
                  <a href="/posts" className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs hover:bg-emerald-700 transition">view tour &gt;</a>
                  <span>$450.00</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden">
                  <img src="/images/c2.jpg" alt="Card Image 2" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Pannandin</span>
                  <a href="/posts" className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs hover:bg-emerald-700 transition">view tour &gt;</a>
                  <span>$380.00</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden">
                  <img src="/images/c3.jpg" alt="Card Image 3" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Machanbaw</span>
                  <a href="/posts" className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs hover:bg-emerald-700 transition">view tour &gt;</a>
                  <span>$240.00</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4 overflow-hidden">
                  <img src="/images/c4.jpg" alt="Card Image 4" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Tasu_Htu</span>
                  <a href="/posts" className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs hover:bg-emerald-700 transition">view tour &gt;</a>
                  <span>$400.00</span>
                </div>
              </div>

            </div>

            {/* Show More Button*/}
            <div className="mt-5 flex justify-center">
              <a href="/posts">
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 transition">
                Show more
                <span>▶</span>
              </button>
                </a>           
            </div>

          </div>

          {/* (Traveler Image) */}
          <div className="flex justify-center items-center lg:justify-end h-full">
            <div className="w-full max-w-md h-[500px]  overflow-hidden flex items-center justify-center pb-6 pr-6">
              <img src="/images/place.jpg" alt="Traveler" className="w-full h-full object-contain" />
            </div>
          </div>

        </div>
      </div>


      {/* Customer Reviews Section */}
      <ReviewsSection />

      
    </div>
  );
}