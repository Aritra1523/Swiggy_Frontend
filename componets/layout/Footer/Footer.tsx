import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Hungrly</h3>
              <p className="text-gray-400 text-sm">Delivering happiness to your doorstep</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Download App</h4>
              <div className="space-y-2">
                <button className="bg-gray-800 px-4 py-2 rounded text-sm w-full">App Store</button>
                <button className="bg-gray-800 px-4 py-2 rounded text-sm w-full">Google Play</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer