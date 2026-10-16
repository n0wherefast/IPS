import React from "react";
import Image from 'next/image'
import CateringNavbar from "../componenta/CateringNavbar";
import KitchenLayout from "./KitchenLayout";
import CartProvider from '../componenta/CartProvider'
import Cart from '../componenta/Cart'
import DishList from './DishList'

const getKitchen = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const base = apiUrl ? apiUrl : "";
  const res = await fetch(base + "/api/kitchen", { next: { revalidate: 36 } });
  return await res.json();
};

const getLinkData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const base = apiUrl ? apiUrl : "";
  const res = await fetch(base + "/api/nav_data", { next: { revalidate: 36 } });
  return await res.json();
};

export default async function KitchenCateringPage() {
  const items = await getKitchen();
  const byCat: Record<string, any[]> = {};
  (items || []).forEach((it: any) => {
    (byCat[it.category] ||= []).push(it);
  });

  const links = await getLinkData();

  return (
    <>
      <CateringNavbar />
      <CartProvider>
      <KitchenLayout heroImage={'/wep_files/kitchen-hero.jpg'} title={'Kitchen Catering'} subtitle={'Our expanded kitchen catering menu — same quality, different offering.'} ctaLabel={'Book Catering'} ctaHref={'/contact'}>
        <DishList byCat={byCat} />

        {/* Landing: Features */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-amber-800 mb-6">Why choose our catering</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl">🍽️</div>
              <h4 className="mt-3 font-semibold">Signature Flavours</h4>
              <p className="text-sm text-stone-600 mt-2">Carefully crafted dishes with balanced flavours, prepared to delight guests at any event.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl">🧑‍🍳</div>
              <h4 className="mt-3 font-semibold">Experienced Chefs</h4>
              <p className="text-sm text-stone-600 mt-2">Professional team handling events of all sizes with impeccable service.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl">🌿</div>
              <h4 className="mt-3 font-semibold">Fresh Ingredients</h4>
              <p className="text-sm text-stone-600 mt-2">Locally sourced produce and premium ingredients for every dish.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="mt-12">
          <h3 className="text-2xl font-semibold text-amber-800 mb-6">What clients say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <blockquote className="p-6 bg-white rounded-lg shadow">“Fantastic food and service — our guests loved it.” — Maria</blockquote>
            <blockquote className="p-6 bg-white rounded-lg shadow">“Professional and delicious. Highly recommended.” — James</blockquote>
            <blockquote className="p-6 bg-white rounded-lg shadow">“Exceeded expectations. Great flavors.” — Anna</blockquote>
          </div>
        </section> */}

        {/* CTA strip */}
        <section className="mt-12 bg-amber-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to book your event?</h3>
          <p className="mt-2">Get a customised quote for your date and guest count.</p>
          <div className="mt-4">
            <a href="/#contact" className="inline-block bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold">Request a Quote</a>
          </div>
        </section>

      </KitchenLayout>
      <Cart />
      </CartProvider>
    </>
  );
}
