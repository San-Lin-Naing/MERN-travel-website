function Footer() {
    return (
        <footer class="bg-slate-200 text-slate-800 pt-12 pb-6 border-t border-slate-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* <!-- အဓိက Footer Grid (Div 4 ခု) --> */}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* <!-- Div 1: Logo, Follow Us & Social Icons --> */}
                    <div class="flex flex-col gap-6">
                        {/* <!-- Logo Image --> */}
                        <div>
                            <img src="/public/images/logo.png" alt="UPK Jinghpaw Logo" class="h-22 pr-5 pt-2 object-contain " />
                        </div>


                        {/* <!-- Follow Us & Social Icons --> */}
                        <div>
                            <h3 className="text-lg font-bold mb-3 pl-9 text-amber-900">Follow Us</h3>
                            <div className="flex items-center gap-2 text-slate-700">
                                {/* Instagram */}
                                <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                {/* Facebook */}
                                <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.615V8z" />
                                    </svg>
                                </a>

                                {/* YouTube */}
                                <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                {/* Twitter / X */}
                                <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-black hover:text-white transition-all shadow-sm">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                {/* TikTok */}
                                <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 hover:bg-black hover:text-white transition-all shadow-sm">
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Div 2: Top Destinations (Links) --> */}
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-slate-900 text-center md:text-left">Top Destinations</h3>
                        <ul class="flex flex-col gap-2.5 text-center md:text-left">
                            <li>
                                <a href="https://www.google.com/maps/place/Puta-O/@27.3154978,97.4080897,12380m/data=!3m2!1e3!4b1!4m6!3m5!1s0x373cead3839780e3:0x967772a86ca3514c!8m2!3d27.3181901!4d97.4056928!16zL20vMDd0ZjRz?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D"
                                    class="text-red-800 underline font-medium hover:text-red-600 transition">Putao City</a>
                            </li>
                            <li>
                                <a href="https://www.google.com/maps/place/Hkakabo+Razi/@28.330071,97.2848304,98122m/data=!3m1!1e3!4m6!3m5!1s0x373d5b84fa535439:0xc2f0ca36b80d32b2!8m2!3d28.33!4d97.5347222!16zL20vMDQxcnhy?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D"
                                    class="text-red-800 underline font-medium hover:text-red-600 transition">Hkhakaborazi National Park</a>
                            </li>
                            <li>
                                <a href="https://www.google.com/maps/place/Tahaundam/@28.168563,97.6777005,1535m/data=!3m2!1e3!4b1!4m6!3m5!1s0x373d4948342ab749:0x29b93b38e18bdd64!8m2!3d28.1684545!4d97.6794049!16s%2Fg%2F11wjccft8b?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D"
                                    class="text-red-800 underline font-medium hover:text-red-600 transition">Tahaundam Village</a>
                            </li>
                            <li>
                                <a href="https://www.google.com/maps/place/Naungmon/@27.5069767,97.8131461,3090m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3723329aa95f4bf9:0xaa4144b5ea406987!8m2!3d27.5075505!4d97.8136818!16s%2Fm%2F03hj_t7?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D"
                                    class="text-red-800 underline font-medium hover:text-red-600 transition">Naungmon City</a>
                            </li>
                            <li>
                                <a href="google.com/maps/place/Pannandin/@27.9475539,97.7839361,94502m/data=!3m1!1e3!4m6!3m5!1s0x3722d6748d1b14bd:0x4f202b196508cd8!8m2!3d27.7283056!4d97.878963!16s%2Fg%2F12j033jj6?authuser=0&entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D"
                                    class="text-red-800 underline font-medium hover:text-red-600 transition">Pannandin Village</a>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Div 3: Contact Us --> */}
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-slate-900 text-center md:text-left">Contact Us</h3>
                        <div class="flex flex-col gap-4 text-sm text-slate-700">
                            {/* <!-- Phone --> */}
                            <div class="flex items-start gap-3">
                                <span class="text-base mt-0.5">📞</span>
                                <div>
                                    <p class="font-bold text-slate-900">Phone/Viber/WhatsApp</p>
                                    <p className="font-semibold text-amber-950">+95 977725284</p>
                                </div>
                            </div>
                            {/* <!-- Email --> */}
                            <div class="flex items-start gap-3">
                                <span class="text-base mt-0.5">✉️</span>
                                <div>
                                    <p class="font-bold text-slate-900">Email</p>
                                    <p className="font-semibold text-amber-950">upkinfo11178@gmail.com</p>
                                    <p className="font-semibold text-amber-950">jpawadmin344@gmail.com</p>
                                </div>
                            </div>
                            {/* <!-- Address --> */}
                            <div class="flex items-start gap-3">
                                <span class="text-base mt-0.5">📍</span>
                                <div>
                                    <p class="font-bold text-slate-900">Address</p>
                                    <p className="font-semibold  text-amber-950">No-702, Yamonna Street, Hinn Si Kon quarter, Thingangyun townships.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 
      <!-- Div 4: Payment Methods --> */}
                    <div>
                        <h3 class="text-xl font-bold mb-4 text-slate-900">
                            <span class="bg-red-500 text-amber-50 px-2 py-1 ">Payment</span>
                            <span class="text-gray-700 bg-yellow-300 px-2 py-1  ">Methods</span>
                        </h3>
                        <p class=" font-medium text-amber-950 mb-4">Secure payments via Visa, PayPal, Mastercard, ApplePay, GPay and KPay</p>

                        {/* <!-- Payment Logos Grid --> */}
                        <div class="flex flex-wrap items-center gap-3">
                            <img src="/images/p9.jpg" alt="Visa" class="h-6 object-contain" />
                            <img src="/images/p11.jpg" alt="PayPal" class="h-8 object-contain" />
                            <img src="/images/p33.jpg" alt="Mastercard" class="h-9 object-contain" />
                            <img src="/images/p4.jpg" alt="Apple Pay" class="h-8 ml-2 object-contain" />
                            <img src="/images/p7.jpg" alt="Google Pay" class="h-8 object-contain" />
                            <img src="/images/unnamed.png" alt="Google Pay" class="h-9 object-contain" />
                        </div>
                    </div>

                </div>

                {/* <!-- အောက်ခြေ Divider Line --> */}
                <hr class="border-slate-500 mb-6" />

                {/* <!-- အောက်ဆုံးပိုင်း (App Download, Subscribe နဲ့ Copyright) --> */}
                <div class="flex flex-col lg:flex-row items-center justify-between gap-6">

                    {/* <!-- Play Store & App Store Buttons --> */}
                    <div>
                        <a href="#">
                            <img src="/public/images/store.jpg" alt="Get it on Google Play" class="h-13 object-contain" />
                        </a>
                    </div>

                    {/* <!-- Email Subscribe Input --> */}
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold tracking-wider text-slate-900">SUBSCRIBE FOR EMAIL UPDATES</span>
                        <button class="bg-white border-2 border-slate-900 px-4 py-1 text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition rounded">
                            SUBSCRIBE
                        </button>
                    </div>

                    {/* <!-- Copyright Text --> */}
                    <div class="text-xs text-slate-700 font-medium">
                        &copy; 2026 UPK Jinghpaw. All rights reserved.
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer