import { TerminalException } from "../weber-profile-exception/WeberProfileError.js";

export class ProjectFormValidator {
  static validateFormPayload(text, terminal) {
    if (!text.startsWith("{") || !text.endsWith("}") || !text.includes(":")) {
      return new TerminalException(
        'Invalid payload format. Please use JSON syntax, e.g., { "id": 1 }',
        text,
        terminal,
        400,
      );
    }
    return { success: true };
  }
}
