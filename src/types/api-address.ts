export interface IProvince {
  [key: string]: any;
  province_id: string;
  province_name: string;
  province_type: string;
}
export interface IDistrict {
  [key: string]: any;
  district_id: string;
  district_name: string;
  district_type: string;
  province_id?: string;
}
export interface IWard {
  ward_id: string;
  ward_name: string;
  ward_type: string;
  district_id?: string;
}
