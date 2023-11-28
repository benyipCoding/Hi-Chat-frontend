export function useScreenSize(): () => boolean {
  return () => window.innerWidth >= 1024;
}
