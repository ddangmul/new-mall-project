import MyshopContentsNavBar from "@/components/nav-bar/myshop-contents-nav";

export default function MyshopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex flex-col xl:flex-row gap-2 px-10 xl:px-16 mt-10">
        <div className="myshop-conetents-nav xl:basis-1/5">
          <MyshopContentsNavBar />
        </div>
        {children}
      </div>
    </section>
  );
}
