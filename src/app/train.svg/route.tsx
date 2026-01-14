import { NextResponse } from "next/server";

export async function GET() {
    // Calculate days left.
    const daysLeft = 14;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="1099.6837" height="87.62274" viewBox="0 0 290.95798 23.18352">
  <defs>
    <path id="a" d="M449.07941 576.64703h180.68108v68.26713H449.07941z"/>
    <path id="b" d="M449.07941 576.64703h180.68108v68.26713H449.07941z"/>
    <path id="c" d="M449.07941 576.64703h180.68108v68.26713H449.07941z"/>
  </defs>
  <g transform="translate(21.92873 -146.79153)">
    <circle cx="253.592" cy="167.96902" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="260.3913" cy="167.96902" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="227.69389" cy="167.96902" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="234.21481" cy="167.96902" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <rect width="3.16642" height="14.57957" x="215.63042" y="149.99783" ry=".96546" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.895254;stroke-dasharray:none"/>
    <path d="M221.13135 165.54455s-.29122 2.10171.59923 2.14274l44.94282.0654s.96167-.13722.41866-2.88815c-.37974-1.92386-45.96071.68005-45.96071.68005z" style="display:inline;fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:.625234;stroke-dasharray:none"/>
    <path d="M220.5419 148.78857s.65825-1.89163 2.80508-1.99564H264.881s1.07895-.12022 1.50958 1.86019c.43064 1.98041-45.84868.13545-45.84868.13545z" style="display:inline;fill:#dadada;fill-opacity:.976471;stroke:none;stroke-width:.71527;stroke-dasharray:none"/>
    <path d="M218.42204 158.00593s.0103 3.96226.0893 6.10487c.0242.63015-.0905 1.56464 1.25115 1.6915h48.48076s.69887-.0179.70604-.84855l.0593-6.87711-6.54292-.0508-5.67167.005-27.21272-.008-5.72026.002z" style="display:inline;fill:#da94b0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M59.42777 158.02582c.65228-.003 4.89741-.0428 5.46572-.0003l5.71844-.00039 27.2207.0002 5.66046.003h6.54264v-8.82777c-.24235-.60586-.76716-.54106-.76716-.54106l-49.01472-.0489a.82496.82496 135.02957 0 0-.82578.82493z" style="display:inline;fill:#f7d1e0;fill-opacity:1;stroke:none;stroke-width:.79375" transform="translate(158.99352)"/>
  </g>
  <g transform="translate(21.92873 -146.79153)">
    <circle cx="200.69113" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="207.41083" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="174.6675" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="181.18842" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <rect width="3.16642" height="14.57957" x="162.60402" y="149.99783" ry=".96546" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.895254;stroke-dasharray:none"/>
    <path d="M168.10495 165.54455s-.29122 2.10171.59923 2.14274l44.94282.0654s.96167-.13722.41866-2.88815c-.37974-1.92386-45.96071.68005-45.96071.68005z" style="display:inline;fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:.625234;stroke-dasharray:none"/>
    <path d="M167.5155 148.78857s.65825-1.89163 2.80508-1.99564h41.53402s1.07895-.12022 1.50958 1.86019c.43064 1.98041-45.84868.13545-45.84868.13545z" style="display:inline;fill:#dadada;fill-opacity:.976471;stroke:none;stroke-width:.71527;stroke-dasharray:none"/>
    <path d="M165.39564 158.00593s.0103 3.96226.0893 6.10487c.0242.63015-.0905 1.56464 1.25115 1.6915h48.48076s.69887-.0179.70604-.84855l.0593-6.87711-6.54292-.0508-5.67167.005-27.21272-.008-5.72025.002z" style="display:inline;fill:#da94b0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M59.42777 158.02582c.65228-.003 4.89741-.0428 5.46572-.0003l5.71844-.00039 27.2207.0002 5.66046.003h6.54264v-8.82777c-.24235-.60586-.76716-.54106-.76716-.54106l-49.01472-.0489a.82496.82496 135.02957 0 0-.82578.82493z" style="display:inline;fill:#f7d1e0;fill-opacity:1;stroke:none;stroke-width:.79375" transform="translate(105.96712)"/>
  </g>
  <g transform="translate(21.92873 -146.79153)">
    <circle cx="148.15138" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="154.70248" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="121.68664" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="128.20755" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <rect width="3.16642" height="14.57957" x="109.62315" y="149.99783" ry=".96546" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.895254;stroke-dasharray:none"/>
    <path d="M115.12409 165.54455s-.29122 2.10171.59923 2.14274l44.94282.0654s.96167-.13722.41866-2.88815c-.37974-1.92386-45.96071.68005-45.96071.68005z" style="display:inline;fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:.625234;stroke-dasharray:none"/>
    <path d="M114.53464 148.78857s.65825-1.89163 2.80508-1.99564h41.53402s1.07895-.12022 1.50958 1.86019c.43064 1.98041-45.84868.13545-45.84868.13545z" style="display:inline;fill:#dadada;fill-opacity:.976471;stroke:none;stroke-width:.71527;stroke-dasharray:none"/>
    <path d="M112.41478 158.00593s.0103 3.96226.0893 6.10487c.0242.63015-.0905 1.56464 1.25115 1.6915h48.48076s.69887-.0179.70604-.84855l.0593-6.87711-6.54292-.0508-5.67167.005-27.21272-.008-5.72026.002z" style="display:inline;fill:#da94b0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M59.42777 158.02582c.65228-.003 4.89741-.0428 5.46572-.0003l5.71844-.00039 27.2207.0002 5.66046.003h6.54264v-8.82777c-.24235-.60586-.76716-.54106-.76716-.54106l-49.01472-.0489a.82496.82496 135.02957 0 0-.82578.82493z" style="display:inline;fill:#f7d1e0;fill-opacity:1;stroke:none;stroke-width:.79375" transform="translate(52.98626)"/>
  </g>
  <g transform="translate(21.92873 -146.79153)">
    <circle cx="68.70038" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="75.2213" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="94.14036" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="100.74524" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <rect width="3.16642" height="14.57957" x="56.6369" y="149.99783" ry=".96546" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.895254;stroke-dasharray:none"/>
    <path d="M62.13783 165.54455s-.29122 2.10171.59923 2.14274l44.94282.0654s.96167-.13722.41866-2.88815c-.37974-1.92386-45.9607.68005-45.9607.68005z" style="display:inline;fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:.625234;stroke-dasharray:none"/>
    <path d="M61.54838 148.78857s.65825-1.89163 2.80508-1.99564h41.53402s1.07895-.12022 1.50958 1.86019c.43064 1.98041-45.84868.13545-45.84868.13545z" style="display:inline;fill:#dadada;fill-opacity:.976471;stroke:none;stroke-width:.71527;stroke-dasharray:none"/>
    <rect width="46.77385" height="12.27093" x="60.29596" y="150.53735" rx=".40677" ry=".54557" style="fill:#d5d5d5;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <path d="M59.45333 157.8633s.0103 3.96226.0893 6.10487c.02419.63015-.09051 1.56464 1.25114 1.6915h48.48076s.69888-.0179.70604-.84855l.0593-6.87711-6.54292.003-.0385 4.1959s-.13909.48444-.61098.48444h-4.32502s-.6818.065-.6818-.6818l-.009-4.1452h-27.2191v4.23435s.01148.62483-.44284.76702h-4.8408s-.3485.0209-.48372-.48372l.04711-4.39195z" style="display:inline;fill:#da94b0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M59.42777 158.02582c.65228-.003 4.89741-.0428 5.46572-.0003v-5.41714c0-.25789.22457-.27689.22457-.27689h5.19203c.30184 0 .30184.30184.30184.30184v5.3918l27.2207.0002s.0104-5.02918.0916-5.28197c.08126-.25284.34308-.24194.34308-.24194h4.85593c.34125 0 .36985.36984.36985.36984v5.15695h6.54264v-8.82777c-.24235-.60586-.76716-.54106-.76716-.54106l-49.01472-.0489a.82496.82496 135.02957 0 0-.82578.82493z" style="display:inline;fill:#f7d1e0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <rect width="4.77111" height="3.18074" x="76.67994" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="82.09377" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="87.75221" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.40759" height="8.23871" x="65.56584" y="153.34077" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.40759" height="8.23871" x="98.50178" y="153.34077" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
  </g>
  <g transform="translate(21.92873 -146.79153)">
    <circle cx="47.73659" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="41.36343" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="-5.68651" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <circle cx="-12.0945" cy="167.96866" r="2.00602" style="fill:#505050;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <path d="M-18.67058 165.54455s-.46965 2.10171.96638 2.14274l72.4794.0654s1.55087-.13722.67517-2.88815c-.61242-1.92386-74.12095.68005-74.12095.68005z" style="display:inline;fill:#bebebe;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <path d="M-1.84792 148.78857s.81113-1.89163 3.45656-1.99564h51.18035s1.32954-.12022 1.86019 1.86019c.53065 1.98041-56.4971.13545-56.4971.13545z" style="display:inline;fill:#dadada;fill-opacity:.976471;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <rect width="46.77385" height="12.27093" x="6.26167" y="150.53735" rx=".40677" ry=".54557" style="fill:#d5d5d5;fill-opacity:1;stroke:none;stroke-width:.793999;stroke-dasharray:none"/>
    <path d="M-20.29853 157.89429s-1.6302 1.44593-1.6302 3.47455 1.1795 3.74047 3.23349 4.29083h74.93453s.69888-.0179.70604-.84855l.05925-6.87711-4.2116.003-.03851 4.1959s-.13909.48444-.61098.48444h-4.55656s-.6818.065-.6818-.6818l-.009-4.1452H14.75258v4.23435s.01148.62483-.44284.76702H9.29142s-.3485.0209-.48372-.48372l.04712-4.39195z" style="display:inline;fill:#da94b0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M-20.49432 158.03439s7.33446-7.30705 17.06336-9.37503h59.61581s.52481-.0648.76716.54106v8.82777h-4.1661v-5.15695s-.02859-.36984-.36985-.36984H47.335s-.26182-.0109-.34307.24194c-.08125.25279-.09164 5.28197-.09164 5.28197l-32.19893-.0002v-5.3918s0-.30184-.30184-.30184H9.0824s-.22457.019-.22457.27689v5.41714l-28.12527.0107z" style="display:inline;fill:#f7d1e0;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <path d="M-4.03406 148.79389s-6.21425.88453-13.3226 6.57404c0 0-.2217.15849 0 .15849h13.0554s.30597.005.30597-.30596c0-.31131.02771-6.32317.02771-6.32317s.01412-.13647-.06648-.1034z" style="display:inline;fill:#404040;fill-opacity:1;stroke:none;stroke-width:.79375"/>
    <rect width="4.77111" height="3.18074" x=".7278" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="17.6705" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.40759" height="8.23871" x="9.59016" y="153.34077" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.40759" height="8.23871" x="47.65429" y="153.34077" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="23.36155" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="28.77539" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="34.43383" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
    <rect width="4.77111" height="3.18074" x="39.97812" y="151.32791" ry=".54557" style="fill:#404040;fill-opacity:1;stroke:none;stroke-width:.794;stroke-dasharray:none"/>
  </g>
  <text xml:space="preserve" style="font-weight:250;font-size:53.3333px;font-family:Roboto;-inkscape-font-specification:&quot;Roboto weight=250&quot;;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#a);shape-padding:.194779;display:inline;fill:#505050;fill-opacity:1;stroke:none;stroke-width:3.00094;stroke-dasharray:none" transform="translate(31.74791 -149.97337) scale(.2645833)"><tspan x="449.27539" y="625.88286"><tspan style="font-weight:700;-inkscape-font-specification:&quot;Roboto Bold&quot;">${daysLeft}</tspan></tspan></text>
  <text xml:space="preserve" style="font-weight:250;font-size:53.3333px;font-family:Roboto;-inkscape-font-specification:&quot;Roboto weight=250&quot;;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#b);shape-padding:.194779;display:inline;fill:#505050;fill-opacity:1;stroke:none;stroke-width:3.00094;stroke-dasharray:none" transform="translate(77.83262 -151.14147) scale(.2645833)"><tspan x="449.27539" y="625.88286"><tspan style="font-weight:700;-inkscape-font-specification:&quot;Roboto Bold&quot;">Days</tspan></tspan></text>
  <text xml:space="preserve" style="font-weight:250;font-size:53.3333px;font-family:Roboto;-inkscape-font-specification:&quot;Roboto weight=250&quot;;writing-mode:lr-tb;direction:ltr;white-space:pre;shape-inside:url(#c);shape-padding:.194779;display:inline;fill:#505050;fill-opacity:1;stroke:none;stroke-width:3.00094;stroke-dasharray:none" transform="translate(133.4473 -151.14147) scale(.2645833)"><tspan x="449.27539" y="625.88286"><tspan style="font-weight:700;-inkscape-font-specification:&quot;Roboto Bold&quot;">Left</tspan></tspan></text>
</svg>`;

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=3600, must-revalidate"
        }
    });
}