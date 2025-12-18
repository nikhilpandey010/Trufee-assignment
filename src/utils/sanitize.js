export function sanitize(input) {
  return input
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));
}

