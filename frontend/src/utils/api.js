 
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const CUSTOMER_API_URL = `${API_BASE_URL}/api/customers`;
export const ADDRESS_API_URL = `${API_BASE_URL}/api/addresses`;
export const SERVICE_API_URL = `${API_BASE_URL}/api/services`;
export const INVOICE_API_URL = `${API_BASE_URL}/api/invoices`;

export async function parseJson(response) {
  const contentType = (
    response.headers.get("content-type") || ""
  ).toLowerCase();

  if (!contentType.includes("application/json")) {
    let detail = "";

    try {
      detail = (await response.text()).slice(0, 200);
    } catch {
      // Ignore response body read errors.
    }

    throw new Error(
      [
        `API returned a non-JSON response (status ${response.status}).`,
        `This means the request did not reach a valid backend endpoint.`,
        `Requested URL: ${response.url}`,
        `Check that VITE_API_BASE_URL points to the backend (${API_BASE_URL}) and`,
        `that the request path includes the "/api/..." prefix — not the Vite dev server.`,
        ...(detail ? [`Response body: ${detail}`] : []),
      ].join("\n"),
    );
  }

  return response.json();
}