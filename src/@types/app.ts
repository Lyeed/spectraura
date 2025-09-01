type ChatUser = "user" | "spectre";

type ChatMessage =
    | {
          id: string;
          type: "user";
          value: string;
          code: string | null;
      }
    | {
          id: string;
          type: "spectre";
          value: string;
          code: string | null;
      }
    | {
          id: string;
          type: "system";
          value: string;
          code?: never;
      };
