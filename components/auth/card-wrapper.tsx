"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { BackButton } from "./back-buttont";
import Header from "./header";
import { Social } from "./social";

interface CardWrapperProps extends React.PropsWithChildren {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export const CardWrapper: React.FC<CardWrapperProps> = ({
  backButtonHref,
  backButtonLabel,
  headerLabel,
  children,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial ? (
        <CardFooter>
          <Social />
        </CardFooter>
      ) : (
        ""
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
