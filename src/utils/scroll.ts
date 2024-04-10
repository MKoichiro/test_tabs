import { Ref } from "react";

export const scrollToRef = (ref: Ref<HTMLElement | null>) => {
  // null check
  if (!ref) { console.error('ref が falsy です。 [.tsx, TodoDetail]'); return }
  if (typeof ref === 'function') { console.error('ref が RefCallback です。 [.tsx, TodoDetail]'); return }
  if (!ref.current) { console.error('ref.current が falsy です。 [.tsx, TodoDetail]'); return }

  // net processing
  const targetElm = ref.current;
  const innerY    = targetElm.getBoundingClientRect().top;
  const targetY   = innerY + scrollY;

  scrollTo({ top: targetY, behavior: 'smooth' });
};