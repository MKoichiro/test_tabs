let useDebugMode = true;
if (process.env.NODE_ENV === 'production') {
  useDebugMode = false;
}

export { useDebugMode };