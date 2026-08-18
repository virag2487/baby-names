// =========================================================
// Baby Names Site — hand-drawn cartoon critter library
// =========================================================
// Original, hand-coded SVG illustrations (not stock art, not emoji) — a
// small "kawaii mascot" style kept consistent across all sixteen: rounded
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

  lion: `
    <svg viewBox="0 0 120 120" role="img" aria-label="lion">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <g>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#D9873E" transform="rotate(0 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#8B5E3C" transform="rotate(36 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#D9873E" transform="rotate(72 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#8B5E3C" transform="rotate(108 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#D9873E" transform="rotate(144 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#8B5E3C" transform="rotate(180 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#D9873E" transform="rotate(216 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#8B5E3C" transform="rotate(252 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#D9873E" transform="rotate(288 60 62)"/>
        <ellipse cx="60" cy="16" rx="10" ry="17" fill="#8B5E3C" transform="rotate(324 60 62)"/>
      </g>
      <circle cx="60" cy="62" r="30" fill="#E0AE2E"/>
      <ellipse cx="60" cy="70" rx="19" ry="15" fill="#FCE7A0"/>
      <g class="critter-eyes">
        <ellipse cx="49" cy="60" rx="4.2" ry="5.5" fill="#3A2E22"/>
        <ellipse cx="71" cy="60" rx="4.2" ry="5.5" fill="#3A2E22"/>
        <circle cx="50.3" cy="57.8" r="1.5" fill="#fff"/>
        <circle cx="72.3" cy="57.8" r="1.5" fill="#fff"/>
      </g>
      <ellipse cx="60" cy="72" rx="3.6" ry="2.6" fill="#8B5E3C"/>
      <path d="M53,78 Q60,82 67,78" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="40" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.4"/>
      <ellipse cx="80" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.4"/>
    </svg>`,

  zebra: `
    <svg viewBox="0 0 120 120" role="img" aria-label="zebra">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <path d="M50,8 L55,28 L45,28 Z" fill="#3A2E22"/>
      <path d="M70,8 L75,28 L65,28 Z" fill="#3A2E22"/>
      <circle cx="60" cy="62" r="36" fill="#FFFFFF" stroke="#E4DCCB" stroke-width="2"/>
      <ellipse cx="26" cy="46" rx="11" ry="15" fill="#FFFFFF" stroke="#E4DCCB" stroke-width="2"/>
      <ellipse cx="94" cy="46" rx="11" ry="15" fill="#FFFFFF" stroke="#E4DCCB" stroke-width="2"/>
      <ellipse cx="26" cy="47" rx="6" ry="9" fill="#3A2E22"/>
      <ellipse cx="94" cy="47" rx="6" ry="9" fill="#3A2E22"/>
      <path d="M30,42 Q60,34 90,42" stroke="#3A2E22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M27,56 Q60,50 93,56" stroke="#3A2E22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M26,70 Q60,66 94,70" stroke="#3A2E22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M32,86 Q60,84 88,86" stroke="#3A2E22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="70" rx="20" ry="16" fill="#FFFFFF"/>
      <g class="critter-eyes">
        <ellipse cx="48" cy="60" rx="4.5" ry="6" fill="#3A2E22"/>
        <ellipse cx="72" cy="60" rx="4.5" ry="6" fill="#3A2E22"/>
        <circle cx="49.5" cy="57.5" r="1.6" fill="#fff"/>
        <circle cx="73.5" cy="57.5" r="1.6" fill="#fff"/>
      </g>
      <ellipse cx="60" cy="72" rx="4" ry="3" fill="#3A2E22"/>
      <path d="M52,78 Q60,82 68,78" stroke="#3A2E22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="38" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="82" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
    </svg>`,

  owl: `
    <svg viewBox="0 0 120 120" role="img" aria-label="owl">
      <ellipse cx="60" cy="112" rx="26" ry="6" fill="rgba(74,59,42,0.12)"/>
      <ellipse cx="24" cy="70" rx="12" ry="20" fill="#A67FC9"/>
      <ellipse cx="96" cy="70" rx="12" ry="20" fill="#A67FC9"/>
      <path d="M42,16 L50,32 L34,32 Z" fill="#A67FC9"/>
      <path d="M78,16 L86,32 L70,32 Z" fill="#A67FC9"/>
      <circle cx="60" cy="66" r="38" fill="#A67FC9"/>
      <ellipse cx="60" cy="80" rx="20" ry="16" fill="#E3D3F0"/>
      <circle cx="46" cy="58" r="15" fill="#FBF3DE"/>
      <circle cx="74" cy="58" r="15" fill="#FBF3DE"/>
      <g class="critter-eyes">
        <circle cx="46" cy="58" r="7" fill="#3A2E22"/>
        <circle cx="74" cy="58" r="7" fill="#3A2E22"/>
        <circle cx="48.5" cy="55.5" r="2.2" fill="#fff"/>
        <circle cx="76.5" cy="55.5" r="2.2" fill="#fff"/>
      </g>
      <path d="M55,68 L65,68 L60,78 Z" fill="#E0A83C"/>
      <ellipse cx="36" cy="80" rx="4.5" ry="3" fill="#E0779A" opacity="0.3"/>
      <ellipse cx="84" cy="80" rx="4.5" ry="3" fill="#E0779A" opacity="0.3"/>
    </svg>`,

  koala: `
    <svg viewBox="0 0 120 120" role="img" aria-label="koala">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <circle cx="18" cy="46" r="20" fill="#B8AEA0"/>
      <circle cx="102" cy="46" r="20" fill="#B8AEA0"/>
      <circle cx="18" cy="46" r="12" fill="#E8E2D8"/>
      <circle cx="102" cy="46" r="12" fill="#E8E2D8"/>
      <circle cx="60" cy="64" r="34" fill="#C9C0B4"/>
      <g class="critter-eyes">
        <ellipse cx="48" cy="58" rx="4" ry="5.5" fill="#3A2E22"/>
        <ellipse cx="72" cy="58" rx="4" ry="5.5" fill="#3A2E22"/>
        <circle cx="49.3" cy="55.8" r="1.5" fill="#fff"/>
        <circle cx="73.3" cy="55.8" r="1.5" fill="#fff"/>
      </g>
      <ellipse cx="60" cy="72" rx="10" ry="8" fill="#3A2E22"/>
      <ellipse cx="38" cy="70" rx="5.5" ry="3" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="82" cy="70" rx="5.5" ry="3" fill="#E0779A" opacity="0.35"/>
    </svg>`,

  turtle: `
    <svg viewBox="0 0 120 120" role="img" aria-label="turtle">
      <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(74,59,42,0.12)"/>
      <ellipse cx="26" cy="82" rx="9" ry="7" fill="#5F9E52"/>
      <ellipse cx="94" cy="82" rx="9" ry="7" fill="#5F9E52"/>
      <ellipse cx="60" cy="58" rx="42" ry="36" fill="#5F9E52"/>
      <path d="M60,26 L60,90 M24,58 L96,58 M34,32 L86,84 M86,32 L34,84" stroke="#4A7F3E" stroke-width="3" opacity="0.5"/>
      <circle cx="60" cy="92" r="26" fill="#CFE8C0"/>
      <g class="critter-eyes">
        <circle cx="50" cy="88" r="4.5" fill="#3A2E22"/>
        <circle cx="70" cy="88" r="4.5" fill="#3A2E22"/>
        <circle cx="51.3" cy="86" r="1.4" fill="#fff"/>
        <circle cx="71.3" cy="86" r="1.4" fill="#fff"/>
      </g>
      <path d="M52,98 Q60,102 68,98" stroke="#3A2E22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="40" cy="96" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
      <ellipse cx="80" cy="96" rx="5" ry="3" fill="#E0779A" opacity="0.35"/>
    </svg>`,

  flamingo: `
    <svg viewBox="0 0 120 120" role="img" aria-label="flamingo">
      <ellipse cx="60" cy="112" rx="18" ry="5" fill="rgba(74,59,42,0.10)"/>
      <line x1="58" y1="90" x2="58" y2="108" stroke="#D9873E" stroke-width="4" stroke-linecap="round"/>
      <path d="M70,44 Q40,50 46,86" stroke="#F9C7D6" stroke-width="14" fill="none" stroke-linecap="round"/>
      <ellipse cx="66" cy="90" rx="26" ry="24" fill="#F9C7D6"/>
      <circle cx="42" cy="42" r="20" fill="#F9C7D6"/>
      <g class="critter-eyes">
        <circle cx="36" cy="40" r="4" fill="#3A2E22"/>
        <circle cx="37.2" cy="38.3" r="1.3" fill="#fff"/>
      </g>
      <path d="M28,46 Q10,48 12,42 Q10,36 28,38 Z" fill="#3A2E22"/>
      <ellipse cx="54" cy="46" rx="4" ry="2.6" fill="#E0779A" opacity="0.4"/>
    </svg>`,

  rabbit: `
    <svg viewBox="0 0 120 120" role="img" aria-label="rabbit">
      <ellipse cx="60" cy="112" rx="26" ry="6" fill="rgba(74,59,42,0.12)"/>
      <ellipse cx="42" cy="26" rx="10" ry="28" fill="#FBF3DE"/>
      <ellipse cx="78" cy="26" rx="10" ry="28" fill="#FBF3DE"/>
      <ellipse cx="42" cy="28" rx="5" ry="20" fill="#F9C7D6"/>
      <ellipse cx="78" cy="28" rx="5" ry="20" fill="#F9C7D6"/>
      <circle cx="60" cy="68" r="34" fill="#FBF3DE"/>
      <g class="critter-eyes">
        <ellipse cx="49" cy="64" rx="4.3" ry="5.6" fill="#3A2E22"/>
        <ellipse cx="71" cy="64" rx="4.3" ry="5.6" fill="#3A2E22"/>
        <circle cx="50.3" cy="61.7" r="1.5" fill="#fff"/>
        <circle cx="72.3" cy="61.7" r="1.5" fill="#fff"/>
      </g>
      <path d="M60,74 L55,80 L65,80 Z" fill="#E0779A"/>
      <path d="M52,84 Q60,88 68,84" stroke="#3A2E22" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="38" cy="78" rx="5.5" ry="3" fill="#E0779A" opacity="0.4"/>
      <ellipse cx="82" cy="78" rx="5.5" ry="3" fill="#E0779A" opacity="0.4"/>
    </svg>`,

  squirrel: `
    <svg viewBox="0 0 120 120" role="img" aria-label="squirrel">
      <ellipse cx="66" cy="108" rx="26" ry="6" fill="rgba(74,59,42,0.12)"/>
      <path d="M96,90 Q112,60 92,32 Q118,50 108,86 Q104,100 88,100 Z" fill="#D9873E"/>
      <path d="M96,88 Q108,64 94,42 Q110,58 102,84 Z" fill="#F5CBA3"/>
      <circle cx="26" cy="46" r="13" fill="#D9873E"/>
      <circle cx="60" cy="42" r="13" fill="#D9873E"/>
      <circle cx="26" cy="46" r="7" fill="#F5CBA3"/>
      <circle cx="60" cy="42" r="7" fill="#F5CBA3"/>
      <circle cx="46" cy="62" r="32" fill="#D9873E"/>
      <ellipse cx="46" cy="70" rx="19" ry="15" fill="#F5CBA3"/>
      <g class="critter-eyes">
        <ellipse cx="36" cy="60" rx="4" ry="5.3" fill="#3A2E22"/>
        <ellipse cx="56" cy="60" rx="4" ry="5.3" fill="#3A2E22"/>
        <circle cx="37.3" cy="57.8" r="1.4" fill="#fff"/>
        <circle cx="57.3" cy="57.8" r="1.4" fill="#fff"/>
      </g>
      <ellipse cx="46" cy="72" rx="3.4" ry="2.4" fill="#8B5E3C"/>
      <path d="M39,78 Q46,82 53,78" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="26" cy="70" rx="5" ry="3" fill="#E0779A" opacity="0.4"/>
    </svg>`,
};

function initCritters() {
  document.querySelectorAll(".critter[data-animal]").forEach((el) => {
    const svg = CRITTERS[el.dataset.animal];
    if (svg) el.innerHTML = svg;
  });
}
document.addEventListener("DOMContentLoaded", initCritters);
