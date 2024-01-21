"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps extends React.PropsWithChildren {
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = "redirect",
  asChild,
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  return <span onClick={onClick}>{children}</span>;
};
