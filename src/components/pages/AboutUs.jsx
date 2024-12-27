import React from "react";
import { Container } from "../index";

export default function AboutUs() {
  const content = {
    intro: {
      text: "Welcome to DualCart, your go-to destination for high-quality products at prices you'll love. We believe in making shopping not just easy but enjoyable, by curating a wide range of trendy and practical items to suit every lifestyle.",
      img: "/logo/fulllogo_transparent_nobuffer.png",
    },

    mission: {
      text: "Our mission is simple: to make shopping accessible, convenient, and inspiring for everyone. Whether you're looking for the latest fashion, home essentials, or unique finds, we're here to help you discover exactly what you need.",
      img: "/logo/fulllogo_transparent_nobuffer.png",
    },

    coreValues: [
      {
        heading: "Customer Satisfaction",
        text: "Your happiness is our priority, and we go the extra mile to ensure a seamless shopping experience.",
      },
      {
        heading: "Quality Assurance",
        text: "We stand by the quality of every product we offer, delivering excellence you can trust.",
      },
      {
        heading: "Innovation",
        text: "We're always exploring new trends and technologies to bring you the best in modern shopping.",
      },
    ],
    history: [
      "DualCart began its journey in 2023 with a simple yet ambitious vision: to bridge the gap between buyers and sellers by creating a seamless, user-friendly platform. What started as a small idea in a cozy home office has grown into a thriving e-commerce store, connecting customers with top-quality products from trusted brands and vendors.",
      "Our story is rooted in a passion for providing value and making shopping an experience rather than just a transaction. From hand-picking the first collection of products to serving thousands of satisfied customers today, every step has been driven by a commitment to excellence.",
      "Join us on this journey as we continue to grow, innovate, and bring the world’s best products right to your doorstep!",
    ],
  };

  const cards = [
    {
      heading: "Wide Range of Products",
      description:
        "Discover an extensive selection of items across various categories.",
    },
    {
      heading: "Secure Payment Options",
      description:
        "Shop with confidence using our safe and encrypted payment methods.",
    },
    {
      heading: "24/7 Support",
      description: "We're here to assist you at any time, day or night.",
    },
  ];

  return (
    <Container childElemClass="pt-32">
      <div className="card lg:card-side shadow-xl">
        <figure className="bg-amber-800 p-8">
          <img src={content.intro.img} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-amber-800 font-bold">Introduction</h2>
          <p className="text-gray-700">{content.intro.text}</p>
          <h2 className="text-2xl text-amber-800 font-bold">Our Mission</h2>
          <p className="text-gray-700">{content.mission.text}</p>

          <h2 className="text-2xl text-amber-800 font-bold">Core Values</h2>
          <ul className="space-y-3">
            {content.coreValues.map((text, i) => (
              <li className="font-semibold text-amber-800" key={i}>
                {text.heading}:
                <span className="text-gray-800 font-light"> {text.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-200 py-10 px-5 my-20 sm:px-10">
        <h2 className="text-3xl font-bold text-black text-center mb-14">
          What is <span className="text-amber-700">our process?</span>
        </h2>

        <div className="relative max-w-4xl mx-auto flex justify-center items-center">
          <div className="relative w-72 h-72 rounded-full border-4 border-gray-300 flex justify-center items-center">
            {/* Center Text */}
            <p className="absolute text-center text-lg font-medium text-gray-700">
              Start Shopping!
            </p>

            {/* Step 1 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                1
              </div>
              <p className="mt-2 text-sm text-gray-700">Browse Products</p>
            </div>

            {/* Step 2 */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                2
              </div>
              <p className="mt-2 text-sm text-gray-700">Add to Cart</p>
            </div>

            {/* Step 3 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                3
              </div>
              <p className="mt-2 text-sm text-gray-700">Place Your Order</p>
            </div>

            {/* Step 4 */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-800 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                4
              </div>
              <p className="mt-2 text-sm text-gray-700">Get It Delivered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card lg:card-side shadow-xl">
        <figure className="bg-amber-800 p-8">
          <img src={content.intro.img} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="text-2xl text-amber-800 font-bold">History</h2>
          {content.history.map((text, i) => (
            <p className="text-gray-700" key={i}>
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-10 px-5 sm:px-10">
        <h2 className="text-3xl font-bold text-black text-center mb-3">
          Why <span className="text-amber-700">Choose Us?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg shadow-gray-400"
            >
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                {card.heading}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
