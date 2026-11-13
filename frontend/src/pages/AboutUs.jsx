const AboutUs = () => {
  return (
    <>
      <div className="text-center max-w-3xl mt-35 mx-auto px-4 py-4">
        {/* Subtitle Badge */}
        <span className="inline-block bg-blue-50 text-blue-700 text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Introducing
        </span>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          OUR COMPANY <span className="text-blue-600">&</span>
        </h1>

        {/* Secondary Title */}
        <h2 className="mt-2 text-2xl md:text-4xl font-bold text-slate-700">
          Our Intension for the Future.
        </h2>

        {/* Decorative Line */}
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>



      {/* Company Introduction Section */}
      <div className="relative max-w-6xl mx-auto px-4 py-2">

        {/* Background Image Section */}
        <div className="relative mt-14 w-full h-[500px] rounded-3xl overflow-hidden shadow-lg">

          <img
            src="/images/kk5.jpg"
            alt="Our Company Impulsion"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide font-serif">
              Our Company Impulsion
            </h1>
          </div>
        </div>

        {/* Overlapping Content Grid */}
        <div className="relative z-10 max-w-5xl mx-auto -mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">

          {/* Our Vision */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              Our Vision
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Ipsa at corporis dolor adipisci distinctio. Deserunt optio
              porro exercitationem inventore nulla quaerat.
            </p>
          </div>

          {/* Our Motto */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              Our Motto
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Ipsa at corporis dolor adipisci distinctio. Deserunt optio
              porro exercitationem inventore nulla quaerat.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              Our Mission
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Ipsa at corporis dolor adipisci distinctio. Deserunt optio
              porro exercitationem inventore nulla quaerat.
            </p>
          </div>

          {/* Our Value */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">
              Our Value
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Ipsa at corporis dolor adipisci distinctio. Deserunt optio
              porro exercitationem inventore nulla quaerat.
            </p>
          </div>

        </div>
      </div>


      <hr class="border-red-700 w-3/4 mt-12 mx-auto border-2" />

      {/* Questions & Types of Trips Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch relative">

          {/* ================= ဒေါင်လိုက်မျဉ်း (Vertical Divider) ================= */}
          {/* Desktop (lg) တွင်သာ ဘယ်နဲ့ညာ နှစ်ခုကြား ဒေါင်လိုက်မျဉ်း ပေါ်လာမည် */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 -translate-x-1/2"></div>

          {/* ================= 1. ဘယ်ဘက် အပိုင်း: 5 MOST QUESTIONS ================= */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100 flex flex-col justify-between transition hover:shadow-xl">
            <div>
              <div className="mb-8">
                <span className="inline-block bg-emerald-600 text-white text-xl md:text-2xl font-bold px-5 py-2 rounded-2xl shadow-sm tracking-wide">
                  5 MOST QUESTIONS
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-3">
                  To Our Company
                </h2>
              </div>

              {/* Questions List */}
              <div className="flex flex-col gap-6">
                {[
                  "How to Start Founded?",
                  "What's our main Intension?",
                  "Why is so good our service?",
                  "How to we made to be best Teamwork?",
                  "What drives us every day?"
                ].map((question, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-base border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      0{index + 1}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition-colors">
                        {question}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi esse voluptates ut, vitae eius.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Types of Trips */}
          <div className=" inline-block rounded-3xl p-8 md:p-10  flex-col justify-between">

            <div>
              <div className="mb-6 mt-10">
                <h2 className="inline-block bg-red-600 text-slate-100 text-3xl md:text-4xl font-bold font-serif px-5 py-1 rounded-tr-full">
                  Types of Trips
                </h2>

                <div className="mt-2">
                  <span className="inline-block bg-green-700 text-white text-xl font-bold font-serif px-4 py-1 rounded-tr-full">
                    that we are service
                  </span>
                </div>
              </div>

              {/* Trips List */}
              <ol className="list-decimal list-inside flex flex-col gap-3 text-red-900 font-bold font-serif text-lg my-6">
                <li>Hiking and camping only Trip</li>
                <li>Long Trip and making Activities</li>
                <li>Discovering wild Animals & nature walks</li>
                <li>Adventuring in Forests and wildlife safaris</li>
                <li>Research Plants, Flowers and Medical resources</li>
              </ol>
            </div>

            {/* Bottom Action Button */}
            <div className="mt-3">
              <a
                href="/posts"
                className="inline-flex items-center gap-2 bg-indigo-300 hover:bg-indigo-400 text-gray-800 font-bold font-serif text-lg px-5 py-2.5 rounded-full transition shadow"
              >
                <span>Discover your next Adventure</span>

                <span className="bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-sans">
                  ➔
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
