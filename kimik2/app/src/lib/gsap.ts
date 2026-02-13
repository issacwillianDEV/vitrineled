export const loadGSAP = async (): Promise<{
  gsap: typeof window.gsap;
  ScrollTrigger: typeof window.ScrollTrigger;
}> => {
  return new Promise((resolve) => {
    const checkGSAP = () => {
      if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
        resolve({
          gsap: window.gsap,
          ScrollTrigger: window.ScrollTrigger,
        });
      } else {
        setTimeout(checkGSAP, 50);
      }
    };
    checkGSAP();
  });
};
