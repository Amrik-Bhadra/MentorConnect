const countryCallingCodes = [
  { country: "India", code: "+91" },
  { country: "United States", code: "+1" },
  { country: "Canada", code: "+1" },
  { country: "United Kingdom", code: "+44" },
  { country: "Australia", code: "+61" },
  { country: "Germany", code: "+49" },
  { country: "France", code: "+33" },
  { country: "Japan", code: "+81" },
  { country: "China", code: "+86" },
  { country: "Brazil", code: "+55" },
  { country: "Russia", code: "+7" },
  { country: "South Africa", code: "+27" },
  { country: "Mexico", code: "+52" },
  { country: "Italy", code: "+39" },
  { country: "Spain", code: "+34" },
  { country: "New Zealand", code: "+64" },
  { country: "Singapore", code: "+65" },
  { country: "South Korea", code: "+82" },
  { country: "Thailand", code: "+66" },
  { country: "Pakistan", code: "+92" },
  { country: "Bangladesh", code: "+880" },
  { country: "Indonesia", code: "+62" },
  { country: "Philippines", code: "+63" },
  { country: "Vietnam", code: "+84" },
  { country: "Turkey", code: "+90" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "United Arab Emirates", code: "+971" },
  { country: "Egypt", code: "+20" },
  { country: "Nigeria", code: "+234" },
  { country: "Kenya", code: "+254" },
  { country: "Argentina", code: "+54" },
  { country: "Chile", code: "+56" },
  { country: "Colombia", code: "+57" },
  { country: "Pakistan", code: "+92" },
  { country: "Nepal", code: "+977" },
  { country: "Sri Lanka", code: "+94" },
  { country: "Maldives", code: "+960" },
  { country: "Malaysia", code: "+60" }
];

const codes: string[] = [];
countryCallingCodes.forEach((item) => {
    codes.push(item.code);
});

export { countryCallingCodes, codes };