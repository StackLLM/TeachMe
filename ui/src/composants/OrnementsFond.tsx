/** cloneme: C-24 — masses géographiques du fond, dessinées en SVG. */

import './OrnementsFond.css'

export function OrnementsFond() {
  return (
    <div className="ornements" aria-hidden="true">
      <svg
        className="ornements__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className="ornements__flou ornements__flou--fort">
          <path
            className="ornements__creux"
            d="M-180 -120C60 -190 310 -90 360 110c46 186-70 350-250 390-150 33-310-10-390-120Z"
          />
          <path
            className="ornements__creux"
            d="M-160 420c170-60 350 10 390 190 38 170-80 330-260 380-140 39-300-20-390-140Z"
            opacity="0.75"
          />
          <path
            className="ornements__clair"
            d="M1180 -140c200-40 370 80 380 260 10 170-140 300-320 290-170-10-300-150-290-320 6-106 110-210 230-230Z"
          />
          <path
            className="ornements__creux"
            d="M1000 720c180-70 380 10 430 200 30 120-60 240-220 290-180 56-390-30-430-210-20-96 80-240 220-280Z"
            opacity="0.6"
          />
          <circle className="ornements__clair" cx="250" cy="760" r="120" opacity="0.65" />
          <circle className="ornements__creux" cx="1260" cy="180" r="80" opacity="0.45" />
          <circle className="ornements__clair" cx="1040" cy="80" r="46" opacity="0.6" />
        </g>
        <g className="ornements__traits">
          <path d="M-40 300C180 250 320 330 380 470s80 300 250 360" />
          <path d="M120 900c80-170 240-230 420-200s300 10 430-90" />
          <path d="M1080 -20c-40 150 40 250 180 300s220 120 240 260" />
          <path d="M760 900c20-120 110-200 230-220" />
        </g>
      </svg>
    </div>
  )
}
