/* eslint-disable no-param-reassign */
export default function fadeOut(fadeTarget) {
  return new Promise((resolve) => {
    fadeTarget.classList.remove('visually-hidden');
    const fadeEffect = setInterval(() => {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
        fadeTarget.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
        fadeTarget.classList.add('visually-hidden');
        resolve();
      }
    }, 250);
  });
}
