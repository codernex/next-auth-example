import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton: React.FC<{
  href: string;
  label: string;
}> = ({ href, label }) => {
  return (
    <Button variant={"link"} className="text-center" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
