import React from "react";

export default function Page() {
  return (
    <div className="m-20 flex justify-center text-wrap px-20">
      <div>
        <h1 className="pb-10 text-5xl font-bold text-[#a69055]">
          {" "}
          About StandOn
        </h1>
        <section>
          <h2 className="pb-4 text-3xl font-semibold">
            Welcome to Stand On – where we bring a refreshing twist to the world
            of business buying and selling!
          </h2>
          <p className="flex justify-center text-balance pb-4 text-xl">
            At StandOn, we're inspired by the classic lemonade stand, a symbol
            of entrepreneurial spirit and community. Our name is a playful nod
            to standing firm in your business endeavors while also encouraging
            new opportunities for growth and success.
          </p>
        </section>
        <h2 className="pb-5 text-2xl font-semibold">Our Mission</h2>
        <p className="flex justify-center text-balance pb-10 text-xl">
          Our mission is simple: to empower entrepreneurs and business owners by
          making the process of buying and selling businesses as smooth and
          enjoyable as a summer lemonade stand. We understand that every
          business has a unique story, and we’re here to ensure that story
          continues to thrive, whether you’re looking to pass on your business
          or start a new adventure.
        </p>
        <h2 className="pb-5 text-2xl font-semibold">What We Do:</h2>
        <div className="flex justify-center gap-2 text-balance px-6 pb-10 text-xl">
          <ul className="list-disc">
            <li>
              <span className="font-bold">Buy a Business:</span> Discover a
              range of exciting business opportunities tailored to your goals
              and interests. Whether you're a seasoned entrepreneur or a
              first-time buyer, we’ll guide you through every step of the
              process to find the perfect fit
            </li>
            <li>
              <span className="font-bold">Sell a Business:</span> Ready to move
              on to your next venture? We’ll help you showcase your business’s
              strengths and connect with potential buyers who are eager to carry
              on your legacy.
            </li>
            <li>
              <span className="font-bold">Consulting Services:</span> Need
              advice or guidance? Our team of experts is here to offer insights
              and strategies to help you navigate the business landscape with
              confidence.
            </li>
          </ul>
        </div>
        <h2 className="pb-4 text-2xl font-semibold">Why Choose Us?</h2>
        <p className="flex justify-center text-balance pb-4 text-xl">
          At Stand On, we combine traditional values of trust and reliability
          with modern business practices. Our team is dedicated to providing
          personalized service and actionable solutions, ensuring that your
          buying or selling experience is seamless and satisfying.
        </p>
        <p className="flex justify-center text-balance pb-4 text-xl">
          Join us at Stand On and take the next step in your business journey.
          Whether you’re standing firm in your current venture or ready to
          explore new horizons, we’re here to support you every step of the way.
        </p>
        <h2 className="pb-4 text-2xl font-semibold">Contact Us</h2>
        <p className=" text-balance pb-4 text-xl">
          Ready to get started? Reach out to our friendly team today and see how
          we can help you stand on your business dreams!
        </p>
      </div>
    </div>
  );
}
