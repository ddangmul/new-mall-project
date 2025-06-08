import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="w-full bottom-0 pt-10 pb-6 px-6 mt-28 text-sm font-serif bg-gradient-to-t from-[#b8a5a1]  to-background"
    >
      <div className="footer_inner grid grid-cols-2 grid-row-3 xl:grid-cols-3 md:grid-row-2 gap-6">
        <div className="footer_content_1 col-span-full xl:col-span-1">
          <p className="fotter_txt">
            HyangNang Inc. <br></br>Owner. Hyang Business Reg 0000000 <br></br>
            Ecommerce Sales License. 0000-0000-0000 <br></br>Tel. 000-0000-0000
            Email. hello@hinoki.life <br></br>Address. 2F, Ground, Water, Korea
          </p>
        </div>
        <div className="footer_content_2 flex flex-col">
          <p className="underline">Brand</p>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/useterm">Terms of Use</Link>
          <Link href="/">Blog</Link>
          <Link href="/">Instagram</Link>
        </div>
        <div className="footer_content_3 flex flex-col">
          <p className="underline">Help</p>
          <p>hello@hyangnang.kr</p>
          <p>000-0000-0000</p>
          <p>Mon-Fri 10:00-17:00</p>
          <p>Lunch Time 12:00-13:30</p>
        </div>
      </div>
      <div className="footer_bottom_hinoki col-span-full row-span-2 mt-6 grid grid-cols-2">
        <div>©hyangnang</div>
      </div>
    </footer>
  );
};

export default Footer;
