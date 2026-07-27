import { jsonLdSchemas, type JsonLdPath } from "@/lib/jsonLdSchemas";

export default function PageJsonLd({ path }: { path: JsonLdPath }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas[path]) }}
    />
  );
}
