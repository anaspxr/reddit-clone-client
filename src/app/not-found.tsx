import ErrorPage from "@/components/ui/error-page";

export default function NotFound() {
  return (
    <ErrorPage
      title="Page not found"
      description="The page you are trying to access is not found or is moved to another route"
    />
  );
}
