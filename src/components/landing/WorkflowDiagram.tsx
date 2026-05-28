import { useEffect, useRef } from "react";

const animations = `
  @keyframes dash-flow { to { stroke-dashoffset: -20; } }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.06);opacity:0.85} }
  @keyframes node-in { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
  @keyframes spark { 0%{r:0;opacity:0.8} 100%{r:8;opacity:0} }
  @keyframes badge-pop { 0%,100%{opacity:0;transform:scale(0.6)} 10%,90%{opacity:1;transform:scale(1)} }
  .flow-line {
    fill: none;
    stroke-dasharray: 6 5;
    animation: dash-flow 1.4s linear infinite;
    stroke-linecap: round;
  }
  .node-group { animation: node-in 0.4s ease both; cursor: pointer; }
  .node-group:hover .node-bg { filter: brightness(1.08); }
  .center-pulse { animation: pulse 2.8s ease-in-out infinite; transform-origin: 310px 270px; }
`;

type NodeClickHandler = (message: string) => void;

interface WorkflowDiagramProps {
  onNodeClick?: NodeClickHandler;
}

export default function WorkflowDiagram({ onNodeClick }: WorkflowDiagramProps) {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = animations;
    document.head.appendChild(style);
    styleRef.current = style;
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  const handleNodeClick = (message: string) => {
    if (onNodeClick) {
      onNodeClick(message);
    }
  };

  return (
    <svg width="100%" viewBox="0 0 680 560" role="img">
      <title>AI agent workflow diagram</title>
      <desc>
        An N8N-style animated workflow showing an AI agent connected to Product,
        Listing, Ad Copy, Published, and Orders nodes with animated data flows.
      </desc>

      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>

        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor="rgba(0,0,0,0.18)"
          />
        </filter>
        <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="6"
            floodColor="#7F77DD"
            floodOpacity="0.5"
          />
        </filter>

        <linearGradient id="grad-center" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#534AB7" />
          <stop offset="100%" stopColor="#3C3489" />
        </linearGradient>
        <linearGradient id="grad-teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#0F6E56" />
        </linearGradient>
        <linearGradient id="grad-coral" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D85A30" />
          <stop offset="100%" stopColor="#993C1D" />
        </linearGradient>
        <linearGradient id="grad-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BA7517" />
          <stop offset="100%" stopColor="#854F0B" />
        </linearGradient>
        <linearGradient id="grad-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#378ADD" />
          <stop offset="100%" stopColor="#185FA5" />
        </linearGradient>
        <linearGradient id="grad-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4537E" />
          <stop offset="100%" stopColor="#993556" />
        </linearGradient>

        <linearGradient
          id="line-purple-teal"
          x1="130"
          y1="270"
          x2="310"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#534AB7" />
        </linearGradient>
      </defs>

      {/* Grid Background */}
      <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path
          d="M28 0H0V28"
          fill="none"
          stroke="rgba(127,119,221,0.07)"
          strokeWidth="1"
        />
      </pattern>
      <rect width="680" height="560" fill="url(#grid)" rx="16" />

      {/* Connection Lines */}
      {/* Product → Center */}
      <path
        className="flow-line"
        stroke="#1D9E75"
        strokeWidth="2"
        strokeOpacity="0.7"
        d="M196 270 C240 270, 260 270, 268 270"
        style={{ animationDelay: "0s" }}
        markerEnd="url(#arrow)"
      />
      {/* Center → Listing (top right) */}
      <path
        className="flow-line"
        stroke="#EF9F27"
        strokeWidth="2"
        strokeOpacity="0.7"
        d="M352 250 C390 220, 430 185, 470 162"
        style={{ animationDelay: "0.35s" }}
        markerEnd="url(#arrow)"
      />
      {/* Center → Ad Copy (right) */}
      <path
        className="flow-line"
        stroke="#D4537E"
        strokeWidth="2"
        strokeOpacity="0.7"
        d="M352 270 C395 270, 430 270, 468 270"
        style={{ animationDelay: "0.7s" }}
        markerEnd="url(#arrow)"
      />
      {/* Center → Published (bottom right) */}
      <path
        className="flow-line"
        stroke="#378ADD"
        strokeWidth="2"
        strokeOpacity="0.7"
        d="M352 290 C390 320, 430 355, 468 378"
        style={{ animationDelay: "1.05s" }}
        markerEnd="url(#arrow)"
      />
      {/* Center → Orders (bottom) */}
      <path
        className="flow-line"
        stroke="#D85A30"
        strokeWidth="2"
        strokeOpacity="0.7"
        d="M310 312 C310 350, 310 385, 310 418"
        style={{ animationDelay: "1.4s" }}
        markerEnd="url(#arrow)"
      />

      {/* Node: Product (left) */}
      <g
        className="node-group"
        style={{ animationDelay: "0.05s" }}
        onClick={() =>
          handleNodeClick(
            "Tell me more about the Product node in this workflow"
          )
        }
      >
        <rect
          x="60"
          y="230"
          width="136"
          height="80"
          rx="12"
          fill="url(#grad-teal)"
          filter="url(#soft-shadow)"
        />
        <rect
          x="60"
          y="230"
          width="136"
          height="80"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* Icon: box/package */}
        <rect
          x="92"
          y="252"
          width="22"
          height="22"
          rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M92 259 L114 259"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M103 252 L103 259"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <text
          x="124"
          y="261"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Product
        </text>
        <text
          x="124"
          y="279"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Input source
        </text>
        <circle cx="82" cy="301" r="4" fill="#9FE1CB" />
        <text
          x="92"
          y="301"
          fill="rgba(255,255,255,0.55)"
          fontSize="10"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Active
        </text>
      </g>

      {/* Node: Center AI (main hub) */}
      <g className="center-pulse">
        <rect
          x="268"
          y="228"
          width="84"
          height="84"
          rx="18"
          fill="rgba(83,74,183,0.12)"
          stroke="rgba(83,74,183,0.25)"
          strokeWidth="1"
        />
      </g>
      <g
        className="node-group"
        style={{ animationDelay: "0.1s" }}
        onClick={() =>
          handleNodeClick(
            "What does the central ILMAN AI agent do in this workflow?"
          )
        }
      >
        <rect
          x="275"
          y="235"
          width="70"
          height="70"
          rx="14"
          fill="url(#grad-center)"
          filter="url(#glow-purple)"
        />
        <rect
          x="275"
          y="235"
          width="70"
          height="70"
          rx="14"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* AI brain icon */}
        <path
          d="M300 258 C298 252,307 248,310 252 C313 248,322 252,320 258 C325 260,325 268,319 270 L319 274 L301 274 L301 270 C295 268,295 260,300 258Z"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M305 274 L305 278 M310 274 L310 278 M315 274 L315 278"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <text
          x="310"
          y="292"
          fill="rgba(255,255,255,0.65)"
          fontSize="9"
          fontFamily="var(--font-sans,system-ui)"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          ILMAN
        </text>
      </g>

      {/* Node: Listing (top right) */}
      <g
        className="node-group"
        style={{ animationDelay: "0.2s" }}
        onClick={() =>
          handleNodeClick(
            "Tell me more about the Listing node in this workflow"
          )
        }
      >
        <rect
          x="470"
          y="118"
          width="140"
          height="84"
          rx="12"
          fill="url(#grad-amber)"
          filter="url(#soft-shadow)"
        />
        <rect
          x="470"
          y="118"
          width="140"
          height="84"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* Icon: document lines */}
        <rect
          x="498"
          y="138"
          width="16"
          height="20"
          rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M501 144 L510 144 M501 148 L510 148 M501 152 L507 152"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.2"
        />
        <text
          x="524"
          y="147"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Listing
        </text>
        <text
          x="524"
          y="165"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Generate copy
        </text>
        <circle cx="490" cy="193" r="4" fill="#FAC775" />
        <text
          x="500"
          y="193"
          fill="rgba(255,255,255,0.55)"
          fontSize="10"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Waiting
        </text>
      </g>

      {/* Node: Ad Copy (right) */}
      <g
        className="node-group"
        style={{ animationDelay: "0.3s" }}
        onClick={() =>
          handleNodeClick(
            "Tell me more about the Ad Copy node in this workflow"
          )
        }
      >
        <rect
          x="468"
          y="230"
          width="144"
          height="80"
          rx="12"
          fill="url(#grad-pink)"
          filter="url(#soft-shadow)"
        />
        <rect
          x="468"
          y="230"
          width="144"
          height="80"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* Icon: megaphone */}
        <path
          d="M494 257 L500 257 L509 251 L509 271 L500 265 L494 265Z"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M494 265 L494 270"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M512 254 Q516 261 512 268"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="526"
          y="259"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Ad Copy
        </text>
        <text
          x="526"
          y="277"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Write ads
        </text>
        <circle cx="480" cy="301" r="4" fill="#F4C0D1" />
        <text
          x="490"
          y="301"
          fill="rgba(255,255,255,0.55)"
          fontSize="10"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Active
        </text>
      </g>

      {/* Node: Published (bottom right) */}
      <g
        className="node-group"
        style={{ animationDelay: "0.4s" }}
        onClick={() =>
          handleNodeClick(
            "Tell me more about the Published node in this workflow"
          )
        }
      >
        <rect
          x="468"
          y="355"
          width="144"
          height="80"
          rx="12"
          fill="url(#grad-blue)"
          filter="url(#soft-shadow)"
        />
        <rect
          x="468"
          y="355"
          width="144"
          height="80"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* Icon: upload/publish */}
        <rect
          x="494"
          y="373"
          width="22"
          height="14"
          rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M494 373 L494 371 Q505 365 516 371 L516 373"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <rect x="500" y="377" width="6" height="10" rx="1" fill="rgba(255,255,255,0.45)" />
        <text
          x="526"
          y="383"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Published
        </text>
        <text
          x="526"
          y="401"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Deploy live
        </text>
        <circle cx="480" cy="426" r="4" fill="#B5D4F4" />
        <text
          x="490"
          y="426"
          fill="rgba(255,255,255,0.55)"
          fontSize="10"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Waiting
        </text>
      </g>

      {/* Node: Orders (bottom) */}
      <g
        className="node-group"
        style={{ animationDelay: "0.5s" }}
        onClick={() =>
          handleNodeClick(
            "Tell me more about the Orders node in this workflow"
          )
        }
      >
        <rect
          x="240"
          y="418"
          width="140"
          height="80"
          rx="12"
          fill="url(#grad-coral)"
          filter="url(#soft-shadow)"
        />
        <rect
          x="240"
          y="418"
          width="140"
          height="80"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          className="node-bg"
        />
        {/* Icon: bar chart */}
        <rect
          x="266"
          y="438"
          width="24"
          height="20"
          rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <path
          d="M270 455 L270 449 M274 455 L274 446 M278 455 L278 451 M282 455 L282 444 M286 455 L286 448"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <text
          x="300"
          y="447"
          fill="rgba(255,255,255,0.9)"
          fontSize="13"
          fontWeight="500"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Orders
        </text>
        <text
          x="300"
          y="465"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Track sales
        </text>
        <circle cx="256" cy="489" r="4" fill="#F5C4B3" />
        <text
          x="266"
          y="489"
          fill="rgba(255,255,255,0.55)"
          fontSize="10"
          fontFamily="var(--font-sans,system-ui)"
          dominantBaseline="central"
        >
          Active
        </text>
      </g>

      {/* Moving Particles */}
      {/* Particle: Product → Center */}
      <circle r="4" fill="#9FE1CB" opacity="0.9">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s">
          <mpath href="#path-product" />
        </animateMotion>
      </circle>
      <path id="path-product" d="M196 270 C240 270, 260 270, 268 270" fill="none" />

      {/* Particle: Center → Listing */}
      <circle r="4" fill="#FAC775" opacity="0.9">
        <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.35s">
          <mpath href="#path-listing" />
        </animateMotion>
      </circle>
      <path id="path-listing" d="M352 250 C390 220, 430 185, 470 162" fill="none" />

      {/* Particle: Center → Ad Copy */}
      <circle r="4" fill="#F4C0D1" opacity="0.9">
        <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.7s">
          <mpath href="#path-adcopy" />
        </animateMotion>
      </circle>
      <path id="path-adcopy" d="M352 270 C395 270, 430 270, 468 270" fill="none" />

      {/* Particle: Center → Published */}
      <circle r="4" fill="#B5D4F4" opacity="0.9">
        <animateMotion dur="1.7s" repeatCount="indefinite" begin="1.05s">
          <mpath href="#path-published" />
        </animateMotion>
      </circle>
      <path id="path-published" d="M352 290 C390 320, 430 355, 468 378" fill="none" />

      {/* Particle: Center → Orders */}
      <circle r="4" fill="#F5C4B3" opacity="0.9">
        <animateMotion dur="1.5s" repeatCount="indefinite" begin="1.4s">
          <mpath href="#path-orders" />
        </animateMotion>
      </circle>
      <path id="path-orders" d="M310 312 C310 350, 310 385, 310 418" fill="none" />

      {/* Legend */}
      <rect
        x="40"
        y="510"
        width="600"
        height="32"
        rx="8"
        fill="rgba(83,74,183,0.06)"
        stroke="rgba(83,74,183,0.12)"
        strokeWidth="0.5"
      />
      <circle cx="64" cy="526" r="4" fill="#9FE1CB" />
      <text
        x="74"
        y="526"
        fontSize="11"
        fill="rgba(127,119,221,0.7)"
        fontFamily="var(--font-sans,system-ui)"
        dominantBaseline="central"
      >
        Active
      </text>
      <circle cx="120" cy="526" r="4" fill="#FAC775" />
      <text
        x="130"
        y="526"
        fontSize="11"
        fill="rgba(127,119,221,0.7)"
        fontFamily="var(--font-sans,system-ui)"
        dominantBaseline="central"
      >
        Waiting
      </text>
      <text
        x="340"
        y="526"
        fontSize="11"
        fill="rgba(127,119,221,0.5)"
        fontFamily="var(--font-sans,system-ui)"
        dominantBaseline="central"
        textAnchor="middle"
      >
        Click any node to explore ↗
      </text>
    </svg>
  );
}