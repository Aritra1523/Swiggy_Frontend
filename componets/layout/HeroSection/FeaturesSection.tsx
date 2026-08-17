export default function FeaturesSection() {
  const features = [
    {
      icon: "🍔",
      title: "Wide Selection",
      description: "Choose from thousands of restaurants and cuisines",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Multiple payment options with 100% security",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: "🎁",
      title: "Exclusive Offers",
      description: "Daily deals and discounts on your favorite food",
      gradient: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg">We make food delivery simple and delightful</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-transparent"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Icon Circle */}
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Bottom Border on Hover */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}