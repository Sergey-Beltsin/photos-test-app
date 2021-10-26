export const getEnvVar = (key: string): string => {
  const result = process.env[key];

  if (!result) {
    throw new Error(`Environment variable ${key} not found`);
  }

  return result;
};
