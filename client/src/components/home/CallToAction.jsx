import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="my-20">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <section className="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2 max-w-5xl w-full text-center rounded-2xl py-20 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-1.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl">
          Ready to build your resume?
        </h1>
        <div className="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-green-600"></div>
        <p className="text-sm md:text-base text-white max-w-xl">
          Create a professional resume in minutes with our AI-powered resume
          builder.
        </p>
        <Link
          to="/app"
          className="px-8 py-2.5 mt-4 text-sm bg-gradient-to-r from-green-600 to-green-500 hover:scale-105 transition duration-300 text-white rounded-full"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
