import MyshopContentsNavBar from "@/components/nav-bar/myshop-contents-nav";

export default function MyshopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex gap-2 px-16 mt-24">
        <div className="myshop-conetents-nav basis-1/5">
          <MyshopContentsNavBar />
        </div>
        {children}
      </div>
    </section>
  );
}
