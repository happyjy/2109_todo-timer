export function getDomHasInst(target) {
  let targetDom = target;
  while (!targetDom.inst) {
    targetDom = targetDom.parentElement;
  }
  return targetDom;
}
