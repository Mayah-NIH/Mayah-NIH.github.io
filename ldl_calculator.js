// LDL Calculator JavaScript Version for GitHub Pages

// Utility Functions
function round(value, digits = 1) {
    const factor = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
  }
  
  function convertMg(value, factor) {
    return typeof value === 'number' ? value * factor : null;
  }
  
  // LDL Calculation Functions
  function m3SLDLC(TC, HDL, TG) {
    if ([TC, HDL, TG].some(v => isNaN(v))) return "Missing value";
    if (TC > 1000 || TG > 3000) return "TC must be <= 1000 and TG <= 3000";
  
    const non_HDL = TC - HDL;
    const equation =
      (0.9028 * TC) + (-0.8573 * HDL) + (-0.1042 * TG) +
      (-0.000472 * TG * non_HDL) + (0.0000623 * TG * TG) +
      (Math.pow(non_HDL, 2) * 0.0002866) + 3.0377;
  
    if (TG > 800) return `${round(equation)} Warning: TG > 800`;
    if (equation < 0) return 0.0;
    if (equation > non_HDL) return round(non_HDL);
    return round(equation);
  }
  
  function SLDLC(TC, HDL, TG) {
    if ([TC, HDL, TG].some(v => isNaN(v))) return "Missing value";
    if (TC > 1000 || TG > 1500) return "Invalid input";
  
    const non_HDL = TC - HDL;
    const equation =
      (TC * 1.055) - (HDL * 1.029) -
      ((TG * 0.1168) + ((TG * non_HDL) * 0.000467) - (Math.pow(TG, 2) * 0.00006199)) - 9.4386;
  
    if (equation < 0) return 0.0;
    if (equation > non_HDL) return round(non_HDL);
    return round(equation);
  }
  
  function eS_LDL(TC, HDL, TG, ApoB) {
    if ([TC, HDL, TG, ApoB].some(v => isNaN(v))) return "";
    if (TC > 1000 || TG > 1500 || HDL > TC) return "Invalid input";
  
    const non_HDL = TC - HDL;
    const equation =
      (0.8708 * TC) + (-0.8022 * HDL) + (-0.1432 * TG) + (0.2202 * ApoB) +
      (0.000808 * TG * ApoB) + (-0.000896 * TG * non_HDL) +
      (Math.pow(TG, 2) * 0.000112) - 4.726;
  
    if (equation < 0) return 0.0;
    if (equation > non_HDL) return round(non_HDL);
    return round(equation);
  }
  
  function FLDLC(TC, HDL, TG) {
    if ([TC, HDL, TG].some(v => isNaN(v))) return "Missing value";
    if (TC > 400) return "TC must be < 400";
  
    return round(TC - HDL - (TG / 5));
  }
  
  // mmol/L versions
  function m3SLDLC_mmol(TC, HDL, TG) {
    if ([TC, HDL, TG].some(v => isNaN(v))) return "Missing values";
    if (TC > 25.9 || TG > 33.9) return "Invalid mmol input";
  
    const TC_mmol = convertMg(TC, 38.67);
    const HDL_mmol = convertMg(HDL, 38.67);
    const TG_mmol = convertMg(TG, 88.57);
    let result = m3SLDLC(TC_mmol, HDL_mmol, TG_mmol);
    result = convertMg(result, 0.02585983966);
    return round(result);
  }
  
  function eS_LDL_mmol(TC, HDL, TG, ApoB) {
    if ([TC, HDL, TG, ApoB].some(v => isNaN(v))) return "";
    if (TC > 25.9 || TG > 16.9) return "Invalid mmol input";
  
    const TC_mmol = convertMg(TC, 38.67);
    const HDL_mmol = convertMg(HDL, 38.67);
    const TG_mmol = convertMg(TG, 88.57);
    const ApoB_mmol = convertMg(ApoB, 100);
    let result = eS_LDL(TC_mmol, HDL_mmol, TG_mmol, ApoB_mmol);
    result = convertMg(result, 0.02585983966);
    return round(result);
  }
  
  function FLDLC_mmol(TC, HDL, TG) {
    if ([TC, HDL, TG].some(v => isNaN(v))) return "Missing values";
    if (TC > 10.3) return "Invalid mmol input";
  
    const TC_mmol = convertMg(TC, 38.67);
    const HDL_mmol = convertMg(HDL, 38.67);
    const TG_mmol = convertMg(TG, 88.57);
    let result = FLDLC(TC_mmol, HDL_mmol, TG_mmol);
    result = convertMg(result, 0.02585983966);
    return round(result);
  }
  
  // Example usage (replace with file reader and table renderer later)
  console.log("SLDLC:", SLDLC(200, 50, 100));
  console.log("m3SLDLC:", m3SLDLC(200, 50, 100));
  console.log("eS_LDL:", eS_LDL(200, 50, 100, 90));
  console.log("FLDLC:", FLDLC(200, 50, 100));
  