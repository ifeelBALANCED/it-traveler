export const getEnvVariable = (key: string): string => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Env variable ${key} is not defined`)
  }
  return String(value)
}

export const appEnv = {
  API_URL: getEnvVariable('VITE_API_URL'),
  APP_TITLE: getEnvVariable('VITE_APP_TITLE'),
  MODE: getEnvVariable('VITE_APP_ENV'),
  SWAGGER_URL: getEnvVariable('VITE_SWAGGER_URL'),
}
