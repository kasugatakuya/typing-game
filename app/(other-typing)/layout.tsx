import OtherHeader from "./components/OtherHeader";
import OtherFooter from "./components/OtherFooter";

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
