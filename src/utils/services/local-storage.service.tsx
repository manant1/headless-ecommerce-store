const isWindowAvailable: any = typeof window !== "undefined"

export default class LocalStorageService {
  setItem = (key: string, value: any) => {
    if (isWindowAvailable) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem = (key: string) => {
    if (isWindowAvailable) {
      const value: any = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null
    }
    return null;
  }

  removeItem = (key: string) => {
    if (isWindowAvailable) {
      window.localStorage.removeItem(key)
    }
  }
}