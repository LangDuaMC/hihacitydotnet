/*!
 * CSSAnimator
 * @author  stdpi
 */

const ANIMATION_QUERY: Record<string, HTMLElement> = {
  document_body: document.body,
} as const;

function ApplyEffect(
  target: HTMLElement,
  key: string,
  sheet: number[],
  threshold: number
) {
  let tick = 0;
  target.classList.add("ash_loaded");
  setInterval(() => {
    target.style.setProperty(`--${key}`, sheet[tick % sheet.length].toString());
    tick++;
    if (import.meta.env.DEV) {
      console.info(tick);
    }
  }, threshold);
}

export function LoadAnimation(
  anim: {
    Sheet: number[];
    ["Sheet.Threshold"]: number;
    ["Sheet.ApplyAttribute"]: string;
    ["Sheet.ApplyTarget"]: keyof typeof ANIMATION_QUERY;
  }[]
) {
  anim.forEach((a) => {
    ApplyEffect(
      ANIMATION_QUERY[a["Sheet.ApplyTarget"]],
      a["Sheet.ApplyAttribute"],
      a.Sheet,
      a["Sheet.Threshold"]
    );
  });
}
