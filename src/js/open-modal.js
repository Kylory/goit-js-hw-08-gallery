export function openModal(
  lightboxRef,
  lightBoxOverlayRef,
  onKeyPressFunc,
  onLightBoxOverlayClickFunc,
) {
  lightboxRef.classList.add('is-open');
  window.addEventListener('keyup', onKeyPressFunc);
  lightBoxOverlayRef.addEventListener('click', onLightBoxOverlayClickFunc);
}
