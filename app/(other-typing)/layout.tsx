import OtherHeader from "@/app/(other-typing)/components/OtherHeader";
import OtherFooter from "@/app/(other-typing)/components/OtherFooter";

export default function OtherTypingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OtherHeader />
      {children}
      <OtherFooter />
    </>
  );
}
