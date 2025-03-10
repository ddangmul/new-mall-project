import Image from "next/image";

import mainImg from "@/assets/homeImage/allison-christine-SEbQSYozn7c-unsplash.jpg";

const MainImage: React.FC = () => {
  return (
    <section className="main_image">
      <div className="main_image_wrap min-h-[800px] relative">
        <Image
          src={mainImg}
          alt="MainImg"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};
export default MainImage;
