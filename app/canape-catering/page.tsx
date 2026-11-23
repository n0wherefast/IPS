import type { Metadata } from "next";
import CateringNavbar from "../componenta/CateringNavbar";
import KitchenLayout from "../kitchen-catering/KitchenLayout";
import CanapeExperience from "./CanapeExperience";

export const metadata: Metadata = {
  title: "Canapé Catering",
  description:
    "Add Italian canapés to your next Sydney event. Explore Classic, Gourmet and Lusso packages with a choice of traditional and premium bites.",
};

export default function CanapeCateringPage() {
  return (
    <>
      <CateringNavbar currentSection="canape" />
      <KitchenLayout
        heroImage="/chef2.webp"
        title="Canapé Catering"
        subtitle="Italian-inspired bites, made for sharing. A distinctive addition to your pizza or kitchen catering."
        ctaLabel="Choose your package"
        btnBackground="bg-emerald-800"
        ctaHref="#canape-packages-title"
      >
        <CanapeExperience />
      </KitchenLayout>
    </>
  );
}
