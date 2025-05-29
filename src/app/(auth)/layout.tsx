export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen mt-10 md:mt-16 lg:mt-20">
      {children}
    </section>
  );
}
