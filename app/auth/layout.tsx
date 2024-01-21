export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}
