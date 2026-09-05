export type LandingPageCustomization = {
  css?: string;
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  customCss?: string;
};

export function splitTypographyProps<T extends PageTypographyProps>(props: T): [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    customCss,
    ...rest
  } = props;
  const typeProps = {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    customCss,
  };
  return [typeProps, rest];
}

export function usePageTypography(recipe: any, props: PageTypographyProps): LandingPageCustomization {
  const customization: LandingPageCustomization = {};
  if (props.primaryColor) {
    customization.primaryColor = props.primaryColor;
  }
  let css = "";
  if (props.primaryColor) {
    css += `:root { --accent: ${props.primaryColor} !important; }\n`;
  }
  if (props.headingSize) {
    css += `h1, h2, .masthead h1, .identity__name { font-size: ${props.headingSize}px !important; }\n`;
  }
  if (props.bodySize) {
    css += `body, p { font-size: ${props.bodySize}px !important; }\n`;
  }
  if (props.headingLetterSpacing) {
    css += `h1, h2, .identity__name { letter-spacing: ${props.headingLetterSpacing}em !important; }\n`;
  }
  if (props.customCss) {
    css += props.customCss;
  }
  customization.css = css;
  return customization;
}

export function applyPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization) {
  if (!frame || !frame.contentDocument) return;
  const doc = frame.contentDocument;
  let styleEl = doc.getElementById("threeui-customization-style");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.id = "threeui-customization-style";
    const targetHead = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
    if (targetHead) {
      targetHead.appendChild(styleEl);
    }
  }
  if (styleEl) {
    styleEl.textContent = customization?.css || "";
  }
}

export function postPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization) {
  if (!frame || !frame.contentWindow) return;
  try {
    frame.contentWindow.postMessage({ type: "threeui-customization", customization }, "*");
  } catch (e) {
    // safe cross-origin handle
  }
}
