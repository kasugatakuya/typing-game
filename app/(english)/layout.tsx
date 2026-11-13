import EnglishHeader from "@/app/(english)/components/EnglishHeader";
import EnglishFooter from "@/app/(english)/components/EnglishFooter";
import { ProgressSync } from "@/app/(english)/components/ProgressSync";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProgressSync />
      <EnglishHeader />
      {children}
      <EnglishFooter />
    </>
  );
}
