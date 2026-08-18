// =========================================================
// Baby Names Site — hand-drawn cartoon critter library
// =========================================================
// Original, hand-coded SVG illustrations (not stock art, not emoji) — a
// small "kawaii mascot" style kept consistent across all eight: rounded
// head, big eyes with a highlight dot, blush cheeks, soft shadow. Each one
// exposes a `.critter-eyes` group so the shared blink animation in
// style.css can target it after injection.
//
// Usage: <span class="critter idle-bounce" data-animal="fox"></span>
// initCritters() (called on DOMContentLoaded below) finds every
// [data-animal] placeholder and injects the matching SVG markup once.

const CRITTERS = {
  bird: `
    <svg viewBox="0 0 120 120" role="img" aria-label="bird">
      <ellipse cx="60" cy="110" rx="20" ry="5" fill="rgba(74,59,42,0.10)"/>
      <path d="M60,88 L46,110 L60,99 L74,110 Z" fill="#4F7A46"/>
      <ellipse cx="26" cy="66" rx="12" ry="20" fill="#4F7A46" transform="rotate(-15 26 66)"/>
      <ellipse cx="94" cy="66" rx="12" ry="20" fill="#4F7A46" transform="rotate(15 94 66)"/>
      <circle cx="60" cy="62" r="34" fill="#6FAE5A"/>
      <ellipse cx="60" cy="76" rx="18" ry="15" fill="#FCE7A0"/>
      <path d="M50,30 Q54,14 60,26 Q66,14 70,30 Z" fill="#4F7A46"/>
      <g class="critter-eyes">
        <circle cx="48" cy="56" r="6" fill="#3A2E22"/>
        <circle cx="72" cy="56" r="6" fill="#3A2E22"/>
        <circle cx="50" cy="53.5" r="2" fill="#fff"/>
        <circle cx="74" cy="53.5" r="2" fill="#fff"/>
      </g>
      <path d="M52,66 L68,66 L60,76 Z" fill="#E0A83C"/>
      <rect x="30" y="104" width="60" height="6" rx="3" fill="#8B5E3C"/>
    </svg>`,

  butterfly: `
    <svg viewBox="0 0 120 120" role="img" aria-label="butterfly">
      <ellipse cx="60" cy="106" rx="18" ry="5" fill="rgba(74,59,42,0.10)"/>
      <ellipse cx="30" cy="46" rx="26" ry="20" fill="#A67FC9" transform="rotate(-25 30 46)"/>
      <ellipse cx="90" cy="46" rx="26" ry="20" fill="#A67FC9" transform="rotate(25 90 46)"/>
      <ellipse cx="36" cy="80" rx="18" ry="14" fill="#CDE9F0" transform="rotate(-15 36 80)"/>
      <ellipse cx="84" cy="80" rx="18" ry="14" fill="#CDE9F0" transform="rotate(15 84 80)"/>
      <circle cx="26" cy="42" r="5" fill="#FCE7A0"/>
      <circle cx="94" cy="42" r="5" fill="#FCE7A0"/>
      <circle cx="34" cy="78" r="3.5" fill="#E0779A"/>
      <circle cx="86" cy="78" r="3.5" fill="#E0779A"/>
      <ellipse cx="60" cy="60" rx="6" ry="34" fill="#5E3D24"/>
      <circle cx="60" cy="28" r="8" fill="#5E3D24"/>
      <line x1="55" y1="22" x2="48" y2="10" stroke="#5E3D24" stroke-width="2" stroke-linecap="round"/>
      <line x1="65" y1="22" x2="72" y2="10" stroke="#5E3D24" stroke-width="2" stroke-linecap="round"/>
      <circle cx="48" cy="10" r="2.5" fill="#5E3D24"/>
      <circle cx="72" cy="10" r="2.5" fill="#5E3D24"/>
      <g class="critter-eyes">
        <circle cx="56" cy="27" r="1.8" fill="#fff"/>
        <circle cx="64" cy="27" r="1.8" fill="#fff"/>
      </g>
    </svg>`,

  bee: `
    <svg viewBox="0 0 120 120" role="img" aria-label="bee">
      <defs><clipPath id="beeBody"><ellipse cx="60" cy="66" rx="30" ry="34"/></clipPath></defs>
      <ellipse cx="60" cy="106" rx="18" ry="5" fill="rgba(74,59,42,0.10)"/>
      <ellipse cx="38" cy="55" rx="16" ry="22" fill="#CDE9F0" opacity="0.85" transform="rotate(-20 38 55)"/>
      <ellipse cx="82" cy="55" rx="16" ry="22" fill="#CDE9F0" opacity="0.85" transform="rotate(20 82 55)"/>
      <line x1="50" y1="30" x2="44" y2="16" stroke="#3A2E22" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="30" x2="76" y2="16" stroke="#3A2E22" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="44" cy="14" r="3" fill="#3A2E22"/>
      <circle cx="76" cy="14" r="3" fill="#3A2E22"/>
      <g clip-path="url(#beeBody)">
        <rect x="30" y="32" width="60" height="68" fill="#E0AE2E"/>
        <rect x="30" y="50" width="60" height="10" fill="#3A2E22"/>
        <rect x="30" y="70" width="60" height="10" fill="#3A2E22"/>
        <rect x="30" y="90" width="60" height="10" fill="#3A2E22"/>
      </g>
      <g class="critter-eyes">
        <ellipse cx="48" cy="46" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="72" cy="46" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="49.5" cy="43.5" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="43.5" r="1.6" fill="#fff"/>
      </g>
      <path d="M52,54 Q60,58 68,54" stroke="#3A2E22" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,

  giraffe: `
    <svg viewBox="0 0 120 120" role="img" aria-label="giraffe">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <line x1="46" y1="10" x2="42" y2="34" stroke="#E0AE2E" stroke-width="6" stroke-linecap="round"/>
      <line x1="74" y1="10" x2="78" y2="34" stroke="#E0AE2E" stroke-width="6" stroke-linecap="round"/>
      <circle cx="42" cy="10" r="6" fill="#D9873E"/>
      <circle cx="78" cy="10" r="6" fill="#D9873E"/>
      <ellipse cx="24" cy="50" rx="9" ry="12" fill="#E0AE2E"/>
      <ellipse cx="96" cy="50" rx="9" ry="12" fill="#E0AE2E"/>
      <circle cx="60" cy="62" r="36" fill="#FCE7A0"/>
      <ellipse cx="42" cy="46" rx="7" ry="8" fill="#D9873E" opacity="0.85"/>
      <ellipse cx="80" cy="52" rx="6" ry="7" fill="#D9873E" opacity="0.85"/>
      <ellipse cx="30" cy="80" rx="6" ry="7" fill="#D9873E" opacity="0.85"/>
      <ellipse cx="88" cy="78" rx="5" ry="6" fill="#D9873E" opacity="0.85"/>
      <g class="critter-eyes">
        <ellipse cx="48" cy="62" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="72" cy="62" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="49.5" cy="59.5" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="59.5" r="1.6" fill="#fff"/>
      </g>
      <ellipse cx="60" cy="74" rx="4" ry="3" fill="#8B5E3C"/>
      <path d="M52,80 Q60,84 68,80" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="38" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="82" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
    </svg>`,

  elephant: `
    <svg viewBox="0 0 120 120" role="img" aria-label="elephant">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <ellipse cx="20" cy="58" rx="16" ry="22" fill="#C9C0B4"/>
      <ellipse cx="100" cy="58" rx="16" ry="22" fill="#C9C0B4"/>
      <ellipse cx="20" cy="58" rx="10" ry="15" fill="#E8E2D8"/>
      <ellipse cx="100" cy="58" rx="10" ry="15" fill="#E8E2D8"/>
      <circle cx="60" cy="60" r="34" fill="#B8AEA0"/>
      <path d="M52,84 Q46,104 54,112 Q58,114 58,108 Q58,98 60,90" fill="none" stroke="#B8AEA0" stroke-width="12" stroke-linecap="round"/>
      <g class="critter-eyes">
        <ellipse cx="48" cy="58" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="72" cy="58" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="49.5" cy="55.5" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="55.5" r="1.6" fill="#fff"/>
      </g>
      <ellipse cx="36" cy="66" rx="5.5" ry="3" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="84" cy="66" rx="5.5" ry="3" fill="#E0779A" opacity="0.35"/>
    </svg>`,

  monkey: `
    <svg viewBox="0 0 120 120" role="img" aria-label="monkey">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <circle cx="30" cy="46" r="14" fill="#8B5E3C"/>
      <circle cx="90" cy="46" r="14" fill="#8B5E3C"/>
      <circle cx="30" cy="46" r="8" fill="#D9B48F"/>
      <circle cx="90" cy="46" r="8" fill="#D9B48F"/>
      <circle cx="60" cy="62" r="36" fill="#8B5E3C"/>
      <ellipse cx="60" cy="70" rx="24" ry="20" fill="#E8D2B0"/>
      <g class="critter-eyes">
        <ellipse cx="50" cy="64" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="70" cy="64" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="51.5" cy="61.5" r="1.6" fill="#fff"/>
        <circle cx="71.5" cy="61.5" r="1.6" fill="#fff"/>
      </g>
      <ellipse cx="60" cy="74" rx="4" ry="3" fill="#6B4A30"/>
      <path d="M52,80 Q60,85 68,80" stroke="#5E3D24" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="38" cy="72" rx="6" ry="3.5" fill="#E0779A" opacity="0.4"/>
      <ellipse cx="82" cy="72" rx="6" ry="3.5" fill="#E0779A" opacity="0.4"/>
    </svg>`,

  fox: `
    <svg viewBox="0 0 120 120" role="img" aria-label="fox">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <path d="M22,20 L42,46 L14,50 Z" fill="#D9873E"/>
      <path d="M98,20 L78,46 L106,50 Z" fill="#D9873E"/>
      <path d="M26,26 L40,44 L20,46 Z" fill="#FBF3DE"/>
      <path d="M94,26 L80,44 L100,46 Z" fill="#FBF3DE"/>
      <circle cx="60" cy="62" r="36" fill="#D9873E"/>
      <ellipse cx="60" cy="74" rx="20" ry="17" fill="#FBF3DE"/>
      <g class="critter-eyes">
        <ellipse cx="48" cy="60" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="72" cy="60" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="49.5" cy="57.5" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="57.5" r="1.6" fill="#fff"/>
      </g>
      <path d="M60,72 L55,80 L65,80 Z" fill="#3A2E22"/>
      <path d="M52,84 Q60,88 68,84" stroke="#3A2E22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="36" cy="72" rx="5.5" ry="3" fill="#E0779A" opacity="0.4"/>
      <ellipse cx="84" cy="72" rx="5.5" ry="3" fill="#E0779A" opacity="0.4"/>
    </svg>`,

  panda: `
    <svg viewBox="0 0 120 120" role="img" aria-label="panda">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <circle cx="28" cy="40" r="15" fill="#3A2E22"/>
      <circle cx="92" cy="40" r="15" fill="#3A2E22"/>
      <circle cx="60" cy="62" r="36" fill="#FBF3DE"/>
      <ellipse cx="42" cy="58" rx="13" ry="16" fill="#3A2E22" transform="rotate(-15 42 58)"/>
      <ellipse cx="78" cy="58" rx="13" ry="16" fill="#3A2E22" transform="rotate(15 78 58)"/>
      <g class="critter-eyes">
        <ellipse cx="44" cy="60" rx="4" ry="5" fill="#fff"/>
        <ellipse cx="76" cy="60" rx="4" ry="5" fill="#fff"/>
        <circle cx="44" cy="61" r="2.6" fill="#2A2018"/>
        <circle cx="76" cy="61" r="2.6" fill="#2A2018"/>
      </g>
      <ellipse cx="60" cy="76" rx="4" ry="3" fill="#3A2E22"/>
      <path d="M52,82 Q60,87 68,82" stroke="#3A2E22" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <ellipse cx="34" cy="80" rx="6" ry="3.5" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="86" cy="80" rx="6" ry="3.5" fill="#E0779A" opacity="0.35"/>
    </svg>`,
};

function initCritters() {
  document.querySelectorAll(".critter[data-animal]").forEach((el) => {
    const svg = CRITTERS[el.dataset.animal];
    if (svg) el.innerHTML = svg;
  });
}
document.addEventListener("DOMContentLoaded", initCritters);
