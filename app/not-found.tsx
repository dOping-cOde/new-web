import { Caption } from "@/components/ui/Caption";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-5xl max-md:py-3xl">
      <Container className="flex flex-col items-center text-center">
        <Caption as="p" className="text-text-muted">
          404
        </Caption>
        <h1 className="text-display-md mt-lg">This page does not exist.</h1>
        <p className="text-body text-text-muted mt-lg max-w-[480px] text-center">
          The URL you followed may be outdated or mistyped. Here are some places to start.
        </p>
        <div className="mt-2xl flex flex-row flex-wrap gap-md justify-center">
          <Button variant="secondary" href="/">
            Home
          </Button>
          <Button variant="secondary" href="/services">
            Services
          </Button>
          <Button variant="secondary" href="/portfolio">
            Portfolio
          </Button>
          <Button variant="secondary" href="/contact">
            Contact
          </Button>
        </div>
      </Container>
    </div>
  );
}
