import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getContacts: async () => [
    {
      id: BigInt(1),
      name: "Alex Johnson",
      email: "alex@example.com",
      company: "TechCorp",
      message: "I'd love to learn more about your AI marketing solutions.",
      timestamp: BigInt(Date.now()),
    },
  ],
  submitContact: async (_input) => ({
    __kind__: "ok",
    ok: "Thank you! We'll be in touch soon.",
  }),
};
