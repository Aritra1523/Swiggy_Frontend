export default function FeaturesSection() {
  const features = [
    {
      icon: "🍔",
      title: "Wide Selection",
      description: "Choose from thousands of restaurants and cuisines"
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Multiple payment options with 100% security"
    },
    {
      icon: "🎁",
      title: "Exclusive Offers",
      description: "Daily deals and discounts on your favorite food"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-gray-600 mt-2">We make food delivery simple and delightful</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}