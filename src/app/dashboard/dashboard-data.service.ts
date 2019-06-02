import { Injectable } from '@angular/core';

let trendInfo = [
        {
            date: "W1 2000",
            date_code: 2000.0,
            a: 0,
            the: 3,
            in: 1,
            of: 2
        },
        {
            date: "W1 2001",
            date_code: 2001.0,
            a: 1,
            the: 2,
            in: 1,
            of: 2
        },
        {
            date: "W1 2002",
            date_code: 2002.0,
            a: 2,
            the: 1,
            in: 1,
            of: 2
        },
        {
            date: "W1 2003",
            date_code: 2003.0,
            a: 3,
            the: 0,
            in: 1,
            of: 2
        }
    ];

export class CountryInfo {
  country: string;
  hydro: number;
  oil: number;
  gas: number;
  coal: number;
  nuclear: number;
}

let countriesInfo = [{
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
  getTrendInfo() {
    return trendInfo;
  }

  getCountriesInfo(): CountryInfo[] {
    return countriesInfo;
  }
}
