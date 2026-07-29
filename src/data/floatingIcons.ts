export interface FloatingIcon {
  icon: string;
  x: string;
  y: string;
  drift: string;
  dur: string;
  delay: string;
  size: string;
}

export const floatingIcons: FloatingIcon[] = [
  // --- TOP PAGE (0% - 25%) ---
  { icon: 'bxs-rocket',     x: '3%',  y: '2%',  drift: '30px', dur: '8s',   delay: '0s',   size: '22px' },
  { icon: 'bxs-star',       x: '96%', y: '4%',  drift: '25px', dur: '9.5s', delay: '0.4s', size: '18px' },
  { icon: 'bxs-moon',       x: '5%',  y: '7%',  drift: '35px', dur: '7s',   delay: '0.8s', size: '24px' },
  { icon: 'bxs-brain',      x: '94%', y: '10%', drift: '20px', dur: '11s',  delay: '0.2s', size: '19px' },
  { icon: 'bxs-analyse',    x: '2%',  y: '13%', drift: '40px', dur: '8.5s', delay: '1s',   size: '21px' },
  { icon: 'bxs-planet',     x: '97%', y: '16%', drift: '28px', dur: '10s',  delay: '0.6s', size: '23px' },
  { icon: 'bxs-code-alt',   x: '4%',  y: '19%', drift: '32px', dur: '7.8s', delay: '0.3s', size: '18px' },
  { icon: 'bxs-balloon',    x: '95%', y: '22%', drift: '24px', dur: '9s',   delay: '1.2s', size: '22px' },

  // --- UPPER MID (25% - 50%) ---
  { icon: 'bxs-sparkles',   x: '3%',  y: '25%', drift: '38px', dur: '8.2s', delay: '0.5s', size: '20px' },
  { icon: 'bxs-terminal',   x: '96%', y: '28%', drift: '22px', dur: '10.5s',delay: '0s',   size: '18px' },
  { icon: 'bxs-tone',       x: '6%',  y: '31%', drift: '30px', dur: '7.5s', delay: '0.9s', size: '21px' },
  { icon: 'bxs-star',       x: '93%', y: '34%', drift: '26px', dur: '11.2s',delay: '0.4s', size: '19px' },
  { icon: 'bxs-cloud',      x: '2%',  y: '37%', drift: '34px', dur: '8.8s', delay: '0.1s', size: '24px' },
  { icon: 'bxs-rocket',     x: '97%', y: '40%', drift: '42px', dur: '9.2s', delay: '0.7s', size: '20px' },
  { icon: 'bxs-brain',      x: '5%',  y: '43%', drift: '20px', dur: '12s',  delay: '1.1s', size: '18px' },
  { icon: 'bxs-moon',       x: '94%', y: '46%', drift: '36px', dur: '7.2s', delay: '0.3s', size: '23px' },

  // --- LOWER MID (50% - 75%) ---
  { icon: 'bxs-analyse',    x: '3%',  y: '49%', drift: '28px', dur: '10.1s',delay: '0.8s', size: '21px' },
  { icon: 'bxs-plane',      x: '96%', y: '52%', drift: '33px', dur: '8.4s', delay: '0.2s', size: '19px' },
  { icon: 'bxs-balloon',    x: '4%',  y: '55%', drift: '25px', dur: '9.8s', delay: '0.6s', size: '22px' },
  { icon: 'bxs-tone',       x: '97%', y: '58%', drift: '39px', dur: '11.5s',delay: '1.0s', size: '18px' },
  { icon: 'bxs-sparkles',   x: '2%',  y: '61%', drift: '27px', dur: '7.9s', delay: '0.4s', size: '20px' },
  { icon: 'bxs-star',       x: '95%', y: '64%', drift: '31px', dur: '10.8s',delay: '0.1s', size: '17px' },
  { icon: 'bxs-cloud-rain', x: '5%',  y: '67%', drift: '35px', dur: '8.6s', delay: '0.9s', size: '23px' },
  { icon: 'bxs-code-alt',   x: '93%', y: '70%', drift: '22px', dur: '12.2s',delay: '0.5s', size: '19px' },

  // --- BOTTOM PAGE (75% - 98%) ---
  { icon: 'bxs-rocket',     x: '3%',  y: '73%', drift: '40px', dur: '9.1s', delay: '0.3s', size: '22px' },
  { icon: 'bxs-brain',      x: '96%', y: '76%', drift: '29px', dur: '7.6s', delay: '0.7s', size: '18px' },
  { icon: 'bxs-moon',       x: '6%',  y: '79%', drift: '37px', dur: '11.0s',delay: '0.2s', size: '24px' },
  { icon: 'bxs-terminal',   x: '94%', y: '82%', drift: '24px', dur: '8.3s', delay: '1.1s', size: '20px' },
  { icon: 'bxs-plane',      x: '2%',  y: '85%', drift: '30px', dur: '10.4s',delay: '0.4s', size: '21px' },
  { icon: 'bxs-star',       x: '97%', y: '88%', drift: '36px', dur: '9.6s', delay: '0.8s', size: '19px' },
  { icon: 'bxs-cloud-rain', x: '4%',  y: '91%', drift: '26px', dur: '7.4s', delay: '0.1s', size: '23px' },
  { icon: 'bxs-balloon',    x: '95%', y: '95%', drift: '33px', dur: '11.8s',delay: '0.6s', size: '20px' },
];
