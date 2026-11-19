/** Renders a WhatsApp message, turning its *bold* markup into <strong>. */
export function WaText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-[1em] break-words">
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") ? <strong key={j}>{part.slice(1, -1)}</strong> : part,
          )}
        </span>
      ))}
    </>
  );
}
