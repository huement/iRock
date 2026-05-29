export interface FloatingIcon {
  icon: string; // bx class e.g. bxs-rocket, bxs-star
  x: string;
  y: string;
  drift: string;
  dur: string;
  delay: string;
  size: string;
}

export const floatingIcons: FloatingIcon[] = [
  // Top / Left side
  { icon: 'bxs-rocket', x: '3%', y: '4%', drift: '42px', dur: '11.5s', delay: '0s', size: '18px' },
  { icon: 'bxs-moon', x: '4%', y: '12%', drift: '38px', dur: '9.8s', delay: '0.5s', size: '23px' },
  { icon: 'bxs-brain', x: '2%', y: '20%', drift: '45px', dur: '13.2s', delay: '1s', size: '17px' },
  { icon: 'bxs-analyse', x: '5%', y: '28%', drift: '36px', dur: '10.5s', delay: '0.2s', size: '21px' },
  { icon: 'bxs-star', x: '3%', y: '36%', drift: '41px', dur: '12.8s', delay: '1.2s', size: '19px' },
  { icon: 'bxs-balloon', x: '4%', y: '44%', drift: '39px', dur: '8.7s', delay: '0.8s', size: '24px' },
  { icon: 'bxs-tone', x: '2%', y: '52%', drift: '44px', dur: '11.1s', delay: '0.3s', size: '18px' },
  { icon: 'bxs-rocket', x: '5%', y: '60%', drift: '37px', dur: '14s', delay: '0.6s', size: '22px' },
  { icon: 'bxs-circle', x: '3%', y: '68%', drift: '46px', dur: '9.4s', delay: '0s', size: '20px' },

  // Lower part (as requested)
  { icon: 'bxs-cloud', x: '4%', y: '76%', drift: '35px', dur: '12.3s', delay: '1.1s', size: '19px' },
  { icon: 'bxs-plane', x: '2%', y: '82%', drift: '43px', dur: '10.8s', delay: '0.4s', size: '21px' },
  { icon: 'bxs-cloud-rain', x: '5%', y: '90%', drift: '40px', dur: '13.5s', delay: '0.9s', size: '17px' },

  // Right side
  { icon: 'bxs-star', x: '97%', y: '6%', drift: '39px', dur: '11.8s', delay: '0.3s', size: '20px' },
  { icon: 'bxs-moon', x: '96%', y: '16%', drift: '45px', dur: '9.2s', delay: '0.6s', size: '18px' },
  { icon: 'bxs-brain', x: '98%', y: '26%', drift: '36px', dur: '12.6s', delay: '0s', size: '23px' },
  { icon: 'bxs-analyse', x: '95%', y: '34%', drift: '42px', dur: '10.1s', delay: '1.1s', size: '20px' },
  { icon: 'bxs-balloon', x: '97%', y: '42%', drift: '38px', dur: '13.7s', delay: '0.4s', size: '22px' },
  { icon: 'bxs-tone', x: '96%', y: '50%', drift: '47px', dur: '8.9s', delay: '1.2s', size: '19px' },
  { icon: 'bxs-rocket', x: '98%', y: '58%', drift: '35px', dur: '11.4s', delay: '0.2s', size: '21px' },
  { icon: 'bxs-cloud', x: '95%', y: '66%', drift: '43px', dur: '12.9s', delay: '0.8s', size: '18px' },
  { icon: 'bxs-plane', x: '97%', y: '74%', drift: '40px', dur: '9.7s', delay: '0.6s', size: '20px' },
  { icon: 'bxs-star', x: '96%', y: '82%', drift: '46px', dur: '10.6s', delay: '0.3s', size: '19px' },
  { icon: 'bxs-cloud-rain', x: '98%', y: '90%', drift: '37px', dur: '13.1s', delay: '0.9s', size: '22px' },
];
