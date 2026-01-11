'use client'
import { useEffect,useState} from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS_TO_SHOW = 4;

function WrappedReviews({reviews}:any) {
    const [rev, setRev] = useState(() => reviews.slice(0, REVIEWS_TO_SHOW));

    useEffect(()=>{
        const shuffled = [...reviews].sort(() => 0.5 - Math.random());
         setRev(shuffled.slice(0, REVIEWS_TO_SHOW));
        //  return shuffled.slice(0, count);
    },[reviews])
   
  return (
<section id="reviews" className="bg-stone-50 py-20" itemScope itemType="https://schema.org/LocalBusiness">
            <meta itemProp="name" content="Italian Pizza Sydney" />


            <div className="max-w-8xl mx-auto px-10">
            {/* Aggregate rating */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                <p className="text-5xl font-serif">5 <span className="text-2xl text-stone-500">/ 5</span></p>
                <div className="mt-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <p className="mt-2 text-stone-600">Based on 36 Google reviews</p>
                </motion.div>


                {/* Reviews */}
                <div className="mt-14  grid gap-8 md:grid-cols-4">
                        {rev.map((review:any, idx:any) => ( 
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200"
                            itemScope
                            itemType="https://schema.org/Review"
                        >
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-rose-600 text-white flex items-center justify-center font-semibold text-xl">
                            {review.initial}
                            </div>
                                <div>
                                <p className="font-semibold" itemProp="author">{review.name}</p>
                                    <div
                                    className="flex"
                                    itemProp="reviewRating"
                                    itemScope
                                    itemType="https://schema.org/Rating"
                                    >
                                    <meta itemProp="ratingValue" content={String(review.stars)} />
                                    <meta itemProp="bestRating" content="5" />
                                    {[...Array(review.stars)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    </div>
                                </div>
                            </div>


                        <p className="mt-4 text-stone-700 leading-relaxed" itemProp="reviewBody">
                        “{review.text}”
                        </p>
                        </motion.article>
                        ))}
                </div>


                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                <a
                    href="https://www.google.com/search?sca_esv=24c2783e3551f6b0&sxsrf=AE3TifOxRCgZWgM_9FFUV_OySWWC_8EJLQ:1767616470975&q=Italian%20pizza%20catering%20Recensioni&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDEwtDA3MzK2MLS0NDM2MDS1NNrAyPiKUdGzJDEnMzFPoSCzqipRITmxJLUoMy9dISg1OTWvODM_L3MRK2E1AOfG8p1jAAAA&rldimm=14018762381996301592&tbm=lcl&hl=it-IT&sa=X&ved=0CAcQ5foLahcKEwi40ay_tPSRAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2tWc1owZEphR3RtYWtscFprNU9NblJuY0dwVVgwRRAB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-white shadow hover:shadow-lg transition"
                    >
                    Leave a review on Google ⭐
                </a>
                </motion.div>
            </div>
</section>
  )
}

export default WrappedReviews
