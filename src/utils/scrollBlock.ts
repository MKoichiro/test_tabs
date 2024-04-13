

export const preventScroll = (e: WheelEvent) => { e.preventDefault()  };
export const reviveScroll  = (e: WheelEvent) => { e.stopPropagation() };