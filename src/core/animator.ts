/*!cs_asheet*/
const ANIMATION_QUERY: Record<string, HTMLElement> = {
  document_body: document.body,
} as const;

/**
* Greater = more pow
* */
const ANIMATION_RANDOM_ZERO_BIAS = 16.0; 

function ApplyEffect(
  target: HTMLElement,
  key: string,
  sheet: number[],
  threshold: number,
  random: number
) {
  let tick = 0;
  target.classList.add("ash_loaded");
  setInterval(() => {
    target.style.setProperty(`--${key}`, (sheet[tick % sheet.length] + random !== 0 ? ((0.5 - Math.pow(Math.abs(Math.random()),1/ANIMATION_RANDOM_ZERO_BIAS)) * random) : 0.0 ).toFixed(6));
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
    ["Sheet.Randomness"]?: number;
    ["Sheet.ApplyAttribute"]: string;
    ["Sheet.ApplyTarget"]: keyof typeof ANIMATION_QUERY;
  }[]
) {
  anim.forEach((a) => {
    ApplyEffect(
      ANIMATION_QUERY[a["Sheet.ApplyTarget"]],
      a["Sheet.ApplyAttribute"],
      a.Sheet,
      a["Sheet.Threshold"],
      a["Sheet.Randomness"] || 0,
    );
  });
}
