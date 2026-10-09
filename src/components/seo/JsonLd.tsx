export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          Array.isArray(data)
            ? { "@context": "https://schema.org", "@graph": data }
            : { "@context": "https://schema.org", ...(data as object) },
        ),
      }}
    />
  );
}
