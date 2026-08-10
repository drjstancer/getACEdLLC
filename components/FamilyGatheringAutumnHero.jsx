const leaves = [
  [92, 52, 24, -16],
  [142, 108, 16, 22],
  [236, 70, 22, 12],
  [368, 122, 18, -28],
  [512, 74, 24, 18],
  [650, 128, 15, -8],
  [806, 60, 23, -20],
  [928, 116, 18, 24],
  [1070, 78, 25, 10],
  [1238, 132, 18, -18],
  [1376, 72, 24, 28],
  [1490, 126, 16, -12],
]

const lights = [
  [120, 140],
  [260, 112],
  [410, 102],
  [558, 118],
  [712, 142],
  [870, 166],
  [1030, 180],
  [1192, 176],
  [1354, 152],
  [1496, 126],
]

const people = [
  [594, 506, 0.78],
  [652, 494, 0.9],
  [724, 486, 1.03],
  [796, 506, 0.68],
  [858, 492, 0.96],
  [934, 514, 0.58],
  [1000, 500, 0.82],
  [1062, 520, 0.55],
  [1118, 500, 0.78],
]

const pumpkins = [
  [138, 736, 58, '#D56D28'],
  [224, 744, 42, '#F1C17A'],
  [372, 752, 64, '#C85D22'],
  [462, 746, 44, '#E8B76F'],
  [1152, 742, 54, '#D96F2C'],
  [1240, 752, 36, '#F0C783'],
  [1320, 748, 48, '#BE5C28'],
]

function Leaf({ x, y, size, rotate }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size / 24})`} opacity="0.88">
      <path
        d="M0 -18 C10 -15 17 -7 18 2 C10 0 4 4 1 16 C-3 5 -11 1 -19 2 C-16 -8 -10 -15 0 -18Z"
        fill="#B85C1E"
      />
      <path d="M0 -16 L1 17" stroke="#6A3518" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function Person({ x, y, scale }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.54" fill="#2B2118">
      <circle cx="0" cy="-56" r="13" />
      <path d="M-18 -40 C-12 -55 12 -55 18 -40 L24 35 C8 42 -8 42 -24 35Z" />
      <path d="M-12 33 L-22 92" stroke="#2B2118" strokeWidth="13" strokeLinecap="round" />
      <path d="M12 33 L22 92" stroke="#2B2118" strokeWidth="13" strokeLinecap="round" />
      <path d="M-19 -26 L-42 16" stroke="#2B2118" strokeWidth="10" strokeLinecap="round" />
      <path d="M19 -26 L42 16" stroke="#2B2118" strokeWidth="10" strokeLinecap="round" />
    </g>
  )
}

function Pumpkin({ x, y, size, color }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 64})`}>
      <path d="M0 -48 C12 -64 29 -47 26 -16 C24 18 12 42 0 42 C-12 42 -24 18 -26 -16 C-29 -47 -12 -64 0 -48Z" fill={color} />
      <path d="M-28 -34 C-54 -38 -62 -10 -52 18 C-43 45 -15 46 0 32 C-16 16 -18 -12 -28 -34Z" fill="#B95622" opacity="0.92" />
      <path d="M28 -34 C54 -38 62 -10 52 18 C43 45 15 46 0 32 C16 16 18 -12 28 -34Z" fill="#E58435" opacity="0.88" />
      <path d="M0 -48 C-5 -24 -6 13 0 42" stroke="#8C411B" strokeWidth="3" opacity="0.38" />
      <path d="M0 -58 C8 -69 14 -68 18 -56 C10 -57 4 -54 0 -48Z" fill="#6E5D2E" />
    </g>
  )
}

function Lantern({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-32" y="-92" width="64" height="94" rx="8" fill="#2A211A" opacity="0.9" />
      <rect x="-24" y="-78" width="48" height="66" rx="4" fill="#FFDFA8" opacity="0.35" />
      <path d="M0 -58 C18 -33 11 -9 0 -1 C-12 -12 -15 -34 0 -58Z" fill="#FFE6A2" />
      <path d="M0 -49 C8 -32 5 -18 0 -11 C-7 -20 -8 -35 0 -49Z" fill="#F28B2C" opacity="0.86" />
      <path d="M-20 -92 C-12 -120 12 -120 20 -92" fill="none" stroke="#2A211A" strokeWidth="8" strokeLinecap="round" />
      <line x1="-32" y1="-64" x2="32" y2="-64" stroke="#2A211A" strokeWidth="5" />
      <line x1="-32" y1="-30" x2="32" y2="-30" stroke="#2A211A" strokeWidth="5" />
    </g>
  )
}

