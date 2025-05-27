import Head from 'next/head';
import AnimatedText from '@/components/AnimatedText';
import Image from 'next/image';
import Contact from '@/components/Contact';
import profilePic from "/public/images/profile/zain.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Muhammad Zain | Home</title>
        <meta
          name="description"
          content="Muhammad Zain – Software Engineering Portfolio"
        />
      </Head>

      <main className="flex items-center w-full min-h-screen bg-light dark:bg-dark">
        <div className="grid grid-cols-8 gap-16 w-full">
          {/* Text Section */}
          <div className="col-span-5 flex flex-col items-start justify-center">
            <AnimatedText
              text="Turning Ideas Into Reality."
              className="!text-6xl xl:!text-5xl lg:!text-4xl md:!text-3xl text-left text-dark dark:text-light"
            />
            <p className="my-4 text-base font-normal text-dark/75 dark:text-light/75">
              I'm Muhammad Zain, a Software Engineering student at the University of Calgary with a passion for full stack development and AI. Originally from Pakistan, now based in Calgary, I thrive on solving real-world problems through elegant software solutions.
            </p>
            <p className="mb-4 text-base font-normal text-dark/75 dark:text-light/75">
              With experience in Python, Java, C++, and web frameworks like React and Flask, I'm actively building projects that blend strong logic with great design. I aim to secure a competitive internship and contribute meaningfully in the tech space.
            </p>
          </div>

          {/* Profile Image Section */}
          <div className="col-span-3 flex items-center justify-center">
            <div className="relative w-full max-w-sm p-2 bg-gradient-to-br from-[#dbeafe] to-[#ede9fe] dark:from-[#1e293b] dark:to-[#0f172a] rounded-3xl shadow-xl overflow-hidden group transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-light/10 dark:bg-dark/10 backdrop-blur-md rounded-3xl z-0 group-hover:bg-light/15 dark:group-hover:bg-dark/15 transition-colors duration-300"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-dark/10 dark:border-light/10 shadow-inner">
                <div className="relative w-full pt-[75%]">
                  <Image
                    src={profilePic}
                    alt="Muhammad Zain in the Canadian Rockies"
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
                    className="object-cover object-center absolute inset-0 transition-transform duration-500 group-hover:scale-110 will-change-transform"
                    style={{ 
                      transform: 'translate3d(0, 0, 0)',
                      imageRendering: 'crisp-edges',
                      WebkitFontSmoothing: 'antialiased',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Contact />
      </main>
    </>
  );
}
