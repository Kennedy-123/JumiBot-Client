const HowToUse = () => {
    return (
      <section className="bg-orange-50 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-12">
          How to Use JumiBot
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-6 rounded-full mb-6 shadow-md">
              <img
                src="/icons/step1.svg"
                alt="Step 1"
                className="h-16 w-16"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Step 1: Enter Product URL
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Copy the product URL from Jumia and paste it into the input field.
            </p>
          </div>
  
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-6 rounded-full mb-6 shadow-md">
              <img
                src="/icons/step2.svg"
                alt="Step 2"
                className="h-16 w-16"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Step 2: Track Product
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Click "Track Product" to start monitoring the price every 4 hours.
            </p>
          </div>
  
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-6 rounded-full mb-6 shadow-md">
              <img
                src="/icons/step3.svg"
                alt="Step 3"
                className="h-16 w-16"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Step 3: Get Notified
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Receive email alerts when the product price drops.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowToUse;
  