export default function FamilyGatheringAutumnHero() {
  return (
    <figure className="relative mt-10 overflow-hidden border border-[#C79558] bg-[#6B3B1E] shadow-[0_30px_80px_rgba(92,52,25,0.22)]">
      <svg
        viewBox="0 0 1600 900"
        className="block h-[360px] w-full object-cover sm:h-[440px] lg:h-[520px]"
        role="img"
        aria-label="Autumn family gathering scene with pumpkins, lanterns, string lights, a barn, and distant family silhouettes without visible faces."
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7D493" />
            <stop offset="48%" stopColor="#E78E3D" />
            <stop offset="100%" stopColor="#4E2D1B" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="46%" cy="42%" r="54%">
            <stop offset="0%" stopColor="#FFF1C7" stopOpacity="0.96" />
            <stop offset="44%" stopColor="#F2AD4F" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#8D431D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8C8" />
            <stop offset="62%" stopColor="#F8B94D" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#F8B94D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="table" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6C3F22" />
            <stop offset="44%" stopColor="#A06433" />
            <stop offset="100%" stopColor="#4B2A18" />
          </linearGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />
        <rect width="1600" height="900" fill="url(#sunGlow)" />
        <ellipse cx="760" cy="658" rx="780" ry="180" fill="#7A4C27" opacity="0.32" />
        <path d="M0 646 C260 556 470 612 690 574 C930 530 1120 574 1600 500 L1600 900 L0 900Z" fill="#57351E" opacity="0.65" />

        <g opacity="0.62">
          <path d="M1210 418 L1424 294 L1568 408 L1568 618 L1210 618Z" fill="#3A2A20" />
          <path d="M1248 414 L1424 316 L1532 414" fill="none" stroke="#8F5A31" strokeWidth="18" strokeLinejoin="round" />
          <rect x="1272" y="438" width="84" height="180" fill="#5D371F" />
          <rect x="1396" y="438" width="110" height="180" fill="#4A2D1E" />
          <path d="M1396 438 L1506 618 M1506 438 L1396 618" stroke="#8F5A31" strokeWidth="10" opacity="0.62" />
          <circle cx="1432" cy="392" r="38" fill="#9A5526" opacity="0.72" />
          <circle cx="1432" cy="392" r="22" fill="#3A2A20" opacity="0.75" />
        </g>

        <g fill="none" stroke="#3B2417" strokeWidth="7" opacity="0.46">
          <path d="M-20 118 C360 20 670 78 940 178 C1162 260 1364 194 1620 98" />
          <path d="M-30 214 C326 112 648 160 904 260 C1166 364 1346 314 1630 224" />
        </g>

        {lights.map(([x, y]) => (
          <g key={`${x}-${y}`} filter="url(#softGlow)">
            <circle cx={x} cy={y} r="28" fill="url(#lightGlow)" opacity="0.72" />
            <circle cx={x} cy={y} r="9" fill="#FFF3B0" />
          </g>
        ))}

        <g opacity="0.68">
          <path d="M0 0 C168 52 332 64 494 20 C378 120 206 190 0 172Z" fill="#793812" />
          <path d="M1600 0 C1400 54 1274 86 1118 28 C1212 126 1394 196 1600 160Z" fill="#793812" />
          <path d="M1072 -12 C908 52 744 46 608 -4 C660 112 858 180 1040 130Z" fill="#9B4716" opacity="0.7" />
        </g>

        {leaves.map(([x, y, size, rotate]) => (
          <Leaf key={`${x}-${y}`} x={x} y={y} size={size} rotate={rotate} />
        ))}

        <g>
          {people.map(([x, y, scale]) => (
            <Person key={`${x}-${y}`} x={x} y={y} scale={scale} />
          ))}
        </g>

        <rect x="0" y="705" width="1600" height="195" fill="url(#table)" />
        <path d="M0 736 C260 708 530 750 760 718 C1032 680 1276 716 1600 684 L1600 900 L0 900Z" fill="#3B2418" opacity="0.36" />
        <path d="M0 746 L1600 692" stroke="#C58B53" strokeWidth="8" opacity="0.32" />
        <path d="M0 818 L1600 760" stroke="#2B1A12" strokeWidth="9" opacity="0.24" />

        <Lantern x={248} y={772} scale={1.02} />
        <Lantern x={1034} y={790} scale={0.78} />
        {pumpkins.map(([x, y, size, color]) => (
          <Pumpkin key={`${x}-${y}`} x={x} y={y} size={size} color={color} />
        ))}

        <g opacity="0.92">
          <ellipse cx="744" cy="778" rx="154" ry="42" fill="#3A281C" opacity="0.42" />
          <path d="M610 770 C684 706 812 706 886 770 C820 820 676 820 610 770Z" fill="#9A4D22" />
          <path d="M640 760 C700 720 800 720 858 760" stroke="#F1C17A" strokeWidth="10" opacity="0.45" />
          <path d="M716 702 C724 666 758 666 766 702" stroke="#6E5D2E" strokeWidth="16" strokeLinecap="round" />
          <circle cx="730" cy="682" r="34" fill="#F2D08A" opacity="0.7" />
        </g>

        <g opacity="0.7">
          <path d="M72 808 C210 758 300 838 424 778 C514 842 642 794 740 852 C872 782 1032 838 1160 794 C1294 846 1448 802 1600 836 L1600 900 L0 900 L0 832Z" fill="#8B4C21" />
          {leaves.slice(0, 8).map(([x, y, size, rotate], index) => (
            <Leaf key={`bottom-${index}`} x={x + index * 154} y={838 + (index % 3) * 20} size={size * 0.72} rotate={rotate + 70} />
          ))}
        </g>

        <rect width="1600" height="900" fill="rgba(54,31,18,0.18)" />
      </svg>
      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2E1B12]/80 to-transparent px-6 pb-6 pt-20 text-[#FFF7E8] sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#F4C984]">
          Thanksgiving Day in Aliceville
        </p>
        <p className="mt-2 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
          A warm place for every branch of the family tree.
        </p>
      </figcaption>
    </figure>
  )
}
