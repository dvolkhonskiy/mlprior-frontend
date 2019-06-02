import { Injectable } from '@angular/core';

export class ArchitectureInfo {
  year: number;
  smp: number;
  mmp: number;
  cnstl: number;
  cluster: number;
}

let architecturesInfo: ArchitectureInfo[]  = [{
  year: 1997,
  smp: 263,
  mmp: 226,
  cnstl: 10,
  cluster: 1
}, {
  year: 1999,
  smp: 169,
  mmp: 256,
  cnstl: 66,
  cluster: 7
}, {
  year: 2001,
  smp: 57,
  mmp: 257,
  cnstl: 143,
  cluster: 43
}, {
  year: 2003,
  smp: 0,
  mmp: 163,
  cnstl: 127,
  cluster: 210
}, {
  year: 2005,
  smp: 0,
  mmp: 103,
  cnstl: 36,
  cluster: 361
}, {
  year: 2007,
  smp: 0,
  mmp: 91,
  cnstl: 3,
  cluster: 406
}];


export class CountryInfo {
  country: string;
  hydro: number;
  oil: number;
  gas: number;
  coal: number;
  nuclear: number;
}

let countriesInfo: CountryInfo[]  = [{
  country: "USA",
  hydro: 59.8,
  oil: 937.6,
  gas: 582,
  coal: 564.3,
  nuclear: 187.9
}, {
  country: "China",
  hydro: 74.2,
  oil: 308.6,
  gas: 35.1,
  coal: 956.9,
  nuclear: 11.3
}, {
  country: "Russia",
  hydro: 40,
  oil: 128.5,
  gas: 361.8,
  coal: 105,
  nuclear: 32.4
}, {
  country: "Japan",
  hydro: 22.6,
  oil: 241.5,
  gas: 64.9,
  coal: 120.8,
  nuclear: 64.8
}, {
  country: "India",
  hydro: 19,
  oil: 119.3,
  gas: 28.9,
  coal: 204.8,
  nuclear: 3.8
}, {
  country: "Germany",
  hydro: 6.1,
  oil: 123.6,
  gas: 77.3,
  coal: 85.7,
  nuclear: 37.8
}];

@Injectable()
export class DashboardDataService {
  getArchitecturesInfo(): ArchitectureInfo[] {
    return architecturesInfo;
  }

  getCountriesInfo(): CountryInfo[] {
    return countriesInfo;
  }
}
