import { ResponseError, FetchError } from '@/api-client';

export interface ApiErrorMessage {
  message: string;
  details?: string[];
  status?: number;
}

export async function handleApiError(error: unknown): Promise<ApiErrorMessage> {
  if (error instanceof ResponseError) {
    try {
      const data = await error.response.json();
      return {
        message: data.message || "Une erreur est survenue sur le serveur.",
        details: Array.isArray(data.details) ? data.details : undefined,
        status: error.response.status,
      };
    } catch {
      return {
        message: `Erreur serveur (${error.response.status})`,
        status: error.response.status,
      };
    }
  }

  if (error instanceof FetchError) {
    return {
      message: "Impossible de contacter le serveur. Vérifiez votre connexion.",
      details: [error.cause.message],
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Une erreur inattendue est survenue.",
  };
}
