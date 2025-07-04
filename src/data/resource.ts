

export const enum HostApi {
  HostDev = '',
  HostStg = 'https://your-stg-api.example.com',
  HostProduct = '',
}

export const baseUrl = {
  value: HostApi.HostStg
}

export const buildMode = {
  modeDev: true
}

export const urls = {
  logout: '/logout',
}
