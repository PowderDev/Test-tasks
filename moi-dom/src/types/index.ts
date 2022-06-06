import { LatLngExpression } from "leaflet";

export interface ApiResponse {
  content: ResponseContent;
  first: boolean;
  last: boolean;
  number: number;
}

export interface ReportRegion {
  id: 59;
  name: string;
  okato: string;
}

export interface ReportSubject {
  id: number;
  name: string;
  minzdrav: boolean;
  canBeChanged: boolean;
  confidential: boolean;
  factRequired: boolean;
}

export interface ReportType {
  id: number;
  name: string;
  nameExtended: string;
  subject: ReportSubject;
}

export type ResponseContent = ReportRegion[] | ReportSubject[] | ReportType[];

export interface Report {
  id: number;
  region: ReportRegion | null;
  subject: ReportSubject | null;
  type: ReportType | null;
  latlng: LatLngExpression | null;
  text: string;
  status: Status;
}

export enum Status {
  REGISTERED = "Зарегистрировано",
  ACCEPTED = "Принята",
  REJECTED = "Отклонена",
  COMPLETED = "Завершена",
}

export const ColorClassByStatus = {
  Зарегистрировано: "bg-amber-400",
  Принята: "bg-blue-400",
  Отклонена: "bg-red-400",
  Завершена: "bg-green-400",
};

export type FormFields = "region" | "subject" | "type" | "latlng" | "text";
