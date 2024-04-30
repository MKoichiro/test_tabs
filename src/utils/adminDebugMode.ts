let isDebugMode = true;
if (process.env.NODE_ENV === 'production') {
    isDebugMode = false;
}

export { isDebugMode };
